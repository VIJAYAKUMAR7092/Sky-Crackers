const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

async function run() {
  const cats = await prisma.category.findMany({ select: { id: true, name: true, sortOrder: true } });
  console.log(JSON.stringify(cats, null, 2));
}
run();
