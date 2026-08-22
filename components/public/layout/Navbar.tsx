"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, PhoneCall, MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import CartDrawer from "../cart/CartDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const cartItemsCount = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-green-900 text-white text-[11px] md:text-xs font-medium py-2">
        <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+919786683878" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <PhoneCall className="h-3.5 w-3.5" /> +91 9786683878
            </a>
            <a href="https://wa.me/919786683878?text=Hello%20Sky%20Crackers,%20I%20would%20like%20to%20place%20an%20order" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
          <div className="text-center">
             Welcome to Sky Crackers Sivakasi ! 2026 Diwali Sale starts from August !!
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white ${
          isScrolled ? "shadow-md py-2" : "py-4 border-b border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <div className="relative h-12 w-40 md:h-14 md:w-48 transition-transform duration-300">
                <Image 
                  src="/logo-official.png" 
                  alt="Sky Crackers Logo" 
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
              <a href="tel:+919786683878" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-bold text-gray-800 hover:border-primary transition-colors">
                <PhoneCall className="h-4 w-4 text-red-500"/>
                +91 9786683878
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
              <a href="tel:+919786683878" className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-800 font-bold text-sm">
                <PhoneCall className="h-4 w-4 text-red-500"/> Call +91 9786683878
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
