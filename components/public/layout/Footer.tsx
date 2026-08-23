import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, PlayCircle } from "lucide-react";
import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";
import InstagramIcon from "@/components/public/ui/InstagramIcon";

export default function Footer({ settings }: { settings?: any }) {
  return (
    <footer className="bg-[linear-gradient(135deg,#dc2626_0%,#dc2626_70%,#ea580c_100%)] text-white pt-6 md:pt-10 pb-4 md:pb-6 relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-8">
          
          {/* Brand Info (Larger Column) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group mb-2">
              <div className="relative h-14 w-48 md:h-16 md:w-56 transition-transform duration-300">
                <Image 
                  src="/images/sky-crackers-logo.png" 
                  alt={settings?.siteName || "Sky Crackers Logo"} 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            
            <p className="text-sm text-orange-50/80 leading-relaxed max-w-sm font-medium">
              We offer the BEST QUALITY crackers all over India at unbeatable pricing.
            </p>
            
            <div className="flex gap-3 pt-1">
              <a href={`https://wa.me/${settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "919042849344"}?text=Hello%20Sky%20Crackers`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-orange-600 transition-colors">
                <WhatsAppIcon className="h-4 w-4 text-white" />
              </a>
              <a href={settings?.youtube || "https://youtube.com/@skycrackersofficial?si=Fh5UAVw9lqOjOpXN"} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-red-600 transition-colors">
                <PlayCircle className="h-4 w-4 text-white" />
              </a>
              <a href="https://www.instagram.com/sky_crackers_official?igsi=czl1enVtMWw2N2dk" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-pink-600 transition-colors">
                <InstagramIcon className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Mobile Split Wrapper for Info & Categories */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2 md:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-extrabold mb-3 md:mb-4 uppercase text-[13px] md:text-sm border-b border-white/20 pb-1.5">Information</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Shop', href: '/shop' },
                  { name: 'About Us', href: '/#about' },
                  { name: 'Contact Us', href: '/#contact' },
                  { name: 'Delivery', href: '/pages/delivery-information' },
                  { name: 'Privacy Policy', href: '/pages/privacy-policy' },
                  { name: 'Terms', href: '/pages/terms-and-conditions' }
                ].map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-[12px] md:text-sm font-medium text-orange-50 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200 leading-tight">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-extrabold mb-3 md:mb-4 uppercase text-[13px] md:text-sm border-b border-white/20 pb-1.5">Categories</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Sparklers', slug: 'sparklers' },
                  { name: 'Flower Pots', slug: 'flower-pots' },
                  { name: 'Rockets', slug: 'rockets' },
                  { name: 'Gift Boxes', slug: 'gift-boxes' },
                  { name: 'Kids', slug: 'kids-collection' }
                ].map((cat, i) => (
                  <li key={i}>
                    <Link href={`/shop?category=${cat.slug}`} className="text-[12px] md:text-sm font-medium text-orange-50 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200 leading-tight">{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-extrabold mb-4 uppercase text-sm border-b border-white/20 pb-1.5">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-yellow-400 shrink-0 mt-1" />
                <span className="text-sm text-orange-100 leading-relaxed font-medium break-words">
                  {settings?.address ? (
                    <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\n/g, "<br/>") }} />
                  ) : (
                    <>2/174D, Sattur Road,<br/>Meenampatti. Sivakasi,<br/>Tamil Nadu - 626189</>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href={`https://wa.me/${settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "919042849344"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  {settings?.whatsapp || "+91 9042849344"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href={`tel:${settings?.primaryPhone || "+916383511818"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  {settings?.primaryPhone || "+91 6383511818"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href="tel:+919344745092" className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  +91 93447 45092
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 mt-6 text-center">
          <p className="text-xs sm:text-sm text-orange-100/60 font-medium">
            &copy; {new Date().getFullYear()} Sky Crackers. All rights reserved. Designed for joyful celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
}
