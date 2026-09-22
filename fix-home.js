const fs = require('fs');
let code = fs.readFileSync('app/(store)/page.tsx', 'utf8');

const oldHome = `    const combos = await prisma.product.findMany({
    where: { isCombo: true },
    orderBy: { comboOrder: 'asc' },
    include: { images: true, category: true }
  });


  const homePageCats = await prisma.homePageCategory.findMany({ orderBy: { sortOrder: 'asc' } });
  const displayCategories = homePageCats.map(cat => {
    let searchName = cat.name.toLowerCase();
    if (searchName === 'chakkars') searchName = 'ground chakkar';
    if (searchName === 'crackers') searchName = 'single sound';
    return { ...cat, searchName };
  });`;

const newHome = `  let combos: any[] = [];
  let displayCategories: any[] = [];
  try {
    combos = await prisma.product.findMany({
      where: { isCombo: true },
      orderBy: { comboOrder: 'asc' },
      include: { images: true, category: true }
    });

    const homePageCats = await prisma.homePageCategory.findMany({ orderBy: { sortOrder: 'asc' } });
    displayCategories = homePageCats.map(cat => {
      let searchName = cat.name.toLowerCase();
      if (searchName === 'chakkars') searchName = 'ground chakkar';
      if (searchName === 'crackers') searchName = 'single sound';
      return { ...cat, searchName };
    });
  } catch (err) {
    console.error("Database quota exceeded or connection error:", err);
  }`;

code = code.replace(oldHome, newHome);
fs.writeFileSync('app/(store)/page.tsx', code);
