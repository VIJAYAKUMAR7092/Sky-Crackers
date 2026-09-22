import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';

// WebsiteSettings
export const getWebsiteSettings = unstable_cache(async () => {
  try {
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: 'global' },
    });
    return settings || { id: 'global', siteName: 'Sky Crackers', logoUrl: null, primaryPhone: null, whatsapp: null, email: null, address: null, facebook: null, instagram: null, youtube: null, twitter: null, footerText: null, priceListUrl: null, comboValidUpto: null, defaultMinOrder: 5000 as any };
  } catch (err) {
    console.error("Error fetching website settings:", err);
    return { id: 'global', siteName: 'Sky Crackers', logoUrl: null, primaryPhone: null, whatsapp: null, email: null, address: null, facebook: null, instagram: null, youtube: null, twitter: null, footerText: null, priceListUrl: null, comboValidUpto: null, defaultMinOrder: 5000 as any };
  }
}, ['website-settings-global'], { revalidate: 3600, tags: ['settings'] });

export async function updateWebsiteSettings(data: Prisma.WebsiteSettingsUpdateInput) {
  return prisma.websiteSettings.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data as any },
  });
}

// HeroBanner
export async function getHeroBanners(activeOnly = false) {
  return prisma.heroBanner.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: { displayOrder: 'asc' },
  });
}

export async function createHeroBanner(data: Prisma.HeroBannerCreateInput) {
  return prisma.heroBanner.create({ data });
}

export async function updateHeroBanner(id: string, data: Prisma.HeroBannerUpdateInput) {
  return prisma.heroBanner.update({ where: { id }, data });
}

export async function deleteHeroBanner(id: string) {
  return prisma.heroBanner.delete({ where: { id } });
}

// VideoContent
export async function getVideoContent(activeOnly = false) {
  return prisma.videoContent.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: { displayOrder: 'asc' },
  });
}

export async function createVideoContent(data: Prisma.VideoContentCreateInput) {
  return prisma.videoContent.create({ data });
}

export async function updateVideoContent(id: string, data: Prisma.VideoContentUpdateInput) {
  return prisma.videoContent.update({ where: { id }, data });
}

export async function deleteVideoContent(id: string) {
  return prisma.videoContent.delete({ where: { id } });
}

// StaticPage
export async function getStaticPages(activeOnly = false) {
  return prisma.staticPage.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getStaticPageBySlug(slug: string) {
  return prisma.staticPage.findUnique({ where: { slug } });
}

export async function createStaticPage(data: Prisma.StaticPageCreateInput) {
  return prisma.staticPage.create({ data });
}

export async function updateStaticPage(id: string, data: Prisma.StaticPageUpdateInput) {
  return prisma.staticPage.update({ where: { id }, data });
}

export async function deleteStaticPage(id: string) {
  return prisma.staticPage.delete({ where: { id } });
}

// SEOSettings
export const getSEOSettings = async (path: string) => {
  const fetchCached = unstable_cache(async () => {
    try {
      return await prisma.sEOSettings.findUnique({ where: { path } });
    } catch (err) {
      console.error("Error fetching SEO settings:", err);
      return null;
    }
  }, ['seo-settings', path], { revalidate: 3600, tags: ['settings'] });
  return fetchCached();
};

export async function getAllSEOSettings() {
  return prisma.sEOSettings.findMany();
}

export async function upsertSEOSettings(path: string, data: Prisma.SEOSettingsUpdateInput & Prisma.SEOSettingsCreateInput) {
  return prisma.sEOSettings.upsert({
    where: { path },
    update: data,
    create: { path, ...data as any },
  });
}

export async function deleteSEOSettings(id: string) {
  return prisma.sEOSettings.delete({ where: { id } });
}

// Testimonials (from Review model)
export async function getTestimonials(activeOnly = false) {
  return prisma.review.findMany({
    where: {
      isTestimonial: true,
      ...(activeOnly ? { isApproved: true } : {})
    },
    include: {
      customer: true,
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}
