const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const categories = await prisma.category.findMany({ take: 2 });
  if (categories.length < 2) return console.log("Not enough categories");
  
  const payload = [
    { id: categories[0].id, displayOrder: 2 },
    { id: categories[1].id, displayOrder: 1 }
  ];
  
  try {
    await prisma.$transaction(
      payload.map((item) => 
        prisma.category.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        })
      )
    );
    console.log("Success");
  } catch (e) {
    console.error("Error:", e);
  }
}
test().finally(() => prisma.$disconnect());
