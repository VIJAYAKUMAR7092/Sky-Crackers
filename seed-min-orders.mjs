import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL || "postgresql://admin:skycrackers123@localhost:5432/skycrackers?schema=public";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const stateConfig = [
  { name: 'Tamil Nadu Zone', state: 'Tamil Nadu', minOrder: 2900 },
  { name: 'Puducherry Zone', state: 'Puducherry', minOrder: 2900 },
  { name: 'Karnataka Zone', state: 'Karnataka', minOrder: 3000 },
  { name: 'Andhra Pradesh Zone', state: 'Andhra Pradesh', minOrder: 3000 },
  { name: 'Telangana Zone', state: 'Telangana', minOrder: 5000 },
  { name: 'Maharashtra Zone', state: 'Maharashtra', minOrder: 5000 }
];

async function main() {
  console.log("Setting up delivery zones and minimum orders...");

  for (const config of stateConfig) {
    // Check if zone exists
    let zone = await prisma.deliveryZone.findFirst({
      where: { state: config.state }
    });

    if (zone) {
      // Update existing
      await prisma.deliveryZone.update({
        where: { id: zone.id },
        data: { minimumOrder: config.minOrder, active: true }
      });
      console.log(`Updated ${config.state} minimum order to ₹${config.minOrder}`);
    } else {
      // Create new
      await prisma.deliveryZone.create({
        data: {
          name: config.name,
          state: config.state,
          minimumOrder: config.minOrder,
          deliveryCharge: 0,
          pincodes: [],
          active: true
        }
      });
      console.log(`Created ${config.state} zone with minimum order ₹${config.minOrder}`);
    }
  }

  // Set default minimum order to 3000
  await prisma.websiteSettings.upsert({
    where: { id: 'global' },
    update: { defaultMinOrder: 3000 },
    create: { id: 'global', defaultMinOrder: 3000 }
  });
  console.log("Updated default minimum order (Rest of India) to ₹3000");
  
  console.log("✅ All minimum orders configured successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
