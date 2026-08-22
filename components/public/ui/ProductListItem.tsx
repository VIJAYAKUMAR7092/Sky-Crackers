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
  const cartItems = useCartStore((state) => state.items);
  
  const cartItem = cartItems.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  
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
      <tr className="block md:table-row border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
        
        {/* S.No - Centered */}
        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm font-bold text-primary text-center">
          {index}
        </td>
        
        {/* Mobile top row & Desktop Name + Image */}
        <td className="block md:table-cell px-4 py-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 md:w-14 md:h-14 relative rounded-md overflow-hidden border border-gray-200 bg-white cursor-pointer shrink-0"
              onClick={() => setIsZoomed(true)}
            >
              <Image 
                src={imgUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 64px, 56px"
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1">
              <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors">
                <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">{product.name}</h4>
              </Link>
              {/* Action Icons as in screenshot */}
              <div className="flex items-center gap-2 mt-2">
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 border border-gray-200 rounded-md bg-white hover:bg-red-50 shadow-sm"
                  aria-label="Add to wishlist"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(`${window.location.origin}/product/${product.slug}`);
                      alert('Product link copied!');
                    }
                  }}
                  className="text-gray-400 hover:text-primary transition-colors p-1 border border-gray-200 rounded-md bg-white hover:bg-gray-50 shadow-sm"
                  aria-label="Share product"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                
                {Number(product.mrp) > Number(product.sellingPrice) && (
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="text-xs text-gray-400 line-through font-medium">
                      ₹{Number(product.mrp).toFixed(2)}
                    </span>
                    <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 font-bold px-1.5 py-0.5 rounded">
                      {Math.round(((Number(product.mrp) - Number(product.sellingPrice)) / Number(product.mrp)) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* Pack */}
        <td className="block md:table-cell px-4 py-2 md:py-4 text-center">
          <div className="flex justify-between md:flex-col items-center">
            <span className="md:hidden text-xs uppercase tracking-wider text-gray-400">Pack:</span>
            <div className="text-sm font-medium text-gray-900 leading-tight">
              {packInfo.split(' ').map((word: string, i: number) => (
                <React.Fragment key={i}>
                  {word}<br className="hidden md:block" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </td>

        {/* Price */}
        <td className="block md:table-cell px-4 py-2 md:py-4 text-center">
          <div className="flex justify-between md:flex-col items-center">
            <span className="md:hidden text-xs uppercase tracking-wider text-gray-400">Price:</span>
            <span className="text-sm font-bold text-gray-900">₹{sellingPrice.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
          </div>
        </td>

        {/* Quantity Selector */}
        <td className="block md:table-cell px-4 py-3 md:py-4 text-center">
          <div className="flex justify-between md:justify-center items-center">
            <span className="md:hidden text-xs font-bold text-gray-900">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-md h-8 w-[90px] overflow-hidden shadow-sm mx-auto">
              <button 
                onClick={handleDecrement}
                disabled={isOutOfStock}
                className="w-8 h-full flex items-center justify-center bg-gray-50 text-gray-500 hover:text-primary hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="flex-1 h-full flex items-center justify-center font-semibold text-xs text-gray-900 bg-white">
                {inCartQty}
              </div>
              <button 
                onClick={handleIncrement}
                disabled={isOutOfStock}
                className="w-8 h-full flex items-center justify-center bg-gray-50 text-gray-500 hover:text-primary hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </td>

        {/* Row Total */}
        <td className="block md:table-cell px-4 py-3 md:py-4 text-right bg-gray-50/50 md:bg-transparent rounded-lg md:rounded-none">
          <div className="flex justify-between md:justify-end items-center">
            <span className="md:hidden text-xs uppercase tracking-wider text-gray-500 font-bold">Total:</span>
            <span className={`text-sm font-bold ${inCartQty > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
              {inCartQty > 0 ? `₹${rowTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}` : '0.00'}
            </span>
          </div>
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

