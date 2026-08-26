const fs = require('fs');
const p = 'app/admin/(dashboard)/combos/actions.ts';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  /await prisma\.websiteSettings\.upsert\(\{[\s\S]*?\}\);/,
  `const existing = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
    if (existing) {
      await prisma.websiteSettings.update({ where: { id: "global" }, data: { comboValidUpto: date } });
    } else {
      await prisma.websiteSettings.create({ data: { id: "global", comboValidUpto: date } });
    }`
);

fs.writeFileSync(p, code);
console.log('Fixed combo action');
