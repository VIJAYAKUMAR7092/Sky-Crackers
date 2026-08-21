"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  
  const [localQty, setLocalQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const cartItem = cartItems.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.sellingPrice),
      mrp: Number(product.mrp),
      imageUrl: product.images?.[0]?.url || "/placeholder.png",
      packInfo: product.packInfo || "1 Box"
    }, localQty);
    
    setIsAdded(true);
    setLocalQty(1); // reset local qty
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocalQty(prev => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocalQty(prev => (prev > 1 ? prev - 1 : 1));
  };

  const hasDiscount = Number(product.mrp) > Number(product.sellingPrice);
  const discountAmount = Number(product.mrp) - Number(product.sellingPrice);
  const discountPercent = hasDiscount 
    ? Math.round(((Number(product.mrp) - Number(product.sellingPrice)) / Number(product.mrp)) * 100) 
    : 0;
    
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const packInfo = product.packInfo || "1 Box";

  return (
    <div className="group relative h-[520px] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] flex flex-col">
      
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {hasDiscount && !isOutOfStock && (
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg">
            {discountPercent}% OFF
          </div>
        )}
        {isOutOfStock && (
          <div className="bg-zinc-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg">
            Out of Stock
          </div>
        )}
      </div>
      
      {/* In Cart Badge */}
      {inCartQty > 0 && (
        <div className="absolute top-3 right-3 z-20 bg-primary/90 text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1">
          <Check className="w-3 h-3" /> In Cart ({inCartQty})
        </div>
      )}

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative h-[55%] w-full overflow-hidden flex items-center justify-center bg-white/5 p-8">
        <Image 
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-8 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80 z-10 pointer-events-none" />
      </Link>

      {/* Content Container */}
      <div className="relative h-[45%] p-4 flex flex-col z-20 bg-[#0a0a0a] border-t border-white/5">
        
        {/* Category & Title */}
        <div className="mb-2">
          <Link href={`/product/${product.slug}`}>
            <div className="text-primary/80 font-semibold tracking-wider uppercase text-[9px] mb-1">
              {product.category?.name || "Premium Category"}
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto flex flex-col gap-3">
          {/* Price & Unit Row */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[11px] text-zinc-500 line-through font-medium mb-0.5">
                  ₹{Number(product.mrp).toFixed(2)}
                </span>
              )}
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-white">
                  ₹{Number(product.sellingPrice).toFixed(2)}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium bg-zinc-900 px-1.5 py-0.5 rounded">
                  {packInfo}
                </span>
              </div>
            </div>
          </div>
          
          {/* Action Row */}
          <div className="flex items-center gap-2 w-full pt-2 border-t border-white/5">
            {/* Quantity Selector */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg h-10 w-[100px] overflow-hidden">
              <button 
                onClick={handleDecrement}
                disabled={isOutOfStock}
                className="w-8 h-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="flex-1 h-full flex items-center justify-center font-bold text-sm text-white">
                {localQty}
              </div>
              <button 
                onClick={handleIncrement}
                disabled={isOutOfStock}
                className="w-8 h-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 h-10 rounded-lg font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 shadow-lg ${
                isAdded 
                  ? "bg-green-500 text-white shadow-green-500/20" 
                  : "bg-gradient-to-r from-primary to-amber-500 text-black hover:brightness-110 shadow-primary/20"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
