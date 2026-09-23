import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL || "postgresql://admin:skycrackers123@localhost:5432/skycrackers?schema=public";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: 'Kids Collection', image: '/images/categories/kids-collection.jpg', sortOrder: 1 },
  { name: 'Sparklers', image: '/images/categories/sparklers.jpg', sortOrder: 2 },
  { name: 'Chakkars', image: '/images/categories/chakkars.jpg', sortOrder: 3 },
  { name: 'Flower Pots', image: '/images/categories/flower-pots.jpg', sortOrder: 4 },
  { name: 'Rockets', image: '/images/categories/rockets.jpg', sortOrder: 5 },
  { name: 'Fancy Shots', image: '/images/categories/fancy-shots.jpg', sortOrder: 6 },
  { name: 'Sound Crackers', image: '/images/categories/sound-crackers.jpg', sortOrder: 7 },
  { name: 'Gift Boxes', image: '/images/categories/gift-boxes.jpg', sortOrder: 8 },
];

async function main() {
  console.log("Seeding Home Page Categories...");

  // First clear existing ones to avoid duplicates if they were partially added
  await prisma.homePageCategory.deleteMany({});
  console.log("Cleared existing homepage categories...");

  for (const cat of categories) {
    await prisma.homePageCategory.create({
      data: {
        name: cat.name,
        image: cat.image,
        sortOrder: cat.sortOrder,
      }
    });
    console.log(`Added: ${cat.name}`);
  }

  console.log("✅ Successfully restored all 'Shop By Category' items with animations!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
