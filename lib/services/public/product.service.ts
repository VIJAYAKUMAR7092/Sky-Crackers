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

export async function getComboProducts() {
  return serializeDecimals(await prisma.product.findMany({ where: { isCombo: true, active: true }, include: { images: true, category: true }, orderBy: { comboOrder: 'asc' } }));
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
      // Support both CUID (from sidebar) and slug (from footer)
      whereClause.OR = [
        { categoryId: params.categoryId },
        { category: { slug: params.categoryId } }
      ];
    }
    
    if (params?.search) {
      const searchCondition = {
        OR: [
          { name: { contains: params.search, mode: 'insensitive' } },
          { description: { contains: params.search, mode: 'insensitive' } },
        ]
      };
      
      if (whereClause.OR) {
        whereClause.AND = [
          { OR: whereClause.OR },
          searchCondition
        ];
        delete whereClause.OR;
      } else {
        whereClause.OR = searchCondition.OR;
      }
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
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { products: { where: { active: true } } }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
