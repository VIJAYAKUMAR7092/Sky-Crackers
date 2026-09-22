const fs = require('fs');
let code = fs.readFileSync('lib/services/cms/cms.service.ts', 'utf8');

// Add import for unstable_cache if not present
if (!code.includes('unstable_cache')) {
  code = code.replace(
    "import { Prisma } from '@prisma/client';",
    "import { Prisma } from '@prisma/client';\nimport { unstable_cache } from 'next/cache';"
  );
}

// Replace getWebsiteSettings
const oldGetWebsiteSettings = `export async function getWebsiteSettings() {
  return prisma.websiteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: { id: 'global' },
  });
}`;

const newGetWebsiteSettings = `export const getWebsiteSettings = unstable_cache(async () => {
  try {
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: 'global' },
    });
    return settings || { id: 'global', siteName: 'Sky Crackers', logoUrl: null, supportPhone: null, supportEmail: null, whatsappNumber: null, facebookUrl: null, instagramUrl: null, youtubeUrl: null, twitterUrl: null, address: null, footerText: null, maintenanceMode: false, minimumOrderAmount: 0 };
  } catch (err) {
    console.error("Error fetching website settings:", err);
    return { id: 'global', siteName: 'Sky Crackers' };
  }
}, ['website-settings-global'], { revalidate: 3600, tags: ['settings'] });`;

code = code.replace(oldGetWebsiteSettings, newGetWebsiteSettings);

// Replace getSEOSettings
const oldGetSEOSettings = `export async function getSEOSettings(path: string) {
  return prisma.sEOSettings.findUnique({ where: { path } });
}`;

const newGetSEOSettings = `export const getSEOSettings = unstable_cache(async (path: string) => {
  try {
    return await prisma.sEOSettings.findUnique({ where: { path } });
  } catch (err) {
    console.error("Error fetching SEO settings:", err);
    return null;
  }
}, ['seo-settings'], { revalidate: 3600, tags: ['settings'] });`;

code = code.replace(oldGetSEOSettings, newGetSEOSettings);

fs.writeFileSync('lib/services/cms/cms.service.ts', code);
