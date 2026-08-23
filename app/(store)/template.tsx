import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  // Premium smooth page transition for ecommerce navigation
  return (
    <div className="animate-[pageFadeIn_0.6s_ease-out_forwards]">
      {children}
    </div>
  );
}
