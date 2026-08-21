import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { getAdminCoupons } from '@/lib/services/coupons/coupon.service';
import { requireAdmin } from '@/lib/auth/server-auth';
import { CouponsClient } from './components/CouponsClient';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Coupons | Sky Crackers Admin',
};

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();
  const resolvedParams = await searchParams;

  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const limit = 10;

  const result = await getAdminCoupons({
    search: resolvedParams.search as string,
    status: resolvedParams.status as string,
    type: resolvedParams.type as string,
    sortBy: resolvedParams.sortBy as string,
    page: page.toString(),
    limit: limit.toString(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Coupons"
          description="Manage discount codes and promotions"
          breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            { label: 'Coupons' },
          ]}
        />
        <Link href="/admin/coupons/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Coupon
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
        <CouponsClient initialData={result.data} searchParams={resolvedParams} />
        
        {result.meta.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={result.meta.page}
              totalPages={result.meta.totalPages}
              baseUrl="/admin/coupons"
            />
          </div>
        )}
      </div>
    </div>
  );
}
