import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAdminCoupons, createCoupon } from '@/lib/services/coupons/coupon.service';
import { couponFormSchema } from '@/lib/validations/coupon';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const query = {
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      type: searchParams.get('type') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    };

    const result = await getAdminCoupons(query);
    return successResponse(result);
  });
};

export const POST = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const body = await request.json();
    const validatedData = couponFormSchema.parse(body);
    const result = await createCoupon(validatedData);
    return successResponse(result, 201);
  });
};
