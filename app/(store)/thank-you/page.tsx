import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/services/orders/order.service';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DownloadPdfButton } from './components/DownloadPdfButton';

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const orderId = params.order;

  if (!orderId) {
    return notFound();
  }

  let order;
  try {
    order = await getOrderById(orderId as string);
  } catch (error) {
    return notFound();
  }

  const customer = order.customer || (order.customerSnapshot as any) || {};

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center space-y-8 border border-slate-100 dark:border-slate-700">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-500" />
          </div>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Thank You for Purchasing!</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your order has been placed successfully and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 text-left border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b pb-2">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Order ID</span>
              <span className="font-medium text-slate-900 dark:text-white">{order.orderReference}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Date</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Customer</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {customer.fullName || 'Guest'}
              </span>
            </div>
            
            <div className="flex justify-between pt-3 border-t">
              <span className="font-semibold text-slate-900 dark:text-white">Total Amount</span>
              <span className="font-bold text-primary text-lg">
                ₹{Number(order.finalTotal).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <DownloadPdfButton orderId={order.id} orderReference={order.orderReference} />
          
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 bg-white/10">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
