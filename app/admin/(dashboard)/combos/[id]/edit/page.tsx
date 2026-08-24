import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getProductById } from '@/lib/services/products/product.service';
import { getActiveCategories } from '@/lib/services/categories/category.service';
import { ProductForm } from '../../../products/components/ProductForm';
import { serializeDecimals } from '@/lib/utils/serialization';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Combo | Sky Crackers Admin',
};

export default async function EditComboPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin();
  
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  
  if (!product || !product.isCombo) {
    notFound();
  }

  const categories = await getActiveCategories();
  const serializedProduct = serializeDecimals(product);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Combo</h1>
        <p className="text-sm text-muted-foreground">
          Update combo product details and inventory.
        </p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border/60 shadow-sm">
        <ProductForm 
          categories={categories} 
          initialData={serializedProduct} 
          isCombo={true}
        />
      </div>
    </div>
  );
}
