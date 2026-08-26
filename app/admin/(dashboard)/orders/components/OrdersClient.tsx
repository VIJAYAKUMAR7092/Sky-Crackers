'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useState, useTransition } from 'react';

import Link from 'next/link';
import { format } from 'date-fns';

interface OrdersClientProps {
  initialData: Record<string, unknown>[];
  meta?: Record<string, unknown>;
  searchParams: Record<string, any>;
}

export function OrdersClient({ initialData, searchParams }: OrdersClientProps) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!orderToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete order");
      alert("Order deleted successfully");
      startTransition(() => router.refresh());
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
      setOrderToDelete(null);
    }
  };


  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Packed', value: 'PACKED' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];

  const paymentFilters = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Paid', value: 'PAID' },
    { label: 'Failed', value: 'FAILED' },
    { label: 'Refunded', value: 'REFUNDED' },
    { label: 'COD', value: 'COD' },
  ];

  const columns: ColumnDef<Record<string, unknown>>[] = [
    {
      header: 'Order ID',
      accessorKey: 'orderReference',
      cell: (order: any) => (
        <span className="font-semibold text-foreground">{order.orderReference}</span>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (order: any) => format(new Date(order.createdAt), 'dd/MM/yyyy'),
    },
    {
      header: 'Customer',
      accessorKey: 'customer',
      cell: (order: any) => (
        <div>
          <div className="font-medium text-foreground">{order.customer?.fullName || 'Guest'}</div>
          <div className="text-sm text-muted-foreground">{order.customer?.phone || order.customerSnapshot?.phone}</div>
        </div>
      ),
    },
    {
      header: 'Total',
      accessorKey: 'finalTotal',
      cell: (order: any) => `₹${Number(order.finalTotal).toFixed(2)}`,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (order: any) => {
        let variant: "default" | "secondary" | "success" | "destructive" | "warning" = "secondary";
        if (order.status === 'DELIVERED') variant = 'success';
        if (order.status === 'CANCELLED') variant = 'destructive';
        if (order.status === 'SHIPPED' || order.status === 'PACKED') variant = 'default';
        if (order.status === 'PENDING') variant = 'warning';
        return <Badge variant={variant}>{order.status}</Badge>;
      },
    },
    {
      header: 'Payment',
      accessorKey: 'paymentStatus',
      cell: (order: any) => {
        let variant: "default" | "secondary" | "success" | "destructive" | "warning" = "secondary";
        if (order.paymentStatus === 'PAID') variant = 'success';
        if (order.paymentStatus === 'FAILED' || order.paymentStatus === 'REFUNDED') variant = 'destructive';
        if (order.paymentStatus === 'PENDING') variant = 'warning';
        if (order.paymentStatus === 'COD') variant = 'default';
        return <Badge variant={variant}>{order.paymentStatus}</Badge>;
      },
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (order: any) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/orders/${order.id}`}>
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.delete('page');
    
    router.push(`/admin/orders?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <FilterBar
        searchPlaceholder="Search order ID or customer..."
        onSearch={(val: string) => handleFilterChange('search', val)}
        filters={[
          {
            name: 'Status',
            options: statusFilters,
            value: searchParamsHook.get('status') || 'all',
            onChange: (val: string) => handleFilterChange('status', val),
          },
          {
            name: 'Payment',
            options: paymentFilters,
            value: searchParamsHook.get('paymentStatus') || 'all',
            onChange: (val: string) => handleFilterChange('paymentStatus', val),
          },
        ]}
      />

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <DataTable columns={columns} data={initialData} keyExtractor={(item: any) => item.id as string} />
      </div>
      <ConfirmDialog
        isOpen={!!orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        confirmText={isDeleting || isPending ? "Deleting..." : "Delete"}
        variant="danger"
      />
    </div>
  );
}
