import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getOrderById, updateOrderStatus } from '@/lib/services/orders/order.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    const order = await getOrderById(resolvedParams.id);
    return successResponse(order);
  });
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    const body = await request.json();
    const order = await updateOrderStatus(resolvedParams.id, body);
    return successResponse(order);
  });
};
