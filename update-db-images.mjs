import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const updates = JSON.parse(fs.readFileSync('db-image-updates.json', 'utf8'));
    let updated = 0;
    
    for (const item of updates) {
        // Find product by name and update imageUrl
        const prod = await prisma.product.findFirst({
            where: { name: item.name }
        });
        
        if (prod) {
            await prisma.product.update({
                where: { id: prod.id },
                data: { imageUrl: item.imageUrl }
            });
            updated++;
            console.log(`Updated image for ${item.name}`);
        } else {
            console.log(`Product not found: ${item.name}`);
        }
    }
    
    console.log(`Successfully updated ${updated} products with images!`);
}

main().finally(() => prisma.$disconnect());
