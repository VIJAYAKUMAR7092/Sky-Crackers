import { serializeDecimals } from '@/lib/utils/serialization';
﻿import prisma from "@/lib/db/prisma";

export async function getFeaturedProducts() {
  try {
    const results = await prisma.product.findMany({
      where: { 
        active: true,
        featured: true 
      },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
          take: 1
        },
        category: true
      },
      take: 8
    });
    return serializeDecimals(results);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getBestSellingProducts() {
  try {
    const results = await prisma.product.findMany({
      where: { 
        active: true,
        bestSeller: true 
      },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
          take: 1
        },
        category: true
      },
      take: 8
    });
    return serializeDecimals(results);
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    return [];
  }
}

export async function getProducts(params?: { categoryId?: string, search?: string, limit?: number, skip?: number }) {
  try {
    const whereClause: any = { active: true };
    
    if (params?.categoryId) {
      whereClause.categoryId = params.categoryId;
    }
    
    if (params?.search) {
      whereClause.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          images: {
            orderBy: { displayOrder: 'asc' },
            take: 1
          },
          category: true
        },
        take: params?.limit || 20,
        skip: params?.skip || 0,
        orderBy: { name: 'asc' }
      }),
      prisma.product.count({ where: whereClause })
    ]);

    return { products: serializeDecimals(products), total };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const result = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' }
        },
        category: true
      }
    });
    return serializeDecimals(result);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    return await prisma.category.findMany({
      where: { active: true },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
