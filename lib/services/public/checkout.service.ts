import prisma from "@/lib/db/prisma";
import { AppError } from "@/lib/utils/errors";
import { calculateShipping, getDeliveryByPincode } from "@/lib/services/delivery/delivery.service";

export interface CheckoutInput {
  customer: {
    fullName: string;
    phone: string;
    altPhone?: string;
    email?: string;
  };
  address: {
    addressLine1: string;
    addressLine2?: string;
    locality?: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
    mrp: number;
    productName: string;
    packInfo?: string;
  }[];
  couponCode?: string;
}

export async function processManualCheckout(data: CheckoutInput) {
  // Validate that products exist to prevent FK errors from old cart items
  const productIds = data.items.map(item => item.productId);
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true }
  });
  const validProductIds = existingProducts.map(p => p.id);
  // Try to calculate shipping to validate deliverability
  let subtotal = 0;
  data.items.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  let deliveryCharge = 300; // default safe fallback
  let assignedCourier = 'Mettur Transports (MSS)';
  try {
    const zone = await getDeliveryByPincode(data.address.pincode);
    if (zone && zone.courier) {
      assignedCourier = zone.courier;
    }
    deliveryCharge = await calculateShipping(data.address.pincode, subtotal);
  } catch (error: any) {
    // If pincode fails, we will just use 300 default for this manual order implementation
    // because manual placement allows sales team to arrange offline transport anywhere
  }

  return await prisma.$transaction(async (tx) => {
    // 2. Validate Coupon if any (Simplified)
    let discountAmount = 0;
    let couponId = null;
    if (data.couponCode) {
      const coupon = await tx.coupon.findUnique({ where: { code: data.couponCode } });
      if (coupon && coupon.active && (!coupon.startDate || coupon.startDate <= new Date()) && (!coupon.expiryDate || coupon.expiryDate >= new Date())) {
        if (subtotal >= Number(coupon.minOrderValue)) {
          if (coupon.discountType === "PERCENTAGE") {
            discountAmount = (subtotal * Number(coupon.discountValue)) / 100;
            if (coupon.maxDiscount && discountAmount > Number(coupon.maxDiscount)) {
              discountAmount = Number(coupon.maxDiscount);
            }
          } else {
            discountAmount = Number(coupon.discountValue);
          }
          couponId = coupon.id;
          
          if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            discountAmount = 0; // Coupon exhausted
            couponId = null;
          } else {
             await tx.coupon.update({
               where: { id: coupon.id },
               data: { usedCount: { increment: 1 } }
             });
          }
        }
      }
    }

    const finalTotal = subtotal - discountAmount + deliveryCharge;

    // 3. Upsert Customer
    const customer = await tx.customer.upsert({
      where: { phone: data.customer.phone },
      update: {
        fullName: data.customer.fullName,
        altPhone: data.customer.altPhone,
        email: data.customer.email || undefined,
      },
      create: {
        fullName: data.customer.fullName,
        phone: data.customer.phone,
        altPhone: data.customer.altPhone,
        email: data.customer.email || undefined,
      }
    });

    // 4. Create Address
    await tx.address.create({
      data: {
        customerId: customer.id,
        fullName: data.customer.fullName,
        phone: data.customer.phone,
        addressLine1: data.address.addressLine1,
        addressLine2: data.address.addressLine2,
        locality: data.address.locality,
        city: data.address.city,
        district: data.address.district,
        state: data.address.state,
        pincode: data.address.pincode,
        country: "India"
      }
    });

    // 5. Generate Order Reference
    const count = await tx.order.count();
    const orderReference = `SC-${new Date().getFullYear()}-${String(count + 1001).padStart(4, '0')}`;

    // 6. Create Order
    const order = await tx.order.create({
      data: {
        orderReference,
        customerId: customer.id,
        couponId,
        couponCode: data.couponCode,
        customerSnapshot: { ...data.customer },
        deliverySnapshot: { ...data.address, courier: assignedCourier },
        subtotal,
        discountAmount,
        deliveryCharge,
        finalTotal,
        status: "PENDING",
        paymentStatus: "PENDING",
        paymentMethod: "CASH_ON_DELIVERY",
        items: {
          create: data.items.map(item => ({
            productId: validProductIds.includes(item.productId) ? item.productId : null,
            productName: item.productName,
            packInfo: item.packInfo,
            quantity: item.quantity,
            unitPrice: item.price,
            mrp: item.mrp,
            discountAmount: (item.mrp - item.price) * item.quantity,
            totalAmount: item.price * item.quantity
          }))
        }
      },
      include: {
        items: true
      }
    });

    return order;
  });
}
