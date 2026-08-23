import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getSalesChartData } from '@/lib/services/dashboard/dashboard.service';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const searchParams = request.nextUrl.searchParams;
    const preset = searchParams.get('preset') as '7days' | 'yesterday' | '30days' | 'thisMonth' || '7days';
    
    const result = await getSalesChartData(preset);
    return successResponse(result);
  });
};
