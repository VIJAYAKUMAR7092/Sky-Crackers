const fs = require('fs');
let code = fs.readFileSync('app/(store)/layout.tsx', 'utf8');

const oldCode = `  // Fetch top banners
  const prisma = (await import('@/lib/db/prisma')).default;
  const topBanners = await prisma.topBanner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  });
  const banners = topBanners.map(b => b.text);`;

const newCode = `  // Fetch top banners gracefully
  let banners: string[] = [];
  try {
    const prisma = (await import('@/lib/db/prisma')).default;
    const topBanners = await prisma.topBanner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    banners = topBanners.map(b => b.text);
  } catch (err) {
    console.error("Error fetching top banners:", err);
  }`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('app/(store)/layout.tsx', code);
