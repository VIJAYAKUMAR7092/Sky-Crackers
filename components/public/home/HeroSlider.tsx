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
    }, 3000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  // Dynamic animations for each slide WITHOUT scaling (to prevent edge cropping)
  const getAnimationClasses = (index: number, isActive: boolean) => {
    const type = index % 4;
    
    // Base active state (no scale)
    if (isActive) {
      return "opacity-100 z-10 translate-x-0 translate-y-0 blur-0 rotate-0";
    }
    
    // Out/Inactive states (subtle slides to avoid cropping)
    if (type === 0) return "opacity-0 z-0 -translate-x-12"; // Slide left
    if (type === 1) return "opacity-0 z-0 translate-x-12"; // Slide right
    if (type === 2) return "opacity-0 z-0 translate-y-12"; // Slide down
    if (type === 3) return "opacity-0 z-0 -translate-y-12"; // Slide up
    
    return "opacity-0 z-0";
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Container - Increased height slightly to prevent vertical cropping on desktop */}
      {/* Mobile remains 220px/300px as requested */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] overflow-hidden">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getAnimationClasses(index, isActive)}`}
            >
              {/* object-cover ensures the image fills the width completely without black bars */}
              <Image
                src={banner.image}
                alt={banner.title || "Sky Crackers Festival Banner"}
                fill
                priority={index === 0}
                quality={100}
                className="object-cover w-full h-full"
              />
            </div>
          );
        })}
      </div>

      {/* SHOP NOW Animated Button - Kept very small */}
      <Link 
        href="/shop" 
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 group flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-2.5 bg-[linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] bg-[length:400%] hover:bg-right hover:scale-105 text-white rounded-full font-black text-[9px] sm:text-xs tracking-widest uppercase transition-all duration-500 shadow-[0_0_20px_rgba(255,215,0,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] border-2 border-white/50 active:scale-95 animate-[bgSpin_4s_linear_infinite]"
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
