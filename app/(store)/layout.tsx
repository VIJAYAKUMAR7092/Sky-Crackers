import React from "react";
import Navbar from "../../components/public/layout/Navbar";
import Footer from "../../components/public/layout/Footer";
import FloatingStoreWidgets from "../../components/public/layout/FloatingStoreWidgets";
import { getWebsiteSettings } from "@/lib/services/cms/cms.service";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const websiteSettings = await getWebsiteSettings();
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans antialiased text-gray-900 selection:bg-primary/20 relative overflow-x-hidden w-full max-w-[100vw]">
      <Navbar settings={websiteSettings} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer settings={websiteSettings} />
      <FloatingStoreWidgets />
    </div>
  );
}
