import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import prisma from "@/lib/db/prisma";
import { MinimumOrderClient } from './MinimumOrderClient';
import { Metadata } from 'next';
import { serializeDecimals } from '@/lib/utils/serialization';

export const metadata: Metadata = {
  title: 'Minimum Order Settings | Sky Crackers Admin',
};

export default async function MinimumOrderPage() {
  await requireAdmin();

  // Fetch delivery zones which act as our states mapping
  const zones = await prisma.deliveryZone.findMany({
    orderBy: { name: 'asc' }
  });
  const settings = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
  const defaultMinOrder = settings?.defaultMinOrder ? Number(settings.defaultMinOrder) : 5000;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Minimum Order Configurations</h1>
        <p className="text-sm text-muted-foreground">
          Configure the minimum order amount required to place an order for each state.
        </p>
      </div>

      <MinimumOrderClient initialZones={serializeDecimals(zones)} defaultMinOrder={defaultMinOrder} />
    </div>
  );
}
