const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
async function run() {
  const orders = await prisma.order.findMany();
  console.log("Orders count:", orders.length);
  orders.forEach(o => console.log(o.orderReference));
}
run();
