const fs = require('fs');

// ----------------------------------------------------
// 1. UPDATE HeroSlider.tsx
// ----------------------------------------------------
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

      {/* DESKTOP HERO - Exact Reference Layout (100% Height, No Gaps, No Gaps Top/Bottom) */}
      <div className="hidden md:flex w-full min-h-[60vh] lg:min-h-[70vh] bg-[#0a0a0a] relative overflow-hidden items-stretch justify-center">
        {/* Left Side Fireworks */}
        <PremiumFireworks position="left" />

        {/* Center Banner - 100% Height, No Cropping */}
        <div className="relative z-10 w-[100%] max-w-6xl mx-auto flex items-stretch justify-center">
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
                    <Link href="/shop" className="block w-full h-full cursor-pointer flex items-center justify-center">
                      <Image
                        src={banner.image}
                        alt={banner.title || "Sky Crackers Festival Banner"}
                        width={1920}
                        height={800}
                        sizes="100vw"
                        priority={index === 0}
                        quality={100}
                        className="w-full h-full object-contain"
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

// ----------------------------------------------------
// 2. UPDATE page.tsx (Inject golden button & remove old CTA on desktop)
// ----------------------------------------------------
let pageFile = 'app/(store)/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// The exact string in page.tsx for the old CTA is:
// <section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center md:hidden">
// I will replace it with the exact requested layout:
// 1. Desktop Golden Button (Tightly packed `py-4`)
// 2. Mobile Old CTA (Remains `md:hidden`)

const oldSectionPattern = /\{\/\*\ 2\.\ EXACT SHOP NOW CTA \*\/\}\s*<section className=\"w-full py-4 sm:py-8 md:py-10 relative z-10 bg-\[#FCF8E8\] flex justify-center md:hidden\">[\s\S]*?<\/section>/;

const newSection = `
      {/* NEW PREMIUM DESKTOP SHOP BUTTON (Tightly Spaced) */}
      <section className="w-full py-4 bg-[#050505] hidden md:flex justify-center items-center z-20 relative border-b border-white/10">
        <style dangerouslySetInnerHTML={{__html: \`
          @keyframes goldShine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes floatPremium {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .btn-premium-gold {
            background: linear-gradient(90deg, #B8860B, #FFD700, #FDF5E6, #FFD700, #B8860B);
            background-size: 200% auto;
            animation: goldShine 3s linear infinite, floatPremium 4s ease-in-out infinite;
            position: relative;
            overflow: hidden;
          }
          .btn-premium-gold::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%);
            opacity: 0;
            transform: scale(0.5);
            transition: opacity 0.3s, transform 0.5s;
            pointer-events: none;
          }
          .btn-premium-gold:hover::before {
            opacity: 0.4;
            transform: scale(1);
          }
        \`}} />
        <Link 
          href="/shop" 
          className="btn-premium-gold group relative inline-flex items-center justify-center px-12 py-3.5 rounded-full text-black font-extrabold text-lg tracking-widest uppercase shadow-[0_0_20px_rgba(218,165,32,0.4)] hover:shadow-[0_0_35px_rgba(255,215,0,0.7)] transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            SHOP NOW
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </section>

      {/* 2. EXACT SHOP NOW CTA (MOBILE ONLY) */}
      <section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center md:hidden">
        <div className="relative w-[95%] sm:w-[85%] md:w-[75%] max-w-[1000px] aspect-[1024/409]">
          <Image 
            src="/images/shop-banner.jpg" 
            alt="Shop Fireworks Collection" 
            fill 
            className="object-contain"
            priority
          />
          <Link 
            href="/shop"
            className="absolute z-20 group cursor-pointer"
            style={{ left: '29.5%', top: '32.5%', width: '41%', height: '35%', borderRadius: '100px' }}
          >
            <span className="absolute inset-0 rounded-[100px] shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-[luxuryPulse_3s_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>
      </section>
`.trim();

pageContent = pageContent.replace(oldSectionPattern, newSection);
fs.writeFileSync(pageFile, pageContent, 'utf8');

console.log("Success");
