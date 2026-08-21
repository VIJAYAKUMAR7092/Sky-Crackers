import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getCollectionItems, createCollectionItem } from '@/lib/services/homepage/homepage.service';

export const GET = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const result = await getCollectionItems(resolvedParams.type);
    return successResponse(result);
  });
};

export const POST = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const body = await request.json();
    const result = await createCollectionItem(resolvedParams.type, body.title || '', body.content || body, body.displayOrder || 0, body.active !== undefined ? body.active : true);
    return successResponse(result, 201);
  });
};
