"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/components/ui/utils";

interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const activeImage = images[activeIndex]?.url || "/placeholder.png";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  if (!images.length) {
    return (
      <div className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
        <Image 
          src="/placeholder.png" 
          alt={productName}
          fill
          className="object-cover opacity-50"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-crosshair group shadow-2xl"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image 
          src={activeImage} 
          alt={`${productName} image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-contain p-8 transition-opacity duration-300",
            isZoomed ? "opacity-0" : "opacity-100"
          )}
        />
        
        {/* Zoom Overlay */}
        {isZoomed && (
          <div 
            className="absolute inset-0 bg-no-repeat z-10"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundSize: '200%' // Zoom level
            }}
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                activeIndex === idx 
                  ? "border-primary shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105" 
                  : "border-transparent opacity-60 hover:opacity-100 hover:bg-white/5"
              )}
            >
              <Image 
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
