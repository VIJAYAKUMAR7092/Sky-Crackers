const fs = require('fs');
let code = fs.readFileSync('lib/services/public/product.service.ts', 'utf8');

const oldLogic = `export const getProducts = async (params?: { categoryId?: string, search?: string, limit?: number, skip?: number }) => {
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
};`;

const newLogic = `export const getProducts = async (params?: { categoryId?: string, search?: string, limit?: number, skip?: number }) => {
  try {
    const fetchCached = unstable_cache(async () => {
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
    }, ['public-products', params?.categoryId || 'all', params?.search || 'none', String(params?.limit || 20)], { revalidate: 60, tags: ['products'] });

    return await fetchCached();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
};`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('lib/services/public/product.service.ts', code);
