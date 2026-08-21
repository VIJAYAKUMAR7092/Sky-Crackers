import prisma from '@/lib/db/prisma';

export async function getAdminNotifications(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { recipientType: 'ADMIN' },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        order: { select: { id: true, orderReference: true } }
      }
    }),
    prisma.notification.count({ where: { recipientType: 'ADMIN' } })
  ]);

  return {
    notifications,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
}

export async function getUnreadAdminNotificationCount() {
  return prisma.notification.count({
    where: { recipientType: 'ADMIN', isRead: false }
  });
}

export async function markNotificationAsRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });
}

export async function markAllAdminNotificationsAsRead() {
  return prisma.notification.updateMany({
    where: { recipientType: 'ADMIN', isRead: false },
    data: { isRead: true }
  });
}

export async function deleteNotification(id: string) {
  return prisma.notification.delete({
    where: { id }
  });
}

// ----------------------------------------------------
// Core Notification Creation
// ----------------------------------------------------

export async function createAdminNotification(type: string, title: string, message: string, orderId?: string) {
  return prisma.notification.create({
    data: {
      recipientType: 'ADMIN',
      type,
      title,
      message,
      orderId: orderId || null
    }
  });
}

export async function createCustomerNotification(recipientId: string, type: string, title: string, message: string, orderId?: string) {
  return prisma.notification.create({
    data: {
      recipientType: 'CUSTOMER',
      recipientId,
      type,
      title,
      message,
      orderId: orderId || null
    }
  });
}


