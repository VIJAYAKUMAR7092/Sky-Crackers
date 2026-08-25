import prisma from '@/lib/db/prisma';

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  totalCustomers: number;
  totalCategories: number;
  pendingOrders: number;
  outOfStock: number;
  activeCoupons: number;
  activeDeliveryZones: number;
  coveredPincodes: number;
  deliverableStates: number;
  activeCourierRules: number;
  todaysOrders: number;
  
  trends: {
    revenue: string;
    orders: string;
    customers: string;
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const safeCount = async (queryPromise: Promise<number>) => {
    try {
      return await queryPromise;
    } catch (error) {
      console.warn('Dashboard stat query failed:', error);
      return 0;
    }
  };

  // Run all counts in parallel for significant performance improvement
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalCategories,
    pendingOrders,
    outOfStock,
    activeCoupons,
    activeDeliveryZones
  ] = await Promise.all([
    safeCount(prisma.product.count({ where: { active: true } })),
    safeCount(prisma.order.count({ where: { isDeleted: false } })),
    safeCount(prisma.customer.count()),
    safeCount(prisma.category.count({ where: { active: true } })),
    safeCount(prisma.order.count({ where: { status: 'PENDING', isDeleted: false } })),
    safeCount(prisma.product.count({ where: { stockStatus: 'OUT_OF_STOCK' } })),
    safeCount(prisma.coupon.count({ where: { active: true, OR: [{ expiryDate: null }, { expiryDate: { gt: new Date() } }] } })),
    safeCount(prisma.deliveryZone.count({ where: { active: true } }))
  ]);
  
  let coveredPincodes = 0;
  let deliverableStates = 0;
  let activeCourierRules = 0;

  try {
    const zones = await prisma.deliveryZone.findMany({ 
      where: { active: true }, 
      select: { pincodes: true, deliverable: true, state: true, courier: true } 
    });
    
    const uniquePincodes = new Set();
    const uniqueStates = new Set();
    
    zones.forEach(zone => {
      zone.pincodes.forEach(p => uniquePincodes.add(p));
      
      if (zone.deliverable && zone.state) {
        uniqueStates.add(zone.state.toLowerCase().trim());
      }
      
      if (zone.deliverable && zone.courier) {
        activeCourierRules++;
      }
    });
    
    coveredPincodes = uniquePincodes.size;
    deliverableStates = uniqueStates.size;
  } catch (error) {
    console.warn('Dashboard pincodes/states query failed:', error);
  }

  let revenue = 0;
  try {
    const result = await prisma.order.aggregate({
      where: { isDeleted: false, status: { not: 'CANCELLED' } },
      _sum: {
        finalTotal: true
      }
    });
    revenue = Number(result._sum.finalTotal) || 0;
  } catch (error) {
    console.warn('Dashboard revenue query failed:', error);
  }

  return {
    totalProducts,
    totalOrders,
    revenue,
    totalCustomers,
    totalCategories,
    pendingOrders,
    outOfStock,
    activeCoupons,
    activeDeliveryZones,
    coveredPincodes,
    deliverableStates,
    activeCourierRules,
    todaysOrders: 0,
    trends: {
      revenue: "+0.0%",
      orders: "+0.0%",
      customers: "+0.0%",
    }
  };
}

export async function getRecentOrders(limit: number = 5) {
  try {
    return await prisma.order.findMany({
      where: { isDeleted: false },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { customer: true }
    });
  } catch (error) {
    console.error('Failed to fetch recent orders:', error);
    return [];
  }
}

export async function getInventoryAlerts(limit: number = 5) {
  try {
    return await prisma.product.findMany({
      where: { stockStatus: 'OUT_OF_STOCK' },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch inventory alerts:', error);
    return [];
  }
}

export async function getSalesChartData(preset: '7days' | 'yesterday' | '30days' | 'thisMonth' = '7days') {
  const now = new Date();
  let start = new Date();
  
  if (preset === '7days') {
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
  } else if (preset === 'yesterday') {
    start.setDate(now.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() - 1);
    now.setHours(23, 59, 59, 999);
  } else if (preset === '30days') {
    start.setDate(now.getDate() - 29);
    start.setHours(0, 0, 0, 0);
  } else if (preset === 'thisMonth') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: now
      },
      status: {
        not: 'CANCELLED'
      },
      isDeleted: false
    },
    select: {
      createdAt: true,
      finalTotal: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return orders.map(o => ({
    createdAt: o.createdAt.toISOString(),
    finalTotal: Number(o.finalTotal)
  }));
}
