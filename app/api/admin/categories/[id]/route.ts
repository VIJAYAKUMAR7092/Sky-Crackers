import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getCategoryById, updateCategory, softDeleteCategory } from '@/lib/services/categories/category.service';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export const GET = async (request: NextRequest, props: RouteParams) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const params = await props.params;
    const category = await getCategoryById(params.id);
    return successResponse(category);
  });
};

export const PATCH = async (request: NextRequest, props: RouteParams) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const params = await props.params;
    const body = await request.json();
    const category = await updateCategory(params.id, body);
    return successResponse(category);
  });
};

export const DELETE = async (request: NextRequest, props: RouteParams) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const params = await props.params;
    const category = await softDeleteCategory(params.id);
    return successResponse(category);
  });
};
