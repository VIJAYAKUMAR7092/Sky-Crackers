import { z } from 'zod';

export const dateRangeSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  preset: z.enum(['today', 'yesterday', '7days', '30days', 'custom']).default('30days'),
});
