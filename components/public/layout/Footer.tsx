import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, PlayCircle, MessageCircle } from "lucide-react";
import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";

export default function Footer({ settings }: { settings?: any }) {
  return (
    <footer className="bg-orange-900 text-orange-100 pt-16 pb-8 relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Info (Larger Column) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group mb-4">
              <div className="relative h-16 w-56 md:h-20 md:w-64 transition-transform duration-300">
                <Image 
                  src={settings?.logoUrl || "/images/sky-crackers-logo.png"} 
                  alt={settings?.siteName || "Sky Crackers Logo"} 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            
            <p className="text-sm text-orange-50/80 leading-relaxed max-w-sm font-medium">
              We offer the BEST QUALITY crackers all over India at unbeatable pricing.
            </p>
            
            <div className="flex gap-4 pt-2">
              <a href={`https://wa.me/${settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "919042849344"}?text=Hello%20Sky%20Crackers`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-orange-600 transition-colors">
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </a>
              <a href={settings?.youtube || "https://youtube.com/@skycrackersofficial?si=Fh5UAVw9lqOjOpXN"} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-red-600 transition-colors">
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
                { name: 'About Us', href: '/pages/about-us' },
                { name: 'Contact Us', href: '/pages/contact' },
                { name: 'Delivery Information', href: '/pages/delivery-information' },
                { name: 'Privacy Policy', href: '/pages/privacy-policy' }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm font-medium text-orange-100 hover:text-white transition-colors duration-200 flex items-center group">
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
                  <Link href={`/shop?category=${cat.slug}`} className="text-sm font-medium text-orange-100 hover:text-white transition-colors duration-200 flex items-center group">
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
                <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-1" />
                <span className="text-sm text-orange-100 leading-relaxed font-medium">
                  {settings?.address ? (
                    <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\n/g, "<br/>") }} />
                  ) : (
                    <>2/174D, Sattur Road,<br/>Meenampatti. Sivakasi,<br/>Tamil Nadu - 626189</>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <WhatsAppIcon className="h-5 w-5 text-yellow-400 shrink-0" />
                <a href={`https://wa.me/${settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "919042849344"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200">
                  {settings?.whatsapp || "+91 9042849344"}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-yellow-400 shrink-0" />
                <a href={`tel:${settings?.primaryPhone || "+916383511818"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200">
                  {settings?.primaryPhone || "+91 6383511818"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 mt-8 text-center">
          <p className="text-sm text-orange-100/60 font-medium">
            &copy; {new Date().getFullYear()} Sky Crackers. All rights reserved. Designed for joyful celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
}
