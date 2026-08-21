import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAdminOrders } from '@/lib/services/orders/order.service';
import { OrdersClient } from './components/OrdersClient';
import { Pagination } from '@/components/ui/Pagination';

export const metadata = {
  title: 'Orders | Sky Crackers Admin',
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();

  const resolvedParams = await searchParams;

  const safeParams = {
    search: typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined,
    status: typeof resolvedParams.status === 'string' ? resolvedParams.status : undefined,
    paymentStatus: typeof resolvedParams.paymentStatus === 'string' ? resolvedParams.paymentStatus : undefined,
    page: typeof resolvedParams.page === 'string' ? Number(resolvedParams.page) : 1,
    limit: typeof resolvedParams.limit === 'string' ? Number(resolvedParams.limit) : 10,
  };

  const { data, meta } = await getAdminOrders(safeParams);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-5">
        <PageHeader
          title="Orders"
          description="Manage customer orders, track shipping, and update statuses."
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Orders' },
          ]}
        />
      </div>

      <OrdersClient initialData={data} meta={meta} searchParams={resolvedParams as Record<string, string>} />
      
      {meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          baseUrl="/admin/orders"
          searchParams={resolvedParams as any}
        />
      )}
    </div>
  );
}
