const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

async function run() {
  const cats = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
    select: { name: true, displayOrder: true }
  });
  console.log(JSON.stringify(cats.slice(0, 5), null, 2));
  console.log(JSON.stringify(cats.slice(-3), null, 2));
}
run();
