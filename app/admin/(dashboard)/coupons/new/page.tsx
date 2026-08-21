import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { CouponForm } from '../components/CouponForm';

export const metadata = {
  title: 'Create Coupon | Sky Crackers Admin',
};

export default async function NewCouponPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Coupon"
        description="Add a new discount code"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Coupons', href: '/admin/coupons' },
          { label: 'New' },
        ]}
      />

      <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm max-w-4xl">
        <CouponForm />
      </div>
    </div>
  );
}
