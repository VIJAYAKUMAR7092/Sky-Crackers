import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, PlayCircle, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 pt-16 pb-8 border-t-4 border-secondary relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Info (Larger Column) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group mb-4">
              <div className="relative h-12 w-40 transition-transform duration-300">
                <Image 
                  src="/logo-official.png" 
                  alt="Sky Crackers Logo" 
                  fill 
                  className="object-contain object-left brightness-0 invert" 
                />
              </div>
            </Link>
            
            <p className="text-sm text-green-50/80 leading-relaxed max-w-sm font-medium">
              We offer the BEST QUALITY crackers all over India at unbeatable pricing.
            </p>
            
            <div className="flex gap-4 pt-2">
              <a href="https://wa.me/919786683878" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-green-600 transition-colors">
                <MessageCircle className="h-5 w-5 text-white" />
              </a>
              <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-red-600 transition-colors">
                <PlayCircle className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-extrabold mb-6 uppercase text-sm border-b border-white/20 pb-2">Information</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/shop' },
                { name: 'About Us', href: '/#about' },
                { name: 'Contact Us', href: '/#contact' }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm font-medium text-green-100 hover:text-secondary transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-extrabold mb-6 uppercase text-sm border-b border-white/20 pb-2">Categories</h3>
            <ul className="space-y-4">
              {[
                { name: 'Sparklers', slug: 'sparklers' },
                { name: 'Flower Pots', slug: 'flower-pots' },
                { name: 'Rockets', slug: 'rockets' },
                { name: 'Gift Boxes', slug: 'gift-boxes' },
                { name: 'Kids Collection', slug: 'kids-collection' }
              ].map((cat, i) => (
                <li key={i}>
                  <Link href={`/shop?category=${cat.slug}`} className="text-sm font-medium text-green-100 hover:text-secondary transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-extrabold mb-6 uppercase text-sm border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <span className="text-sm text-green-100 leading-relaxed font-medium">2/174D, Sattur Road,<br/>Meenampatti, Sivakasi,<br/>Tamil Nadu - 626189</span>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle className="h-5 w-5 text-secondary shrink-0" />
                <a href="https://wa.me/919786683878" className="text-sm font-bold text-white hover:text-secondary transition-colors duration-200">+91 9786683878</a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <a href="tel:+919786683878" className="text-sm font-bold text-white hover:text-secondary transition-colors duration-200">+91 9786683878</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 mt-8 text-center">
          <p className="text-sm text-green-200 font-medium">
            &copy; {new Date().getFullYear()} Sky Crackers. All rights reserved. Designed for joyful celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
}
