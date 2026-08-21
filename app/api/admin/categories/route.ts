import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAdminCategories, createCategory } from '@/lib/services/categories/category.service';

export const GET = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();

      const searchParams = request.nextUrl.searchParams;
      const query = {
        search: searchParams.get('search') || undefined,
        active: searchParams.get('active') || undefined,
        page: searchParams.get('page') || undefined,
        limit: searchParams.get('limit') || undefined,
        sortBy: searchParams.get('sortBy') || undefined,
        sortOrder: searchParams.get('sortOrder') || undefined,
      };

      const result = await getAdminCategories(query);
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
      const category = await createCategory(body);
      return successResponse(category, 201);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
