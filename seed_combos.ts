import prisma from './lib/db/prisma';

async function main() {
  // Find or create category
  let category = await prisma.category.findFirst({
    where: { name: 'Combos' }
  });
  
  if (!category) {
    category = await prisma.category.findFirst();
    
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: 'Combos',
          slug: 'combos'
        }
      });
    }
  }

  const combos = [
    {
      name: "Silver Combo Pack",
      slug: "silver-combo-pack",
      mrp: 30000,
      price: 3000,
      image: "/images/combos/silver-combo.jpg"
    },
    {
      name: "Silver Night Combo Pack",
      slug: "silver-night-combo-pack",
      mrp: 30000,
      price: 3000,
      image: "/images/combos/silver-night-combo.jpg"
    },
    {
      name: "Kid's Special Pack",
      slug: "kids-special-pack",
      mrp: 40000,
      price: 4000,
      image: "/images/combos/kids-combo.jpg"
    },
    {
      name: "Gold Combo Pack",
      slug: "gold-combo-pack",
      mrp: 50000,
      price: 5000,
      image: "/images/combos/gold-combo.jpg"
    },
    {
      name: "Gold Night Combo Pack",
      slug: "gold-night-combo-pack",
      mrp: 50000,
      price: 5000,
      image: "/images/combos/gold-night-combo.jpg"
    }
  ];

  for (let i = 0; i < combos.length; i++) {
    const c = combos[i];
    
    // Create product
    await prisma.product.upsert({
      where: { slug: c.slug },
      update: {
        isCombo: true,
        comboOrder: i + 1,
        active: true,
      },
      create: {
        name: c.name,
        slug: c.slug,
        mrp: c.mrp,
        sellingPrice: c.price,
        categoryId: category!.id,
        isCombo: true,
        comboOrder: i + 1,
        active: true,
        images: {
          create: {
            url: c.image,
            isPrimary: true
          }
        }
      }
    });
  }
  
  console.log("Combo packs inserted successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
