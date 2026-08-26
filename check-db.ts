import prisma from "./lib/db/prisma";

async function main() {
  const zones = await prisma.deliveryZone.findMany();
  console.log("ZONES:", zones.map(z => `${z.state || z.name}: ${z.minimumOrder}`));
  
  const settings = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
  console.log("SETTINGS:", settings);
}
main();
