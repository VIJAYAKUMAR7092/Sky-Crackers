"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateMinimumOrder(id: string, amount: number) {
  try {
    if (id === "default") {
      const existing = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
      if (existing) {
        await prisma.websiteSettings.update({ where: { id: "global" }, data: { defaultMinOrder: amount } });
      } else {
        await prisma.websiteSettings.create({ data: { id: "global", defaultMinOrder: amount } });
      }
    } else {
      await prisma.deliveryZone.update({
        where: { id },
        data: { minimumOrder: amount }
      });
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    console.error("Error updating minimum order:", err);
    return { success: false, error: err.message };
  }
}
