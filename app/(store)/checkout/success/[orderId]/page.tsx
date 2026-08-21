import React from "react";
import Link from "next/link";
import { getOrderById } from "@/lib/services/orders/order.service";
import { CheckCircle2, Package, Truck, Download, ArrowRight } from "lucide-react";

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = await params;
  let order;
  try {
    order = await getOrderById(resolvedParams.orderId);
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <h2>Order Not Found</h2>
      </div>
    );
  }

  
  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 selection:bg-primary/30 selection:text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center max-w-3xl text-center">
        <div className="w-24 h-24 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-in zoom-in duration-500">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Order Successful!</h1>
        <p className="text-zinc-400 text-lg mb-2">Thank you, {(order.customerSnapshot as any)?.fullName}.</p>
        <p className="text-zinc-500 mb-10">Your premium Sivakasi fireworks order has been received and is currently being processed.</p>

        <div className="bg-white/5 border border-white/10 rounded-3xl w-full p-8 text-left mb-10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Order Number</p>
              <p className="text-lg font-bold text-white">{order.orderReference}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Date</p>
              <p className="text-sm font-medium text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Total Amount</p>
              <p className="text-lg font-bold text-primary">₹{Number(order.finalTotal).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Status</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold">
                {order.status}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Delivery Estimate
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                2-5 Business Days<br/>
                Will be delivered securely to {(order.deliverySnapshot as any)?.city}.
              </p>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" /> Order Items
              </h3>
              <p className="text-sm text-zinc-400">
                {order.items.length} premium item(s) included in this order.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          
          
          <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-not-allowed">
            <Download className="h-5 w-5" /> Invoice
          </button>
        </div>

        <div className="mt-12">
          <Link href="/shop" className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
