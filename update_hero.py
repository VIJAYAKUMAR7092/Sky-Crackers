import os
import re

# 1. Update page.tsx
page_path = 'app/(store)/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Replace the big fallback array with a simple one if empty
old_fallback_pattern = r'const displayBanners = heroBanners && heroBanners\.length > 0 \? heroBanners : \[\s*\{.*?\}\s*\];'
new_fallback = '''const displayBanners = heroBanners && heroBanners.length > 0 ? heroBanners : [
    {
      id: "fallback-1",
      image: "/images/home/slider-1.jpg"
    }
  ];'''

page_content = re.sub(r'const displayBanners = heroBanners && heroBanners\.length > 0 \? heroBanners : \[.*?\}\s*\];', new_fallback, page_content, flags=re.DOTALL)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)

# 2. Update HeroSlider.tsx
hero_slider_path = 'components/public/home/HeroSlider.tsx'
new_hero_slider = '''"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <div className="relative w-full overflow-hidden bg-[#050505] group">
      {/* 1. Invisible Native Image for 100% Perfect Natural Aspect Ratio */}
      {/* This ensures mobile/desktop height exactly matches the image ratio without ANY cropping */}
      <img
        src={banners[0].image}
        alt="Spacer"
        className="w-full h-auto opacity-0 pointer-events-none block"
      />

      {/* 2. Absolute Container for Slides */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive 
                  ? "opacity-100 z-10 blur-0" 
                  : "opacity-0 z-0 blur-md scale-105"
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.title || "Sky Crackers Festival Banner"}
                fill
                priority={index === 0}
                quality={100}
                className={`object-fill md:object-cover transition-transform ease-out ${
                  isActive ? "scale-105 duration-[10000ms]" : "scale-100 duration-[1000ms]"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* 3. Premium Glassmorphism CTA Button */}
      <Link 
        href="/shop" 
        className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 group/btn flex items-center gap-2 sm:gap-3 px-6 py-2.5 sm:px-8 sm:py-3.5 bg-black/40 hover:bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 rounded-full transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-1 active:scale-95 overflow-hidden"
      >
        <span className="relative z-10 text-white font-extrabold text-[11px] sm:text-sm tracking-[0.2em] uppercase flex items-center gap-2 drop-shadow-md">
          Shop Now
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-500 text-[#D4AF37]" />
        </span>
        
        {/* Glow Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
      </Link>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
'''

with open(hero_slider_path, 'w', encoding='utf-8') as f:
    f.write(new_hero_slider)

print("Updated both files.")
