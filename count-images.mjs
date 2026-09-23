import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\VIJAYAKUMAR\\Downloads\\SKY CRACKERS PHOTOS\\SKY CRACKERS PHOTOS';

const dirs = fs.readdirSync(sourceDir).filter(d => fs.statSync(path.join(sourceDir, d)).isDirectory());
for (const dir of dirs) {
    const files = fs.readdirSync(path.join(sourceDir, dir)).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
    console.log(`${dir}: ${files.length} images`);
}
