import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getWebsiteSettings, updateWebsiteSettings } from '@/lib/services/cms/cms.service';

export const GET = async (request: NextRequest) => {
  return await withErrorHandler(async () => {
    await requireAdmin();
    const result = await getWebsiteSettings();
    return successResponse(result);
  });
};

export const PUT = async (request: NextRequest) => {
  return await withErrorHandler(async () => {
    await requireAdmin();
    const body = await request.json();
    const result = await updateWebsiteSettings(body);
    return successResponse(result);
  });
};
