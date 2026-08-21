"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="bg-[#050505] min-h-screen pt-32 pb-24 flex items-center justify-center selection:bg-primary/30 selection:text-white">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <ShoppingBag className="h-12 w-12 text-zinc-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-zinc-400 mb-10 max-w-md mx-auto">
            Looks like you haven't added any premium Sivakasi crackers to your cart yet.
          </p>
          <Link 
            href="/shop"
            className="bg-primary text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            Explore Collection <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 selection:bg-primary/30 selection:text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-lg">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{items.length} Items</span>
              <button 
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-400 flex items-center gap-2 transition-colors font-medium"
              >
                <Trash2 className="h-4 w-4" /> Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 relative group">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden shrink-0 bg-black/50 border border-white/5">
                  <Image 
                    src={item.product.imageUrl || "/placeholder.png"} 
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <Link href={`/product/${item.product.slug}`} className="text-lg font-bold text-white hover:text-primary transition-colors line-clamp-2">
                      {item.product.name}
                    </Link>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {item.product.packInfo && (
                    <span className="text-xs text-zinc-500 font-medium mb-4 block">Pack: {item.product.packInfo}</span>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-black/50 border border-white/10 rounded-full overflow-hidden p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-white">₹{(item.product.price * item.quantity).toFixed(2)}</div>
                      {item.product.mrp > item.product.price && (
                        <div className="text-xs text-zinc-500 line-through">₹{(item.product.mrp * item.quantity).toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
              <h2 className="text-xl font-extrabold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Delivery</span>
                  <span className="text-primary font-medium">Calculated at checkout</span>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-zinc-300 font-medium">Total</span>
                  <span className="text-3xl font-extrabold text-white">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-6"
              >
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <ShieldCheck className="h-5 w-5 text-zinc-400" /> Secure Manual Order Process
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <Truck className="h-5 w-5 text-zinc-400" /> Delivery across Tamil Nadu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
