'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2, ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryClientProps {
  initialData: Record<string, unknown>[];
  meta?: Record<string, unknown>;
  searchParams: Record<string, any>;
}

export function CategoryClient({ initialData, searchParams }: CategoryClientProps) {
  const router = useRouter();
  
  const isFiltered = !!searchParams.search || (searchParams.active && searchParams.active !== 'all');
  const [items, setItems] = useState(initialData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const isUpdatingRef = useRef(false);
  const lastUpdateRef = useRef(Date.now());

  // Only update items from server if we haven't reordered recently (within 2 seconds)
  // to prevent stale Next.js router cache from reverting the optimistic UI
  useEffect(() => {
    if (Date.now() - lastUpdateRef.current > 2000) {
      setItems(initialData);
    }
  }, [initialData]);

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' },
  ];
  
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1) ||
      isUpdatingRef.current
    ) return;
    
    isUpdatingRef.current = true;
    setIsUpdating(true);

    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    setItems(newItems); // Optimistic UI update
    lastUpdateRef.current = Date.now(); // Block stale server updates
    setIsUpdating(true);

    try {
      const payload = newItems.map((item, idx) => ({ id: item.id, displayOrder: idx + 1 }));
      const res = await fetch('/api/admin/categories/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        router.refresh();
      } else {
        console.error(await res.text());
        throw new Error("Failed");
      }
    } catch (error) {
      console.error("Failed to reorder");
      setItems(items); // Revert on actual error
    } finally {
      isUpdatingRef.current = false;
      setIsUpdating(false);
    }
  };

  const columns: ColumnDef<Record<string, unknown>>[] = [
    {
      header: 'Order',
      accessorKey: 'displayOrder',
      cell: (cat: any) => {
        const index = items.findIndex((i: any) => i.id === cat.id);
        return (
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => handleMove(index, 'up')}
              disabled={index === 0 || isUpdating || isFiltered}
              title={isFiltered ? "Cannot reorder while filtered" : ""}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center font-medium">{index + 1}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => handleMove(index, 'down')}
              disabled={index === items.length - 1 || isUpdating || isFiltered}
              title={isFiltered ? "Cannot reorder while filtered" : ""}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    },
    {
      header: 'Image',
      accessorKey: 'image',
      cell: (cat: any) => (
        <div className="w-12 h-12 rounded-lg border bg-muted dark:bg-slate-900 flex items-center justify-center overflow-hidden">
          {cat.image ? (
            <Image src={cat.image} alt={cat.name} width={48} height={48} className="object-cover w-full h-full" />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-400" />
          )}
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'name',
      cell: (cat: any) => (
        <div>
          <div className="font-medium text-foreground">{cat.name}</div>
          <div className="text-sm text-muted-foreground">{cat.slug}</div>
        </div>
      ),
    },
    {
      header: 'Products',
      accessorKey: '_count.products',
      cell: (cat: any) => (
        <span className="text-muted-foreground font-medium">{cat._count?.products || 0}</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'active',
      cell: (cat: any) => (
        <Badge variant={cat.active ? 'success' : 'secondary'}>
          {cat.active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (cat: any) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/categories/${cat.id}/edit`}>
              <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id as string)}>
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/categories/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems(items.filter(i => i.id !== deleteId)); // Optimistic delete
        lastUpdateRef.current = Date.now();
        router.refresh();
      } else {
        alert('Failed to delete category');
      }
    } catch (e) {
      console.error(e);
      alert('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.delete('page');
    
    lastUpdateRef.current = 0; // Allow server data to override when filtering
    router.push(`/admin/categories?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <FilterBar
          searchPlaceholder="Search categories..."
          onSearch={(val: string) => handleFilterChange('search', val)}
          filters={[
            {
              name: 'Status',
              options: statusFilters,
              value: searchParams.active || 'all',
              onChange: (val: string) => handleFilterChange('active', val),
            },
          ]}
        />
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <DataTable columns={columns} data={items} keyExtractor={(item: any) => item.id as string} />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Category"
        description="Are you sure you want to disable this category? It will no longer be visible on the store."
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
