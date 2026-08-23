"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlider({ banners }: { banners: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 10000); // 10 seconds per image per user requirement
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    // Premium hero banner responsive image handling
    // Displays full image via object-contain while preventing empty side gaps with blurred background
    <div className="relative w-full bg-[#050505] overflow-hidden group">
      
      {/* Subtle shimmer effect on the whole banner area */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[shimmerSlide_5s_ease-in-out_infinite]" />

      {/* DESKTOP ONLY: Premium Edge Fireworks Animations (Left & Right Empty Spaces) */}
      <div className="hidden md:block absolute inset-0 z-20 pointer-events-none overflow-hidden">
        
        {/* LEFT EDGE */}
        <div className="absolute top-0 bottom-0 left-0 w-32 lg:w-48 xl:w-64">
          {/* Chakra (Ground Spinner) */}
          <div className="absolute bottom-8 left-8 w-10 h-10 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(253,224,71,0.8),transparent)] animate-[spin_1s_linear_infinite] blur-[1px] mix-blend-screen opacity-60" />
          <div className="absolute bottom-9 left-9 w-6 h-6 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(251,146,60,0.9),transparent)] animate-[spin_0.5s_linear_infinite_reverse] blur-[1px] mix-blend-screen opacity-80" />

          {/* Flower Pot (Fountain) */}
          <div className="absolute bottom-4 left-24 w-1 h-1">
            <div className="w-4 h-6 bg-gradient-to-t from-orange-800 to-amber-600 absolute bottom-0 -left-2 rounded-t-sm opacity-50 blur-[1px]" />
            {[...Array(6)].map((_, i) => (
              <div 
                key={`fl-${i}`} 
                className="absolute bottom-4 w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[1px] animate-[fountainSpark_2s_ease-out_infinite]" 
                style={{ 
                  animationDelay: `${i * 0.3}s`, 
                  left: `${(i % 3 - 1) * 8}px` 
                }} 
              />
            ))}
          </div>

          {/* Sky Rocket */}
          <div className="absolute bottom-0 left-12 w-0.5 h-8 bg-gradient-to-t from-transparent via-amber-200 to-white animate-[rocketShoot_4s_ease-in_infinite] opacity-0" />
          
          {/* Edge Golden Glitter Particles */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`gl-${i}`}
              className="absolute rounded-full bg-yellow-300 blur-[2px] opacity-30 mix-blend-screen animate-[floatSpark_5s_ease-in-out_infinite]"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 70 + 10}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* RIGHT EDGE */}
        <div className="absolute top-0 bottom-0 right-0 w-32 lg:w-48 xl:w-64">
          {/* Chakra (Ground Spinner) */}
          <div className="absolute bottom-12 right-10 w-14 h-14 rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(253,224,71,0.6),transparent)] animate-[spin_1.5s_linear_infinite] blur-[2px] mix-blend-screen opacity-50" />

          {/* Flower Pot (Fountain) */}
          <div className="absolute bottom-4 right-20 w-1 h-1">
            <div className="w-4 h-6 bg-gradient-to-t from-orange-800 to-amber-600 absolute bottom-0 -left-2 rounded-t-sm opacity-50 blur-[1px]" />
            {[...Array(7)].map((_, i) => (
              <div 
                key={`fr-${i}`} 
                className="absolute bottom-4 w-1.5 h-1.5 bg-amber-300 rounded-full blur-[1px] animate-[fountainSpark_2.5s_ease-out_infinite]" 
                style={{ 
                  animationDelay: `${i * 0.25}s`, 
                  left: `${(i % 3 - 1) * 10}px` 
                }} 
              />
            ))}
          </div>

          {/* Sky Rocket */}
          <div className="absolute bottom-0 right-16 w-0.5 h-12 bg-gradient-to-t from-transparent via-yellow-200 to-white animate-[rocketShoot_3s_ease-in_infinite] opacity-0" style={{ animationDelay: '1.5s' }} />

          {/* Edge Golden Glitter Particles */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`gr-${i}`}
              className="absolute rounded-full bg-amber-400 blur-[2px] opacity-30 mix-blend-screen animate-[floatSpark_6s_ease-in-out_infinite]"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 80 + 10}%`,
                right: `${Math.random() * 70 + 10}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Responsive Aspect Ratio Container */}
      {/* Ensures height looks good on mobile and desktop without forcing crop */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[3/1] overflow-hidden">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative w-full h-full">
                
                {/* 1. Blurred Background Layer */}
                {/* Solves black bars & side gaps completely while maintaining seamless colors */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={banner.image}
                    alt="Background Blur"
                    fill
                    priority={index === 0}
                    quality={10}
                    className="object-cover opacity-60 blur-[30px] scale-110 saturate-150"
                  />
                  {/* Subtle dark overlay to make main image pop */}
                  <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                </div>

                {/* 2. Main High-Quality Banner Image */}
                {/* 100% Visible - No Cropping - No Scale Animations - Original Aspect Ratio */}
                <Image
                  src={banner.image}
                  alt={banner.title || "Sky Crackers Festival Banner"}
                  fill
                  priority={index === 0}
                  quality={100}
                  className="object-contain z-10 relative drop-shadow-2xl"
                />

              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatSpark {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1); opacity: 0; }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%) skewX(-15deg); }
          50%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes fountainSpark {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }
        @keyframes rocketShoot {
          0% { transform: translateY(100px); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-500px); opacity: 0; }
          100% { transform: translateY(-500px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
