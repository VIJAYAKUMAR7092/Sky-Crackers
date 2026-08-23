import { serializeDecimals } from '@/lib/utils/serialization';
import prisma from '@/lib/db/prisma';
import { AppError } from '@/lib/utils/errors';
import { orderQuerySchema, updateOrderStatusSchema } from '@/lib/validations/order';
import { Prisma } from '@prisma/client';

export async function getAdminOrders(queryParams: unknown) {
  const filters = orderQuerySchema.parse(queryParams);
  const { search, status, paymentStatus, page, limit, sortBy, sortOrder } = filters;

  const skip = (page - 1) * limit;
  const where: Prisma.OrderWhereInput = { isDeleted: false };

  if (search) {
    where.OR = [
      { orderReference: { contains: search, mode: 'insensitive' } },
      { customer: { fullName: { contains: search, mode: 'insensitive' } } },
      { customer: { email: { contains: search, mode: 'insensitive' } } },
      { customer: { phone: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (status && status !== 'all' as any) {
    where.status = status;
  }

  if (paymentStatus && paymentStatus !== 'all' as any) {
    where.paymentStatus = paymentStatus;
  }

  const total = await prisma.order.count({ where });
  const orders = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      customer: {
        select: {
          fullName: true,
          email: true,
          phone: true,
        }
      },
    }
  });

  return {
    data: serializeDecimals(orders),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            select: {
              images: true
            }
          }
        }
      },
      payments: true,
      coupon: true,
    }
  });

  if (!order) {
    throw new AppError('Order not found', 'NOT_FOUND', 404);
  }

  return serializeDecimals(order);
}

export async function updateOrderStatus(id: string, data: unknown) {
  const validated = updateOrderStatusSchema.parse(data);

  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Order not found', 'NOT_FOUND', 404);
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: validated,
  });

  return serializeDecimals(updatedOrder);
}


export async function deleteOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new AppError('Order not found', 'NOT_FOUND', 404);
  }

  await prisma.order.update({
    where: { id },
    data: { isDeleted: true },
  });

  return { success: true, message: 'Order deleted successfully' };
}
