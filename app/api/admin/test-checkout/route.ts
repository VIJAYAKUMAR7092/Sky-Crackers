import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET() {
  const count = await prisma.order.count();
  const orders = await prisma.order.findMany({ select: { orderReference: true } });
  
  // also get the max order reference
  const maxRef = orders.length > 0 ? orders.map(o => parseInt(o.orderReference.split('-')[2])).max() : 0;
  
  return NextResponse.json({ count, orders });
}
