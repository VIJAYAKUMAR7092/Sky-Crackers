import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getHeroBanners, createHeroBanner } from '@/lib/services/cms/cms.service';

export const GET = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      const activeOnly = request.nextUrl.searchParams.get('activeOnly') === 'true';
      const result = await getHeroBanners(activeOnly);
      return successResponse(result);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      const body = await request.json();
      const result = await createHeroBanner(body);
      return successResponse(result, 201);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
