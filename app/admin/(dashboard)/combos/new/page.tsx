import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { ProductForm } from '../../products/components/ProductForm'; // Reuse existing product form
import { getActiveCategories } from '@/lib/services/categories/category.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Combo | Sky Crackers Admin',
};

export default async function NewComboPage() {
  await requireAdmin();
  
  const categories = await getActiveCategories();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Combo</h1>
        <p className="text-sm text-muted-foreground">
          Create a new combo product package.
        </p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border/60 shadow-sm">
        <ProductForm categories={categories} isCombo={true} />
      </div>
    </div>
  );
}
