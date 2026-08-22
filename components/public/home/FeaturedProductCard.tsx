"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";

interface FeaturedProductCardProps {
  product: any;
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
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
  const discountPercent = hasDiscount 
    ? Math.round(((Number(product.mrp) - Number(product.sellingPrice)) / Number(product.mrp)) * 100) 
    : 0;
    
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const packInfo = product.packInfo || "1 Box";

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {hasDiscount && !isOutOfStock && (
          <div className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm">
            {discountPercent}% OFF
          </div>
        )}
        {isOutOfStock && (
          <div className="bg-gray-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      {/* In Cart Badge */}
      {inCartQty > 0 && (
        <div className="absolute top-3 right-3 z-20 bg-green-500 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
          <Check className="w-3 h-3" /> In Cart ({inCartQty})
        </div>
      )}

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative h-48 sm:h-56 w-full overflow-hidden flex items-center justify-center bg-gray-50 p-6">
        <Image 
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 z-0"
        />
      </Link>

      {/* Content Container */}
      <div className="relative p-4 flex flex-col flex-grow bg-white">
        
        {/* Category & Title */}
        <div className="mb-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight min-h-[40px]">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto flex flex-col gap-3">
          {/* Price Row */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[12px] text-gray-400 line-through font-medium">
                  ₹{Number(product.mrp).toFixed(2)}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-gray-900">
                  ₹{Number(product.sellingPrice).toFixed(2)}
                </span>
                <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                  {packInfo}
                </span>
              </div>
            </div>
          </div>
          
          {/* Action Row */}
          <div className="flex items-center gap-2 w-full pt-3 border-t border-gray-100">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded h-10 w-24 overflow-hidden">
              <button 
                onClick={handleDecrement}
                disabled={isOutOfStock}
                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="flex-1 h-full flex items-center justify-center font-bold text-sm text-gray-800">
                {localQty}
              </div>
              <button 
                onClick={handleIncrement}
                disabled={isOutOfStock}
                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 h-10 rounded font-bold text-[12px] uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all duration-200 ${
                isAdded 
                  ? "bg-green-500 text-white" 
                  : "bg-primary text-primary-foreground hover:bg-green-800"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

