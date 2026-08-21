"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale-up";
  duration?: "fast" | "normal" | "slow";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  duration = "normal",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const currentRef = ref.current; if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const baseClasses = "transition-all ease-out will-change-transform";
  
  const durationClasses = {
    fast: "duration-500",
    normal: "duration-700",
    slow: "duration-1000",
  };

  const hiddenState = {
    "fade-up": "opacity-0 translate-y-12",
    "fade-left": "opacity-0 -translate-x-12",
    "fade-right": "opacity-0 translate-x-12",
    "scale-up": "opacity-0 scale-95",
  };

  const visibleState = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-left": "opacity-100 translate-x-0",
    "fade-right": "opacity-100 translate-x-0",
    "scale-up": "opacity-100 scale-100",
  };

  const currentHidden = hiddenState[animation];
  const currentVisible = visibleState[animation];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${baseClasses} ${durationClasses[duration]} ${
        isVisible ? currentVisible : currentHidden
      } ${className}`}
    >
      {children}
    </div>
  );
}
