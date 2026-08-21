import { z } from 'zod';
import { paginationSchema } from './common';

export const deliveryQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  state: z.string().optional(),
  courier: z.string().optional(),
  sortBy: z.enum(['newest', 'oldest', 'name_asc', 'name_desc']).optional().default('newest'),
});

export const deliveryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  state: z.string().optional().nullable(),
  pincodes: z.string().min(1, 'Please provide at least one pincode')
    .refine((val) => val.split(',').every(p => p.trim().length > 0 && /^\d+$/.test(p.trim())), 'Invalid pincode format. Use comma separated numeric values.'),
  deliveryCharge: z.number().min(0, 'Delivery charge must be positive'),
  freeDeliveryThreshold: z.number().nullable().optional(),
  estimatedTime: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  courier: z.enum(['Mettur Transports (MSS)', 'A1 Parcel Service', 'Rathimeena Parcel Service', 'Local Lorry Service', 'Other Transports']).default('Mettur Transports (MSS)'),
  priority: z.number().int().min(1).max(3).default(2),
  deliverable: z.boolean().default(true),
  active: z.boolean().default(true),
});
