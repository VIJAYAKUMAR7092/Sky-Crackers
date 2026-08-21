import { z } from 'zod';

export const notificationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  recipientType: z.enum(['ADMIN', 'CUSTOMER']),
  recipientId: z.string().optional().nullable(),
  orderId: z.string().optional().nullable(),
});
