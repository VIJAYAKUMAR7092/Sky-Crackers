"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSlider({ banners }: { banners: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title || "Hero"}
              fill
              priority={index === 0}
              quality={100}
              className={`object-cover transition-transform ease-linear ${
                index === currentIndex ? "scale-105 duration-[10000ms]" : "scale-100 duration-[0ms]"
              }`}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="container relative z-20 mx-auto px-4 text-center mt-6 pb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-primary text-xs md:text-sm font-extrabold uppercase mb-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-4 w-4 text-secondary-foreground" />
          100% Sivakasi Fireworks
        </div>
        
        <div className="animate-in zoom-in-95 fade-in duration-700">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-xl leading-tight">
            {banners[currentIndex]?.title ? (
               <span dangerouslySetInnerHTML={{ __html: banners[currentIndex].title.replace(/\n/g, "<br/>") }} />
            ) : (
              <>Celebrate Every Festival<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse">With Sky Crackers</span></>
            )}
          </h1>
          
          <p className="text-lg md:text-2xl text-white/95 font-medium mb-10 max-w-2xl mx-auto drop-shadow-md">
            {banners[currentIndex]?.subtitle || "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={banners[currentIndex]?.buttonLink || "/shop"} className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-green-700 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 flex items-center justify-center">
              {banners[currentIndex]?.buttonText || "Shop Now - 80% Off"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
