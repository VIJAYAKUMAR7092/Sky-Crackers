import prisma from "../lib/db/prisma";

const catalogue = {
  "Combo Packs": [
    { name: "Silver Combo Pack (45 Items)", price: 3000 },
    { name: "Silver Night Combo Pack (31 Items)", price: 3000 },
    { name: "Kids Special Pack (40 Items)", price: 4000 },
    { name: "Gold Combo Pack (50 Items)", price: 5000 },
    { name: "Gold Night Combo (41 Items)", price: 5000 }
  ],
  "One Sound Crackers": [
    { name: "2 3/4' Kuruvi", price: 7 },
    { name: "3 1/2' Lakshmi", price: 12 },
    { name: "4' Lakshmi", price: 16 },
    { name: "Gold Lakshmi Deluxe", price: 30 },
    { name: "5in Jallikattu", price: 45 }
  ],
  "Flower Pots": [
    { name: "Flower Pots Big", price: 60 },
    { name: "Flower Pots Special", price: 80 },
    { name: "Flower Pot Ashoka", price: 100 },
    { name: "Color Koti", price: 160 },
    { name: "Tri Colour", price: 180 },
    { name: "Tri Colour Deluxe", price: 250 },
    { name: "Color Koti Deluxe", price: 270 },
    { name: "Mega Jumbo Pots", price: 450 }
  ],
  "Ground Chakkar": [
    { name: "Ground Chakkar Big", price: 30 },
    { name: "Ground Chakkar Ashoka", price: 45 },
    { name: "Ground Chakkar SPL", price: 70 },
    { name: "Ground Chakkar Deluxe", price: 110 }
  ],
  "Fancy Wheels": [
    { name: "Whistling Wheel", price: 120 },
    { name: "Racing Wheel", price: 130 },
    { name: "Wire Chakkar", price: 150 },
    { name: "Zodiac Spinner (5 Pcs)", price: 180 },
    { name: "Tinto Wheel Red & Green (5 Pcs)", price: 200 }
  ],
  "Twinkling Star": [
    { name: "1 1/2 Twinkling Star", price: 25 },
    { name: "4 Twinkling Star", price: 50 }
  ],
  "Torches & Pencils": [
    { name: "Selfie Stick", price: 50 },
    { name: "Color Smoke", price: 140 },
    { name: "HI FI Pencil (3 Pcs)", price: 150 },
    { name: "Red Flare Pencil (5 Pcs)", price: 160 }
  ],
  "Rockets": [
    { name: "Rocket Bomb", price: 70 },
    { name: "Lunik Rocket", price: 110 },
    { name: "Whistling Rocket", price: 160 }
  ],
  "Kids Novelties": [
    { name: "Sward", price: 120 },
    { name: "Money Bank (3 Pcs)", price: 160 },
    { name: "Lion King", price: 180 },
    { name: "Elephant", price: 180 },
    { name: "Lolli Pop", price: 180 },
    { name: "Money Bank Mega (2 Pcs)", price: 180 },
    { name: "Free Fire Gun (2 Pcs)", price: 180 },
    { name: "Ak47", price: 230 }
  ],
  "Fancy Novelties": [
    { name: "Kit Kat", price: 25 },
    { name: "Photo Flash", price: 60 },
    { name: "Butterfly", price: 80 },
    { name: "Helicopter", price: 90 },
    { name: "Bambaram", price: 100 },
    { name: "5in Tin Water Queen", price: 120 },
    { name: "Mini Siren (5 Pcs)", price: 135 },
    { name: "Mega Siren", price: 150 }
  ],
  "Fancy Fountain Multi Colors": [
    { name: "Ayyan's Little Dove", price: 80 },
    { name: "Tin Fountain (Crackling)", price: 80 },
    { name: "Disco Shower (5 Pcs)", price: 90 },
    { name: "Peacock Feather (5 Pcs)", price: 90 }
  ],
  "Special Fountain Exotic Series": [
    { name: "Angry Bird (5 Varieties)", price: 45 },
    { name: "Star Drum Crackling", price: 120 },
    { name: "Volcano (3 Varieties)", price: 120 },
    { name: "Pogo (5 Pcs)", price: 150 },
    { name: "Power Puff Girls (3 Varieties)", price: 160 },
    { name: "Power Pot (5 Colors)", price: 160 },
    { name: "Sonny's Green Fountain", price: 160 },
    { name: "Sonny's Red Fountain", price: 160 },
    { name: "Crackling Master (3 Pcs)", price: 260 }
  ],
  "Peacock Fountain": [
    { name: "Peacock 3 Phase", price: 140 },
    { name: "Colour Smoke Peacock", price: 180 },
    { name: "Bada Peacock 5 Phase", price: 340 }
  ],
  "New Arrivals 2026": [
    { name: "Double Duckker 2026", price: 160 },
    { name: "Pink Panther 2026 (Pink Fountain)", price: 180 },
    { name: "Cylinder Bomb Mega 2026", price: 200 },
    { name: "Kulfi Candle (3 Pcs) 2026", price: 260 }
  ],
  "Bombs": [
    { name: "Bullet Bomb", price: 30 },
    { name: "Hydro Bomb", price: 70 },
    { name: "King Of King Bomb", price: 110 },
    { name: "Classic Bomb", price: 130 },
    { name: "Digital Bomb (12 Ply)", price: 230 }
  ],
  "Paper Bombs": [
    { name: "250G Paper Bomb", price: 50 },
    { name: "500 Gm Paper Bomb", price: 100 },
    { name: "1 Kg Paper Bomb", price: 190 }
  ],
  "Loose Crackers": [
    { name: "Red Bijli (100 Pcs)", price: 38 },
    { name: "Stripped Bijli (100 Pcs)", price: 40 }
  ],
  "Single Ariel Fancy (5 Pcs)": [
    { name: "Sky Shot (5 Pcs)", price: 60 },
    { name: "7 Shot (5 Pcs)", price: 90 },
    { name: "Jaguar Raider Shot (10 Pcs)", price: 130 },
    { name: "Penta Force (5 Pcs)", price: 180 },
    { name: "White House (5 Pcs)", price: 220 }
  ],
  "Single Ariel Fancy": [
    { name: "Chotta Fancy", price: 30 },
    { name: "2 Inch Fancy", price: 80 },
    { name: "2 Inch Fancy (Blue Star Brand)", price: 120 },
    { name: "3 Inch Fancy", price: 230 },
    { name: "3 1/2 Inch Fancy", price: 270 },
    { name: "3 1/2 Inch Fancy (Blue Star Brand)", price: 300 },
    { name: "3 1/2 Inch Fancy (Blue Star Brand) - B", price: 300 },
    { name: "4 Inch Fancy", price: 320 }
  ],
  "Special Color Ariel Fancy": [
    { name: "3 1/2 Inch Fancy Sizzling", price: 280 },
    { name: "King Fisher (Crackling)", price: 300 },
    { name: "3 1/2 Inch Nayagara Falls", price: 300 },
    { name: "4 Inch Wow Pink", price: 450 },
    { name: "7 Step Special (4 Inch)", price: 450 },
    { name: "4 Inch Double Ball Fancy", price: 450 }
  ],
  "Combo Ariel Fancy": [
    { name: "2 Inch Fancy (3 Pcs)", price: 230 },
    { name: "2 3/4 Inch Fancy (3 Pcs)", price: 450 },
    { name: "4 Inch Fancy (2 Pcs)", price: 750 },
    { name: "5 Inch Fancy (2 Pcs)", price: 890 }
  ],
  "Repeating Multi Color Shots": [
    { name: "12 Shot Rider", price: 130 },
    { name: "25 Shot Rider", price: 240 },
    { name: "30 Shots Multicolour", price: 380 },
    { name: "30 Shot Multi Color Premium", price: 480 },
    { name: "60 Shots Multicolour", price: 760 },
    { name: "60 Shot Multi Color Prime", price: 900 },
    { name: "120 Shots Multicolour", price: 1560 },
    { name: "120 Shot Multi Color Premium", price: 1900 },
    { name: "240 Shots Multicolour Premium", price: 3800 },
    { name: "510 Shots Multicolour Premium", price: 8000 }
  ],
  "Vanitha Fireworks Special Fancy Outs": [
    { name: "4 1/2 inch Pink Out (2pcs)", price: 1800 },
    { name: "5 inch Purple Rain", price: 2000 },
    { name: "6 inch Ocean Blue Jambo Pipe", price: 2500 }
  ],
  "Sonny Fancy": [
    { name: "Orange (2Pcs)", price: 550 },
    { name: "Blue Pearls (2pcs)", price: 550 },
    { name: "5 inch Oscar Series (2pcs)", price: 1500 }
  ],
  "Special Multi Color Shots 2026": [
    { name: "Peacock Dance (IPL Function)", price: 400 },
    { name: "30 Shots Crackling", price: 590 },
    { name: "Sonny's Cocatoo (Mixing Shots)", price: 760 },
    { name: "30 Whistling Shot", price: 800 }
  ],
  "Festival Display Set Out": [
    { name: "1 1/2 Inch Set Out (48 Shots)", price: 3000 },
    { name: "10x10 Multi Color Shots", price: 3400 },
    { name: "2 Inch Set Out (30 Shots)", price: 3600 },
    { name: "3 Inch Set Out (30 Shots)", price: 5700 }
  ],
  "Digital Lar": [
    { name: "1K Prime", price: 300 },
    { name: "2K Prime", price: 600 },
    { name: "5K Prime", price: 1500 },
    { name: "10K Prime", price: 3000 }
  ],
  "Sparklers": [
    { name: "10cm Electric", price: 15 },
    { name: "10cm Colour", price: 16 },
    { name: "30cm Electric", price: 35 },
    { name: "15cm Electric", price: 35 },
    { name: "30cm Colour", price: 37 },
    { name: "15cm Colour", price: 37 },
    { name: "30cm Red", price: 45 },
    { name: "30cm Green", price: 45 },
    { name: "15cm Green", price: 45 },
    { name: "15cm Red", price: 45 },
    { name: "50cm Electric", price: 150 },
    { name: "50cm Colour", price: 160 }
  ],
  "Special Color Sparklers": [
    { name: "Lovely Heart Sparklers", price: 140 }
  ],
  "Color Matches": [
    { name: "Junior 3in1 Matches", price: 70 },
    { name: "7up 5 in 1 Color", price: 180 }
  ],
  "Guns": [
    { name: "Ring Caps", price: 10 },
    { name: "Roll Cap", price: 60 },
    { name: "Sony Gun", price: 150 }
  ],
  "Gift Boxes": [
    { name: "20 Item Box", price: 320 },
    { name: "25 Item Box", price: 380 },
    { name: "30 Item Box", price: 490 },
    { name: "40 Item Mega Box", price: 760 },
    { name: "50 Item VIP Box", price: 950 }
  ]
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Starting catalogue import...");
  
  // Safe restoration: Do not drop tables
  console.log("Preserving existing products...");
  
  let successCount = 0;
  let failCount = 0;
  let skippedDuplicatesCount = 0;
  
  const existingCategories = await prisma.category.findMany();
  console.log(`Found ${existingCategories.length} categories.`);
  
  // Mapping for Category Images to attach to Product Image relations
  const CATEGORY_IMAGES: Record<string, string> = {
    'sparklers': "/images/categories/sparklers.jpg",
    'special-color-sparklers': "/images/categories/sparklers.jpg",
    'flower-pots': "/images/categories/flower-pots.jpg",
    'special-fountain-exotic-series': "/images/categories/flower-pots.jpg",
    'peacock-fountain': "/images/categories/flower-pots.jpg",
    'rockets': "/images/categories/rockets.jpg",
    'ground-chakkar': "/images/categories/chakkars.jpg",
    'fancy-wheels': "/images/categories/chakkars.jpg",
    'single-ariel-fancy': "/images/categories/fancy-shots.jpg",
    'single-ariel-fancy-5-pcs': "/images/categories/fancy-shots.jpg",
    'special-color-ariel-fancy': "/images/categories/fancy-shots.jpg",
    'combo-ariel-fancy': "/images/categories/fancy-shots.jpg",
    'repeating-multi-color-shots': "/images/categories/fancy-shots.jpg",
    'vanitha-fireworks-special-fancy-outs': "/images/categories/fancy-shots.jpg",
    'sonny-fancy': "/images/categories/fancy-shots.jpg",
    'special-multi-color-shots-2026': "/images/categories/fancy-shots.jpg",
    'festival-display-set-out': "/images/categories/fancy-shots.jpg",
    'one-sound-crackers': "/images/categories/sound-crackers.jpg",
    'bombs': "/images/categories/sound-crackers.jpg",
    'paper-bombs': "/images/categories/sound-crackers.jpg",
    'loose-crackers': "/images/categories/sound-crackers.jpg",
    'digital-lar': "/images/categories/sound-crackers.jpg",
    'kids-novelties': "/images/categories/kids-collection.jpg",
    'fancy-novelties': "/images/categories/kids-collection.jpg",
    'torches-pencils': "/images/categories/kids-collection.jpg",
    'color-matches': "/images/categories/kids-collection.jpg",
    'guns': "/images/categories/kids-collection.jpg",
    'gift-boxes': "/images/categories/gift-boxes.jpg",
    'combo-packs': "/images/categories/gift-boxes.jpg",
    'new-arrivals-2026': "/images/categories/fancy-shots.jpg",
  };

  for (const [catName, products] of Object.entries(catalogue)) {
    const slug = slugify(catName);
    const category = existingCategories.find(c => c.slug === slug || c.name.toLowerCase() === catName.toLowerCase());
    
    if (!category) {
      console.log(`Failed to find category: ${catName}`);
      failCount += products.length;
      continue;
    }
    
    // Resolve the appropriate image for this category, fallback to placeholder
    const imageUrl = CATEGORY_IMAGES[category.slug] || "/placeholder.png";
    
    for (const prod of products) {
      const prodSlug = slugify(prod.name);
      
      try {
        const exists = await prisma.product.findUnique({ where: { slug: prodSlug } });
        if (exists) {
          // If product exists, just ensure it has an image (upsert approach for images)
          const existingImage = await prisma.productImage.findFirst({ where: { productId: exists.id } });
          if (!existingImage && imageUrl !== "/placeholder.png") {
            await prisma.productImage.create({
              data: {
                productId: exists.id,
                url: imageUrl,
                altText: prod.name,
                isPrimary: true
              }
            });
          }
          skippedDuplicatesCount++;
          continue;
        }
        
        const mrp = prod.price * 10;
        const discount = 90;
        
        await prisma.product.create({
          data: {
            name: prod.name,
            slug: prodSlug,
            categoryId: category.id,
            sellingPrice: prod.price,
            mrp: mrp,
            discount: discount,
            description: `Premium ${prod.name} from Sky Crackers.`,
            stockStatus: 'IN_STOCK',
            featured: false,
            active: true,
            images: {
              create: {
                url: imageUrl,
                altText: prod.name,
                isPrimary: true
              }
            }
          }
        });
        successCount++;
      } catch (err) {
        console.error(`Error importing ${prod.name}:`, err);
        failCount++;
      }
    }
  }
  
  console.log("\n--- IMPORT SUMMARY ---");
  console.log(`Total Categories (in DB): ${existingCategories.length}`);
  console.log(`Successfully Imported Products: ${successCount}`);
  console.log(`Failed Imports: ${failCount}`);
  console.log(`Skipped Duplicates: ${skippedDuplicatesCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
