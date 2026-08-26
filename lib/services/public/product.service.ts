import { serializeDecimals } from '@/lib/utils/serialization';
import prisma from "@/lib/db/prisma";
import { unstable_cache } from 'next/cache';

export const getFeaturedProducts = unstable_cache(async () => {
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
}, ['public-featured-products'], { revalidate: 3600, tags: ['products'] });

export const getComboProducts = unstable_cache(async () => {
  return serializeDecimals(await prisma.product.findMany({ where: { isCombo: true, active: true }, include: { images: true, category: true }, orderBy: { comboOrder: 'asc' } }));
}, ['public-combo-products'], { revalidate: 3600, tags: ['products'] });

export const getBestSellingProducts = unstable_cache(async () => {
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
}, ['public-bestselling-products'], { revalidate: 3600, tags: ['products'] });

export const getProducts = unstable_cache(async (params?: { categoryId?: string, search?: string, limit?: number, skip?: number }) => {
  try {
    const whereClause: any = { active: true };
    
    if (params?.categoryId) {
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
        orderBy: { sellingPrice: 'asc' }
      }),
      prisma.product.count({ where: whereClause })
    ]);

    return { products: serializeDecimals(products), total };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
}, ['public-products-list'], { revalidate: 3600, tags: ['products'] });

export const getProductBySlug = unstable_cache(async (slug: string) => {
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
}, ['public-product-slug'], { revalidate: 3600, tags: ['products'] });

export const getAllCategories = unstable_cache(async () => {
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
}, ['public-all-categories'], { revalidate: 3600, tags: ['categories'] });
