import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { markNotificationAsRead, deleteNotification } from '@/lib/services/notifications/notification.service';
import { successResponse } from '@/lib/utils/api-response';

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const result = await markNotificationAsRead(resolvedParams.id);
    return successResponse(result);
  });
};

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    await deleteNotification(resolvedParams.id);
    return successResponse({ success: true });
  });
};
