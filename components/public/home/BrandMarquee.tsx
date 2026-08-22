import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/public/ui/ScrollReveal';

export default function BrandMarquee() {
  const brands = [
    { id: 1, src: '/images/brands/brand-1.jpg', alt: 'Ayyan\'s' },
    { id: 2, src: '/images/brands/brand-2.jpg', alt: 'Sky King' },
    { id: 3, src: '/images/brands/brand-3.jpg', alt: 'Vadivel' },
    { id: 4, src: '/images/brands/brand-4.jpg', alt: 'Sony' },
    { id: 5, src: '/images/brands/brand-5.jpg', alt: 'Wow Star' },
    { id: 6, src: '/images/brands/brand-6.jpg', alt: 'Rajkala' },
    { id: 7, src: '/images/brands/brand-7.jpg', alt: 'Liya' },
    { id: 8, src: '/images/brands/brand-8.jpg', alt: 'Vanitha' },
    { id: 9, src: '/images/brands/brand-9.jpg', alt: 'Supreme' },
    { id: 10, src: '/images/brands/brand-11.jpg', alt: 'Blue Star' },
  ];

  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100 overflow-hidden relative z-30">
      <div className="container mx-auto px-4 text-center mb-6">
        <ScrollReveal animation="fade-up" delay={100}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase">
            Our Brands
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </ScrollReveal>
      </div>

      <div className="w-full relative flex items-center h-28 overflow-hidden group">
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <Link 
              key={`${brand.id}-${i}`}
              href="/shop"
              className="flex-shrink-0 w-40 md:w-56 h-24 mx-4 md:mx-8 relative bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              <Image 
                src={brand.src}
                alt={brand.alt}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 160px, 224px"
              />
            </Link>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}} />
    </section>
  );
}
