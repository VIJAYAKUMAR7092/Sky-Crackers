import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'lib', 'services', 'products', 'product.service.ts');
let content = fs.readFileSync(file, 'utf8');

// The user is on a canary/latest Next.js version where revalidateTag REQUIRES 2 arguments.
content = content.replace(/revalidateTag\('products'\);/g, "revalidateTag('products', 'max');");

fs.writeFileSync(file, content);
console.log('✅ Restored revalidateTag second argument for Next.js Canary');
