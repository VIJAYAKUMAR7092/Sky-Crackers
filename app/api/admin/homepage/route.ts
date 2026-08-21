import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getFullHomepageCMS, ensureDefaultSections } from '@/lib/services/homepage/homepage.service';

export const GET = async () => {
  return withErrorHandler(async () => {
    await requireAdmin();
    await ensureDefaultSections();
    const result = await getFullHomepageCMS();
    return successResponse(result);
  });
};
