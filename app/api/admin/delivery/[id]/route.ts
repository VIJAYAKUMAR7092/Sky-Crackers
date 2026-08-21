import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getDeliveryZoneById, updateDeliveryZone, deleteDeliveryZone, toggleDeliveryZoneStatus } from '@/lib/services/delivery/delivery.service';
import { deliveryFormSchema } from '@/lib/validations/delivery';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    const zone = await getDeliveryZoneById(resolvedParams.id);
    return successResponse(zone);
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
    
    if (Object.keys(body).length === 1 && 'active' in body) {
      const zone = await toggleDeliveryZoneStatus(resolvedParams.id);
      return successResponse(zone);
    }
    
    const validatedData = deliveryFormSchema.parse(body);
    const zone = await updateDeliveryZone(resolvedParams.id, validatedData);
    return successResponse(zone);
  });
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    await deleteDeliveryZone(resolvedParams.id);
    return successResponse({ message: 'Delivery zone deleted successfully' });
  });
};
