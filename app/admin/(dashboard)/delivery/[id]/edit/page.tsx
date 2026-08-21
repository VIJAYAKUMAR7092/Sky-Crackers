import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getDeliveryZoneById } from '@/lib/services/delivery/delivery.service';
import { DeliveryForm } from '../../components/DeliveryForm';

export const metadata = {
  title: 'Edit Delivery Zone | Sky Crackers Admin',
};

export default async function EditDeliveryZonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  
  const zone = await getDeliveryZoneById(id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Delivery Zone"
        description={`Update details for ${zone.name}`}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Delivery', href: '/admin/delivery' },
          { label: 'Edit' },
        ]}
      />

      <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm max-w-4xl">
        <DeliveryForm initialData={zone} />
      </div>
    </div>
  );
}
