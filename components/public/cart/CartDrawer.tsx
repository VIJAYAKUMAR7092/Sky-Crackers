"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white border-l border-gray-200 shadow-2xl z-[110] text-gray-900 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <ShoppingBag className="h-16 w-16 text-gray-500" />
              <p className="text-gray-500">Your cart is empty.</p>
              <Button onClick={onClose} variant="outline" className="mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 border border-gray-200/50 rounded-xl">
                <div className="h-20 w-20 bg-white rounded-lg overflow-hidden border border-gray-200/50 flex items-center justify-center relative shrink-0">
                  {item.product.imageUrl ? (
                    <Image 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No image</span>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                      {item.product.packInfo && (
                        <p className="text-xs text-gray-500">{item.product.packInfo}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-500 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded-md"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded-md"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-500">Subtotal</span>
              <span className="font-bold text-xl">₹{getSubtotal().toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="grid gap-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 text-base">
                <Link href="/checkout" onClick={onClose}>
                  Checkout
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12">
                <Link href="/cart" onClick={onClose}>
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
