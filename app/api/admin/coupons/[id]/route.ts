import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getCouponById, updateCoupon, deleteCoupon, toggleCouponStatus } from '@/lib/services/coupons/coupon.service';
import { couponFormSchema } from '@/lib/validations/coupon';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    const coupon = await getCouponById(resolvedParams.id);
    return successResponse(coupon);
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
      const coupon = await toggleCouponStatus(resolvedParams.id);
      return successResponse(coupon);
    }
    
    const validatedData = couponFormSchema.parse(body);
    const coupon = await updateCoupon(resolvedParams.id, validatedData);
    return successResponse(coupon);
  });
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    await deleteCoupon(resolvedParams.id);
    return successResponse({ message: 'Coupon deleted successfully' });
  });
};
