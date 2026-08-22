"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Phone, Zap, Check, Plus, Minus } from "lucide-react";
import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";
import { useCartStore } from "@/lib/store/cart.store";
import { cn } from "@/components/ui/utils";

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    mrp: number;
    imageUrl: string;
    packInfo?: string;
    stockStatus: string;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const cartItem = cartItems.find((i) => i.product.id === product.id);
  const currentCartQty = cartItem ? cartItem.quantity : 0;
  
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem(product, qty);
    router.push("/shop"); // In a real flow, redirect to /checkout
  };

  const handleWhatsApp = () => {
    const text = `Hi Sky Crackers, I'm interested in purchasing ${qty}x ${product.name} (₹${product.price.toFixed(2)} each). Please let me know the availability.`;
    window.open(`https://wa.me/919042849344?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 font-medium">Quantity:</span>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden p-1">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={isOutOfStock || qty <= 1}
              className="p-2 text-zinc-400 hover:text-white disabled:opacity-50 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-bold text-white">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              disabled={isOutOfStock}
              className="p-2 text-zinc-400 hover:text-white disabled:opacity-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {currentCartQty > 0 && (
            <span className="text-xs text-primary font-medium px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              {currentCartQty} in cart
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "relative flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-lg border",
              isOutOfStock 
                ? "bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed"
                : added
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
            )}
          >
            {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={cn(
              "flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212₹75,55,0.2)]",
              isOutOfStock
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-primary text-black hover:bg-primary/90 hover:scale-[1.02]"
            )}
          >
            <Zap className="h-5 w-5" /> Buy Now
          </button>
        </div>

        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-sm transition-all duration-300 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 shadow-lg"
        >
          <WhatsAppIcon className="h-5 w-5" /> Enquire on WhatsApp
        </button>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 p-4 md:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom-full duration-500">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-400 line-through">₹{product.mrp.toFixed(2)}</span>
          <span className="text-lg font-extrabold text-white leading-none">₹{product.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 flex-1">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 flex items-center justify-center bg-white/10 text-white border border-white/20 rounded-full h-12"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="flex-[2] flex items-center justify-center bg-primary text-black font-bold rounded-full h-12"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
