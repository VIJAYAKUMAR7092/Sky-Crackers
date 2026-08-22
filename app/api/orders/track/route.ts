import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderReference, phone } = body;

    if (!orderReference || !phone) {
      return NextResponse.json({ error: 'Order ID and Mobile Number are required.' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { orderReference: orderReference.trim() },
      include: {
        items: true,
        customer: true
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found. Please check your Order ID.' }, { status: 404 });
    }

    // Verify phone number for security
    let phoneMatches = false;
    
    // Check registered customer phone
    if (order.customer && order.customer.phone === phone.trim()) {
      phoneMatches = true;
    }
    
    // Check delivery snapshot phone
    if (!phoneMatches && order.deliverySnapshot) {
      const delivery = order.deliverySnapshot as any;
      if (delivery.phone === phone.trim()) {
        phoneMatches = true;
      }
    }
    
    // Check customer snapshot phone
    if (!phoneMatches && order.customerSnapshot) {
      const customerSnap = order.customerSnapshot as any;
      if (customerSnap.phone === phone.trim()) {
        phoneMatches = true;
      }
    }

    if (!phoneMatches) {
      return NextResponse.json({ error: 'Mobile number does not match the order records.' }, { status: 403 });
    }

    // Return sanitized order data
    return NextResponse.json({
      id: order.id,
      orderReference: order.orderReference,
      status: order.status,
      finalTotal: order.finalTotal,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        id: item.id,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalAmount: item.totalAmount
      }))
    });
  } catch (error) {
    console.error('Order tracking error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
