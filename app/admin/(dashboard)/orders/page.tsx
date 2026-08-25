import React, { Suspense } from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAdminOrders } from '@/lib/services/orders/order.service';
import { OrdersClient } from './components/OrdersClient';
import { Pagination } from '@/components/ui/Pagination';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Orders | Sky Crackers Admin',
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

async function OrdersDataWrapper({ resolvedParams, safeParams }: { resolvedParams: Record<string, any>, safeParams: any }) {
  const { data, meta } = await getAdminOrders(safeParams);

  return (
    <>
      <OrdersClient initialData={data} meta={meta} searchParams={resolvedParams as Record<string, string>} />
      
      {meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          baseUrl="/admin/orders"
          searchParams={resolvedParams as any}
        />
      )}
    </>
  );
}

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

      <Suspense fallback={<TableSkeleton />}>
        <OrdersDataWrapper resolvedParams={resolvedParams} safeParams={safeParams} />
      </Suspense>
    </div>
  );
}
