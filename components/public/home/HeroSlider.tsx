"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_IMAGES } from "@/lib/constants/hero-images";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            quality={100}
            className={`object-cover mix-blend-screen transition-transform ease-linear ${
              index === currentIndex ? "scale-110 duration-[10000ms]" : "scale-100 duration-[0ms]"
            }`}
          />
        </div>
      ))}

      {/* Dark gradient overlay + Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505] z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/30 to-[#050505]/90 z-20 pointer-events-none" />
      
      {/* Gold Glow Ambient */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen z-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[150px] mix-blend-screen z-20 pointer-events-none" />
      
      {/* Elegant floating golden particles (CSS only) */}
      <div className="absolute inset-0 z-20 opacity-50 mix-blend-screen pointer-events-none" 
           style={{
             backgroundImage: "radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.4) 1px, transparent 2px), radial-gradient(circle at 80% 40%, rgba(212, 175, 55, 0.4) 1px, transparent 2px), radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.4) 1px, transparent 2px), radial-gradient(circle at 70% 90%, rgba(212, 175, 55, 0.4) 1px, transparent 2px)",
             backgroundSize: "120px 120px",
             animation: "pulse 6s ease-in-out infinite"
           }}
      />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 opacity-80 animate-bounce">
        <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </div>
  );
}
