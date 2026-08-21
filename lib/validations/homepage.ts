import { z } from 'zod';

export const heroBannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  desktopImage: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  mobileImage: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const promoBannerSchema = z.object({
  image: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  link: z.string().optional(),
  position: z.string().default('TOP'),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const homepageSectionConfigSchema = z.object({
  sectionId: z.string(), // e.g., 'FEATURED_PRODUCTS', 'CATEGORIES'
  heading: z.string().optional(),
  subHeading: z.string().optional(),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const seoConfigSchema = z.object({
  homepageTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  ogImage: z.string().url().or(z.literal('')).optional(),
  canonicalUrl: z.string().url().or(z.literal('')).optional(),
});

export const homepageSettingsSchema = z.object({
  announcementText: z.string().optional(),
  announcementActive: z.boolean().default(true),
  marqueeText: z.string().optional(),
  marqueeActive: z.boolean().default(true),
  popupBannerImage: z.string().url().or(z.literal('')).optional(),
  popupBannerActive: z.boolean().default(false),
  newsletterToggle: z.boolean().default(true),
});
