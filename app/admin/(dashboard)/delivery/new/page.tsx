import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { DeliveryForm } from '../components/DeliveryForm';

export const metadata = {
  title: 'Create Delivery Zone | Sky Crackers Admin',
};

export default async function NewDeliveryZonePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Delivery Zone"
        description="Add a new delivery zone and assign pincodes"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Delivery', href: '/admin/delivery' },
          { label: 'New' },
        ]}
      />

      <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm max-w-4xl">
        <DeliveryForm />
      </div>
    </div>
  );
}
