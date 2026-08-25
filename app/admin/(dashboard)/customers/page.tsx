import React, { Suspense } from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { getAdminCustomers } from '@/lib/services/customers/customer.service';
import { requireAdmin } from '@/lib/auth/server-auth';
import { CustomersClient } from './components/CustomersClient';
import { Pagination } from '@/components/ui/Pagination';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Customers | Sky Crackers Admin',
};

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

async function CustomersDataWrapper({ resolvedParams, page, limit }: { resolvedParams: Record<string, any>, page: number, limit: number }) {
  const result = await getAdminCustomers({
    search: resolvedParams.search as string,
    status: resolvedParams.status as string,
    sortBy: resolvedParams.sortBy as string,
    page,
    limit,
  });

  return (
    <>
      <CustomersClient initialData={result.data} searchParams={resolvedParams} />
      
      {result.meta.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={result.meta.page}
            totalPages={result.meta.totalPages}
            baseUrl="/admin/customers"
          />
        </div>
      )}
    </>
  );
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const resolvedParams = await searchParams;

  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const limit = 10;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Customers"
          description="Manage your store customers"
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Customers' },
          ]}
        />
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
        <Suspense fallback={<TableSkeleton />}>
          <CustomersDataWrapper resolvedParams={resolvedParams} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
