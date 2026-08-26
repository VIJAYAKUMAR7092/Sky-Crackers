const fs = require('fs');
const p = 'lib/services/public/checkout.service.ts';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  `      if (subtotal < 5000) {
        throw new AppError('Minimum order amount is ?5000', 'MINIMUM_ORDER_NOT_MET', 400);
      }`,
  `      const settings = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
      const defMin = settings?.defaultMinOrder ? Number(settings.defaultMinOrder) : 5000;
      if (subtotal < defMin) {
        throw new AppError(\`Minimum order amount is ?\${defMin}\`, 'MINIMUM_ORDER_NOT_MET', 400);
      }`
);

fs.writeFileSync(p, code);
console.log('Fixed checkout service default min order');
