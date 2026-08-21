import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, PlayCircle, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-zinc-300 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Info (Larger Column) */}
          <div className="lg:col-span-4 space-y-5">
                        <Link href="/" className="inline-block group mb-4">
              <div className="relative h-10 w-36 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
                <Image 
                  src="/logo-official.png" 
                  alt="Sky Crackers Logo" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
              Elevate your celebrations with India&apos;s finest fireworks. Rooted in Sivakasi&apos;s rich heritage, delivering uncompromising quality and spectacular luxury across Tamil Nadu.
            </p>
            
            <div className="flex gap-4 pt-2">
              <a href="https://wa.me/919042849344" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-[#25D366] hover:border-transparent hover:text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,211,102,0.3)]">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-red-600 hover:border-transparent hover:text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)]">
                <PlayCircle className="h-4 w-4" />
              </a>
              
              
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-5 uppercase tracking-[0.2em] text-xs">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'Shop Now', 'About Us', 'Contact', 'Safety Guide'].map((item, i) => (
                <li key={i}>
                  <Link href={item === 'Home' ? '/' : item === 'Shop Now' ? '/shop' : `/#${item.toLowerCase().replace(' ', '')}`} className="text-xs text-zinc-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                      <ArrowRight className="h-3 w-3 text-primary" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-5 uppercase tracking-[0.2em] text-xs">Collections</h3>
            <ul className="space-y-3">
              {[
                { name: 'Sparklers', slug: 'sparklers' },
                { name: 'Flower Pots', slug: 'flower-pots' },
                { name: 'Rockets', slug: 'rockets' },
                { name: 'Gift Boxes', slug: 'gift-boxes' },
                { name: 'Kids Collection', slug: 'kids-collection' }
              ].map((cat, i) => (
                <li key={i}>
                  <Link href={`/shop?category=${cat.slug}`} className="text-xs text-zinc-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                      <ArrowRight className="h-3 w-3 text-primary" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-5 uppercase tracking-[0.2em] text-xs">Concierge</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group cursor-default">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-zinc-400 leading-relaxed pt-1">2/174D, Sattur Road,<br/>Meenampatti, Sivakasi,<br/>Tamil Nadu - 626189</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-green-500/50 transition-colors duration-500">
                  <MessageCircle className="h-4 w-4 text-green-500" />
                </div>
                <a href="https://wa.me/919042849344" className="text-xs text-zinc-400 hover:text-white transition-colors duration-300">+91 90428 49344</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a href="tel:+916383511818" className="text-xs text-zinc-400 hover:text-white transition-colors duration-300">+91 63835 11818</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-zinc-500 font-light tracking-wide order-2 md:order-1">
            &copy; {new Date().getFullYear()} Sky Crackers. Crafted with precision in Sivakasi. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-xs text-zinc-500 font-medium order-1 md:order-2">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <Link href="/shipping" className="hover:text-white transition-colors duration-300">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
