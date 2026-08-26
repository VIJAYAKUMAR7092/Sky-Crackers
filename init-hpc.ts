import prisma from "./lib/db/prisma";

const targetCategories = [
  { name: "Sparklers", image: "/images/categories/sparklers.png" },
  { name: "Flower Pots", image: "/images/categories/flower-pots.png" },
  { name: "Rockets", image: "/images/categories/rockets.png" },
  { name: "Chakkars", image: "/images/categories/chakkars.png" },
  { name: "Fancy Shots", image: "/images/categories/fancy-shots.png" },
  { name: "Sound Crackers", image: "/images/categories/sound-crackers.png" },
  { name: "Kids Collection", image: "/images/categories/kids-collection.png" },
  { name: "Gift Boxes", image: "/images/categories/gift-boxes.png" }
];

async function main() {
  const existing = await prisma.homePageCategory.count();
  if (existing === 0) {
    for (let i = 0; i < targetCategories.length; i++) {
      const cat = targetCategories[i];
      await prisma.homePageCategory.create({
        data: {
          name: cat.name,
          image: cat.image,
          sortOrder: i
        }
      });
      console.log(`Created ${cat.name}`);
    }
  } else {
    console.log("Already seeded");
  }
}

main().catch(console.error);
