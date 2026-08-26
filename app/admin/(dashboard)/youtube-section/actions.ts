"use server"

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function saveYouTubeVideo(data: { id?: string, youtubeUrl: string, title: string, thumbnail: string }) {
  try {
    if (data.id) {
      await prisma.videoContent.update({
        where: { id: data.id },
        data: {
          youtubeUrl: data.youtubeUrl,
          title: data.title,
          thumbnail: data.thumbnail
        }
      });
    } else {
      await prisma.videoContent.create({
        data: {
          youtubeUrl: data.youtubeUrl,
          title: data.title,
          thumbnail: data.thumbnail,
          active: true,
          displayOrder: 0
        }
      });
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
