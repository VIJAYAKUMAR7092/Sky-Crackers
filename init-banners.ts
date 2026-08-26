import prisma from "./lib/db/prisma";

async function main() {
  const existing = await prisma.topBanner.count();
  if (existing === 0) {
    const banners = [
      "Welcome to Sky Crackers Up to 90%",
      "Minimum Tamilnadu Order Rs 3,000",
      "Minimum Other State Orders 5,000"
    ];
    for (let i = 0; i < banners.length; i++) {
      await prisma.topBanner.create({
        data: { text: banners[i], sortOrder: i }
      });
    }
    console.log("Seeded top banners");
  } else {
    console.log("Top banners already exist");
  }
}
main().catch(console.error);
