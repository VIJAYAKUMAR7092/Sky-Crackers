import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';

const connectionString = process.env.DATABASE_URL || "postgresql://admin:skycrackers123@localhost:5432/skycrackers?schema=public";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const updates = JSON.parse(fs.readFileSync('db-image-updates.json', 'utf8'));
    let updated = 0;
    
    for (const item of updates) {
        // Find product by name and update imageUrl via related ProductImage
        const prod = await prisma.product.findFirst({
            where: { name: item.name },
            include: { images: true }
        });
        
        if (prod) {
            // Check if image already exists to prevent duplicates if run multiple times
            const hasImage = prod.images.some(img => img.url === item.imageUrl);
            if (!hasImage) {
                await prisma.product.update({
                    where: { id: prod.id },
                    data: { 
                        images: {
                            create: {
                                url: item.imageUrl,
                                isPrimary: true
                            }
                        }
                    }
                });
                updated++;
                console.log(`Updated image for ${item.name}`);
            } else {
                console.log(`Image already exists for ${item.name}`);
            }
        } else {
            console.log(`Product not found: ${item.name}`);
        }
    }
    
    console.log(`Successfully updated ${updated} products with images!`);
}

main().finally(() => prisma.$disconnect());
