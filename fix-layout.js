const fs = require('fs');
const p = 'app/(store)/layout.tsx';
let c = fs.readFileSync(p, 'utf8');

const target = `const rawSettings = await getWebsiteSettings();
  const websiteSettings = JSON.parse(JSON.stringify(rawSettings));`;

const replacement = `const rawSettings = await getWebsiteSettings();
  const websiteSettings = JSON.parse(JSON.stringify(rawSettings));
  
  // Fetch top banners
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const topBanners = await prisma.topBanner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  });
  const banners = topBanners.map(b => b.text);`;

c = c.replace(target, replacement);
c = c.replace('<Navbar settings={websiteSettings} />', '<Navbar settings={websiteSettings} topBanners={banners} />');

fs.writeFileSync(p, c);
console.log("Fixed layout");
