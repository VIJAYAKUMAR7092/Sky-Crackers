import { z } from 'zod';

export const generalSettingsSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  logo: z.string().url().optional().or(z.literal('')),
  contactNumber: z.string().min(1, 'Contact number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
});

export const businessSettingsSchema = z.object({
  gstNumber: z.string().optional(),
  invoicePrefix: z.string().optional(),
  orderPrefix: z.string().optional(),
  currency: z.string().default('INR'),
});

export const deliverySettingsSchema = z.object({
  baseDeliveryCharge: z.coerce.number().min(0).default(0),
  freeShippingThreshold: z.coerce.number().min(0).default(0),
  serviceAreas: z.string().optional(), // Comma separated states/pincodes
});

export const paymentSettingsSchema = z.object({
  codEnabled: z.boolean().default(true),
  razorpayKey: z.string().optional(),
  razorpaySecret: z.string().optional(),
});
