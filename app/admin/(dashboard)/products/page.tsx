import React, { Suspense } from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAdminProducts } from '@/lib/services/products/product.service';
import { getAdminProductsQuerySchema } from '@/lib/validations/product';
import { ProductClient } from './components/ProductClient';
import { serializeDecimals } from '@/lib/utils/serialization';
import { getActiveCategories } from '@/lib/services/categories/category.service';
import { Metadata } from 'next';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | Sky Crackers Admin',
};

// Simple skeleton that matches the table layout area
function TableSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-16 w-full bg-card border border-border/50 rounded-xl" />
      <div className="h-64 w-full bg-card border border-border/50 rounded-xl flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    </div>
  );
}

async function ProductsDataWrapper({ resolvedParams }: { resolvedParams: Record<string, any> }) {
  const parsedQuery = getAdminProductsQuerySchema.parse({
    page: resolvedParams.page ? Number(resolvedParams.page) : undefined,
    limit: resolvedParams.limit ? Number(resolvedParams.limit) : undefined,
    search: resolvedParams.search as string | undefined,
    categoryId: resolvedParams.categoryId as string | undefined,
    active: resolvedParams.active as string | undefined,
    stockStatus: resolvedParams.stockStatus as 'IN_STOCK' | 'OUT_OF_STOCK' | undefined,
    sortBy: resolvedParams.sortBy as any,
    sortOrder: resolvedParams.sortOrder as any,
  });

  const [data, categories] = await Promise.all([
    getAdminProducts(parsedQuery),
    getActiveCategories()
  ]);

  const serializedData = serializeDecimals(data);

  return <ProductClient data={serializedData} categories={categories} />;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireAdmin();
  const resolvedParams = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage your products, pricing, and inventory.
        </p>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ProductsDataWrapper resolvedParams={resolvedParams} />
      </Suspense>
    </div>
  );
}
