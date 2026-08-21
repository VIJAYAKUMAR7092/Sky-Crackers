import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { DeliveryZoneNotFoundError, AppError } from '@/lib/utils/errors';

export async function getAdminDeliveryZones(queryParams: Record<string, string | undefined>) {
  const { search, status, state, courier, page = '1', limit = '10', sortBy = 'newest' } = queryParams;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: Prisma.DeliveryZoneWhereInput = {};

  if (search) {
    const searchMode: Prisma.QueryMode = 'insensitive';
    where.OR = [
      { name: { contains: search, mode: searchMode } },
      { state: { contains: search, mode: searchMode } },
      { courier: { contains: search, mode: searchMode } },
      { notes: { contains: search, mode: searchMode } },
      { pincodes: { has: search } }
    ];
  }

  if (status === 'active') {
    where.active = true;
  } else if (status === 'inactive') {
    where.active = false;
  }

  if (state && state !== 'all') {
    where.state = state;
  }

  if (courier && courier !== 'all') {
    where.courier = courier;
  }

  let orderBy: Prisma.DeliveryZoneOrderByWithRelationInput = {};

  if (sortBy === 'newest') {
    orderBy = { createdAt: 'desc' };
  } else if (sortBy === 'oldest') {
    orderBy = { createdAt: 'asc' };
  } else if (sortBy === 'name_asc') {
    orderBy = { name: 'asc' };
  } else if (sortBy === 'name_desc') {
    orderBy = { name: 'desc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }

  const total = await prisma.deliveryZone.count({ where });
  const zones = await prisma.deliveryZone.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  return {
    data: zones,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    }
  };
}

export async function getDeliveryZoneById(id: string) {
  const zone = await prisma.deliveryZone.findUnique({
    where: { id },
  });

  if (!zone) {
    throw new DeliveryZoneNotFoundError();
  }

  return zone;
}

export async function createDeliveryZone(data: Record<string, unknown>) {
  const pincodesString = String(data.pincodes || '');
  const pincodesArray = pincodesString.split(',').map(p => p.trim()).filter(Boolean);

  return prisma.deliveryZone.create({
    data: {
      name: String(data.name),
      state: data.state ? String(data.state) : null,
      pincodes: pincodesArray,
      deliveryCharge: Number(data.deliveryCharge || 0),
      freeDeliveryThreshold: data.freeDeliveryThreshold !== null && data.freeDeliveryThreshold !== undefined ? Number(data.freeDeliveryThreshold) : null,
      estimatedTime: data.estimatedTime ? String(data.estimatedTime) : null,
      notes: data.notes ? String(data.notes) : null,
      courier: data.courier ? String(data.courier) : 'Transport',
      priority: data.priority !== undefined ? Number(data.priority) : 2,
      deliverable: data.deliverable !== undefined ? Boolean(data.deliverable) : true,
      active: data.active !== undefined ? Boolean(data.active) : true,
    }
  });
}

export async function updateDeliveryZone(id: string, data: Record<string, unknown>) {
  const zone = await prisma.deliveryZone.findUnique({ where: { id } });
  if (!zone) {
    throw new DeliveryZoneNotFoundError();
  }

  const pincodesString = data.pincodes !== undefined ? String(data.pincodes) : undefined;
  const pincodesArray = pincodesString !== undefined 
    ? pincodesString.split(',').map(p => p.trim()).filter(Boolean)
    : undefined;

  return prisma.deliveryZone.update({
    where: { id },
    data: {
      name: data.name !== undefined ? String(data.name) : undefined,
      state: data.state !== undefined ? (data.state ? String(data.state) : null) : undefined,
      pincodes: pincodesArray,
      deliveryCharge: data.deliveryCharge !== undefined ? Number(data.deliveryCharge) : undefined,
      freeDeliveryThreshold: data.freeDeliveryThreshold !== undefined ? (data.freeDeliveryThreshold !== null ? Number(data.freeDeliveryThreshold) : null) : undefined,
      estimatedTime: data.estimatedTime !== undefined ? (data.estimatedTime ? String(data.estimatedTime) : null) : undefined,
      notes: data.notes !== undefined ? (data.notes ? String(data.notes) : null) : undefined,
      courier: data.courier !== undefined ? String(data.courier) : undefined,
      priority: data.priority !== undefined ? Number(data.priority) : undefined,
      deliverable: data.deliverable !== undefined ? Boolean(data.deliverable) : undefined,
      active: data.active !== undefined ? Boolean(data.active) : undefined,
    }
  });
}

export async function toggleDeliveryZoneStatus(id: string) {
  const zone = await prisma.deliveryZone.findUnique({ where: { id } });
  if (!zone) {
    throw new DeliveryZoneNotFoundError();
  }

  return prisma.deliveryZone.update({
    where: { id },
    data: { active: !zone.active }
  });
}

export async function deleteDeliveryZone(id: string) {
  const zone = await prisma.deliveryZone.findUnique({ where: { id } });
  if (!zone) {
    throw new DeliveryZoneNotFoundError();
  }

  return prisma.deliveryZone.delete({ where: { id } });
}

// ----------------------------------------------------------------------
// Checkout Ready Services
// ----------------------------------------------------------------------

export async function getDeliveryByPincode(pincode: string) {
  const zones = await prisma.deliveryZone.findMany({
    where: {
      active: true,
      pincodes: { has: pincode }
    },
    orderBy: { priority: 'asc' } // 1 is highest priority
  });

  return zones.length > 0 ? zones[0] : null;
}

export async function isPincodeDeliverable(pincode: string) {
  const zone = await getDeliveryByPincode(pincode);
  if (!zone) return { deliverable: false };

  return {
    deliverable: zone.deliverable,
    deliveryCharge: Number(zone.deliveryCharge),
    estimatedDays: zone.estimatedTime,
    courier: zone.courier,
    freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null
  };
}

export async function calculateShipping(pincode: string, orderAmount: number) {
  const zone = await getDeliveryByPincode(pincode);
  
  if (!zone || !zone.deliverable) {
    throw new AppError('Delivery is not available for this pincode.', 'NON_DELIVERABLE_PINCODE', 400);
  }

  if (zone.freeDeliveryThreshold && orderAmount >= Number(zone.freeDeliveryThreshold)) {
    return 0;
  }

  return Number(zone.deliveryCharge);
}

export async function getEstimatedDelivery(pincode: string) {
  const zone = await getDeliveryByPincode(pincode);
  return zone ? zone.estimatedTime : null;
}
