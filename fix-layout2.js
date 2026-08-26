const fs = require('fs');
const p = 'app/(store)/layout.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  `const { PrismaClient } = require('@prisma/client');\n  const prisma = new PrismaClient();`,
  `const prisma = (await import('@/lib/db/prisma')).default;`
);

fs.writeFileSync(p, c);
console.log("Fixed layout Prisma Client");
