import prisma from "./lib/db/prisma";

async function main() {
  const states = [
    { name: "Tamil Nadu Delivery", state: "Tamil Nadu", minOrder: 3000 },
    { name: "Puducherry Delivery", state: "Puducherry", minOrder: 5000 },
    { name: "Kerala Delivery", state: "Kerala", minOrder: 5000 },
    { name: "Karnataka Delivery", state: "Karnataka", minOrder: 5000 },
    { name: "Andhra Pradesh Delivery", state: "Andhra Pradesh", minOrder: 5000 },
    { name: "Telangana Delivery", state: "Telangana", minOrder: 5000 },
    { name: "Maharashtra Delivery", state: "Maharashtra", minOrder: 5000 }
  ];

  for (const s of states) {
    const exists = await prisma.deliveryZone.findFirst({ where: { state: s.state } });
    if (!exists) {
      await prisma.deliveryZone.create({
        data: {
          name: s.name,
          state: s.state,
          pincodes: [],
          minimumOrder: s.minOrder,
          active: true
        }
      });
      console.log(`Inserted ${s.state} with minOrder ${s.minOrder}`);
    } else {
      await prisma.deliveryZone.update({
        where: { id: exists.id },
        data: { minimumOrder: s.minOrder }
      });
      console.log(`Updated ${s.state} with minOrder ${s.minOrder}`);
    }
  }
}
main().catch(console.error);
