"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, PhoneCall, MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import CartDrawer from "../cart/CartDrawer";

export default function Navbar({ settings }: { settings?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerMessages = [
    "Welcome to Sky Crackers Up to 90%",
    "Minimum Tamilnadu Order Rs 3,000",
    "Minimum Other State Orders 5,000"
  ];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    const bannerTimer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 3000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
      clearInterval(bannerTimer);
    };
  }, [bannerMessages.length]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/pages/about-us" },
    { name: "Contact", href: "/pages/contact" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#2e7d32] text-white text-[10px] md:text-xs font-bold py-2 md:py-2.5 overflow-hidden">
        <div className="w-full mx-auto px-2 flex items-center justify-center gap-1.5 md:gap-2 max-w-7xl">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-300 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M19.333 7.828a2.593 2.593 0 0 1-1.688.625h-1.428V4.896a2.6 2.6 0 0 1 1.688.625A2.585 2.585 0 0 1 20 7.35a2.585 2.585 0 0 1-.667 1.833V7.828zm-5.428-3.14a8.47 8.47 0 0 0-4.095 1.054A8.536 8.536 0 0 0 7.57 7.57c-.742.666-1.748 1.054-2.856 1.054a1.328 1.328 0 0 1-1.334-1.325c0-.73.59-1.325 1.334-1.325h1.168a.715.715 0 0 0 .713-.711.715.715 0 0 0-.713-.711H4.714C3.217 4.552 2 5.766 2 7.26c0 1.494 1.217 2.708 2.714 2.708h2.856c1.108 0 2.114.388 2.856 1.053A8.535 8.535 0 0 0 12.8 12.92a8.47 8.47 0 0 0 4.095 1.054h.476v5.333c0 .393-.32.711-.714.711h-1.428a.715.715 0 0 0-.714.71.715.715 0 0 0 .714.711h1.428c1.18 0 2.143-.96 2.143-2.133v-5.333h.476a3.99 3.99 0 0 0 2.62-1.025A4.015 4.015 0 0 0 22 10.04a4.015 4.015 0 0 0-1.095-2.805A3.99 3.99 0 0 0 18.286 6.21h-.476V4.688zm.476 11.2h-.476v-4h.476v4z" />
          </svg>
          <div className="relative h-[18px] w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden flex items-center justify-center">
            {bannerMessages.map((msg, idx) => (
              <div 
                key={idx}
                className={`absolute w-full text-center tracking-wide md:tracking-widest uppercase transition-all duration-700 ease-in-out ${
                  idx === bannerIndex 
                    ? 'translate-y-0 opacity-100' 
                    : (idx === bannerIndex - 1 || (bannerIndex === 0 && idx === bannerMessages.length - 1))
                      ? 'translate-y-full opacity-0'
                      : '-translate-y-full opacity-0'
                }`}
              >
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white ${
          isScrolled ? "shadow-md py-2" : "py-4 border-b border-gray-100"
        }`}
      >
        <div className="w-full mx-auto px-1 sm:px-4 md:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <div className="relative h-12 w-40 md:h-14 md:w-48 transition-transform duration-300">
                <Image 
                  src={settings?.logoUrl || "/images/sky-crackers-logo.png"} 
                  alt={settings?.siteName || "Sky Crackers Logo"} 
                  fill 
                  className="object-contain" 
                  priority 
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 mx-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith('/shop') && link.href === '/shop');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-bold transition-colors duration-200 flex items-center ${
                      isActive 
                        ? "text-primary border-b-2 border-primary pb-1" 
                        : "text-gray-800 hover:text-primary pb-1"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              
              {/* Phone Pill - like screenshot */}
              <a href={`tel:${settings?.primaryPhone || "+919042849344"}`} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-bold text-gray-800 hover:border-primary transition-colors">
                <PhoneCall className="h-4 w-4 text-red-500"/>
                {settings?.primaryPhone || "+91 9042849344"}
              </a>

              {/* Quick Order Button */}
              <Link href="/shop" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors shadow-sm">
                <ShoppingCart className="h-4 w-4" />
                Quick Order
              </Link>

              {/* Cart Toggle */}
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-800 hover:text-primary transition-colors group"
                aria-label="Open Cart"
              >
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {mounted && cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-gray-800 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold uppercase transition-colors duration-200 py-3 border-b border-gray-50 ${
                  pathname === link.href ? "text-primary" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a href={`tel:${settings?.primaryPhone || "+919786683878"}`} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-800 font-bold text-sm">
                <PhoneCall className="h-4 w-4 text-red-500"/> Call {settings?.primaryPhone || "+91 9786683878"}
              </a>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 text-white font-bold text-sm">
                <ShoppingCart className="h-4 w-4" /> Quick Order
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
