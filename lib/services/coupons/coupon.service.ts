import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { CouponNotFoundError, AppError } from '@/lib/utils/errors';

export async function getAdminCoupons(queryParams: Record<string, string | undefined>) {
  const { search, status, type, page = '1', limit = '10', sortBy = 'newest' } = queryParams;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: Prisma.CouponWhereInput = {};

  if (search) {
    where.code = { contains: search, mode: 'insensitive' };
  }

  const now = new Date();

  if (status === 'active') {
    where.active = true;
    where.OR = [
      { expiryDate: null },
      { expiryDate: { gt: now } }
    ];
  } else if (status === 'inactive') {
    where.active = false;
  } else if (status === 'expired') {
    where.active = true;
    where.expiryDate = { lte: now };
  }

  if (type === 'PERCENTAGE' || type === 'FIXED') {
    where.discountType = type;
  }

  let orderBy: Prisma.CouponOrderByWithRelationInput = {};

  if (sortBy === 'newest') {
    orderBy = { createdAt: 'desc' };
  } else if (sortBy === 'oldest') {
    orderBy = { createdAt: 'asc' };
  } else if (sortBy === 'discount_desc') {
    orderBy = { discountValue: 'desc' };
  } else if (sortBy === 'usage_desc') {
    orderBy = { usedCount: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }

  const total = await prisma.coupon.count({ where });
  const coupons = await prisma.coupon.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  return {
    data: coupons,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    }
  };
}

export async function getCouponById(id: string) {
  const coupon = await prisma.coupon.findUnique({
    where: { id },
  });

  if (!coupon) {
    throw new CouponNotFoundError();
  }

  return coupon;
}

export async function createCoupon(data: Record<string, unknown>) {
  const code = String(data.code);
  const existing = await prisma.coupon.findUnique({ where: { code } });
  if (existing) {
    throw new AppError('Coupon code already exists', 'DUPLICATE_CODE', 400);
  }

  return prisma.coupon.create({
    data: {
      code,
      description: data.description ? String(data.description) : null,
      discountType: data.discountType as 'PERCENTAGE' | 'FIXED',
      discountValue: Number(data.discountValue),
      minOrderValue: Number(data.minOrderValue || 0),
      maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : null,
      usageLimit: data.usageLimit ? Number(data.usageLimit) : null,
      perCustomerLimit: data.perCustomerLimit ? Number(data.perCustomerLimit) : null,
      startDate: data.startDate ? new Date(String(data.startDate)) : null,
      expiryDate: data.expiryDate ? new Date(String(data.expiryDate)) : null,
      active: Boolean(data.active),
    }
  });
}

export async function updateCoupon(id: string, data: Record<string, unknown>) {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) {
    throw new CouponNotFoundError();
  }

  const code = data.code ? String(data.code) : undefined;
  if (code && code !== coupon.code) {
    const existing = await prisma.coupon.findUnique({ where: { code } });
    if (existing) {
      throw new AppError('Coupon code already exists', 'DUPLICATE_CODE', 400);
    }
  }

  return prisma.coupon.update({
    where: { id },
    data: {
      code,
      description: data.description !== undefined ? (data.description ? String(data.description) : null) : undefined,
      discountType: data.discountType ? (data.discountType as 'PERCENTAGE' | 'FIXED') : undefined,
      discountValue: data.discountValue !== undefined ? Number(data.discountValue) : undefined,
      minOrderValue: data.minOrderValue !== undefined ? Number(data.minOrderValue) : undefined,
      maxDiscount: data.maxDiscount !== undefined ? (data.maxDiscount ? Number(data.maxDiscount) : null) : undefined,
      usageLimit: data.usageLimit !== undefined ? (data.usageLimit ? Number(data.usageLimit) : null) : undefined,
      perCustomerLimit: data.perCustomerLimit !== undefined ? (data.perCustomerLimit ? Number(data.perCustomerLimit) : null) : undefined,
      startDate: data.startDate !== undefined ? (data.startDate ? new Date(String(data.startDate)) : null) : undefined,
      expiryDate: data.expiryDate !== undefined ? (data.expiryDate ? new Date(String(data.expiryDate)) : null) : undefined,
      active: data.active !== undefined ? Boolean(data.active) : undefined,
    }
  });
}

export async function toggleCouponStatus(id: string) {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) {
    throw new CouponNotFoundError();
  }

  return prisma.coupon.update({
    where: { id },
    data: { active: !coupon.active }
  });
}

export async function deleteCoupon(id: string) {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) {
    throw new CouponNotFoundError();
  }

  return prisma.coupon.delete({ where: { id } });
}
