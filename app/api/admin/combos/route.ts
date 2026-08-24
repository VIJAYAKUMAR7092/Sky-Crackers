import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/server-auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const combos = await prisma.product.findMany({
      where: { isCombo: true },
      include: {
        category: true,
        images: true,
      },
      orderBy: { comboOrder: 'asc' }
    });
    return NextResponse.json(combos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    
    // For combos, we default to setting them as combo products
    body.isCombo = true;
    
    // Auto-assign comboOrder
    const maxOrder = await prisma.product.aggregate({
      where: { isCombo: true },
      _max: { comboOrder: true }
    });
    body.comboOrder = (maxOrder._max.comboOrder || 0) + 1;

    // Remove relations if any exist in the payload
    const { category, images, ...data } = body;

    const product = await prisma.product.create({
      data: {
        ...data,
        images: images && images.length > 0 ? {
          create: images.map((img: any) => ({
            url: img.url,
            isPrimary: img.isPrimary || false,
            displayOrder: img.displayOrder || 0,
          }))
        } : undefined
      },
      include: { category: true, images: true }
    });
    
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
