"use client";

import React, { useState } from "react";
import { cn } from "@/components/ui/utils";

interface ProductTabsProps {
  description?: string | null;
  packInfo?: string | null;
  sku?: string | null;
}

export default function ProductTabs({ description, packInfo, sku }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "safety", label: "Safety Guide" },
    { id: "shipping", label: "Delivery & Returns" },
  ];

  return (
    <div className="mt-20">
      <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-4 font-bold text-sm tracking-widest uppercase whitespace-nowrap transition-all duration-300 relative",
              activeTab === tab.id 
                ? "text-primary" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            )}
          </button>
        ))}
      </div>

      <div className="py-10">
        {activeTab === "description" && (
          <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 font-light leading-relaxed">
            <p>
              {description || "Experience the brilliant display and magnificent sound of this premium firework. Perfect for making your celebrations unforgettable. Crafted with the finest materials in Sivakasi."}
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-300 font-light">
            <div className="flex flex-col gap-1 p-4 bg-white/5 border border-white/5 rounded-2xl">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">SKU</span>
              <span className="font-medium text-white">{sku || "N/A"}</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-white/5 border border-white/5 rounded-2xl">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Pack Information</span>
              <span className="font-medium text-white">{packInfo || "Standard Box"}</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-white/5 border border-white/5 rounded-2xl">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Origin</span>
              <span className="font-medium text-white">Sivakasi, Tamil Nadu</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-white/5 border border-white/5 rounded-2xl">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Quality Standard</span>
              <span className="font-medium text-white">Premium Export Quality</span>
            </div>
          </div>
        )}

        {activeTab === "safety" && (
          <ul className="space-y-4 text-sm text-zinc-300 font-light list-disc pl-5">
            <li>Always store fireworks in a cool, dry place away from children and pets.</li>
            <li>Light fireworks outdoors in a clear area, away from buildings and vehicles.</li>
            <li>Never point or throw fireworks at another person.</li>
            <li>Keep a bucket of water or a garden hose handy in case of fire or other mishap.</li>
            <li>Never attempt to relight a &quot;dud&quot; firework. Wait 20 minutes and then soak it in a bucket of water.</li>
            <li>Do not carry fireworks in your pockets.</li>
            <li>Always wear eye protection when lighting fireworks.</li>
          </ul>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6 text-sm text-zinc-300 font-light">
            <div>
              <h4 className="text-white font-bold mb-2">Delivery Information</h4>
              <p>We provide safe and secure delivery across Tamil Nadu using specialized transport vehicles. Delivery usually takes 2-5 business days depending on your location. Minimum order value for delivery applies.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Return Policy</h4>
              <p>Due to the explosive and hazardous nature of fireworks, we do not accept returns once the products have been delivered and accepted. If you receive damaged boxes, please contact our support immediately at the time of delivery.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
