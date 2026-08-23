"use client";

import React, { useState } from "react";
import { Package, Search, Clock, CheckCircle2, Truck, XCircle, MapPin, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await fetch(`/api/track-order?phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");
      setOrders(data.data);
      if (data.data.length > 0) {
        setExpandedId(data.data[0].id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "text-yellow-600 bg-yellow-50";
      case "CONFIRMED": return "text-blue-600 bg-blue-50";
      case "PACKED": return "text-indigo-600 bg-indigo-50";
      case "SHIPPED": return "text-purple-600 bg-purple-50";
      case "DELIVERED": return "text-green-600 bg-green-50";
      case "CANCELLED": return "text-red-600 bg-red-50";
      case "DELETED": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-5 h-5" />;
      case "CONFIRMED": return <CheckCircle2 className="w-5 h-5" />;
      case "PACKED": return <Package className="w-5 h-5" />;
      case "SHIPPED": return <Truck className="w-5 h-5" />;
      case "DELIVERED": return <CheckCircle2 className="w-5 h-5" />;
      case "CANCELLED": return <XCircle className="w-5 h-5" />;
      case "DELETED": return <XCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const renderTimeline = (currentStatus: string, isDeleted: boolean) => {
    if (isDeleted) {
      return (
        <div className="flex items-center gap-3 text-red-600 p-4 bg-red-50 rounded-xl mt-4">
          <XCircle className="w-6 h-6" />
          <span className="font-bold">Order Deleted / Cancelled.</span>
        </div>
      );
    }
    const statuses = ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"];
    
    if (currentStatus === "CANCELLED") {
      return (
        <div className="flex items-center gap-3 text-red-600 p-4 bg-red-50 rounded-xl mt-4">
          <XCircle className="w-6 h-6" />
          <span className="font-bold">This order has been cancelled.</span>
        </div>
      );
    }

    const currentIndex = statuses.indexOf(currentStatus);
    
    return (
      <div className="mt-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full hidden sm:block"></div>
        <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-4 sm:gap-0">
          {statuses.map((s, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            
            return (
              <div key={s} className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                  isCompleted ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-300'
                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                  {getStatusIcon(s)}
                </div>
                <div className={`text-xs sm:text-sm font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
          
          <Package className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">Enter the mobile number you used during checkout to track the current status of your orders.</p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <span className="pl-4 font-medium text-gray-500">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-transparent border-none focus:ring-0 px-3 py-3 text-gray-900 font-bold placeholder:font-normal"
                maxLength={10}
              />
              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="bg-primary hover:bg-red-700 text-white p-3 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
              >
                {loading ? <Clock className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>}
          </form>
        </div>

        {searched && !loading && orders.length === 0 && (
          <div className="text-center bg-white p-10 rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500">We couldn't find any orders linked to +91 {phone}.</p>
            <Link href="/shop" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-red-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-gray-900 px-2">Your Orders ({orders.length})</h2>
            
            {orders.map((order) => {
              const customer = order.customerSnapshot;
              const delivery = order.deliverySnapshot;
              const isExpanded = expandedId === order.id;
              
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:border-primary/30">
                  <div 
                    className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-lg text-gray-900">{order.orderReference}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        Placed on {format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total</p>
                        <p className="font-extrabold text-gray-900">₹{Number(order.finalTotal || 0).toFixed(2)}</p>
                      </div>
                      <div className="text-gray-400">
                        {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 md:px-6 pb-6 border-t border-gray-100 bg-gray-50/50">
                      
                      {renderTimeline(order.status, order.isDeleted)}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
                            <MapPin className="w-4 h-4 text-primary" /> Delivery Details
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-900">Name:</span> {customer?.fullName}</p>
                            <p><span className="font-medium text-gray-900">Phone:</span> +91 {customer?.phone}</p>
                            <p><span className="font-medium text-gray-900">Address:</span> {delivery?.addressLine1}, {delivery?.city}, {delivery?.state} - {delivery?.pincode}</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
                            <CreditCard className="w-4 h-4 text-primary" /> Order Items
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            
                            <p><span className="font-medium text-gray-900">Status:</span> {order.paymentStatus}</p>
                          </div>
                          
                          <div className="space-y-3 pt-3 border-t border-gray-100 max-h-32 overflow-y-auto custom-scrollbar pr-2">
                            {order.items.map((item: any, i: number) => (
                              <div key={i} className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-800 line-clamp-1">{item.quantity}x {item.productName}</span>
                                <span className="font-bold text-gray-900 shrink-0">₹{Number(item.unitPrice || 0).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
