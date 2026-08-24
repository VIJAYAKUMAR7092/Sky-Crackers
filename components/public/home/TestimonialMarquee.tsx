"use client";

import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Muthu Kumar",
    location: "Chennai",
    initial: "M",
    color: "bg-orange-100 text-orange-700",
    text: "Best crackers in Sivakasi. The wholesale price is very low and quality is top notch. Kids enjoyed the Diwali very well."
  },
  {
    id: 2,
    name: "Sowmya",
    location: "Coimbatore",
    initial: "S",
    color: "bg-pink-100 text-pink-700",
    text: "I was worried about online ordering but the packing was amazing. All products arrived safely. Definitely recommending to friends!"
  },
  {
    id: 3,
    name: "Ramesh",
    location: "Madurai",
    initial: "R",
    color: "bg-blue-100 text-blue-700",
    text: "Amazing discounts. Almost 90% off on MRP for wholesale buying. They delivered on time without any missing items. Very happy."
  },
  {
    id: 4,
    name: "Karthick",
    location: "Salem",
    initial: "K",
    color: "bg-purple-100 text-purple-700",
    text: "Excellent combo offers! The Gold Night Combo pack was completely worth it. Very loud and colorful fireworks. Great service by Sky Crackers."
  },
  {
    id: 5,
    name: "Vignesh",
    location: "Trichy",
    initial: "V",
    color: "bg-green-100 text-green-700",
    text: "The delivery was surprisingly fast! Safe packaging and perfect quality. Will definitely order for next year's Diwali as well."
  }
];

export default function TestimonialMarquee() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <div className="text-center">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes softGlowFloat {
              0%, 100% { transform: translateY(0); text-shadow: 0 0 2px rgba(223, 38, 12, 0.1); opacity: 0.8; }
              50% { transform: translateY(-3px); text-shadow: 0 0 12px rgba(223, 38, 12, 0.6); opacity: 1; }
            }
            @keyframes redGlowPulse {
              0%, 100% { transform: scale(1); text-shadow: 0 0 5px rgba(223,38,12,0.2); }
              50% { transform: scale(1.02); text-shadow: 0 0 20px rgba(223,38,12,0.7); }
            }
          `}} />
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block w-full" style={{ animation: 'softGlowFloat 4s ease-in-out infinite' }}>TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none tracking-tighter text-primary block w-full" style={{ animation: 'redGlowPulse 3s ease-in-out infinite' }}>
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex w-full">
        {/* We create a flex row containing our items, and animate it continuously */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-4">
          {/* Triple the items for smooth infinite scroll */}
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={`${t.id}-${idx}`}
              className="w-[85vw] md:w-[400px] shrink-0 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex text-yellow-400 mb-6">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 font-medium italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
