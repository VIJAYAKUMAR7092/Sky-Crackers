import { format } from 'date-fns';
import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getOrderById } from '@/lib/services/orders/order.service';
import { OrderDetailClient } from './components/OrderDetailClient';
import { OrderTimeline } from './components/OrderTimeline';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

export const metadata = {
  title: 'Order Details | Sky Crackers Admin',
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const order = await getOrderById(id);
  const customer = order.customer || (order.customerSnapshot as any) || {};
  const delivery = (order.deliverySnapshot as any) || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-5">
        <PageHeader
          title={`Order ${order.orderReference}`}
          description={`Placed on ${format(new Date(order.createdAt), 'dd/MM/yyyy')} at ${new Date(order.createdAt).toLocaleTimeString()}`}
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Orders', href: '/admin/orders' },
            { label: order.orderReference },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrderTimeline status={order.status} />

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg border bg-muted dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                      {item.product?.images?.[0]?.url ? (
                        <Image src={item.product.images[0].url} alt={item.productName} width={64} height={64} className="object-cover w-full h-full" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-muted-foreground">Qty: {item.quantity} x ₹{Number(item.unitPrice).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="font-semibold">₹{Number(item.totalAmount).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-red-500">-₹{Number(order.discountAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>₹{Number(order.deliveryCharge).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t mt-2">
                <span>Total</span>
                <span>₹{Number(order.finalTotal).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <OrderDetailClient 
            orderId={order.id} 
            currentStatus={order.status} 
            currentPaymentStatus={order.paymentStatus} 
          />
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Customer Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{customer.fullName || 'Guest'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              {customer.email && (
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{customer.email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>
            <div className="text-sm space-y-1">
              <p className="font-medium">{delivery.fullName}</p>
              <p>{delivery.addressLine1}</p>
              {delivery.addressLine2 && <p>{delivery.addressLine2}</p>}
              <p>{delivery.locality}</p>
              <p>{delivery.city}, {delivery.district}</p>
              <p>{delivery.state} - {delivery.pincode}</p>
              <p className="pt-2 font-medium">Phone: {delivery.phone}</p>
              {delivery.courier && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Assigned Transport / Courier</p>
                  <p className="font-medium text-sm text-blue-600 dark:text-blue-400">{delivery.courier}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Payment & Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Status</p>
                <Badge variant={order.status === 'DELIVERED' ? 'success' : 'default'}>{order.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                <Badge variant={order.paymentStatus === 'PAID' ? 'success' : 'secondary'}>{order.paymentStatus}</Badge>
              </div>
              {order.paymentMethod && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p className="font-medium text-sm">{order.paymentMethod}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
