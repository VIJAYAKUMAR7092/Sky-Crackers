"use client";

import React from "react";
import Image from "next/image";
import ZoomableImage from "@/components/public/ui/ZoomableImage";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";



export default function ComboPacks({ combos, validUpto = "13TH AUGUST" }: { combos: any[], validUpto?: string }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (pack: any) => {
    addItem({
      id: pack.id,
      name: pack.name,
      slug: pack.name.toLowerCase().replace(/ /g, '-'),
      price: Number(pack.sellingPrice),
      mrp: Number(pack.mrp),
      imageUrl: pack.images?.find((img: any) => img.isPrimary)?.url || pack.images?.[0]?.url || "/placeholder.png",
      stockStatus: "IN_STOCK",
      categoryId: "combos"
    } as any, 1);
    alert(pack.name + " added to cart!");
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Decorative elements for intense animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2000ms' }}></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4000ms' }}></div>
      </div>

      <div className="container mx-auto px-2 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
            Sky Crackers <br className="md:hidden" /><span className="text-primary">Special Combo Pack</span>
          </h2>
          <p className="inline-block bg-primary text-white font-bold px-6 py-2 rounded-full uppercase tracking-wider text-sm md:text-base animate-pulse shadow-lg shadow-orange-500/30">
            Valid up to {validUpto}
          </p>
        </div>

        {/* Responsive Grid: 2 cols on mobile, up to 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {combos.map((pack) => (
            <div 
              key={pack.id} 
              className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-orange-100 flex flex-col group transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:border-orange-400 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              
              {/* Pack Image containing full details */}
              <div className="relative w-full aspect-[1/1.3] bg-gray-50 border-b border-orange-50 overflow-hidden">
                <ZoomableImage 
                  src={pack.images?.find((img: any) => img.isPrimary)?.url || pack.images?.[0]?.url || "/placeholder.png"} 
                  alt={pack.name} 
                  fill 
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Pricing & CTA Section */}
              <div className="p-2 md:p-4 flex flex-col items-center bg-white z-20 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] relative transform transition-transform duration-500 group-hover:-translate-y-1">
                
                {/* Combo Name */}
                <h3 className="font-extrabold text-[11px] md:text-sm text-center text-gray-800 mb-1 md:mb-2 leading-tight min-h-[30px] md:min-h-[40px] flex items-center justify-center group-hover:text-primary transition-colors">
                  {pack.name}
                </h3>

                <div className="flex items-center gap-1 md:gap-2 mb-1">
                  <span className="text-gray-400 line-through text-[10px] md:text-xs font-semibold">
                    ₹{pack.mrp}
                  </span>
                  <span className="bg-red-500 text-white text-[8px] md:text-[10px] font-black px-1 py-0.5 rounded uppercase animate-bounce">
                    90% OFF
                  </span>
                </div>
                <div className="text-lg md:text-2xl font-black text-primary mb-2 md:mb-3 drop-shadow-sm group-hover:scale-110 transition-transform">
                  ₹{Number(pack.sellingPrice).toLocaleString()}
                </div>
                
                <button
                  onClick={() => handleAddToCart(pack)}
                  className="w-full flex items-center justify-center gap-1 md:gap-2 bg-gray-900 group-hover:bg-primary text-white py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs transition-colors shadow-lg"
                >
                  <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-ping" /> 
                  <span className="hidden sm:inline">Add to </span>Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
