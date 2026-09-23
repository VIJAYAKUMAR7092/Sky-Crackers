import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = 'C:\\Users\\VIJAYAKUMAR\\Downloads\\SKY CRACKERS PHOTOS\\SKY CRACKERS PHOTOS';
const destDir = 'C:\\Users\\VIJAYAKUMAR\\.gemini\\antigravity\\scratch\\sky-crackers\\public\\images\\products';

const mappings = [];

async function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (stat.isFile() && /\.(jpg|jpeg|png|webp|avif)$/i.test(item)) {
            // Filename without extension
            let name = item.replace(/\.[^/.]+$/, "").trim();
            // Clean name for URL
            let cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random()*1000);
            
            const destName = `${cleanName}.webp`;
            const destPath = path.join(destDir, destName);
            
            console.log(`Processing: ${name}`);
            try {
                await sharp(fullPath)
                    .resize({ width: 800, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(destPath);
                    
                mappings.push({
                    name: name, // Original filename (usually matches product name)
                    url: `/images/products/${destName}`
                });
            } catch(e) {
                console.error(`Error processing ${fullPath}:`, e);
            }
        }
    }
}

async function main() {
    await processDirectory(sourceDir);
    fs.writeFileSync('image-mappings.json', JSON.stringify(mappings, null, 2));
    console.log(`Done! Processed ${mappings.length} images.`);
}
main();
