import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAllSEOSettings, upsertSEOSettings } from '@/lib/services/cms/cms.service';

export const GET = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      const result = await getAllSEOSettings();
      return successResponse(result);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      const body = await request.json();
      if (!body.path) {
          throw new Error('path is required for SEO settings');
      }
      const result = await upsertSEOSettings(body.path, body);
      return successResponse(result);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
