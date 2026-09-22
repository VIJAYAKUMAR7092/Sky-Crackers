const fs = require('fs');
let code = fs.readFileSync('lib/services/cms/cms.service.ts', 'utf8');

const oldGetSEOSettings = `export const getSEOSettings = unstable_cache(async (path: string) => {
  try {
    return await prisma.sEOSettings.findUnique({ where: { path } });
  } catch (err) {
    console.error("Error fetching SEO settings:", err);
    return null;
  }
}, ['seo-settings'], { revalidate: 3600, tags: ['settings'] });`;

const newGetSEOSettings = `export const getSEOSettings = async (path: string) => {
  const fetchCached = unstable_cache(async () => {
    try {
      return await prisma.sEOSettings.findUnique({ where: { path } });
    } catch (err) {
      console.error("Error fetching SEO settings:", err);
      return null;
    }
  }, ['seo-settings', path], { revalidate: 3600, tags: ['settings'] });
  return fetchCached();
};`;

code = code.replace(oldGetSEOSettings, newGetSEOSettings);
fs.writeFileSync('lib/services/cms/cms.service.ts', code);
