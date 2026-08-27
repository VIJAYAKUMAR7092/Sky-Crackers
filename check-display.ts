import prisma from '@/lib/db/prisma';

async function run() {
  const dbCategories = await prisma.category.findMany({ orderBy: { displayOrder: 'asc' } });
  const homePageCats = await prisma.homePageCategory.findMany({ orderBy: { sortOrder: 'asc' } });
  
  const displayCategories = homePageCats.map(cat => {
    let searchName = cat.name.toLowerCase();
    if (searchName === 'chakkars') searchName = 'ground chakkar';
    if (searchName === 'fancy shots') searchName = 'single ariel fancy';
    if (searchName === 'kids collection') searchName = 'kids novelties';

    const found = dbCategories.find(c => c.name.toLowerCase().includes(searchName));
    return {
      name: cat.name,
      slug: found?.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
      mappedTo: found?.name || "NONE"
    };
  });
  console.log(displayCategories);
}
run();
