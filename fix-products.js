const fs = require('fs');
let code = fs.readFileSync('lib/services/public/product.service.ts', 'utf8');

// Replace the start of getProducts
code = code.replace(
  "export const getProducts = unstable_cache(async (params?: { categoryId?: string, search?: string, limit?: number, skip?: number }) => {",
  "export const getProducts = async (params?: { categoryId?: string, search?: string, limit?: number, skip?: number }) => {"
);

// Replace the end of getProducts
code = code.replace(
  "}, ['public-products-list'], { revalidate: 3600, tags: ['products'] });",
  "};"
);

fs.writeFileSync('lib/services/public/product.service.ts', code);
