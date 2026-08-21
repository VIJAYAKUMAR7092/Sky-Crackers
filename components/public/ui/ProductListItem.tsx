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
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

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
      <tr className="block md:table-row border-b border-white/5 md:hover:bg-white/5 transition-colors duration-200 group relative p-4 md:p-0">
        
        {/* S.No - Hidden on mobile, shown on desktop */}
        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm font-medium text-zinc-500">
          {index}
        </td>
        
        {/* Mobile top row: Image + Details */}
        <td className="block md:table-cell px-0 md:px-4 py-2 md:py-4">
          <div className="flex items-center gap-4 md:block">
            <div 
              className="w-16 h-16 md:w-12 md:h-12 relative rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-pointer shrink-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <Image 
                src={imgUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 64px, 48px"
                className="object-contain p-1"
              />
            </div>
            {/* On mobile, name goes next to image */}
            <div className="md:hidden flex-1">
              <Link href={`/product/${product.slug}`}>
                <h4 className="font-bold text-sm text-white line-clamp-2">{product.name}</h4>
              </Link>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] text-zinc-500 bg-black/50 px-1.5 py-0.5 rounded border border-white/5">
                  {product.category?.name || "Premium"}
                </span>
                {isOutOfStock && (
                  <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                    OUT OF STOCK
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* Desktop Name */}
        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
          <Link href={`/product/${product.slug}`} className="group-hover:text-primary transition-colors">
            <h4 className="font-bold text-sm text-white line-clamp-1">{product.name}</h4>
          </Link>
          <div className="flex gap-2 mt-1">
             <span className="text-[10px] text-zinc-500 bg-black/50 px-1.5 py-0.5 rounded border border-white/5">
                {product.category?.name || "Premium"}
             </span>
             {isOutOfStock && (
               <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                 OUT OF STOCK
               </span>
             )}
          </div>
        </td>

        {/* Pack - Mobile row 2 */}
        <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4 text-sm text-zinc-400">
          <div className="flex justify-between md:block">
            <span className="md:hidden text-xs uppercase tracking-wider text-zinc-500">Pack:</span>
            <span>{packInfo}</span>
          </div>
        </td>

        {/* Price */}
        <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
          <div className="flex justify-between md:flex-col items-center md:items-start">
            <span className="md:hidden text-xs uppercase tracking-wider text-zinc-500">Price:</span>
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0">
              {Number(product.mrp) > sellingPrice && (
                <span className="text-[10px] text-zinc-500 line-through">₹{Number(product.mrp).toFixed(2)}</span>
              )}
              <span className="text-sm font-bold text-white">₹{sellingPrice.toFixed(2)}</span>
            </div>
          </div>
        </td>

        {/* Quantity Selector */}
        <td className="block md:table-cell px-0 md:px-4 py-3 md:py-4 border-t border-white/5 md:border-t-0 mt-3 md:mt-0">
          <div className="flex justify-between md:block items-center">
            <span className="md:hidden text-xs font-bold text-white">Quantity</span>
            <div className="flex items-center bg-black/50 border border-white/10 rounded-lg h-10 md:h-9 w-[120px] md:w-[110px] overflow-hidden shadow-inner">
              <button 
                onClick={handleDecrement}
                disabled={isOutOfStock}
                className="w-10 md:w-8 h-full flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-white/5 disabled:opacity-50 transition-colors"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <div className="flex-1 h-full flex items-center justify-center font-bold text-sm text-white border-x border-white/5 bg-black/30">
                {inCartQty}
              </div>
              <button 
                onClick={handleIncrement}
                disabled={isOutOfStock}
                className="w-10 md:w-8 h-full flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-white/5 disabled:opacity-50 transition-colors"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </td>

        {/* Row Total */}
        <td className="block md:table-cell px-0 md:px-4 py-2 md:py-4 text-right bg-white/[0.02] md:bg-transparent rounded-lg md:rounded-none mt-2 md:mt-0 p-2 md:p-0">
          <div className="flex justify-between md:justify-end items-center">
            <span className="md:hidden text-xs uppercase tracking-wider text-zinc-400 font-bold">Total:</span>
            <span className={`text-base md:text-sm font-black ${inCartQty > 0 ? 'text-primary' : 'text-zinc-600'}`}>
              ₹{rowTotal.toFixed(2)}
            </span>
          </div>
        </td>
      </tr>

      {/* Hover Image Portal (Desktop only) */}
      {mounted && isHovered && createPortal(
        <div 
          className="fixed z-[100] pointer-events-none w-72 h-72 hidden md:flex bg-[#0a0a0a]/95 backdrop-blur-xl border border-primary/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden items-center justify-center animate-in fade-in zoom-in duration-200"
          style={{ 
            left: mousePos.x + 20, 
            top: mousePos.y - 144 // Center vertically relative to mouse (288/2)
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0" />
          <Image 
            src={imgUrl}
            alt={product.name}
            fill
            className="object-contain p-4 drop-shadow-2xl z-10"
          />
        </div>,
        document.body
      )}
    </>
  );
}
