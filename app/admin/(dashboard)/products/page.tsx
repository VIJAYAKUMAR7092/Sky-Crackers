import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAdminProducts } from '@/lib/services/products/product.service';
import { getAdminProductsQuerySchema } from '@/lib/validations/product';
import { ProductClient } from './components/ProductClient';
import { serializeDecimals } from '@/lib/utils/serialization';
import { getActiveCategories } from '@/lib/services/categories/category.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Sky Crackers Admin',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireAdmin();

  const resolvedParams = await searchParams;
  
  // Safely parse params, converting single values appropriately
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

  // Use sequential fetching to avoid overwhelming the local Prisma proxy
  const data = await getAdminProducts(parsedQuery);
  const categories = await getActiveCategories();

  const serializedData = serializeDecimals(data);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage your products, pricing, and inventory.
        </p>
      </div>

      <ProductClient data={serializedData} categories={categories} />
    </div>
  );
}
