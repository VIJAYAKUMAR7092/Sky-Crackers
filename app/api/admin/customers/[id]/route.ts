import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getCustomerById, updateCustomerStatus } from '@/lib/services/customers/customer.service';
import { updateCustomerStatusSchema } from '@/lib/validations/customer';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    const customer = await getCustomerById(resolvedParams.id);
    return successResponse(customer);
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
    const validatedData = updateCustomerStatusSchema.parse(body);
    const customer = await updateCustomerStatus(resolvedParams.id, validatedData.active);
    return successResponse(customer);
  });
};
