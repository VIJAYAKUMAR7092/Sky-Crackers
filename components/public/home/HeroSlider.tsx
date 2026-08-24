"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider({ banners }: { banners: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 10000); // 10 seconds per image
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    // Clean, premium hero banner container.
    // Uses CSS Grid to stack images on top of each other.
    // The container height is dictated perfectly by the image's natural aspect ratio.
    // 0% Cropping, 100% Width visibility.
    <div className="w-full overflow-hidden bg-white">
      <div className="grid">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`col-start-1 row-start-1 w-full transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                isActive ? "opacity-100 z-10 blur-0" : "opacity-0 z-0 blur-[8px]"
              }`}
            >
              {/* 
                By using width/height and w-full h-auto, the image 
                scales perfectly to the screen width without ANY cropping 
                or white borders!
              */}
              <Link href="/shop" className="block w-full cursor-pointer">
                <Image
                  src={banner.image}
                  alt={banner.title || "Sky Crackers Festival Banner"}
                  width={1920}
                  height={800} // Approximate natural height, h-auto will correct it
                  sizes="100vw"
                  priority={index === 0}
                  quality={100}
                  className="w-full h-auto object-contain drop-shadow-xl md:drop-shadow-none"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
