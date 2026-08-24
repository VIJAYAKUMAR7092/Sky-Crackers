"use client";
import React from "react";

export const RocketSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="animate-[rocketFloat_3s_ease-in-out_infinite]">
      {/* Stick */}
      <rect x="48" y="110" width="4" height="80" fill="#8B4513" rx="2" />
      {/* Rocket Body */}
      <path d="M35 50 L65 50 L65 110 L35 110 Z" fill="url(#rocketBody)" />
      {/* Rocket Stripes */}
      <path d="M35 60 L65 75 L65 90 L35 75 Z" fill="#FFD700" opacity="0.8" />
      <path d="M35 85 L65 100 L65 110 L45 110 L35 105 Z" fill="#FFD700" opacity="0.8" />
      {/* Rocket Cone */}
      <path d="M35 50 L50 15 L65 50 Z" fill="url(#rocketCone)" />
      <path d="M35 50 L50 15 L65 50 Z" fill="#FF0000" opacity="0.5" />
      {/* Base highlight */}
      <rect x="33" y="105" width="34" height="5" fill="#B8860B" rx="2" />
      
      {/* Engine Fire */}
      <g className="animate-[flicker_0.1s_infinite]">
        <path d="M45 110 Q50 130 55 110 Z" fill="#FF4500" />
        <path d="M47 110 Q50 120 53 110 Z" fill="#FFD700" />
      </g>
    </g>
    <defs>
      <linearGradient id="rocketBody" x1="35" y1="50" x2="65" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DC143C" />
        <stop offset="0.5" stopColor="#FF0000" />
        <stop offset="1" stopColor="#8B0000" />
      </linearGradient>
      <linearGradient id="rocketCone" x1="35" y1="15" x2="65" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700" />
        <stop offset="0.5" stopColor="#FFF8DC" />
        <stop offset="1" stopColor="#DAA520" />
      </linearGradient>
    </defs>
  </svg>
);

export const FlowerPotSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fountain Sparks */}
    <g className="animate-[fountainBurst_0.5s_infinite_alternate]">
      <path d="M50 70 Q30 30 10 40" stroke="#FFD700" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <path d="M50 70 Q50 20 50 10" stroke="#FF4500" strokeWidth="3" fill="none" strokeDasharray="5 5" />
      <path d="M50 70 Q70 30 90 40" stroke="#FFD700" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <circle cx="20" cy="30" r="3" fill="#FFF" className="animate-ping" />
      <circle cx="50" cy="15" r="4" fill="#FFD700" className="animate-ping" style={{animationDelay: '0.2s'}} />
      <circle cx="80" cy="30" r="3" fill="#FFF" className="animate-ping" style={{animationDelay: '0.4s'}} />
    </g>

    {/* Pot Body */}
    <path d="M40 70 L60 70 L75 140 L25 140 Z" fill="url(#potBody)" />
    
    {/* Decorative Triangles */}
    <path d="M40 70 L50 90 L60 70 Z" fill="#FFD700" />
    <path d="M35 95 L45 115 L25 140 Z" fill="#FFD700" />
    <path d="M65 95 L55 115 L75 140 Z" fill="#FFD700" />
    <path d="M50 105 L60 135 L40 135 Z" fill="#FF4500" />
    
    {/* Base */}
    <rect x="20" y="135" width="60" height="8" fill="#8B4513" rx="3" />
    
    <defs>
      <linearGradient id="potBody" x1="25" y1="70" x2="75" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#32CD32" />
        <stop offset="0.5" stopColor="#00FF00" />
        <stop offset="1" stopColor="#228B22" />
      </linearGradient>
    </defs>
  </svg>
);

export const FireworkSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="animate-[fireworkRotate_10s_linear_infinite]">
      {/* Outer burst */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 100 100)`}>
          <path d="M100 80 L100 20" stroke="url(#fireworkGradient)" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 15" className="animate-[fireworkDash_1.5s_linear_infinite]" style={{animationDelay: `${i * 0.1}s`}} />
          <circle cx="100" cy="15" r="4" fill={['#FF0000', '#FFD700', '#00FF00', '#00FFFF', '#FF00FF'][i % 5]} className="animate-ping" style={{animationDelay: `${i * 0.1}s`}} />
        </g>
      ))}
      
      {/* Inner burst */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <g key={`inner-${i}`} transform={`rotate(${angle} 100 100)`}>
          <path d="M100 90 L100 40" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 10" className="animate-[fireworkDash_1s_linear_infinite]" style={{animationDelay: `${i * 0.15}s`}} />
          <circle cx="100" cy="35" r="3" fill="#FFF" className="animate-pulse" />
        </g>
      ))}
      
      {/* Center glowing orb */}
      <circle cx="100" cy="100" r="10" fill="#FFF" className="animate-pulse" />
      <circle cx="100" cy="100" r="20" fill="#FFD700" opacity="0.3" className="animate-ping" />
    </g>
    <defs>
      <linearGradient id="fireworkGradient" x1="100" y1="80" x2="100" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF4500" />
        <stop offset="0.5" stopColor="#FFD700" />
        <stop offset="1" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
  </svg>
);
