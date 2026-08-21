import { z } from 'zod';
import { paginationSchema } from './common';

export const customerQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  sortBy: z.enum(['newest', 'oldest', 'orders_desc', 'spending_desc']).optional().default('newest'),
});

export const updateCustomerStatusSchema = z.object({
  active: z.boolean(),
});
