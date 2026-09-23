import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'lib', 'services', 'products', 'product.service.ts');
let content = fs.readFileSync(file, 'utf8');

// Fix revalidateTag error and add revalidatePath to clear ALL caches
content = content.replace(/revalidateTag\('products',\s*'max'\);/g, "revalidateTag('products');\n  const { revalidatePath } = require('next/cache');\n  revalidatePath('/', 'layout');");

fs.writeFileSync(file, content);
console.log('✅ Fixed product.service.ts caching bugs');
