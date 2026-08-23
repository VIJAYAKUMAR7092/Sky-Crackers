import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getCustomerById } from '@/lib/services/customers/customer.service';
import { CustomerDetailClient } from './components/CustomerDetailClient';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { MapPin, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Customer Details | Sky Crackers Admin',
};

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const customer = await getCustomerById(id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-5">
        <PageHeader
          title={customer.fullName}
          description={`Customer since ${new Date(customer.createdAt).toLocaleDateString()}`}
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Customers', href: '/admin/customers' },
            { label: customer.fullName },
          ]}
        />
        
        <CustomerDetailClient 
          customerId={customer.id} 
          currentActive={customer.active} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-muted-foreground text-sm mb-1">Total Orders</div>
          <div className="text-2xl font-bold">{customer.totalOrders}</div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-muted-foreground text-sm mb-1">Total Spending</div>
          <div className="text-2xl font-bold">`₹{Number(customer.totalSpending).toFixed(2)}</div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-muted-foreground text-sm mb-1">Avg Order Value</div>
          <div className="text-2xl font-bold">`₹{Number(customer.averageOrderValue).toFixed(2)}</div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-muted-foreground text-sm mb-1">Last Order Date</div>
          <div className="text-lg font-bold mt-1">
            {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground block">Email</span>
                <span className="font-medium">{customer.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Phone</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              {customer.altPhone && (
                <div>
                  <span className="text-muted-foreground block">Alt Phone</span>
                  <span className="font-medium">{customer.altPhone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Saved Addresses</h3>
            {customer.addresses.length === 0 ? (
              <EmptyState 
                icon={MapPin} 
                title="No addresses" 
                description="This customer hasn't saved any addresses yet." 
              />
            ) : (
              <div className="space-y-4">
                {customer.addresses.map((address: any) => (
                  <div key={address.id} className="border border-border rounded-lg p-3 text-sm">
                    <p className="font-medium mb-1">{address.fullName}</p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.locality}</p>
                    <p>{address.city}, {address.district}</p>
                    <p>{address.state} - {address.pincode}</p>
                    <p className="pt-2 text-muted-foreground">Phone: {address.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
            {customer.orders.length === 0 ? (
              <EmptyState 
                icon={ShoppingBag} 
                title="No orders" 
                description="This customer hasn't placed any orders yet." 
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-800/50 rounded-t-lg">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg font-medium">Order Ref</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Payment</th>
                      <th className="px-4 py-3 rounded-tr-lg font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map((order: any) => (
                      <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <Link href={`/admin/orders/${order.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {order.orderReference}
                          </Link>
                        </td>
                        <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <Badge variant={order.status === 'DELIVERED' ? 'success' : order.status === 'CANCELLED' ? 'destructive' : 'default'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={order.paymentStatus === 'PAID' ? 'success' : 'secondary'}>
                            {order.paymentStatus}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">`₹{Number(order.finalTotal).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
