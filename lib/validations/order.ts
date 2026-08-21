import { z } from 'zod';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { paginationSchema } from './common';

export const orderQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  sortBy: z.enum(['createdAt', 'finalTotal']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
});

export type OrderQuery = z.infer<typeof orderQuerySchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
