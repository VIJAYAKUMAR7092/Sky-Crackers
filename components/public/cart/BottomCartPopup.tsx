"use client";

import React, { useEffect } from "react";
import { CheckCircle2, X, ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function BottomCartPopup() {
  const { isPopupOpen, hidePopup, lastAddedItem } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();

  // Hide on checkout page as requested
  if (pathname === "/checkout" || pathname === "/cart") {
    return null;
  }

  // Auto-hide after 5 seconds
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isPopupOpen) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPopupOpen, hidePopup]);

  if (!isPopupOpen || !lastAddedItem) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom-full">
      <div className="bg-[#111119] text-white w-full rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-4 md:p-6 border-t border-gray-800 pointer-events-auto flex flex-col gap-3">
        
        {/* Top Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold text-green-500">Product Added!</span>
          </div>
          <button 
            onClick={hidePopup}
            className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Row (Mimicking reference layout logic) */}
        <div className="flex items-center gap-6 pb-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">MRP</span>
            <span className="text-sm text-gray-300 line-through font-medium">
              ₹{Number(lastAddedItem.mrp).toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Offer Price</span>
            <span className="text-lg text-green-500 font-black">
              ₹{Number(lastAddedItem.price).toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Actions Row */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-800/50">
          <Link 
            href="/cart"
            onClick={hidePopup}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" /> View Cart
          </Link>
          <Link 
            href="/checkout"
            onClick={hidePopup}
            className="flex-1 bg-[#f63d68] hover:bg-[#d62d53] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-pink-500/20"
          >
            <CheckCircle2 className="w-4 h-4" /> Checkout
          </Link>
        </div>

      </div>
    </div>
  );
}
