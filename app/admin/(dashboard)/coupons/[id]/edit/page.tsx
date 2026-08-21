import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getCouponById } from '@/lib/services/coupons/coupon.service';
import { CouponForm } from '../../components/CouponForm';

export const metadata = {
  title: 'Edit Coupon | Sky Crackers Admin',
};

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const coupon = await getCouponById(id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Coupon"
        description={`Update details for ${coupon.code}`}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Coupons', href: '/admin/coupons' },
          { label: 'Edit' },
        ]}
      />

      <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm max-w-4xl">
        <CouponForm initialData={coupon} />
      </div>
    </div>
  );
}
