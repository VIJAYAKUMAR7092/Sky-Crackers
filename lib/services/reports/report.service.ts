import { serializeDecimals } from '@/lib/utils/serialization';
import prisma from '@/lib/db/prisma';
import { startOfDay, endOfDay, subDays, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

const getDateRange = (preset: string, startDate?: string, endDate?: string) => {
  const now = new Date();
  let start: Date;
  let end: Date = endOfDay(now);

  switch (preset) {
    case 'today':
      start = startOfDay(now);
      break;
    case 'yesterday':
      start = startOfDay(subDays(now, 1));
      end = endOfDay(subDays(now, 1));
      break;
    case '7days':
      start = startOfDay(subDays(now, 7));
      break;
    case 'thisWeek':
      start = startOfWeek(now);
      break;
    case 'thisMonth':
      start = startOfMonth(now);
      break;
    case 'thisYear':
      start = startOfYear(now);
      break;
    case 'custom':
      start = startDate ? new Date(startDate) : startOfDay(subDays(now, 30));
      end = endDate ? endOfDay(new Date(endDate)) : endOfDay(now);
      break;
    case '30days':
    default:
      start = startOfDay(subDays(now, 30));
      break;
  }
  return { start, end };
};

// -----------------------------------------------------
// Revenue & Dashboard Reports
// -----------------------------------------------------
export async function getRevenueReport(preset: string, startDate?: string, endDate?: string) {
  const { start, end } = getDateRange(preset, startDate, endDate);

  // Use aggregate for total revenue
  const total = await prisma.order.aggregate({
    where: {
      createdAt: { gte: start, lte: end },
      status: { not: 'CANCELLED' }
    },
    _sum: { finalTotal: true },
    _count: { id: true },
  });

  return {
    totalRevenue: Number(total._sum.finalTotal || 0),
    totalOrders: total._count.id,
    averageOrderValue: total._count.id > 0 ? Number(total._sum.finalTotal || 0) / total._count.id : 0,
  };
}

export async function getDashboardSalesSummary() {
  const [today, thisWeek, thisMonth, thisYear] = await Promise.all([
    getRevenueReport('today'),
    getRevenueReport('thisWeek'),
    getRevenueReport('thisMonth'),
    getRevenueReport('thisYear'),
  ]);

  return { today, thisWeek, thisMonth, thisYear };
}

// -----------------------------------------------------
// Product Reports
// -----------------------------------------------------
export async function getProductReports() {
  // Best selling
  const bestSelling = await prisma.orderItem.groupBy({
    by: ['productId', 'productName'],
    _sum: { quantity: true, totalAmount: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 10,
  });

  // Out of stock
  const outOfStock = await prisma.product.findMany({
    where: { stockStatus: 'OUT_OF_STOCK', active: true },
    select: { id: true, name: true, sku: true, stockStatus: true },
    take: 10,
  });

  // Low stock (not explicitly tracked in enum)
  const lowStock: Array<{ id: string, name: string, sku: string | null, stockStatus: string }> = [];

  return serializeDecimals({ bestSelling, outOfStock, lowStock });
}

// -----------------------------------------------------
// Order Reports
// -----------------------------------------------------
export async function getOrderReports(preset: string = '30days') {
  const { start, end } = getDateRange(preset);
  
  const statusCounts = await prisma.order.groupBy({
    by: ['status'],
    where: { createdAt: { gte: start, lte: end } },
    _count: { id: true }
  });

  const report = {
    PENDING: 0, CONFIRMED: 0, PACKED: 0, SHIPPED: 0, 
    DELIVERED: 0, CANCELLED: 0, RETURNED: 0,
  };

  statusCounts.forEach(s => {
    if (s.status in report) {
      report[s.status as keyof typeof report] = s._count.id;
    }
  });

  return report;
}

// -----------------------------------------------------
// Customer Reports
// -----------------------------------------------------
export async function getCustomerReports(preset: string = '30days') {
  const { start, end } = getDateRange(preset);

  const newCustomers = await prisma.customer.count({
    where: { createdAt: { gte: start, lte: end } }
  });

  const topCustomers = await prisma.order.groupBy({
    by: ['customerId'],
    where: { customerId: { not: null }, createdAt: { gte: start, lte: end } },
    _sum: { finalTotal: true },
    _count: { id: true },
    orderBy: { _sum: { finalTotal: 'desc' } },
    take: 10,
  });

  // Fetch actual customer data for the top 10
  const populatedTop = await Promise.all(topCustomers.map(async (c) => {
    const cust = await prisma.customer.findUnique({ where: { id: c.customerId! } });
    return {
      customer: cust?.fullName || 'Unknown',
      email: cust?.email || '',
      phone: cust?.phone || '',
      orders: c._count.id,
      spent: Number(c._sum.finalTotal || 0)
    };
  }));

  return { newCustomers, topCustomers: populatedTop };
}

// -----------------------------------------------------
// Coupon & Delivery Reports
// -----------------------------------------------------
export async function getLogisticsReports() {
  const usedCoupons = await prisma.coupon.findMany({
    where: { usedCount: { gt: 0 } },
    orderBy: { usedCount: 'desc' },
    take: 10,
  });

  // Since we don't track courier explicitly per order yet (it's inside deliverySnapshot), 
  // we do a generic aggregate of delivery charges
  const deliveryStats = await prisma.order.aggregate({
    _sum: { deliveryCharge: true },
    _count: { id: true },
  });

  const freeShippingCount = await prisma.order.count({
    where: { deliveryCharge: 0 }
  });

  return serializeDecimals({ usedCoupons, deliveryStats, freeShippingCount });
}

// -----------------------------------------------------
// Get All Reports (For Dashboard)
// -----------------------------------------------------
export async function getFullAnalytics(preset: string = '30days') {
  // We do this sequentially or partially parallel to not overload connection pool
  const revenue = await getRevenueReport(preset);
  const orders = await getOrderReports(preset);
  const products = await getProductReports();
  const logistics = await getLogisticsReports();
  const customers = await getCustomerReports(preset);

  return serializeDecimals({ revenue, orders, products, logistics, customers });
}
