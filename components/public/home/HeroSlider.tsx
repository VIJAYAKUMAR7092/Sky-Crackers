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
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
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
            className={`object-cover transition-transform ease-linear ${
              index === currentIndex ? "scale-105 duration-[10000ms]" : "scale-100 duration-[0ms]"
            }`}
          />
        </div>
      ))}

      {/* Simple Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-90 animate-bounce">
        <span className="text-white text-[10px] tracking-widest uppercase font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Scroll</span>
      </div>
    </div>
  );
}
