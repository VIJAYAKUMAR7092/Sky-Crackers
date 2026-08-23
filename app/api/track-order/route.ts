import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Mobile number is required' }, { status: 400 });
    }

    // Clean phone number (strip +91, spaces)
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
      cleanPhone = cleanPhone.substring(2);
    }

    const orders = await prisma.order.findMany({
      where: {
        customer: {
          phone: { contains: cleanPhone }
        }
      },
      select: {
        id: true,
        orderReference: true,
        createdAt: true,
        finalTotal: true,
        status: true,
        paymentStatus: true,
        paymentMethod: true,
        isDeleted: true,
        deliverySnapshot: true,
        customerSnapshot: true,
        items: {
          select: {
            productName: true,
            quantity: true,
            unitPrice: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Safely convert Prisma Decimal fields to Javascript Numbers for JSON serialization
    const formattedOrders = orders.map(order => ({
      ...order,
      finalTotal: Number(order.finalTotal),
      items: order.items.map(item => ({
        ...item,
        unitPrice: Number(item.unitPrice)
      }))
    }));

    return NextResponse.json({ success: true, data: formattedOrders });
  } catch (error) {
    console.error("Order Tracking Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to track orders' }, { status: 500 });
  }
}
