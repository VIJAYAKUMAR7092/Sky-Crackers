"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, ShoppingCart, Trash2, CheckCircle, Rocket, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";

export default function FloatingStoreWidgets() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.product.mrp * item.quantity), 0);
  const totalPay = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalSaved = totalMrp - totalPay;

  return (
    <>
      <a 
        href="https://wa.me/919786683878?text=Hello%20Sky%20Crackers,%20I%20would%20like%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[100px] left-4 md:bottom-8 md:left-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      <Link 
        href="/shop"
        className="fixed bottom-[100px] right-4 md:bottom-8 md:right-8 z-50 group flex flex-col items-center gap-1 hover:scale-110 transition-transform duration-300"
      >
        <div className="bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 text-white rounded-full p-3 border-2 border-white shadow-[0_0_20px_rgba(239,68,68,0.8)] transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 relative animate-pulse">
          <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-yellow-300 animate-ping" />
          <Rocket className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-white/90 px-2 py-0.5 rounded shadow-sm border border-pink-100">Quick Order</span>
      </Link>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#1b1b24] text-white border-t border-gray-800 shadow-[0_-10px_20px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-full duration-300">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-4 md:gap-8 overflow-x-auto custom-scrollbar pb-1 md:pb-0 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Items</span>
                  <span className="text-sm md:text-base font-black">{totalItems}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">MRP</span>
                  <span className="text-sm md:text-base font-bold line-through text-gray-300">₹{totalMrp.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Saved</span>
                  <span className="text-sm md:text-base font-bold text-green-400">₹{totalSaved.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Pay</span>
                  <span className="text-lg md:text-xl font-black text-green-500">₹{totalPay.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={clearCart}
                  className="p-2.5 bg-gray-700 hover:bg-red-600 text-white rounded-full transition-colors shrink-0"
                  aria-label="Clear Cart"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <Link 
                  href="/cart"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-full font-bold transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                </Link>
                <Link 
                  href="/checkout"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#ff1744] hover:bg-red-600 text-white px-8 py-2.5 rounded-full font-black shadow-lg shadow-red-500/30 transition-all hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5" />
                  Checkout
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
