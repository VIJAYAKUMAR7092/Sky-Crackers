const fs = require('fs');
const p = 'app/admin/(dashboard)/minimum-order/page.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  `  const zones = await prisma.deliveryZone.findMany({
    orderBy: { name: 'asc' }
  });`,
  `  const zones = await prisma.deliveryZone.findMany({
    orderBy: { name: 'asc' }
  });
  const settings = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
  const defaultMinOrder = settings?.defaultMinOrder ? Number(settings.defaultMinOrder) : 5000;`
);

code = code.replace(
  `<MinimumOrderClient initialZones={serializeDecimals(zones)} />`,
  `<MinimumOrderClient initialZones={serializeDecimals(zones)} defaultMinOrder={defaultMinOrder} />`
);

fs.writeFileSync(p, code);
console.log('Fixed MinimumOrder Page');
