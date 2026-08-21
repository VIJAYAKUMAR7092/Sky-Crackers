"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useCartStore } from "@/lib/store/cart.store";
import CartDrawer from "../cart/CartDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();
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

  const isHomepage = pathname === "/";
  const textColor = isScrolled || !isHomepage ? "text-zinc-900 dark:text-white" : "text-white";
  const iconColor = isScrolled || !isHomepage ? "text-zinc-700 dark:text-zinc-300 hover:text-primary" : "text-white/90 hover:text-white";
  
  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled || !isHomepage
            ? "bg-white/70 dark:bg-[#050505]/70 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-white/5 py-4 shadow-sm"
            : "bg-gradient-to-b from-black/80 to-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
                        {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-8 w-32 md:h-10 md:w-40 group-hover:scale-105 transition-transform duration-300 drop-shadow-xl">
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
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative group text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      isActive 
                        ? "text-primary" 
                        : `${textColor} opacity-80 hover:opacity-100`
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 ${iconColor} ${!isScrolled && isHomepage ? "drop-shadow-lg" : ""}`}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              <button 
                onClick={() => setCartOpen(true)}
                className={`relative p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 group ${iconColor} ${!isScrolled && isHomepage ? "drop-shadow-lg" : ""}`}
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {mounted && cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-primary border-2 border-transparent text-[10px] font-extrabold text-black flex items-center justify-center translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-in zoom-in">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className={`md:hidden p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 ${iconColor}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Smooth Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-white/5 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                  pathname === link.href ? "text-primary pl-2 border-l-4 border-primary" : "text-zinc-600 dark:text-zinc-400 hover:text-primary hover:pl-2"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
      
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
