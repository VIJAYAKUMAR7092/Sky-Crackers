'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

import { Coupon } from '@prisma/client';

interface CouponsClientProps {
  initialData: Coupon[];
  searchParams: Record<string, string | string[] | undefined>;
}

export function CouponsClient({ initialData, searchParams }: CouponsClientProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Expired', value: 'expired' },
  ];

  const typeFilters = [
    { label: 'All', value: 'all' },
    { label: 'Percentage', value: 'PERCENTAGE' },
    { label: 'Fixed', value: 'FIXED' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Highest Discount', value: 'discount_desc' },
    { label: 'Highest Usage', value: 'usage_desc' },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.delete('page');
    }
    router.push(`/admin/coupons?${params.toString()}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/coupons/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<Coupon>[] = [
    {
      header: 'Code',
      accessorKey: 'code',
      cell: (item: Coupon) => (
        <div>
          <div className="font-bold text-foreground uppercase">{item.code}</div>
          {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
        </div>
      ),
    },
    {
      header: 'Discount',
      accessorKey: 'discountValue',
      cell: (item: Coupon) => (
        <div className="font-medium">
          {item.discountType === 'PERCENTAGE' 
            ? `${Number(item.discountValue)}%` 
            : `,1${Number(item.discountValue).toFixed(2)}`}
        </div>
      ),
    },
    {
      header: 'Min Order',
      accessorKey: 'minOrderValue',
      cell: (item: Coupon) => `,1${Number(item.minOrderValue).toFixed(2)}`,
    },
    {
      header: 'Usage',
      accessorKey: 'usedCount',
      cell: (item: Coupon) => (
        <div className="text-sm">
          {item.usedCount} {item.usageLimit ? `/ ${item.usageLimit}` : 'uses'}
        </div>
      ),
    },
    {
      header: 'Expiry',
      accessorKey: 'expiryDate',
      cell: (item: Coupon) => {
        if (!item.expiryDate) return <span className="text-slate-400 text-sm">Never</span>;
        const isExpired = new Date(item.expiryDate) < new Date();
        return (
          <span className={`text-sm ${isExpired ? 'text-red-500 font-medium' : 'text-slate-600'}`}>
            {new Date(item.expiryDate).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'active',
      cell: (item: Coupon) => {
        const isExpired = item.expiryDate && new Date(item.expiryDate) < new Date();
        let variant: 'success' | 'secondary' | 'destructive' = 'success';
        let label = 'Active';
        
        if (!item.active) {
          variant = 'secondary';
          label = 'Inactive';
        } else if (isExpired) {
          variant = 'destructive';
          label = 'Expired';
        }

        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (item: Coupon) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/coupons/${item.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setDeleteId(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <FilterBar
        searchPlaceholder="Search coupon code..."
        onSearch={(val: string) => handleFilterChange('search', val)}
        filters={[
          {
            name: 'Status',
            options: statusFilters,
            value: (searchParams.status as string) || 'all',
            onChange: (val: string) => handleFilterChange('status', val),
          },
          {
            name: 'Type',
            options: typeFilters,
            value: (searchParams.type as string) || 'all',
            onChange: (val: string) => handleFilterChange('type', val),
          },
          {
            name: 'Sort By',
            options: sortOptions,
            value: (searchParams.sortBy as string) || 'newest',
            onChange: (val: string) => handleFilterChange('sortBy', val),
          }
        ]}
      />

      <DataTable 
        columns={columns} 
        data={initialData} 
        keyExtractor={(item: Coupon) => item.id as string} 
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        description="Are you sure you want to delete this coupon? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        variant="danger"
      />
    </div>
  );
}
