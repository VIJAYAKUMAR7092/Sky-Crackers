import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const cats = await prisma.category.findMany({ orderBy: { displayOrder: 'asc' }, select: { name: true, displayOrder: true } });
  cats.forEach(c => console.log(`${c.displayOrder}: ${c.name}`));
}
run();
