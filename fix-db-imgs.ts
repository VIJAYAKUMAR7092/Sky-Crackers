import prisma from "./lib/db/prisma";

async function main() {
  const cats = await prisma.homePageCategory.findMany();
  for (const c of cats) {
    if (c.image && c.image.endsWith('.png')) {
      const newImg = c.image.replace('.png', '.jpg');
      await prisma.homePageCategory.update({
        where: { id: c.id },
        data: { image: newImg }
      });
      console.log(`Updated ${c.name} to ${newImg}`);
    }
  }
}
main().catch(console.error);
