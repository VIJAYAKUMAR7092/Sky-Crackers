import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/server-auth";
import { withErrorHandler } from "@/lib/utils/error-handler";
import { successResponse } from "@/lib/utils/api-response";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const PUT = async (req: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const body = await req.json();
    const { validUpto } = body;

    const settings = await prisma.websiteSettings.upsert({
      where: { id: "global" },
      update: { comboValidUpto: String(validUpto) },
      create: { id: "global", comboValidUpto: String(validUpto) }
    });

    revalidatePath("/", "layout");
    return successResponse(settings);
  });
};
