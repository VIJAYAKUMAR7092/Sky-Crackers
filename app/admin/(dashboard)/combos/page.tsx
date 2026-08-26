import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import prisma from "@/lib/db/prisma";
import { serializeDecimals } from '@/lib/utils/serialization';
import { ComboClient } from './components/ComboClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Combo Management | Sky Crackers Admin',
};

export default async function CombosPage() {
  await requireAdmin();

  // Fetch all combo products
  const combos = await prisma.product.findMany({
    where: { isCombo: true },
    include: { category: true },
    orderBy: { comboOrder: 'asc' }
  });

  const settings = await prisma.websiteSettings.findUnique({
    where: { id: 'global' }
  });

  const serializedData = serializeDecimals(combos);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Combo Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage your combo products and their display order on the homepage.
        </p>
      </div>

      <ComboClient data={serializedData} validUpto={settings?.comboValidUpto || "13TH AUGUST"} />
    </div>
  );
}
