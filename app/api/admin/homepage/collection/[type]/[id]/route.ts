import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { updateCollectionItem, deleteCollectionItem, getCollectionItemById } from '@/lib/services/homepage/homepage.service';

export const GET = async (request: NextRequest, { params }: { params: Promise<{ type: string, id: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const result = await getCollectionItemById(resolvedParams.id);
    return successResponse(result);
  });
};

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ type: string, id: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const body = await request.json();
    const result = await updateCollectionItem(resolvedParams.id, body.title || '', body.content || body, body.displayOrder || 0, body.active !== undefined ? body.active : true);
    return successResponse(result);
  });
};

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ type: string, id: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    await deleteCollectionItem(resolvedParams.id);
    return successResponse({ success: true });
  });
};
