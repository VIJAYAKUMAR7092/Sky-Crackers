import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/server-auth";

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { orderedIds } = body; // Array of product IDs in their new order

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Use a sequential transaction with increased timeout to prevent Prisma expiration errors
    await prisma.$transaction(async (tx) => {
      for (let i = 0; i < orderedIds.length; i++) {
        await tx.product.update({
          where: { id: orderedIds[i] },
          data: { comboOrder: i + 1 }
        });
      }
    }, {
      maxWait: 5000,
      timeout: 20000,
    });

    return NextResponse.json({ success: true, message: "Order updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
