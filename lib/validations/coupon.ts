import { z } from 'zod';
import { paginationSchema } from './common';

export const couponQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive', 'expired']).optional().default('all'),
  type: z.enum(['all', 'PERCENTAGE', 'FIXED']).optional().default('all'),
  sortBy: z.enum(['newest', 'oldest', 'discount_desc', 'usage_desc']).optional().default('newest'),
});

export const couponFormSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters').toUpperCase(),
  description: z.string().optional().nullable(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.number().min(0, 'Discount value must be positive'),
  minOrderValue: z.number().min(0).default(0),
  maxDiscount: z.number().nullable().optional(),
  usageLimit: z.number().nullable().optional(),
  perCustomerLimit: z.number().nullable().optional(),
  startDate: z.string().nullable().optional(),
  expiryDate: z.string().nullable().optional(),
  active: z.boolean().default(true),
}).superRefine((data, ctx) => {
  if (data.discountType === 'PERCENTAGE' && data.discountValue > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Percentage discount cannot exceed 100%',
      path: ['discountValue'],
    });
  }
  if (data.startDate && data.expiryDate) {
    if (new Date(data.startDate) >= new Date(data.expiryDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Expiry date must be after start date',
        path: ['expiryDate'],
      });
    }
  }
});
