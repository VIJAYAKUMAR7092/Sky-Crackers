"use client";

import React, { useEffect, useState } from "react";
import { Trash2, ShoppingCart, Lock, ArrowRight, Package } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomCartPopup() {
  const { items, clearCart } = useCartStore();
  const pathname = usePathname();
  const [animateTotal, setAnimateTotal] = useState(false);

  // Calculate totals
  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);

  // Animate the total when it changes
  useEffect(() => {
    if (cartTotal > 0) {
      setAnimateTotal(true);
      const timer = setTimeout(() => setAnimateTotal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartTotal]);

  // Hide on checkout page or cart page
  if (pathname === "/checkout" || pathname === "/cart") {
    return null;
  }

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] transform transition-transform duration-500 ease-in-out animate-in slide-in-from-bottom-full">
      {/* Full width bottom bar instead of popup */}
      <div className="bg-[#11111a] text-white w-full shadow-[0_-5px_20px_rgba(0,0,0,0.5)] border-t-2 border-[#e11d48]">
        
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e11d48] to-transparent shadow-[0_0_10px_rgba(225,29,72,0.8)]"></div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Total Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Package className="w-4 h-4 hidden sm:block" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{totalItems} Items</span>
            </div>
            
            <div className={`flex flex-col transition-transform ${animateTotal ? 'scale-110 text-[#22c55e]' : 'scale-100 text-[#22c55e]'}`}>
              <span className="text-[9px] sm:text-[11px] text-gray-400 font-medium leading-none mb-1">Cart Total</span>
              <span className="text-sm sm:text-xl font-black leading-none">
                Rs.{cartTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}
              </span>
            </div>
          </div>
          
          {/* Middle: Actions (Trash & Cart) - Hidden on very small screens, visible on sm+ */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={clearCart}
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-rose-600/20 hover:border-rose-500 transition-colors"
              title="Clear Cart"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>
          
          {/* Right: Checkout Button */}
          <Link 
            href="/checkout"
            onClick={() => {
              // Ensure we navigate smoothly
              window.location.href = '/checkout';
            }}
            className="bg-[#e11d48] hover:bg-rose-700 text-white px-6 sm:px-10 h-10 sm:h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
          >
            <span className="hidden sm:inline">Proceed</span> <ArrowRight className="w-4 h-4" />
          </Link>
          
        </div>
      </div>
    </div>
  );
}
