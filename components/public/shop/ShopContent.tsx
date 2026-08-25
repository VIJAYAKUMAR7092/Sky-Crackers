import React from "react";
import { getProducts } from "@/lib/services/public/product.service";
import ShopClientView from "./ShopClientView";

export default async function ShopContent({ 
  categoryId, 
  search, 
  categories, 
  totalProductsCount 
}: {
  categoryId?: string;
  search?: string;
  categories: any[];
  totalProductsCount: number;
}) {
  const { products } = await getProducts({
    categoryId,
    search,
    limit: 1000 
  });

  const tempGroups: Record<string, any[]> = {};
  
  products.forEach((product: any) => {
    const catName = product.category?.name || "Uncategorized";
    if (!tempGroups[catName]) {
      tempGroups[catName] = [];
    }
    tempGroups[catName].push(product);
  });

  const groupedProducts: Record<string, any[]> = {};
  
  categories.forEach((cat: any) => {
    if (tempGroups[cat.name] && tempGroups[cat.name].length > 0) {
      groupedProducts[cat.name] = tempGroups[cat.name];
    }
  });

  Object.keys(tempGroups).forEach(key => {
    if (!groupedProducts[key]) {
      groupedProducts[key] = tempGroups[key];
    }
  });

  return (
    <ShopClientView 
      products={products}
      groupedProducts={groupedProducts}
      categories={categories}
      categoryId={categoryId}
      search={search}
      totalProductsCount={totalProductsCount}
    />
  );
}
