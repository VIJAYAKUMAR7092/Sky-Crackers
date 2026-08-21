import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAdminDeliveryZones, createDeliveryZone } from '@/lib/services/delivery/delivery.service';
import { deliveryFormSchema } from '@/lib/validations/delivery';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const query = {
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      state: searchParams.get('state') || undefined,
      courier: searchParams.get('courier') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    };

    const result = await getAdminDeliveryZones(query);
    return successResponse(result);
  });
};

export const POST = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const body = await request.json();
    const validatedData = deliveryFormSchema.parse(body);
    const result = await createDeliveryZone(validatedData);
    return successResponse(result, 201);
  });
};
