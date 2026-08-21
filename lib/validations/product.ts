import { z } from 'zod';
import { paginationSchema } from './common';

export const getProductsQuerySchema = paginationSchema.extend({
  categoryId: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  bestSeller: z.coerce.boolean().optional(),
  newArrival: z.coerce.boolean().optional(),
});

export const getAdminProductsQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  active: z.coerce.boolean().optional(),
  stockStatus: z.enum(['IN_STOCK', 'OUT_OF_STOCK']).optional(),
  sortBy: z.enum(['name', 'createdAt', 'sellingPrice']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const productSlugParamSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

export const productParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

const productImageSchema = z.object({
  id: z.string().optional(), // Existing image
  url: z.string().min(1, "Image URL is required"),
  altText: z.string().optional().nullable(),
  displayOrder: z.number().int().min(0).default(0),
  isPrimary: z.boolean().default(false),
});

const baseProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  sku: z.string().transform(v => v === "" ? null : v).optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  mrp: z.coerce.number().positive("MRP must be greater than 0"),
  sellingPrice: z.coerce.number().positive("Selling price must be greater than 0"),
  discount: z.coerce.number().min(0).optional().nullable(),
  packInfo: z.string().optional().nullable(),
  stockStatus: z.enum(['IN_STOCK', 'OUT_OF_STOCK']).default('IN_STOCK'),
  categoryId: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  active: z.boolean().default(true),
  images: z.array(productImageSchema).optional().default([]),
});

export const createProductSchema = baseProductSchema.refine(data => data.sellingPrice <= data.mrp, {
  message: "Selling price cannot be greater than MRP",
  path: ["sellingPrice"],
});

export const updateProductSchema = baseProductSchema.partial().refine(data => {
  if (data.sellingPrice !== undefined && data.mrp !== undefined) {
    return data.sellingPrice <= data.mrp;
  }
  return true; // if one is missing in update, skip check
}, {
  message: "Selling price cannot be greater than MRP",
  path: ["sellingPrice"],
});
