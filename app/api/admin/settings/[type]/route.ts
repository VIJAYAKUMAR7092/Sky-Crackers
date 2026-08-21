import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { updateSettings, getSettings } from '@/lib/services/settings/settings.service';
import { successResponse } from '@/lib/utils/api-response';

export const GET = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const settings = await getSettings(resolvedParams.type);
    return successResponse(settings);
  });
};

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const resolvedParams = await params;
    const body = await request.json();
    const updated = await updateSettings(resolvedParams.type, body);
    return successResponse(updated);
  });
};
