import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(255),
  slug: z.string().max(255).optional(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  displayOrder: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().cuid('Invalid category ID').optional(),
});

export const categoryFilterSchema = z.object({
  search: z.string().optional(),
  active: z.enum(['true', 'false', 'all']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  sortBy: z.enum(['name', 'createdAt', 'displayOrder']).optional().default('displayOrder'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});
