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

  const totalProducts = await safeCount(prisma.product.count({ where: { active: true } }));
  const totalOrders = await safeCount(prisma.order.count());
  const totalCustomers = await safeCount(prisma.customer.count());
  const totalCategories = await safeCount(prisma.category.count({ where: { active: true } }));
  const pendingOrders = await safeCount(prisma.order.count({ where: { status: 'PENDING' } }));
  const outOfStock = await safeCount(prisma.product.count({ where: { stockStatus: 'OUT_OF_STOCK' } }));
  const activeCoupons = await safeCount(prisma.coupon.count({ where: { active: true, OR: [{ expiryDate: null }, { expiryDate: { gt: new Date() } }] } }));
  const activeDeliveryZones = await safeCount(prisma.deliveryZone.count({ where: { active: true } }));
  
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
