export const dynamic = 'force-dynamic';
import React from "react";
import Navbar from "../../components/public/layout/Navbar";
import Footer from "../../components/public/layout/Footer";
import FloatingStoreWidgets from "../../components/public/layout/FloatingStoreWidgets";
import WishlistWidget from "../../components/public/ui/WishlistWidget";
import { getWebsiteSettings } from "@/lib/services/cms/cms.service";
import { IS_ORDERS_CLOSED } from "@/lib/constants/site-mode";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  if (IS_ORDERS_CLOSED) {
    return (
      <div className="min-h-screen w-full bg-[#080d22] flex items-center justify-center overflow-x-hidden select-none m-0 p-0">
        {/* MOBILE VIEW (Screens < 768px): Vertical / Portrait Poster */}
        <div className="flex md:hidden w-full min-h-screen bg-[#080d22] items-center justify-center">
          <img
            src="/images/diwali-closed-mobile.jpg"
            alt="Sky Crackers - Diwali Orders are Closed / Thank You"
            className="w-full h-auto max-w-full pointer-events-none select-none block"
            loading="eager"
          />
        </div>

        {/* DESKTOP & TABLET VIEW (Screens >= 768px): Horizontal / Landscape Poster */}
        <div className="hidden md:flex w-full min-h-screen bg-[#080d22] items-center justify-center">
          <img
            src="/images/diwali-closed-desktop.jpg"
            alt="Sky Crackers - Diwali Orders are Closed / Thank You"
            className="w-full h-auto max-h-screen object-contain pointer-events-none select-none block"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  const rawSettings = await getWebsiteSettings();
  const websiteSettings = JSON.parse(JSON.stringify(rawSettings));
  
  // Fetch top banners gracefully
  let banners: string[] = [];
  try {
    const prisma = (await import('@/lib/db/prisma')).default;
    const topBanners = await prisma.topBanner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    banners = topBanners.map(b => b.text);
  } catch (err) {
    console.error("Error fetching top banners:", err);
  }
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans antialiased text-gray-900 selection:bg-primary/20 relative overflow-x-hidden w-full max-w-[100vw]">
      <Navbar settings={websiteSettings} topBanners={banners} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer settings={websiteSettings} />
      <FloatingStoreWidgets />
      <WishlistWidget />
    </div>
  );
}

