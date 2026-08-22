"use client";

import React, { useState } from 'react';
import { PackageSearch, CheckCircle2, Clock, Truck, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ORDER_STATUS_STEPS = [
  { status: 'PENDING', label: 'Order Placed', icon: Clock },
  { status: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
  { status: 'PACKED', label: 'Packed', icon: PackageSearch },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
  { status: 'DELIVERED', label: 'Delivered', icon: Home },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !phone) {
      setError('Please enter both Order ID and Mobile Number.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderReference: orderId.trim(), phone: phone.trim() })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to track order');
      }
      
      setOrderData(data);
    } catch (err: any) {
      setError(err.message || 'Order not found. Please check your details.');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (currentStatus: string) => {
    if (currentStatus === 'CANCELLED') return -1;
    return ORDER_STATUS_STEPS.findIndex(s => s.status === currentStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 pt-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your Order ID and Mobile Number to get real-time updates.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Order ID</label>
                <input 
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. SC-1001"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Used during checkout"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-14 text-lg font-bold" disabled={loading}>
              {loading ? 'Searching...' : 'Track Order'}
            </Button>
          </form>
        </div>

        {orderData && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order {orderData.orderReference}</h2>
                <p className="text-sm text-gray-500 mt-1">Placed on {new Date(orderData.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{parseFloat(orderData.finalTotal).toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
              </div>
            </div>

            <div className="mb-10">
              {orderData.status === 'CANCELLED' ? (
                <div className="p-6 bg-red-50 rounded-xl border border-red-100 text-center">
                  <h3 className="text-red-700 font-bold text-lg mb-2">Order Cancelled</h3>
                  <p className="text-red-600/80 text-sm">This order has been cancelled.</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 md:left-1/2 md:-ml-0.5" />
                  
                  <div className="space-y-8 md:space-y-0 md:flex md:justify-between relative">
                    {ORDER_STATUS_STEPS.map((step, idx) => {
                      const currentIndex = getStatusIndex(orderData.status);
                      const isCompleted = idx <= currentIndex;
                      const isCurrent = idx === currentIndex;
                      const Icon = step.icon;

                      return (
                        <div key={step.status} className="relative flex items-center md:flex-col md:w-1/5 z-10">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-4 md:mx-auto transition-colors duration-300 ${isCompleted ? 'bg-primary border-primary/20 text-white' : 'bg-white border-gray-100 text-gray-300'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="ml-6 md:ml-0 md:mt-4 md:text-center">
                            <p className={`font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                            {isCurrent && <p className="text-xs text-primary font-medium mt-1">Current Status</p>}
                          </div>

                          {idx < ORDER_STATUS_STEPS.length - 1 && (
                            <div className={`hidden md:block absolute top-8 left-1/2 w-full h-1 -z-10 ${idx < currentIndex ? 'bg-primary' : 'bg-gray-100'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{item.productName}</p>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity} × ₹{parseFloat(item.unitPrice).toLocaleString()}</p>
                    </div>
                    <div className="font-bold text-gray-900 text-sm">₹{parseFloat(item.totalAmount).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
