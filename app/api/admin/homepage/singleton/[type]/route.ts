import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { updateSingletonConfig, getSingletonConfig } from '@/lib/services/homepage/homepage.service';

export const GET = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const result = await getSingletonConfig(resolvedParams.type);
    return successResponse(result);
  });
};

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const body = await request.json();
    const result = await updateSingletonConfig(resolvedParams.type, body.content || body, body.active);
    return successResponse(result);
  });
};
