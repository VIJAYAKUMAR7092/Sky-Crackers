"use server"

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function saveBanners(banners: { id: string, text: string, sortOrder: number }[]) {
  try {
    // Delete any banners not in this list
    const incomingIds = banners.filter(b => !b.id.startsWith("new-")).map(b => b.id);
    await prisma.topBanner.deleteMany({
      where: { id: { notIn: incomingIds } }
    });

    // Update or create
    for (const b of banners) {
      if (b.id.startsWith("new-")) {
        await prisma.topBanner.create({
          data: { text: b.text, sortOrder: b.sortOrder, isActive: true }
        });
      } else {
        await prisma.topBanner.update({
          where: { id: b.id },
          data: { text: b.text, sortOrder: b.sortOrder }
        });
      }
    }
    
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
