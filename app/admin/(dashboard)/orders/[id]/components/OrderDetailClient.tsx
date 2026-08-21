'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface OrderDetailClientProps {
  orderId: string;
  currentStatus: string;
  currentPaymentStatus: string;
}

export function OrderDetailClient({ orderId, currentStatus, currentPaymentStatus }: OrderDetailClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setIsConfirmOpen(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, paymentStatus }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update order status');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTriggerUpdate = () => {
    setIsConfirmOpen(true);
  };

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">Update Status</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Order Status</label>
          <select 
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700"
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PACKED">Packed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Status</label>
          <select 
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700"
            value={paymentStatus} 
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
            <option value="COD">COD</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button onClick={handleTriggerUpdate} disabled={isUpdating || (status === currentStatus && paymentStatus === currentPaymentStatus)}>
          <Save className="w-4 h-4 mr-2" />
          {isUpdating ? 'Updating...' : 'Update Order'}
        </Button>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleUpdate}
        title="Update Order Status"
        description={`Are you sure you want to change the order status to ${status} and payment status to ${paymentStatus}?`}
        confirmText="Update Status"
      />
    </div>
  );
}
