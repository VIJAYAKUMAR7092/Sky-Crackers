import prisma from "../lib/db/prisma";

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
  { name: "Premium Combo Pack", category: "Combo Packs", sellingPrice: 2500 },
  { name: "One Sound Crackers Standard", category: "One Sound Crackers", sellingPrice: 150 },
  { name: "Fancy Wheel Super", category: "Fancy Wheels", sellingPrice: 250 },
  { name: "Magic Pencils 10s", category: "Torches & Pencils", sellingPrice: 75 },
  { name: "Kids Magic Snakes", category: "Kids Novelties", sellingPrice: 40 },
  { name: "Peacock Fountain Special", category: "Peacock Fountain", sellingPrice: 350 },
  { name: "New Arrival 2026 Special", category: "New Arrivals 2026", sellingPrice: 500 },
  { name: "Classic Paper Bomb", category: "Paper Bombs", sellingPrice: 90 },
  { name: "Loose Crackers Box", category: "Loose Crackers", sellingPrice: 300 },
  { name: "Single Ariel Fancy (5 Pcs)", category: "Single Ariel Fancy (5 Pcs)", sellingPrice: 600 },
  { name: "Special Color Ariel", category: "Special Color Ariel Fancy", sellingPrice: 180 },
  { name: "Combo Ariel Fancy", category: "Combo Ariel Fancy", sellingPrice: 1200 },
  { name: "Vanitha Fireworks Special", category: "Vanitha Fireworks Special Fancy Outs", sellingPrice: 3000 },
  { name: "Sonny Fancy Special", category: "Sonny Fancy", sellingPrice: 850 },
  { name: "Festival Display Set Out", category: "Festival Display Set Out", sellingPrice: 5500 },
  { name: "Color Matches Big", category: "Color Matches", sellingPrice: 30 },
  { name: "Toy Gun with Caps", category: "Guns", sellingPrice: 150 }
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Seeding products...");
  let prodCount = 0;
  
  for (const prod of sampleProducts) {
    const slug = slugify(prod.name);
    const catSlug = slugify(prod.category);
    
    const category = await prisma.category.findUnique({ where: { slug: catSlug } });
    if (!category) {
        console.log(`Category not found for: ${prod.name}`);
        continue;
    }
    
    const exists = await prisma.product.findUnique({ where: { slug } });
    if (!exists) {
      // Calculate discount % automatically
      const mrp = prod.sellingPrice * 10;
      const discount = Math.round(((mrp - prod.sellingPrice) / mrp) * 100);
      
      await prisma.product.create({
        data: {
          name: prod.name,
          slug,
          categoryId: category.id,
          sellingPrice: prod.sellingPrice,
          mrp: mrp,
          discount: discount,
          description: `Premium ${prod.name} from Sky Crackers.`,
          stockStatus: 'IN_STOCK',
          featured: false
        }
      });
      prodCount++;
    }
  }
  
  console.log(`Created ${prodCount} products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
