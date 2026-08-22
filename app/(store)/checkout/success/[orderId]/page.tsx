import React from "react";
import Link from "next/link";
import { getOrderById } from "@/lib/services/orders/order.service";
import { CheckCircle2, Package, Truck, Download, ArrowRight, ShoppingCart } from "lucide-react";

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = await params;
  let order;
  try {
    order = await getOrderById(resolvedParams.orderId);
  } catch (error) {
    return (
      <div className="min-h-screen bg-pink-50/30 flex items-center justify-center text-gray-900">
        <h2 className="text-xl font-bold">Order Not Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-pink-50/30 min-h-screen pt-12 pb-24 relative selection:bg-primary/20">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center max-w-3xl text-center">
        
        <div className="w-24 h-24 bg-green-100 border border-green-200 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-500/20 animate-bounce">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Order Successful!</h1>
        <p className="text-gray-600 text-lg mb-2">Thank you, <span className="font-bold text-gray-900">{(order.customerSnapshot as any)?.name || (order.customerSnapshot as any)?.fullName}</span>.</p>
        <p className="text-gray-500 mb-10 max-w-md">Your order has been placed successfully and is being processed. We will contact you shortly for delivery.</p>

        <div className="w-full bg-white rounded-3xl p-8 md:p-10 border border-pink-200 shadow-xl shadow-pink-100/50 mb-10 text-left">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-pink-100 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
              <p className="text-2xl font-black text-primary font-mono">{order.id.slice(-8).toUpperCase()}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-50 px-5 py-2.5 rounded-xl border border-green-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Status</p>
                <p className="text-sm font-black text-green-600 uppercase tracking-wide">{order.status}</p>
              </div>
              <div className="bg-pink-50 px-5 py-2.5 rounded-xl border border-pink-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                <p className="text-sm font-black text-primary">Rs. {Number(order.totalAmount).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-pink-100">
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                <Truck className="w-4 h-4" /> Delivery Address
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed space-y-1 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="font-bold text-gray-900">{(order.customerSnapshot as any)?.name || (order.customerSnapshot as any)?.fullName}</p>
                <p>{(order.shippingAddress as any)?.addressLine1}</p>
                <p>{(order.shippingAddress as any)?.city}, Tamil Nadu {(order.shippingAddress as any)?.pincode}</p>
                <p className="pt-2 mt-2 border-t border-gray-200 flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-xs uppercase">Phone:</span> 
                  +91 {(order.customerSnapshot as any)?.phone}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                <Package className="w-4 h-4" /> Order Summary
              </h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between text-sm font-bold text-gray-600">
                  <span>Items ({order.items.reduce((acc:any, item:any) => acc + item.quantity, 0)})</span>
                  <span>Rs. {Number(order.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-600 pb-3 border-b border-gray-200 border-dashed">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-end pt-1">
                  <span className="text-base font-black text-gray-900">Total</span>
                  <span className="text-xl font-black text-primary">Rs. {Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-primary px-6 py-3 rounded-xl font-bold transition-all">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
            <Link href="/shop" className="flex items-center justify-center gap-2 bg-primary hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/30">
              <ShoppingCart className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
