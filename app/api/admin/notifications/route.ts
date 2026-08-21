import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAdminNotifications, markAllAdminNotificationsAsRead } from '@/lib/services/notifications/notification.service';
import { successResponse } from '@/lib/utils/api-response';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const result = await getAdminNotifications(page, limit);
    return successResponse(result);
  });
};

export const PATCH = async () => {
  return withErrorHandler(async () => {
    await requireAdmin();
    await markAllAdminNotificationsAsRead();
    return successResponse({ success: true });
  });
};
