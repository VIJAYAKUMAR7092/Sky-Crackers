const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const whereClause = { active: true };
  const products = await prisma.product.findMany({
    where: whereClause,
    take: 1000
  });
  console.log("Total active products:", products.length);
}
run();
