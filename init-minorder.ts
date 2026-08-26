import prisma from "./lib/db/prisma";
async function main() {
  await prisma.deliveryZone.updateMany({
    where: { state: 'Tamil Nadu' },
    data: { minimumOrder: 3000 }
  });
  console.log("Updated Tamil Nadu to 3000");
}
main();
