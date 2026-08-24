import os
file_path = 'app/(store)/shop/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_code = """  // Group products by category (these are the filtered products for the main view)
  const groupedProducts: Record<string, any[]> = {};
  
  products.forEach((product: any) => {
    const catName = product.category?.name || "Uncategorized";
    if (!groupedProducts[catName]) {
      groupedProducts[catName] = [];
    }
    groupedProducts[catName].push(product);
  });"""

new_code = """  // Group products by category, preserving the strict displayOrder from categories
  const tempGroups: Record<string, any[]> = {};
  
  products.forEach((product: any) => {
    const catName = product.category?.name || "Uncategorized";
    if (!tempGroups[catName]) {
      tempGroups[catName] = [];
    }
    tempGroups[catName].push(product);
  });

  const groupedProducts: Record<string, any[]> = {};
  
  // 1. Insert groups in the exact order of sorted categories
  categories.forEach((cat: any) => {
    if (tempGroups[cat.name] && tempGroups[cat.name].length > 0) {
      groupedProducts[cat.name] = tempGroups[cat.name];
    }
  });

  // 2. Append any leftover groups (e.g. Uncategorized)
  Object.keys(tempGroups).forEach(key => {
    if (!groupedProducts[key]) {
      groupedProducts[key] = tempGroups[key];
    }
  });"""

content = content.replace(old_code, new_code)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed shop page sorting")
