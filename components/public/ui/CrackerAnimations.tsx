"use client";

import React from "react";
import { Sparkles, Star } from "lucide-react";

export function FlowerPotFountain({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute ${side === 'left' ? 'left-[5%] sm:left-[15%] md:left-[25%]' : 'right-[5%] sm:right-[15%] md:right-[25%]'} bottom-0 flex flex-col items-center justify-end h-full pointer-events-none opacity-80`}>
      {/* Sparks flying up */}
      <div className="relative w-16 h-24">
        <Sparkles className="absolute text-[#fce074] w-5 h-5 bottom-8 left-2 animate-[fountainSparks_1.2s_ease-out_infinite]" />
        <Star className="absolute text-white w-3 h-3 bottom-8 left-6 animate-[fountainSparks_1.5s_ease-out_infinite_0.2s]" fill="currentColor" />
        <Sparkles className="absolute text-[#dca42b] w-6 h-6 bottom-8 left-8 animate-[fountainSparks_1.1s_ease-out_infinite_0.4s]" />
        <Star className="absolute text-[#fce074] w-4 h-4 bottom-8 left-4 animate-[fountainSparks_1.4s_ease-out_infinite_0.1s]" fill="currentColor" />
        
        {/* Flower Pot Base */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[#c2410c] mx-auto drop-shadow-md relative">
            <div className="absolute top-[8px] -left-[6px] w-[12px] h-[2px] bg-yellow-400 rotate-12"></div>
            <div className="absolute top-[16px] -left-[10px] w-[20px] h-[2px] bg-yellow-400 -rotate-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BurstingFirework({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute ${side === 'left' ? 'left-[5%] sm:left-[15%] md:left-[25%]' : 'right-[5%] sm:right-[15%] md:right-[25%]'} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-90`}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Firework particles */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${deg}deg)` }}>
            <div className="w-2 h-2 rounded-full animate-[fireworkBurst_1.5s_ease-out_infinite]" 
                 style={{ 
                   backgroundColor: ['#ef4444', '#facc15', '#f97316', '#ec4899', '#a855f7', '#60a5fa', '#4ade80', '#fce074'][i],
                   animationDelay: `${i * 0.1}s` 
                 }}>
            </div>
          </div>
        ))}
        
        {/* Center Sparkle */}
        <Sparkles className="absolute text-white w-8 h-8 animate-ping" />
      </div>
    </div>
  );
}

export function Sparkler({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute ${side === 'left' ? 'left-[10%] sm:left-[20%] md:left-[30%]' : 'right-[10%] sm:right-[20%] md:right-[30%]'} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-80`}>
      <div className="relative w-16 h-16 origin-bottom animate-[waveSparkler_2s_ease-in-out_infinite]">
        {/* Stick */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gray-400 rounded-full"></div>
        {/* Sparks */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <Star className="absolute text-[#fce074] w-6 h-6 -translate-x-1/2 -translate-y-1/2 animate-[spin_1s_linear_infinite]" fill="currentColor" />
          <Sparkles className="absolute text-white w-8 h-8 -translate-x-1/2 -translate-y-1/2 animate-ping" />
          {[0, 120, 240].map((deg, i) => (
            <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${deg}deg)` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-[sparklerSparks_0.8s_ease-out_infinite]"
                   style={{
                     backgroundColor: ['#fde047', '#f87171', '#fdba74'][i],
                     animationDelay: `${i * 0.2}s`
                   }}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
