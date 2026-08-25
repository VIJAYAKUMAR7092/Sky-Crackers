"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Share2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import { useWishlistStore } from "@/lib/store/wishlist.store";
import ZoomableImage from "@/components/public/ui/ZoomableImage";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  
  const isLiked = isInWishlist(product.id);
  const inCartQty = useCartStore((state) => {
    const item = state.items.find(i => i.product.id === product.id);
    return item ? item.quantity : 0;
  });

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCartQty === 0) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.sellingPrice),
        mrp: Number(product.mrp),
        imageUrl: product.images?.[0]?.url || "/placeholder.png",
        packInfo: product.packInfo || "1 Box"
      }, 1);
    } else {
      updateQuantity(product.id, inCartQty + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCartQty > 1) {
      updateQuantity(product.id, inCartQty - 1);
    } else if (inCartQty === 1) {
      removeItem(product.id);
    }
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.sellingPrice),
      mrp: Number(product.mrp),
      imageUrl: product.images?.[0]?.url || "/placeholder.png",
      packInfo: product.packInfo || "1 Box"
    });
  };
  
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.slug}` : '';
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Sky Crackers!`,
      url: url,
    };
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    }
  };

  const hasDiscount = Number(product.mrp) > Number(product.sellingPrice);
  const discountPercent = hasDiscount 
    ? Math.round(((Number(product.mrp) - Number(product.sellingPrice)) / Number(product.mrp)) * 100) 
    : 0;
    
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const packInfo = product.packInfo || "1 Box";
  
  // Decide border color based on cart state to match screenshot
  const cardBorderClass = inCartQty > 0 ? "border-[#22c55e]" : "border-primary";

  return (
    <div className={`group relative bg-white border-2 ${cardBorderClass} rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_15px_40px_rgba(223,38,12,0.25)] hover:border-primary transition-all duration-500 ease-out flex flex-col hover:-translate-y-2`}>
      
      {/* Image Container (No longer a link, just Zoomable) */}
      <div className="relative h-32 sm:h-40 w-full overflow-hidden flex items-center justify-center bg-[#fdfbf6]">
        <div className="absolute inset-2">
          <ZoomableImage 
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </div>

      {/* Added in Cart Banner */}
      {inCartQty > 0 && (
        <div className="bg-[#22c55e] text-white text-center text-[11px] font-bold py-1 w-full animate-[fade-in_0.3s_ease-out]">
          Added {inCartQty} in cart
        </div>
      )}

      {/* Content Container */}
      <div className="p-3 flex flex-col flex-1 bg-white">
        
        {/* Title */}
        <div className="mb-2">
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>
        
        {/* Icons row */}
        <div className="flex items-center gap-2 mb-1.5">
          <button 
            onClick={handleLike}
            className={`w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center transition-colors active:scale-90 ${isLiked ? 'bg-primary text-white border-primary shadow-md' : 'text-primary bg-red-50 hover:bg-red-100'}`}
            title="Like"
          >
            <Heart className="w-3 h-3" fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleShare}
            className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-red-50 hover:bg-red-100 transition-colors active:scale-90"
            title="Share"
          >
            <Share2 className="w-3 h-3" />
          </button>
        </div>

        <div className="text-[10px] text-primary mb-1">{packInfo}</div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm sm:text-base font-extrabold text-gray-900">
            ₹{Number(product.sellingPrice).toLocaleString('en-IN', {minimumFractionDigits: 2})}
          </span>
          {hasDiscount && (
            <span className="text-[10px] text-gray-400 line-through">
              ₹{Number(product.mrp).toFixed(0)}
            </span>
          )}
        </div>
        
        {/* Discount Badge */}
        <div className="mb-3">
          {hasDiscount ? (
             <span className="inline-block bg-yellow-100/50 text-yellow-700 border border-yellow-200 text-[9px] font-bold px-2 py-0.5 rounded">
               {discountPercent}% OFF
             </span>
          ) : (
             <span className="inline-block bg-yellow-100/50 text-yellow-700 border border-yellow-200 text-[9px] font-bold px-2 py-0.5 rounded">
               No Discount
             </span>
          )}
        </div>
        
        {/* Max 99 text */}
        <div className="text-[10px] text-primary mb-1 mt-auto">Max 99</div>
        
        {/* Quantity Selector / Add to Cart */}
        <div className={`flex items-center justify-between border-2 ${inCartQty > 0 ? 'border-[#dc2626]' : 'border-primary/30'} rounded-xl overflow-hidden h-9 w-full bg-red-50/10 transition-colors`}>
          <button 
            onClick={handleDecrement}
            disabled={isOutOfStock && inCartQty === 0}
            className="w-10 h-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors active:scale-95"
          >
            <Minus className="w-4 h-4 font-bold" />
          </button>
          
          <span className="flex-1 text-center font-bold text-sm text-gray-900 bg-white h-full flex items-center justify-center">
            {inCartQty > 0 ? inCartQty : ''}
          </span>
          
          <button 
            onClick={handleIncrement}
            disabled={isOutOfStock}
            className={`w-10 h-full flex items-center justify-center transition-colors active:scale-95 ${inCartQty > 0 ? 'bg-[#dc2626] text-white hover:bg-red-700' : 'text-[#dc2626] hover:bg-gray-100'}`}
          >
            <Plus className="w-4 h-4 font-bold" />
          </button>
        </div>
        
      </div>
    </div>
  );
}
