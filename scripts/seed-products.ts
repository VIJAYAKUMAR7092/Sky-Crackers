import prisma from "../lib/db/prisma";

const categories = [
  "Combo Packs",
  "One Sound Crackers",
  "Flower Pots",
  "Ground Chakkar",
  "Fancy Wheels",
  "Twinkling Star",
  "Torches & Pencils",
  "Rockets",
  "Kids Novelties",
  "Fancy Novelties",
  "Fancy Fountain Multi Colors",
  "Special Fountain Exotic Series",
  "Peacock Fountain",
  "New Arrivals 2026",
  "Bombs",
  "Paper Bombs",
  "Loose Crackers",
  "Single Ariel Fancy (5 Pcs)",
  "Single Ariel Fancy",
  "Special Color Ariel Fancy",
  "Combo Ariel Fancy",
  "Repeating Multi Color Shots",
  "Vanitha Fireworks Special Fancy Outs",
  "Sonny Fancy",
  "Special Multi Color Shots 2026",
  "Festival Display Set Out",
  "Digital Lar",
  "Sparklers",
  "Special Color Sparklers",
  "Color Matches",
  "Guns",
  "Gift Boxes"
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Seeding categories...");
  
  let catCount = 0;
  
  // 1. Create Categories
  for (const catName of categories) {
    const slug = slugify(catName);
    const exists = await prisma.category.findUnique({ where: { slug } });
    if (!exists) {
      await prisma.category.create({
        data: {
          name: catName,
          slug,
          description: `Premium ${catName} from Sivakasi`,
          active: true
        }
      });
      catCount++;
    }
  }
  
  console.log(`Created ${catCount} categories.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
