import { serializeDecimals } from '@/lib/utils/serialization';
import { revalidateTag } from 'next/cache';
import prisma from '../../db/prisma';
import { NotFoundError } from '../../utils/errors';
import { PaginationQuery } from '../../validations/common';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

type GetProductsParams = PaginationQuery & {
  categoryId?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};

// Select only fields safe for public consumption
const publicProductSelect = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  mrp: true,
  sellingPrice: true,
  discount: true,
  packInfo: true,
  stockStatus: true,
  featured: true,
  bestSeller: true,
  newArrival: true,
  images: {
    select: {
      url: true,
      altText: true,
      isPrimary: true,
      displayOrder: true,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  },
} satisfies Prisma.ProductSelect;

export async function getProducts(params: GetProductsParams) {
  const { page, limit, categoryId, featured, bestSeller, newArrival } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    active: true,
    ...(categoryId && { categoryId }),
    ...(featured !== undefined && { featured }),
    ...(bestSeller !== undefined && { bestSeller }),
    ...(newArrival !== undefined && { newArrival }),
  };

  const total = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    where,
    select: publicProductSelect,
    skip,
    take: limit,
    // Deterministic ordering
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
      { id: 'asc' },
    ],
  });

  return {
    products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      active: true,
    },
    select: {
      ...publicProductSelect,
      description: true, // Include full description for single product view
      categoryId: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!product) {
    throw new NotFoundError(`Product with slug '${slug}' not found.`);
  }

  return serializeDecimals(product);
}

export type GetAdminProductsParams = PaginationQuery & {
  search?: string;
  categoryId?: string;
  active?: boolean;
  stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK';
  sortBy?: 'name' | 'createdAt' | 'sellingPrice';
  sortOrder?: 'asc' | 'desc';
};

export async function getAdminProducts(params: GetAdminProductsParams) {
  const { page, limit, search, categoryId, active, stockStatus, sortBy = 'createdAt', sortOrder = 'desc' } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ],
    }),
    ...(categoryId && { categoryId }),
    ...(active !== undefined && { active }),
    ...(stockStatus && { stockStatus }),
  };

  const total = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      category: {
        select: { name: true },
      },
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });

  return {
    products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createProduct(data: z.infer<typeof import('../../validations/product').createProductSchema>) {
  const { images, ...productData } = data;

  const product = await prisma.product.create({
    data: {
      ...productData,
      images: {
        create: images.map(img => ({
          url: img.url,
          altText: img.altText,
          displayOrder: img.displayOrder,
          isPrimary: img.isPrimary,
        })),
      },
    },
    include: { images: true, category: true },
  });

  revalidateTag('products');
  const { revalidatePath } = require('next/cache');
  revalidatePath('/', 'layout');
  return serializeDecimals(product);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });

  if (!product) {
    throw new NotFoundError(`Product with id '${id}' not found.`);
  }

  return serializeDecimals(product);
}

export async function updateProduct(id: string, data: z.infer<typeof import('../../validations/product').updateProductSchema>) {
  const { images, ...productData } = data;

  const updatePayload: Prisma.ProductUpdateInput = { ...productData };

  // If images are provided, we replace all images for simplicity in this iteration
  if (images) {
    updatePayload.images = {
      deleteMany: {}, // Remove existing images
      create: images.map(img => ({
        url: img.url,
        altText: img.altText,
        displayOrder: img.displayOrder,
        isPrimary: img.isPrimary,
      })),
    };
  }

  const product = await prisma.product.update({
    where: { id },
    data: updatePayload,
    include: { images: true, category: true },
  });

  revalidateTag('products');
  const { revalidatePath } = require('next/cache');
  revalidatePath('/', 'layout');
  return serializeDecimals(product);
}

export async function softDeleteProduct(id: string) {
  const product = await prisma.product.update({
    where: { id },
    data: { active: false },
  });

  revalidateTag('products');
  const { revalidatePath } = require('next/cache');
  revalidatePath('/', 'layout');
  return serializeDecimals(product);
}
