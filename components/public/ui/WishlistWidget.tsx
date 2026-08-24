"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, X, ShoppingCart, Zap, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist.store";
import { useCartStore } from "@/lib/store/cart.store";

export default function WishlistWidget() {
  const router = useRouter();
  const { items, isOpen, setIsOpen, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Do NOT show floating button if wishlist is empty
  const hasItems = items.length > 0;

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
  };

  const handleBuyNow = (product: any) => {
    addItem(product, 1);
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Floating Wishlist Button */}
      {hasItems && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 right-4 -translate-y-1/2 z-[90] w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-[floatingSlideIn_0.5s_ease-out,pulsePremium_2.5s_ease-in-out_infinite]"
          title="View Wishlist"
        >
          <div className="relative">
            <Heart className="w-6 h-6 fill-white text-white" />
            <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary shadow-sm">
              {items.length}
            </span>
          </div>
        </button>
      )}

      {/* Wishlist Panel Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Wishlist Panel / Drawer */}
      <div 
        className={`fixed z-[101] bg-[#FFFFFA] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col origin-right
          /* Desktop: Right Drawer */
          md:top-0 md:right-0 md:h-screen md:w-[450px] 
          ${isOpen ? "md:translate-x-0 md:scale-100 md:opacity-100" : "md:translate-x-[50%] md:scale-75 md:opacity-0 md:pointer-events-none"}
          
          /* Mobile: Bottom Sheet */
          bottom-0 left-0 w-full h-[85vh] rounded-t-3xl md:rounded-none origin-bottom
          ${isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-full scale-95 opacity-0 pointer-events-none md:translate-y-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-primary/10 bg-white md:bg-transparent rounded-t-3xl md:rounded-none">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-50 rounded-full text-primary">
              <Heart className="w-6 h-6 fill-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Your Wishlist</h2>
              <p className="text-xs text-gray-500 font-medium">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-primary transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <Heart className="w-16 h-16 text-gray-300" />
              <div>
                <p className="text-lg font-bold text-gray-800">Your wishlist is empty</p>
                <p className="text-sm text-gray-500 mt-1">Explore our shop and add your favorite items!</p>
              </div>
            </div>
          ) : (
            items.map((item, idx) => (
              <div 
                key={item.id} 
                className="flex items-start gap-4 p-3 md:p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group"
                style={{ animation: `slideUpFade 0.4s ease-out ${idx * 0.1}s both` }}
              >
                {/* Image */}
                <div className="relative w-24 h-24 shrink-0 bg-[#fdfbf6] rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center p-2">
                  <Image 
                    src={item.imageUrl || "/placeholder.png"} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-1"
                    sizes="96px"
                  />
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col h-full min-w-0 py-0.5">
                  <div className="flex justify-between items-start gap-2 pr-6">
                    <h3 className="font-bold text-sm md:text-base text-gray-900 leading-tight line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">{item.packInfo}</p>
                  
                  <div className="mt-auto pt-3 flex items-center gap-2">
                    <span className="font-black text-base md:text-lg text-primary">
                      ₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.mrp.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Grid (Add to cart & Buy now) */}
                <div className="w-full mt-3 flex gap-2 pt-3 border-t border-gray-50 absolute -bottom-14 left-0 px-3 opacity-0 group-hover:opacity-100 group-hover:-bottom-16 transition-all duration-300 md:static md:opacity-100 md:mt-auto md:border-none md:p-0 md:flex-col md:w-auto md:items-end">
                    {/* On mobile, we place actions below the text. So let's refine the layout. */}
                </div>
                
                {/* Refined Action Buttons inside the card naturally */}
                <div className="absolute bottom-3 right-3 flex flex-col md:flex-row gap-2">
                   <button 
                      onClick={() => handleAddToCart(item)}
                      className="h-8 px-3 bg-red-50 hover:bg-primary text-primary hover:text-white rounded-lg flex items-center gap-1.5 text-xs font-bold transition-colors active:scale-95 border border-primary/20 hover:border-primary shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cart</span>
                    </button>
                    <button 
                      onClick={() => handleBuyNow(item)}
                      className="h-8 px-3 bg-gray-900 hover:bg-black text-white rounded-lg flex items-center gap-1.5 text-xs font-bold transition-colors active:scale-95 shadow-sm shadow-gray-900/20"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current text-yellow-400" />
                      Buy Now
                    </button>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Footer (If items exist, maybe a quick action) */}
        {items.length > 0 && (
          <div className="p-4 md:p-6 bg-white border-t border-gray-100">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors active:scale-[0.98]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatingSlideIn {
          0% { opacity: 0; transform: translate(20px, -50%); }
          100% { opacity: 1; transform: translate(0, -50%); }
        }
        @keyframes pulsePremium {
          0% { box-shadow: 0 0 0 0 rgba(223, 38, 12, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(223, 38, 12, 0); }
          100% { box-shadow: 0 0 0 0 rgba(223, 38, 12, 0); }
        }
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </>
  );
}
