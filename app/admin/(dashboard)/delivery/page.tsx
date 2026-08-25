import React, { Suspense } from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { getAdminDeliveryZones } from '@/lib/services/delivery/delivery.service';
import { requireAdmin } from '@/lib/auth/server-auth';
import { DeliveryClient } from './components/DeliveryClient';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Delivery Zones | Sky Crackers Admin',
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

async function DeliveryDataWrapper({ resolvedParams, page, limit }: { resolvedParams: Record<string, any>, page: number, limit: number }) {
  const result = await getAdminDeliveryZones({
    search: resolvedParams.search as string,
    status: resolvedParams.status as string,
    state: resolvedParams.state as string,
    courier: resolvedParams.courier as string,
    sortBy: resolvedParams.sortBy as string,
    page: page.toString(),
    limit: limit.toString(),
  });

  return (
    <>
      <DeliveryClient initialData={result.data} searchParams={resolvedParams} />
      
      {result.meta.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={result.meta.page}
            totalPages={result.meta.totalPages}
            baseUrl="/admin/delivery"
          />
        </div>
      )}
    </>
  );
}

export default async function DeliveryPage({
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
          title="Delivery Zones"
          description="Manage delivery areas, charges, and pincodes"
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Delivery' },
          ]}
        />
        <Link href="/admin/delivery/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Zone
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
        <Suspense fallback={<TableSkeleton />}>
          <DeliveryDataWrapper resolvedParams={resolvedParams} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
