import prisma from "@/lib/db/prisma";
import { YouTubeSectionClient } from "./YouTubeSectionClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "YouTube Section Settings | Sky Crackers Admin"
};

export default async function YouTubeSectionPage() {
  const videos = await prisma.videoContent.findMany({
    orderBy: { displayOrder: "asc" }
  });
  
  const video = videos.length > 0 ? videos[0] : null;
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">YouTube Section</h2>
      </div>
      <YouTubeSectionClient initialVideo={video} />
    </div>
  );
}
