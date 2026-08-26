const fs = require('fs');

// --- 1. Fix HeroSlider.tsx ---
let heroFile = 'components/public/home/HeroSlider.tsx';
let heroContent = `
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
                key={\`mobile-\${banner.id || index}\`}
                className={\`col-start-1 row-start-1 w-full transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] \${
                  isActive ? "opacity-100 z-10 blur-0" : "opacity-0 z-0 blur-[8px]"
                }\`}
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

      {/* DESKTOP HERO - Restored to pure, clean, full height */}
      <div className="hidden md:flex w-full min-h-[60vh] lg:min-h-[70vh] bg-[#0a0a0a] relative overflow-hidden items-center justify-center">
        {/* Left Side Fireworks */}
        <PremiumFireworks position="left" />

        {/* Center Banner */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex items-center justify-center">
            <div className="grid w-full h-full">
              {banners.map((banner, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={\`desktop-\${banner.id || index}\`}
                    className={\`col-start-1 row-start-1 w-full h-full flex items-center justify-center transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] \${
                      isActive ? "opacity-100 z-10 transform scale-100 blur-0" : "opacity-0 z-0 transform scale-105 blur-[12px]"
                    }\`}
                  >
                    <Link href="/shop" className="relative cursor-pointer inline-flex items-center justify-center mx-auto w-fit h-fit z-20">
                      <Image
                        src={banner.image}
                        alt={banner.title || "Sky Crackers Festival Banner"}
                        width={1920}
                        height={800}
                        sizes="100vw"
                        priority={index === 0}
                        quality={100}
                        className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
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
`;
fs.writeFileSync(heroFile, heroContent.trim(), 'utf8');

// --- 2. Fix page.tsx ---
let pageFile = 'app/(store)/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// The current button has bg-[#0a0a0a] which makes it blend with hero.
// We change it to bg-white so it stands out like the screenshot.
// And we remove the "section" feeling by reducing padding.

const oldSectionRegex = /\{\/\*\ 1\.5\ NEW\ PREMIUM\ DESKTOP\ SHOP\ BUTTON\ \*\/\}\s*<section className=\"w-full py-8 bg-\[\#0a0a0a\] hidden md:flex justify-center items-center z-20 relative\">[\s\S]*?<\/svg>\s*<\/span>\s*<\/Link>\s*<\/section>/;

const newButtonCode = \`
      {/* 1.5 DESKTOP SHOP BUTTON (Floating on White Background) */}
      <div className="w-full pt-8 pb-4 bg-white hidden md:flex justify-center items-center z-20 relative">
        <style dangerouslySetInnerHTML={{__html: \\\`
          @keyframes glowPulse {
            0% { box-shadow: 0 0 15px rgba(220, 235, 150, 0.5); }
            50% { box-shadow: 0 0 30px rgba(180, 215, 100, 0.8); }
            100% { box-shadow: 0 0 15px rgba(220, 235, 150, 0.5); }
          }
          .btn-screenshot-match {
            background: linear-gradient(90deg, #d4e157, #e6ee9c, #d4e157);
            background-size: 200% auto;
            color: #1a4d2e;
            animation: glowPulse 2s infinite;
          }
          .btn-screenshot-match:hover {
            background-position: right center;
            transform: scale(1.02);
          }
        \\\`}} />
        <Link 
          href="/shop" 
          className="btn-screenshot-match group relative inline-flex items-center justify-center px-10 py-3 rounded-full font-bold text-[17px] tracking-widest uppercase transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            SHOP NOW
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>
\`;

pageContent = pageContent.replace(oldSectionRegex, newButtonCode.trim());
fs.writeFileSync(pageFile, pageContent, 'utf8');

console.log("Fixes applied successfully.");
