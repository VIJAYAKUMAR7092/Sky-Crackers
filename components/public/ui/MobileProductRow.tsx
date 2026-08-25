"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart.store";
import { createPortal } from "react-dom";

interface MobileProductRowProps {
  product: any;
}

export default function MobileProductRow({ product }: MobileProductRowProps) {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  
  const inCartQty = useCartStore((state) => {
    const item = state.items.find(i => i.product.id === product.id);
    return item ? item.quantity : 0;
  });
  const rowTotal = inCartQty * Number(product.sellingPrice);

  const [isZoomed, setIsZoomed] = useState(false);
  
  const handleIncrease = () => {
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

  const handleDecrease = () => {
    if (inCartQty <= 1) {
      if (inCartQty === 1) removeItem(product.id);
    } else {
      updateQuantity(product.id, inCartQty - 1);
    }
  };

  const imgUrl = product.images?.[0]?.url || "/placeholder.png";

  return (
    <>
      <div className="flex items-center py-3 px-2 border-b border-primary/20 bg-white min-h-[70px] gap-1">
        
        {/* IMAGE & NAME (Flex-1) */}
        <div className="flex flex-1 items-center gap-2 overflow-hidden pr-1">
          <div 
            className="w-[48px] h-[48px] shrink-0 bg-gray-50 border border-gray-200 rounded flex items-center justify-center p-0.5 cursor-pointer relative"
            onClick={() => setIsZoomed(true)}
          >
            <Image 
              src={imgUrl}
              alt={product.name}
              fill
              sizes="48px"
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <Link href={`/product/${product.slug}`}>
              <h4 className="font-bold text-[10px] leading-[1.1] text-gray-900 line-clamp-3">{product.name}</h4>
            </Link>
          </div>
        </div>

        {/* PRICE (w-14) */}
        <div className="w-[56px] shrink-0 flex flex-col items-center justify-center text-center">
          <span className="font-extrabold text-[11px] text-gray-900 leading-none">
            ₹{Number(product.sellingPrice).toFixed(2)}
          </span>
          {Number(product.mrp) > Number(product.sellingPrice) && (
            <span className="text-[8px] text-red-500 line-through mt-0.5 font-medium">
              ₹{Number(product.mrp).toFixed(2)}
            </span>
          )}
        </div>

        {/* QTY BOX (w-12) */}
        <div className="w-[66px] shrink-0 flex items-center justify-center px-0.5">
          {product.stockStatus === "OUT_OF_STOCK" ? (
            <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-1 rounded">OUT</span>
          ) : (
            <div className="flex items-center justify-between border border-primary/40 rounded-md overflow-hidden bg-white w-full h-[28px]">
              <button 
                onClick={handleDecrease}
                className="w-5 h-full flex items-center justify-center text-primary font-bold text-sm bg-red-50/50 hover:bg-red-50 active:bg-red-100"
              >
                -
              </button>
              <span className="flex-1 flex items-center justify-center text-[12px] font-bold text-gray-900 border-x border-primary/20 bg-white">
                {inCartQty || 0}
              </span>
              <button 
                onClick={handleIncrease}
                className="w-5 h-full flex items-center justify-center text-primary font-bold text-sm bg-red-50/50 hover:bg-red-50 active:bg-red-100"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* TOTAL (w-14) */}
        <div className="w-[56px] shrink-0 text-right pr-1">
          <span className="font-bold text-[11px] text-gray-600">
            {rowTotal > 0 ? rowTotal.toFixed(2) : "0.00"}
          </span>
        </div>
      </div>

      {/* Zoom Image Portal */}
      {isZoomed && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="relative w-full aspect-square bg-gray-50 p-4">
              <Image 
                src={imgUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 leading-tight">{product.name}</h3>
              <p className="text-primary font-bold mt-2">₹{Number(product.sellingPrice).toFixed(2)}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
