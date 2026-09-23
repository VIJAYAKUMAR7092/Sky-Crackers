import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const images = await prisma.productImage.findMany();
  let updated = 0;
  
  for (const img of images) {
    if (img.url.startsWith('/uploads/')) {
      const newUrl = img.url.replace('/uploads/', '/api/uploads/');
      await prisma.productImage.update({
        where: { id: img.id },
        data: { url: newUrl }
      });
      updated++;
    }
  }
  
  console.log(`✅ Fixed ${updated} existing image URLs in database.`);
}

main().finally(() => prisma.$disconnect());
