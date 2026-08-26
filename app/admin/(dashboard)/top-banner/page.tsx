import prisma from "@/lib/db/prisma";
import { TopBannerClient } from "./TopBannerClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Banner Settings | Sky Crackers Admin"
};

export default async function TopBannerPage() {
  const banners = await prisma.topBanner.findMany({
    orderBy: { sortOrder: "asc" }
  });
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Top Banner Messages</h2>
      </div>
      <TopBannerClient initialBanners={banners} />
    </div>
  );
}
