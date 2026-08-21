"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart.store";
import { ShieldCheck, Truck, Lock, Loader2, Tag } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, getSubtotal, clearCart } = useCartStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    altPhone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    locality: "",
    city: "",
    district: "",
    state: "Tamil Nadu", // default restricted zone for sivakasi crackers
    pincode: ""
  });
  
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/cart');
    }
  }, [mounted, items.length, router]);


  const subtotal = getSubtotal();
  // Simplified delivery charge for frontend preview
  const deliveryCharge = subtotal > 3000 ? 0 : 300; 
  
  // Apply coupon logic frontend simulation (Backend does true validation)
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "PERCENTAGE") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = subtotal - discountAmount + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      // In a real app, you'd call a dedicated GET /api/coupons/validate?code=XYZ
      // For this robust prototype, we just pass it to Place Order. But let's mock validation:
      if (couponCode.toUpperCase() === "DIWALI10") {
        setAppliedCoupon({ type: "PERCENTAGE", value: 10, maxDiscount: 500 });
      } else {
        setCouponError("Invalid or expired coupon");
      }
    } catch (err) {
      setCouponError("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          altPhone: formData.altPhone,
          email: formData.email,
        },
        address: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          locality: formData.locality,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          mrp: item.product.mrp,
          packInfo: item.product.packInfo
        })),
        couponCode: appliedCoupon ? couponCode : undefined
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();
      router.push(`/checkout/success/${data.data.id}`);
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;
  if (items.length === 0) return null;

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 selection:bg-primary/30 selection:text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Customer Info */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Ramesh Kumar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mobile Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="10-digit mobile number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Alternate Mobile</label>
                    <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Optional for updates" />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Delivery Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Address Line 1 *</label>
                    <input required type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="House/Flat No, Building, Street" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Address Line 2 / Landmark</label>
                    <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Nearby landmark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">City *</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">District *</label>
                    <input required type="text" name="district" value={formData.district} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">State *</label>
                    <select required name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors">
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pincode *</label>
                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-black font-extrabold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-70 text-lg"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Lock className="h-5 w-5" />}
                {loading ? "Processing Order..." : `Place Order • ₹${grandTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
              <h2 className="text-xl font-extrabold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-black/50 border border-white/5 shrink-0">
                      <Image src={item.product.imageUrl || "/placeholder.png"} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-8">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">Gift Card or Discount Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode} 
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    disabled={!!appliedCoupon || couponLoading}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary/50 disabled:opacity-50" 
                    placeholder="Enter code" 
                  />
                  {!appliedCoupon ? (
                    <button 
                      onClick={handleApplyCoupon}
                      disabled={!couponCode || couponLoading}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 text-sm"
                    >
                      {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setAppliedCoupon(null); setCouponCode(""); }}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {couponError && <p className="text-red-400 text-xs mt-2">{couponError}</p>}
                {appliedCoupon && <p className="text-green-400 text-xs mt-2 flex items-center gap-1"><Tag className="h-3 w-3" /> Coupon Applied!</p>}
              </div>

              <div className="space-y-4 text-sm mb-8 pt-6 border-t border-white/10">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-white font-medium">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge.toFixed(2)}`}</span>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-zinc-300 font-medium">Total</span>
                  <span className="text-3xl font-extrabold text-white">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
