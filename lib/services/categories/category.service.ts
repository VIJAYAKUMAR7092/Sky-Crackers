import prisma from '@/lib/db/prisma';
import { AppError } from '@/lib/utils/errors';
import { createCategorySchema, updateCategorySchema, categoryFilterSchema } from '@/lib/validations/category';

export async function getActiveCategories() {
  const categories = await prisma.category.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  });

  return categories;
}

export async function getAdminCategories(queryParams: unknown) {
  const filters = categoryFilterSchema.parse(queryParams);
  const { search, active, page, limit, sortBy, sortOrder } = filters;

  const skip = (page - 1) * limit;

  // Build Prisma where clause
  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (active !== undefined && active !== 'all') {
    where.active = active === 'true';
  }

  const total = await prisma.category.count({ where });
  const categories = await prisma.category.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return {
    data: categories,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new AppError('Category not found', 'NOT_FOUND', 404);
  }

  return category;
}

export async function createCategory(data: unknown) {
  const validated = createCategorySchema.parse(data);

  let slug = validated.slug;
  if (!slug) {
    slug = validated.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    throw new AppError('A category with this slug already exists', 'CONFLICT', 400);
  }

  const category = await prisma.category.create({
    data: {
      ...validated,
      slug,
    },
  });

  return category;
}

export async function updateCategory(id: string, data: unknown) {
  const validated = updateCategorySchema.parse(data);

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Category not found', 'NOT_FOUND', 404);
  }

  if (validated.slug && validated.slug !== existing.slug) {
    const slugExists = await prisma.category.findUnique({ where: { slug: validated.slug } });
    if (slugExists) {
      throw new AppError('A category with this slug already exists', 'CONFLICT', 400);
    }
  }

  const category = await prisma.category.update({
    where: { id },
    data: validated,
  });

  return category;
}

export async function softDeleteCategory(id: string) {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Category not found', 'NOT_FOUND', 404);
  }

  const category = await prisma.category.update({
    where: { id },
    data: { active: false },
  });

  return category;
}
