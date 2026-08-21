import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

// -----------------------------------------
// Singletons (SEO, Settings, Specific Sections)
// -----------------------------------------
export async function updateSingletonConfig(type: string, content: Record<string, unknown>, active: boolean = true) {
  const existing = await prisma.homepageSection.findFirst({
    where: { type },
  });

  if (existing) {
    return prisma.homepageSection.update({
      where: { id: existing.id },
      data: {
        content: content as Prisma.InputJsonValue,
        active,
      }
    });
  } else {
    return prisma.homepageSection.create({
      data: {
        type,
        content: content as Prisma.InputJsonValue,
        active,
      }
    });
  }
}

export async function getSingletonConfig(type: string) {
  return prisma.homepageSection.findFirst({
    where: { type }
  });
}

// -----------------------------------------
// Collections (Hero, Promo Banners, Sections)
// -----------------------------------------
export async function getCollectionItems(type: string) {
  return prisma.homepageSection.findMany({
    where: { type },
    orderBy: { displayOrder: 'asc' }
  });
}

export async function getCollectionItemById(id: string) {
  return prisma.homepageSection.findUnique({
    where: { id }
  });
}

export async function createCollectionItem(type: string, title: string, content: Record<string, unknown>, displayOrder: number = 0, active: boolean = true) {
  return prisma.homepageSection.create({
    data: {
      type,
      title,
      content: content as Prisma.InputJsonValue,
      displayOrder,
      active,
    }
  });
}

export async function updateCollectionItem(id: string, title: string, content: Record<string, unknown>, displayOrder: number, active: boolean) {
  return prisma.homepageSection.update({
    where: { id },
    data: {
      title,
      content: content as Prisma.InputJsonValue,
      displayOrder,
      active,
    }
  });
}

export async function deleteCollectionItem(id: string) {
  return prisma.homepageSection.delete({
    where: { id }
  });
}

// Helper to init default sections if missing
export async function ensureDefaultSections() {
  const sections = ['FEATURED_PRODUCTS', 'BEST_SELLERS', 'NEW_ARRIVALS', 'TRENDING', 'CATEGORIES', 'TESTIMONIALS', 'BRANDS'];
  for (const s of sections) {
    const t = `SECTION_${s}`;
    const existing = await prisma.homepageSection.findFirst({ where: { type: t } });
    if (!existing) {
      await prisma.homepageSection.create({
        data: {
          type: t,
          title: s.replace('_', ' '),
          content: { heading: s.replace('_', ' '), subHeading: '' },
          displayOrder: sections.indexOf(s),
          active: true,
        }
      });
    }
  }
}

// Get all CMS configurations for UI
export async function getFullHomepageCMS() {
  const all = await prisma.homepageSection.findMany({
    orderBy: { displayOrder: 'asc' }
  });

  return {
    heroBanners: all.filter(s => s.type === 'HERO_BANNER'),
    promoBanners: all.filter(s => s.type === 'PROMO_BANNER'),
    sections: all.filter(s => s.type.startsWith('SECTION_')),
    seo: all.find(s => s.type === 'SEO_CONFIG') || null,
    settings: all.find(s => s.type === 'SETTINGS_CONFIG') || null,
  };
}
