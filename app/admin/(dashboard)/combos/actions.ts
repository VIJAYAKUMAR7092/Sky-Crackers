"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateComboDate(date: string) {
  try {
    const existing = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
    if (existing) {
      await prisma.websiteSettings.update({ where: { id: "global" }, data: { comboValidUpto: date } });
    } else {
      await prisma.websiteSettings.create({ data: { id: "global", comboValidUpto: date } });
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    console.error("Error updating combo date:", err);
    return { success: false, error: err.message };
  }
}
