'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PremiumFireworks from "./PremiumFireworks";

export default function HeroSlider({ banners }: { banners: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full relative">
      {/* MOBILE HERO */}
      <div className="w-full overflow-hidden bg-white md:hidden">
        <div className="grid">
          {banners.map((banner, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={`mobile-${banner.id || index}`}
                className={`col-start-1 row-start-1 w-full transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                  isActive ? "opacity-100 z-10 blur-0" : "opacity-0 z-0 blur-[8px]"
                }`}
              >
                <Link href="/shop" className="block w-full cursor-pointer">
                  <Image
                    src={banner.image}
                    alt={banner.title || "Sky Crackers Festival Banner"}
                    width={1920}
                    height={800}
                    sizes="100vw"
                    priority={index === 0}
                    quality={100}
                    className="w-full h-auto object-contain drop-shadow-xl"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP HERO - Dynamic height, larger size, completely uncropped */}
      <div className="hidden md:flex w-full bg-[#0a0a0a] relative overflow-hidden items-center justify-center">
        {/* Left Side Fireworks */}
        <PremiumFireworks position="left" />

        {/* Center Banner Container - Increased width to 98%, Max 1800px for larger height */}
        <div className="relative z-10 w-[98%] max-w-[1800px] mx-auto flex items-center justify-center">
            {/* Using relative for active banner ensures the container dynamically resizes, preventing black gaps */}
            <div className="relative w-full h-fit">
              {banners.map((banner, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={`desktop-${banner.id || index}`}
                    className={`w-full h-fit flex items-center justify-center transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                      isActive ? "relative opacity-100 z-10 transform scale-100 blur-0" : "absolute top-0 left-0 opacity-0 z-0 transform scale-105 blur-[12px]"
                    }`}
                  >
                    <Link href="/shop" className="relative cursor-pointer inline-block mx-auto w-full z-20">
                      {/* Increased max height to 92vh, using w-full h-auto to maintain aspect ratio perfectly without gaps */}
                      <Image
                        src={banner.image}
                        alt={banner.title || "Sky Crackers Festival Banner"}
                        width={1920}
                        height={800}
                        sizes="100vw"
                        priority={index === 0}
                        quality={100}
                        className="w-full h-auto max-h-[92vh] object-contain block mx-auto"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
        </div>

        {/* Right Side Fireworks */}
        <PremiumFireworks position="right" />
      </div>
    </div>
  );
}