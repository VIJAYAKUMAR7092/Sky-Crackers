"use client";

import Link from "next/link";
import Image from "next/image";
import BottomCartPopup from "@/components/public/cart/BottomCartPopup";
import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";
import { usePathname } from "next/navigation";

export default function FloatingStoreWidgets() {
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  return (
    <>
      <BottomCartPopup />
      
      {isHomepage && (
        <>
          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/919042849344"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-3 md:bottom-8 md:left-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform duration-300 group flex items-center justify-center animate-[bounce_3s_infinite]"
          >
            <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7 animate-[pulse_2s_infinite]" />
            {/* Tooltip */}
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl">
              Chat on WhatsApp
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900"></div>
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></div>
          </a>

          {/* Quick Purchase Floating Image Button */}
          <Link 
            href="/shop"
            className="fixed bottom-6 right-2 md:bottom-8 md:right-8 z-50 group hover:scale-110 transition-transform duration-300"
          >
            <div className="relative animate-[premiumFloat_2.5s_ease-in-out_infinite] drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)] w-32 md:w-48">
              <Image 
                src="/images/home/quick-purchase.png" 
                alt="Quick Purchase" 
                width={192} 
                height={96} 
                className="w-full h-auto object-contain drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]"
              />
            </div>
          </Link>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes premiumFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-18px); }
            }
          `}} />
        </>
      )}
    </>
  );
}
