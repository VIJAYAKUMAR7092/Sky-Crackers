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
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    subtotal += price * quantity;
  });

      let deliveryCharge = 0;
    let assignedCourier = 'Mettur Transports (MSS)';

    // Find state-level minimum order
    let stateMinOrder = 5000;
    const settings = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
    if (settings?.defaultMinOrder) stateMinOrder = Number(settings.defaultMinOrder);
    
    if (data.address.state) {
      const stateZone = await prisma.deliveryZone.findFirst({
        where: { state: data.address.state, active: true }
      });
      if (stateZone) {
        stateMinOrder = Number(stateZone.minimumOrder);
      }
    }

    if (subtotal < stateMinOrder) {
      throw new AppError(`Minimum order amount for ${data.address.state || 'your area'} is ?${stateMinOrder}`, 'MINIMUM_ORDER_NOT_MET', 400);
    }

    try {
      const zone = await getDeliveryByPincode(data.address.pincode);
      if (zone && zone.courier) {
        assignedCourier = zone.courier;
      }
      deliveryCharge = await calculateShipping(data.address.pincode, subtotal);
    } catch (error: any) {
      // If pincode fails, fallback to 0 (user requested no default 300)
      deliveryCharge = 0;
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
          // Ensure discount amount is not negative and doesn't exceed subtotal
          discountAmount = Math.max(0, Math.min(discountAmount, subtotal));
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

    const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

    // 3. Upsert Customer with Email Conflict Handling
    let emailToUse = data.customer.email || undefined;
    if (emailToUse) {
      const existingEmail = await tx.customer.findUnique({ where: { email: emailToUse } });
      if (existingEmail && existingEmail.phone !== data.customer.phone) {
        // Email belongs to someone else (e.g. family member). Skip updating email to avoid unique constraint 500 error.
        emailToUse = undefined;
      }
    }

    const customer = await tx.customer.upsert({
      where: { phone: data.customer.phone },
      update: {
        fullName: data.customer.fullName,
        altPhone: data.customer.altPhone,
        email: emailToUse,
      },
      create: {
        fullName: data.customer.fullName,
        phone: data.customer.phone,
        altPhone: data.customer.altPhone,
        email: emailToUse,
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
    const currentYear = new Date().getFullYear();
    const lastOrder = await tx.order.findFirst({
      where: { orderReference: { startsWith: `SC-${currentYear}-` } },
      orderBy: { orderReference: 'desc' }
    });
    let nextNumber = 1001;
    if (lastOrder) {
      const parts = lastOrder.orderReference.split('-');
      if (parts.length === 3) {
        const lastNum = parseInt(parts[2], 10);
        if (!isNaN(lastNum)) nextNumber = lastNum + 1;
      }
    }
    const orderReference = `SC-${currentYear}-${String(nextNumber).padStart(4, '0')}`;

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
          create: data.items.map(item => {
            const quantity = Math.max(1, Number(item.quantity) || 1);
            const unitPrice = Math.max(0, Number(item.price) || 0);
            const mrp = Math.max(0, Number(item.mrp) || 0);
            const discountAmount = Math.max(0, (mrp - unitPrice) * quantity);
            const totalAmount = Math.max(0, unitPrice * quantity);
            
            return {
              productId: validProductIds.includes(item.productId) ? item.productId : null,
              productName: item.productName || 'Unknown Product',
              packInfo: item.packInfo,
              quantity,
              unitPrice,
              mrp,
              discountAmount,
              totalAmount
            };
          })
        }
      },
      include: {
        items: true
      }
    });

    return order;
  });
}
