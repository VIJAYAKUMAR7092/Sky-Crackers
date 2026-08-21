const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

const sampleProducts = [
  { name: "Mega Jumbo Pots", category: "Flower Pots", sellingPrice: 450 },
  { name: "Color Kothi", category: "Flower Pots", sellingPrice: 150 },
  { name: "Giant Chakkar", category: "Ground Chakkar", sellingPrice: 200 },
  { name: "Special Chakkar Ashoka", category: "Ground Chakkar", sellingPrice: 120 },
  { name: "2.5\" Twinkling Star", category: "Twinkling Star", sellingPrice: 60 },
  { name: "Baby Rocket", category: "Rockets", sellingPrice: 100 },
  { name: "Bomb 1000 Wala", category: "Digital Lar", sellingPrice: 1200 },
  { name: "Bomb 5000 Wala", category: "Digital Lar", sellingPrice: 4500 },
  { name: "Color Sparklers 10cm", category: "Special Color Sparklers", sellingPrice: 50 },
  { name: "Gold Sparklers 15cm", category: "Sparklers", sellingPrice: 80 },
  { name: "240 Shots Multi Color", category: "Repeating Multi Color Shots", sellingPrice: 2400 },
  { name: "Classic Gift Box", category: "Gift Boxes", sellingPrice: 800 },
  { name: "Premium Combo Pack", category: "Combo Packs", sellingPrice: 2500 }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Seeding categories and products...");
  
  let catCount = 0;
  let prodCount = 0;
  
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
  
  // 2. Create Products
  for (const prod of sampleProducts) {
    const slug = slugify(prod.name);
    const catSlug = slugify(prod.category);
    
    const category = await prisma.category.findUnique({ where: { slug: catSlug } });
    if (!category) continue;
    
    const exists = await prisma.product.findUnique({ where: { slug } });
    if (!exists) {
      await prisma.product.create({
        data: {
          name: prod.name,
          slug,
          categoryId: category.id,
          price: prod.sellingPrice,
          mrp: prod.sellingPrice * 10,
          description: `Premium ${prod.name} from Sky Crackers.`,
          status: 'IN_STOCK',
          featured: false
        }
      });
      prodCount++;
    }
  }
  
  console.log(`Created ${catCount} categories and ${prodCount} products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
