const fs = require('fs');
const p = 'app/(store)/page.tsx';
let code = fs.readFileSync(p, 'utf8');

const regex = /const targetCategories = \[\s*\{[\s\S]*?\];\s*const displayCategories = targetCategories\.map\(cat => \{[\s\S]*?\}\);/;

const replacement = `const homePageCats = await prisma.homePageCategory.findMany({ orderBy: { sortOrder: 'asc' } });
  const displayCategories = homePageCats.map(cat => {
    const found = dbCategories.find(c => c.name.toLowerCase().includes(cat.name.toLowerCase()));
    return {
      id: found?.id || cat.name.toLowerCase().replace(/\\s+/g, '-'),
      name: found?.name || cat.name,
      slug: found?.slug || cat.name.toLowerCase().replace(/\\s+/g, '-'),
      image: found?.image || cat.image
    };
  });`;

code = code.replace(regex, replacement);
fs.writeFileSync(p, code);
console.log("Fixed");
