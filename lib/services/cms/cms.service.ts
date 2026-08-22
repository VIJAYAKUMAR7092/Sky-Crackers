import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

// WebsiteSettings
export async function getWebsiteSettings() {
  return prisma.websiteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: { id: 'global' },
  });
}

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
export async function getSEOSettings(path: string) {
  return prisma.sEOSettings.findUnique({ where: { path } });
}

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
