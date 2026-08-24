import os
file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if 'import prisma' not in content:
    content = content.replace('import React from "react";', 'import React from "react";\nimport prisma from "@/lib/db/prisma";')

# Add query
if 'const combos = await prisma.product' not in content:
    query = """  const combos = await prisma.product.findMany({
    where: { isCombo: true },
    orderBy: { comboOrder: 'asc' },
    include: { images: true, category: true }
  });

  const comboProducts = combos.map(combo => ({
    ...combo,
    mrp: Number(combo.mrp).toString(),
    sellingPrice: Number(combo.sellingPrice).toString(),
    discount: combo.discount ? Number(combo.discount).toString() : null
  }));
"""
    content = content.replace('const [featuredProducts', query + '\n  const [featuredProducts')

# Update component
content = content.replace('<ComboPacks />', '<ComboPacks combos={comboProducts} />')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed page.tsx combos')
