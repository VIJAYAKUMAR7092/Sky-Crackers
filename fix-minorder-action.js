const fs = require('fs');
const p = 'app/admin/(dashboard)/minimum-order/actions.ts';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  `    await prisma.deliveryZone.update({
      where: { id },
      data: { minimumOrder: amount }
    });`,
  `    if (id === "default") {
      const existing = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
      if (existing) {
        await prisma.websiteSettings.update({ where: { id: "global" }, data: { defaultMinOrder: amount } });
      } else {
        await prisma.websiteSettings.create({ data: { id: "global", defaultMinOrder: amount } });
      }
    } else {
      await prisma.deliveryZone.update({
        where: { id },
        data: { minimumOrder: amount }
      });
    }`
);

fs.writeFileSync(p, code);
console.log('Fixed MinimumOrder Action');
