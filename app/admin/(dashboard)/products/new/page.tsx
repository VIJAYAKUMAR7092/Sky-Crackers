import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { ProductForm } from '../components/ProductForm';
import { getActiveCategories } from '@/lib/services/categories/category.service';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Add Product | Sky Crackers Admin',
};

export default async function NewProductPage() {
  await requireAdmin();

  const categories = await getActiveCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <Link href="/admin/products" className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Add Product</h1>
          <p className="text-sm text-muted-foreground">
            Create a new product in your catalog.
          </p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
