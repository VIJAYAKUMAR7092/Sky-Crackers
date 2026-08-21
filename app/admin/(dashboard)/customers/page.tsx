import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { getAdminCustomers } from '@/lib/services/customers/customer.service';
import { requireAdmin } from '@/lib/auth/server-auth';
import { CustomersClient } from './components/CustomersClient';
import { Pagination } from '@/components/ui/Pagination';

export const metadata = {
  title: 'Customers | Sky Crackers Admin',
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const resolvedParams = await searchParams;

  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const limit = 10;

  const result = await getAdminCustomers({
    search: resolvedParams.search as string,
    status: resolvedParams.status as string,
    sortBy: resolvedParams.sortBy as string,
    page,
    limit,
  });

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
      </div>
    </div>
  );
}
