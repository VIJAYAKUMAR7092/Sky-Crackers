import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { CustomerNotFoundError } from '@/lib/utils/errors';

export async function getAdminCustomers(queryParams: any) {
  const { search, status, page = 1, limit = 10, sortBy = 'newest' } = queryParams;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: Prisma.CustomerWhereInput = {};

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (status === 'active') {
    where.active = true;
  } else if (status === 'inactive') {
    where.active = false;
  }

  let orderBy: Prisma.CustomerOrderByWithRelationInput = {};

  if (sortBy === 'newest') {
    orderBy = { createdAt: 'desc' };
  } else if (sortBy === 'oldest') {
    orderBy = { createdAt: 'asc' };
  } else if (sortBy === 'orders_desc') {
    orderBy = { orders: { _count: 'desc' } };
  } else {
    // spending_desc is harder with standard relation ordering.
    // However, Prisma doesn't support ordering by aggregate sum directly in standard findMany.
    // We will fallback to newest.
    orderBy = { createdAt: 'desc' };
  }

  const total = await prisma.customer.count({ where });
  const customers = await prisma.customer.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      _count: {
        select: { orders: true }
      },
      orders: {
        select: {
          finalTotal: true
        }
      }
    }
  });

  // Calculate spending manually since prisma doesn't return aggregated sum in findMany directly
  const enrichedCustomers = customers.map(c => {
    const totalSpending = c.orders.reduce((sum, order) => sum + Number(order.finalTotal), 0);
    const totalOrders = c._count.orders;
    return {
      id: c.id,
      fullName: c.fullName,
      email: c.email,
      phone: c.phone,
      active: c.active,
      createdAt: c.createdAt,
      totalOrders,
      totalSpending,
    };
  });

  // Handle spending_desc manually in memory
  if (sortBy === 'spending_desc') {
    enrichedCustomers.sort((a, b) => b.totalSpending - a.totalSpending);
  }

  return {
    data: enrichedCustomers,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    }
  };
}

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      addresses: true,
      orders: {
        orderBy: { createdAt: 'desc' },
      }
    }
  });

  if (!customer) {
    throw new CustomerNotFoundError();
  }

  const totalOrders = customer.orders.length;
  const totalSpending = customer.orders.reduce((sum, order) => sum + Number(order.finalTotal), 0);
  const averageOrderValue = totalOrders > 0 ? totalSpending / totalOrders : 0;
  const lastOrderDate = customer.orders[0]?.createdAt || null;

  return {
    ...customer,
    totalOrders,
    totalSpending,
    averageOrderValue,
    lastOrderDate
  };
}

export async function updateCustomerStatus(id: string, active: boolean) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) {
    throw new CustomerNotFoundError();
  }

  return prisma.customer.update({
    where: { id },
    data: { active }
  });
}
