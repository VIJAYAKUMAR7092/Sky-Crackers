'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { Pagination } from '@/components/ui/Pagination';
import { FilterBar } from '@/components/ui/FilterBar';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Badge } from '@/components/ui/Badge';
import { Product, Category } from '@prisma/client';

type ProductWithCategory = Product & {
  category: Pick<Category, 'name'>;
};

interface ProductClientProps {
  data: {
    products: ProductWithCategory[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  categories: { id: string; name: string }[];
}

export function ProductClient({ data, categories }: ProductClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set('page', '1'); // Reset to page 1 on filter
    return params.toString();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      router.refresh();
    } catch (error) {
      alert('Failed to delete product.');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<ProductWithCategory>[] = [
    {
      header: 'Product',
      accessorKey: 'name',
      cell: (item) => (
        <div>
          <div className="font-medium text-foreground">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.sku || 'No SKU'}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'categoryId',
      cell: (item) => <span className="text-sm">{item.category.name}</span>,
    },
    {
      header: 'Price',
      accessorKey: 'sellingPrice',
      cell: (item) => (
        <div>
          <div className="font-medium">₹{Number(item.sellingPrice).toFixed(2)}</div>
          {item.mrp > item.sellingPrice && (
            <div className="text-xs text-muted-foreground line-through">₹{Number(item.mrp).toFixed(2)}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Stock',
      accessorKey: 'stockStatus',
      cell: (item) => (
        <Badge variant={item.stockStatus === 'IN_STOCK' ? 'success' : 'destructive'}>
          {item.stockStatus.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'active',
      cell: (item) => (
        <Badge variant={item.active ? 'default' : 'secondary'}>
          {item.active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/products/${item.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setDeleteId(item.id)}
            disabled={!item.active} // Already inactive
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const searchParamFilters = Object.fromEntries(searchParams.entries());

  return (
    <div className="space-y-6">
      <FilterBar
        onSearch={(q) => router.push(`?${createQueryString('search', q)}`)}
        searchPlaceholder="Search products by name or SKU..."
        filters={[
          {
            name: 'All Categories',
            options: categories.map(c => ({ label: c.name, value: c.id })),
            value: searchParams.get('categoryId') || '',
            onChange: (val) => router.push(`?${createQueryString('categoryId', val)}`)
          },
          {
            name: 'All Status',
            options: [
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' }
            ],
            value: searchParams.get('active') || '',
            onChange: (val) => router.push(`?${createQueryString('active', val)}`)
          },
          {
            name: 'Stock Status',
            options: [
              { label: 'In Stock', value: 'IN_STOCK' },
              { label: 'Out of Stock', value: 'OUT_OF_STOCK' }
            ],
            value: searchParams.get('stockStatus') || '',
            onChange: (val) => router.push(`?${createQueryString('stockStatus', val)}`)
          }
        ]}
        actions={
          <Link href="/admin/products/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        }
      />

      <DataTable
        data={data.products}
        columns={columns}
        keyExtractor={(item) => item.id}
      />

      <Pagination
        currentPage={data.meta.page}
        totalPages={data.meta.totalPages}
        baseUrl="/admin/products"
        searchParams={searchParamFilters}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? It will be marked as inactive and hidden from the store, but order history will be preserved."
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}
