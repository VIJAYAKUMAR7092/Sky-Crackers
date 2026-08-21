import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getFullAnalytics } from '@/lib/services/reports/report.service';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const searchParams = request.nextUrl.searchParams;
    const preset = searchParams.get('preset') || '30days';
    
    const result = await getFullAnalytics(preset);
    return successResponse(result);
  });
};
