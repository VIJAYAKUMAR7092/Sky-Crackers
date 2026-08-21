import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getProductById } from '@/lib/services/products/product.service';
import { ProductForm } from '../../components/ProductForm';
import { serializeDecimals } from '@/lib/utils/serialization';
import { getActiveCategories } from '@/lib/services/categories/category.service';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Edit Product | Sky Crackers Admin',
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Use sequential fetching to avoid overwhelming the local Prisma proxy
  const product = await getProductById(id);
  const categories = await getActiveCategories();

  const serializedProduct = serializeDecimals(product);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <Link href="/admin/products" className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Product</h1>
          <p className="text-sm text-muted-foreground">
            Update existing product information.
          </p>
        </div>
      </div>

      <ProductForm categories={categories} initialData={serializedProduct} />
    </div>
  );
}
