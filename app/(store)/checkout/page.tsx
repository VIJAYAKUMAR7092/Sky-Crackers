import React from 'react';
import prisma from '@/lib/db/prisma';
import CheckoutClient from './CheckoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Sky Crackers',
  description: 'Secure checkout for your Sky Crackers order',
};

// Next.js dynamic render for checkout
export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const [settings, zones] = await Promise.all([
    prisma.websiteSettings.findUnique({ where: { id: 'global' } }),
    prisma.deliveryZone.findMany({
      where: { active: true },
      select: { state: true, minimumOrder: true }
    })
  ]);

  const defaultMinOrder = settings ? Number(settings.defaultMinOrder) : 5000;
  
  // Format zones for serialization (convert Decimal to number)
  const formattedZones = zones.map(z => ({
    state: z.state,
    minimumOrder: Number(z.minimumOrder)
  }));

  return (
    <CheckoutClient 
      defaultMinOrder={defaultMinOrder} 
      deliveryZones={formattedZones} 
    />
  );
}
