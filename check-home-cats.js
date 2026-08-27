const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

async function run() {
  const cats = await prisma.homePageCategory.findMany();
  console.log(cats);
}
run();
