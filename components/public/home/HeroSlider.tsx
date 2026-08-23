"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroSlider({ banners }: { banners: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000); // Slower, premium transition timing
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#0f0f15]">
      {/* Container - Increased height to prevent vertical cropping on desktop */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[450px] lg:h-[600px] xl:h-[650px] overflow-hidden">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {/* Desktop image uses object-contain to avoid any cropping, Mobile uses object-cover */}
              <div className={`relative w-full h-full transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}>
                <Image
                  src={banner.image}
                  alt={banner.title || "Sky Crackers Festival Banner"}
                  fill
                  priority={index === 0}
                  quality={100}
                  className="object-cover md:object-contain w-full h-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* SHOP NOW Animated Button */}
      <Link 
        href="/shop" 
        className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 group flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-2.5 bg-[linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] bg-[length:400%] hover:bg-right hover:scale-105 text-white rounded-full font-black text-[9px] sm:text-xs tracking-widest uppercase transition-all duration-500 shadow-[0_0_20px_rgba(255,215,0,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] border-2 border-white/50 active:scale-95 animate-[bgSpin_4s_linear_infinite]"
      >
        <Zap className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce text-yellow-200 fill-yellow-200" />
        <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Shop Now</span>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
      </Link>
      
      {/* Keyframes for button background spin */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bgSpin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  );
}
