import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

export async function getSettings(type: string) {
  const setting = await prisma.homepageSection.findFirst({
    where: { type },
  });
  return setting?.content || {};
}

export async function updateSettings(type: string, content: Record<string, unknown>) {
  const existing = await prisma.homepageSection.findFirst({
    where: { type },
  });

  if (existing) {
    return prisma.homepageSection.update({
      where: { id: existing.id },
      data: {
        content: content as Prisma.InputJsonValue,
      }
    });
  } else {
    return prisma.homepageSection.create({
      data: {
        type,
        title: type.replace('_', ' '),
        content: content as Prisma.InputJsonValue,
        active: true,
      }
    });
  }
}

export async function getAllSettings() {
  const all = await prisma.homepageSection.findMany({
    where: {
      type: {
        in: ['GENERAL_SETTINGS', 'BUSINESS_SETTINGS', 'DELIVERY_SETTINGS', 'PAYMENT_SETTINGS', 'SEO_CONFIG']
      }
    }
  });

  return {
    general: all.find(s => s.type === 'GENERAL_SETTINGS')?.content || {},
    business: all.find(s => s.type === 'BUSINESS_SETTINGS')?.content || {},
    delivery: all.find(s => s.type === 'DELIVERY_SETTINGS')?.content || {},
    payment: all.find(s => s.type === 'PAYMENT_SETTINGS')?.content || {},
    seo: all.find(s => s.type === 'SEO_CONFIG')?.content || {},
  };
}
