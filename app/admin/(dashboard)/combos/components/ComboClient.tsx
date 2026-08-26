'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { updateComboDate } from '../actions';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Badge } from '@/components/ui/Badge';
import { Product, Category } from '@prisma/client';

type ProductWithCategory = Product & {
  category: Pick<Category, 'name'>;
};

interface ComboClientProps {
  data: ProductWithCategory[];
  validUpto: string;
}

export function ComboClient({ data, validUpto }: ComboClientProps) {
  const router = useRouter();
  const [items, setItems] = useState(data);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dateValue, setDateValue] = useState(validUpto);
  const [isSavingDate, setIsSavingDate] = useState(false);

  const handleSaveDate = async () => {
    setIsSavingDate(true);
    try {
      const res = await updateComboDate(dateValue);
      if (res.success) {
        alert("Validity date updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update date: " + res.error);
      }
    } catch (err) {
      alert("Failed to update date");
    } finally {
      setIsSavingDate(false);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1) ||
      isUpdating
    ) return;

    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap elements
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    setItems(newItems);

    // Save order
    setIsUpdating(true);
    try {
      await fetch('/api/admin/combos/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: newItems.map(item => item.id) })
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to reorder");
      setItems(items); // Revert on failure
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      // Just normal product deletion
      const res = await fetch(`/api/admin/products/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border/60 shadow-sm gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Validity Configuration</h2>
          <p className="text-sm text-muted-foreground">Set the "Valid up to" text shown on the website for Combo Packages.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input type="text" value={dateValue} onChange={e => setDateValue(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="e.g. 13TH AUGUST" />
          <Button onClick={handleSaveDate} disabled={isSavingDate} className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
            {isSavingDate ? "Saving..." : "Save Date"}
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border/60 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Combo Products</h2>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/combos/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Combo
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary/30 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Order</th>
              <th className="px-6 py-4 font-semibold">Product Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No combo products found.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0 || isUpdating}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center font-medium">{index + 1}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === items.length - 1 || isUpdating}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4">{item.category.name}</td>
                  <td className="px-6 py-4">
                    ₹{Number(item.sellingPrice).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={item.active ? 'success' : 'secondary'}>
                      {item.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Link href={`/admin/combos/${item.id}/edit`}>
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-rose-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Combo Product"
        description="Are you sure you want to delete this combo? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
