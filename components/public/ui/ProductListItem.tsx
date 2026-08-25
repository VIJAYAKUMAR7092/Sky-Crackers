"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import { createPortal } from "react-dom";

interface ProductListItemProps {
  product: any;
  index: number;
}

export default function ProductListItem({ product, index }: ProductListItemProps) {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const inCartQty = useCartStore((state) => {
    const item = state.items.find(i => i.product.id === product.id);
    return item ? item.quantity : 0;
  });
  
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
    if (inCartQty > 0) {
      updateQuantity(product.id, inCartQty - 1);
    }
  };

  const sellingPrice = Number(product.sellingPrice);
  const rowTotal = sellingPrice * inCartQty;
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const packInfo = product.packInfo || "1 Box";
  const imgUrl = product.images?.[0]?.url || "/placeholder.png";

  return (
    <>
      <tr className="table-row border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
        
        {/* 1. Name & Image */}
        <td className="px-1 sm:px-2 py-2 sm:py-3 align-middle w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 relative rounded border border-gray-200 bg-white shrink-0 cursor-pointer"
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
            <div className="flex flex-col">
              <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors">
                <h4 className="font-bold text-[10.5px] sm:text-xs text-gray-900 leading-tight line-clamp-2">{product.name}</h4>
              </Link>
              <span className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{packInfo}</span>
            </div>
          </div>
        </td>

        {/* 2. Price */}
        <td className="px-1 sm:px-2 py-2 sm:py-3 text-center align-middle w-16 sm:w-24">
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-[11px] sm:text-sm text-gray-900 leading-none">₹{Number(product.sellingPrice).toFixed(0)}</span>
            {Number(product.mrp) > Number(product.sellingPrice) && (
              <span className="text-[8.5px] sm:text-[10px] text-gray-400 line-through mt-0.5">₹{Number(product.mrp).toFixed(0)}</span>
            )}
          </div>
        </td>

        {/* 3. Qty */}
        <td className="px-1 sm:px-2 py-2 sm:py-3 text-center align-middle w-16 sm:w-28">
          {isOutOfStock ? (
            <span className="text-[9px] sm:text-xs font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded">OUT</span>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-sm w-[58px] sm:w-[76px]">
                <button 
                  onClick={handleDecrement} 
                  className="w-1/3 py-1 sm:py-1.5 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors disabled:opacity-50" 
                  disabled={inCartQty === 0}
                >
                  <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </button>
                <div className="w-1/3 flex items-center justify-center border-x border-gray-200 bg-gray-50">
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900">{inCartQty}</span>
                </div>
                <button 
                  onClick={handleIncrement} 
                  className="w-1/3 py-1 sm:py-1.5 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </button>
              </div>
            </div>
          )}
        </td>

        {/* 4. Total */}
        <td className="px-1 sm:px-2 py-2 sm:py-3 text-right align-middle w-14 sm:w-24">
          <span className={`font-bold text-[11px] sm:text-sm ${inCartQty > 0 ? 'text-primary' : 'text-gray-400'}`}>
            {rowTotal > 0 ? `₹${rowTotal.toFixed(0)}` : '-'}
          </span>
        </td>
      </tr>

      {/* Zoom Image Portal */}
      {mounted && isZoomed && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-[90vw] h-[90vh] md:w-[60vw] md:h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="flex-1 relative">
              <Image 
                src={imgUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="text-center p-4 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
