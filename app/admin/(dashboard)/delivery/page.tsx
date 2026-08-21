import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { getAdminDeliveryZones } from '@/lib/services/delivery/delivery.service';
import { requireAdmin } from '@/lib/auth/server-auth';
import { DeliveryClient } from './components/DeliveryClient';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Delivery Zones | Sky Crackers Admin',
};

export default async function DeliveryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const resolvedParams = await searchParams;

  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const limit = 10;

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
      </div>
    </div>
  );
}
