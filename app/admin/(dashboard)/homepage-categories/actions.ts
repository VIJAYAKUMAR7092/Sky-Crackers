"use server"

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrder(items: { id: string, sortOrder: number }[]) {
  try {
    for (const item of items) {
      await prisma.homePageCategory.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder }
      });
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
