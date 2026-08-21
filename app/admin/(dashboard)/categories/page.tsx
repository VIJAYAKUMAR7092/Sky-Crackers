import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAdminCategories } from '@/lib/services/categories/category.service';
import { CategoryClient } from './components/CategoryClient';
import { Pagination } from '@/components/ui/Pagination';

export const metadata = {
  title: 'Categories | Sky Crackers Admin',
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();

  // Await search params in Next.js 15+ (Promise-based)
  const resolvedParams = await searchParams;

  // Safely parse search params
  const safeParams = {
    search: typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined,
    active: typeof resolvedParams.active === 'string' ? resolvedParams.active : undefined,
    page: typeof resolvedParams.page === 'string' ? Number(resolvedParams.page) : 1,
    limit: typeof resolvedParams.limit === 'string' ? Number(resolvedParams.limit) : 10,
  };

  const { data, meta } = await getAdminCategories(safeParams);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-5">
        <PageHeader
          title="Categories"
          description="Manage your product categories, images, and display order."
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Categories' },
          ]}
        />
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoryClient initialData={data} meta={meta} searchParams={resolvedParams as Record<string, string>} />
      
      {meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          baseUrl="/admin/categories"
          searchParams={searchParams as any}
        />
      )}
    </div>
  );
}
