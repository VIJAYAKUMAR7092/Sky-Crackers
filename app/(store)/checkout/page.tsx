"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart.store";
import { User, MapPin, ClipboardList, Shield, ShoppingCart, Trash2, X, Plus, Minus, Check, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, getSubtotal, clearCart, updateQuantity, removeItem } = useCartStore();
  
  const [step, setStep] = useState<2 | 3>(2); // 2 = Details, 3 = Confirm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    city: "",
    pincode: "",
    notes: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/shop');
    }
  }, [mounted, items.length, router]);

  const subtotal = getSubtotal();
  const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setError("");
    setLoading(true);

    try {
      const orderData = {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
        },
        address: {
          addressLine1: formData.addressLine1,
          city: formData.city,
          district: formData.city,
          state: "Tamil Nadu",
          pincode: formData.pincode,
        },
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          mrp: item.product.mrp,
          productName: item.product.name,
          packInfo: item.product.packInfo
        })),
        notes: formData.notes
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      clearCart();
      router.push(`/checkout/success/${data.data.id}`);
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      setStep(2); // Go back to details if error
    }
  };

  if (!mounted) return <div className="min-h-screen bg-pink-50/30" />;
  if (items.length === 0) return null;

  return (
    <div className="bg-pink-50/30 min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10 max-w-md mx-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <span className="ml-2 font-bold text-green-600">Cart</span>
          </div>
          <div className="w-12 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
              {step === 3 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className={`ml-2 font-bold ${step === 2 ? 'text-primary' : 'text-green-600'}`}>Details</span>
          </div>
          <div className={`w-12 h-0.5 mx-2 ${step === 3 ? 'bg-green-500' : 'bg-pink-200'}`}></div>
          <div className={`flex items-center ${step === 2 ? 'opacity-50' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-primary text-white' : 'bg-pink-200 text-primary'}`}>
              3
            </div>
            <span className="ml-2 font-bold text-primary">Confirm</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 font-medium text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column - Delivery Details or Confirmation Details */}
          <div className="w-full lg:w-3/5">
            {step === 2 ? (
              <form id="checkout-form" onSubmit={handleProceedToConfirm} className="bg-white rounded-2xl border border-pink-200 shadow-sm p-6 lg:p-8">
                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  Delivery Details
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide uppercase">Full Name *</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide uppercase">Phone *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-pink-200 bg-pink-50 text-primary rounded-l-lg text-sm font-medium">+91</span>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="flex-1 w-full border border-pink-200 rounded-r-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="10-digit number" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide uppercase">Email *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="email@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide uppercase">Delivery Address *</label>
                      <textarea required name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} rows={1} className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="House No, Street, Area, Landmark?" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-primary tracking-wide uppercase">City *</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="City" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-primary tracking-wide uppercase">Pincode *</label>
                        <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="6-digit" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary tracking-wide uppercase">Delivery State *</label>
                    <div className="flex items-center justify-between border border-green-500 bg-green-50 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-sm font-black text-gray-900 uppercase">TAMIL NADU</h4>
                          <p className="text-xs font-medium text-gray-500">Min Order: <span className="font-bold text-gray-900">Rs. 3,000.00</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary tracking-wide uppercase">Order Notes (Optional)</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Any special instructions?" />
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl border border-pink-200 shadow-sm p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Confirm Your Details
                  </h2>
                  <button onClick={() => setStep(2)} className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Name</p>
                    <p className="font-medium text-gray-900">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Phone</p>
                    <p className="font-medium text-gray-900">+91 {formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Email</p>
                    <p className="font-medium text-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">City & Pincode</p>
                    <p className="font-medium text-gray-900">{formData.city}, {formData.pincode}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Delivery Address</p>
                    <p className="font-medium text-gray-900">{formData.addressLine1}</p>
                    <p className="font-bold text-primary mt-1">Tamil Nadu</p>
                  </div>
                  {formData.notes && (
                    <div className="col-span-2">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Notes</p>
                      <p className="font-medium text-gray-900 bg-gray-50 p-2 rounded">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-2/5 sticky top-28 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-[#0f0a1c] p-4 flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-white" />
              <h2 className="text-base font-bold text-white flex-1">Order Summary</h2>
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                {items.length} product{items.length > 1 ? 's' : ''} - {totalQty} Qty
              </span>
            </div>
            
            <div className="p-5 max-h-[40vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4 divide-y divide-pink-50">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-4 first:pt-0">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-bold text-gray-900 leading-tight">{item.product.name}</h4>
                          <span className="text-[10px] bg-pink-50 text-primary border border-pink-100 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">{item.product.packInfo}</span>
                          {step === 2 && (
                            <button type="button" onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 ml-auto">
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        {item.product.mrp > item.product.price && (
                           <div className="inline-block bg-green-50 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded mb-2 uppercase border border-green-100">
                             {Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100)}% OFF
                           </div>
                        )}
                        <div className="flex items-center gap-3 mt-1">
                          <div className="w-8 h-8 relative rounded border border-gray-100 overflow-hidden shrink-0">
                            <Image src={item.product.imageUrl || '/placeholder.png'} alt={item.product.name} fill className="object-contain" />
                          </div>
                          <div className="font-bold text-sm text-primary">Rs. {item.product.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {step === 2 ? (
                        <div className="flex items-center border border-pink-200 rounded-md">
                          <button type="button" onClick={() => item.quantity > 1 ? updateQuantity(item.product.id, item.quantity - 1) : removeItem(item.product.id)} className="px-2 py-1 hover:bg-pink-50 text-gray-600"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 py-1 text-xs font-bold text-gray-900 border-x border-pink-200 min-w-[32px] text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 hover:bg-pink-50 text-gray-600"><Plus className="w-3 h-3" /></button>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-gray-600">Qty: {item.quantity}</div>
                      )}
                      <div className="font-bold text-sm text-primary">{(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-pink-50/50 p-5 border-t border-pink-100">
              <div className="flex justify-between items-center text-sm font-bold text-gray-600 mb-2 border-b border-pink-100 border-dashed pb-3">
                <span>Subtotal <span className="text-xs text-gray-400 font-medium">({totalQty} items)</span></span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-base font-black text-gray-900 mb-5 pt-1">
                <span>Total Payable</span>
                <span className="text-primary">Rs. {subtotal.toFixed(2)}</span>
              </div>
              
              {step === 2 ? (
                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={subtotal < 3000}
                  className="w-full bg-[#f63d68] hover:bg-[#d62d53] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subtotal < 3000 ? 'Minimum Order Rs. 3000' : 'Continue to Confirm'}
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handlePlaceOrder}
                  disabled={loading || subtotal < 3000}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  Confirm & Place Order
                </button>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link href="/shop" className="bg-pink-50 hover:bg-pink-100 text-gray-700 border border-pink-100 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Continue Shopping
                  </Link>
                  <button type="button" onClick={clearCart} className="bg-pink-50 hover:bg-red-50 hover:text-red-600 text-primary border border-pink-100 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                    Empty Cart
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-gray-500 font-medium">
                <Shield className="w-3 h-3 text-red-500" />
                Secure checkout - your data is protected.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
