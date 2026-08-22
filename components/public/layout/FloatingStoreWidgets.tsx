"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import Image from "next/image";
import BottomCartPopup from "@/components/public/cart/BottomCartPopup";
import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";
import { usePathname } from "next/navigation";

export default function FloatingStoreWidgets() {
  const pathname = usePathname();

  // Hide widgets on the checkout page to keep it clean and focused
  if (pathname === "/checkout") {
    return null;
  }

  return (
    <>
      <BottomCartPopup />
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919042849344"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[100px] left-4 md:bottom-8 md:left-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 group flex items-center justify-center"
      >
        <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8 group-hover:animate-pulse" />
        {/* Tooltip */}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-bold py-2 px-4 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl">
          Chat on WhatsApp
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900"></div>
        </div>
      </a>

      {/* Quick Enquiry Floating Button - CSS Based */}
      <Link 
        href="/shop"
        className="fixed bottom-[100px] right-4 md:bottom-8 md:right-8 z-50 group hover:scale-110 transition-transform duration-300"
      >
        <div className="relative animate-bounce bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white p-1 rounded-2xl shadow-2xl">
          <div className="bg-gradient-to-b from-gray-900 to-black px-4 py-3 md:px-6 md:py-4 rounded-xl border border-orange-500/30 flex items-center gap-3">
            <Rocket className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 fill-yellow-400 group-hover:animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] md:text-xs font-bold text-yellow-400 tracking-wider uppercase leading-none mb-1">
                Click Here For
              </span>
              <span className="text-sm md:text-xl font-black text-white italic tracking-widest leading-none" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                QUICK ENQUIRY
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
