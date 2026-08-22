"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { X, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";

interface ZoomableImageProps extends ImageProps {
  alt: string;
}

export default function ZoomableImage(props: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className="relative group cursor-pointer w-full h-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <Image {...props} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
          <div className="bg-white/90 p-2 rounded-full shadow-sm text-gray-800 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-all">
            <ZoomIn className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </div>

      {mounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors z-50"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl h-[80vh] md:h-[90vh] rounded-lg overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={props.src}
              alt={props.alt || "Product Image"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
