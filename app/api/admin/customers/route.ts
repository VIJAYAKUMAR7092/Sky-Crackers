import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAdminCustomers } from '@/lib/services/customers/customer.service';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const query = {
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    };

    const result = await getAdminCustomers(query);
    return successResponse(result);
  });
};
