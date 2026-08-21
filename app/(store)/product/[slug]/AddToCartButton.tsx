"use client";

import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    mrp: number;
    imageUrl?: string;
    packInfo?: string;
  };
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product, quantity);
  };

  if (disabled) {
    return (
      <div className="flex gap-4">
        <button disabled className="flex-1 bg-secondary text-muted-foreground font-bold py-4 rounded-full cursor-not-allowed">
          Out of Stock
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center justify-between border border-border rounded-full p-2 bg-background sm:w-1/3">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-3 hover:bg-secondary rounded-full transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-bold text-lg w-12 text-center">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="p-3 hover:bg-secondary rounded-full transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button 
        onClick={handleAdd}
        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
      >
        <ShoppingCart className="h-5 w-5" /> Add to Cart
      </button>
    </div>
  );
}
