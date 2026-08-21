
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { getAllSettings } from '@/lib/services/settings/settings.service';
import { successResponse } from '@/lib/utils/api-response';

export const GET = async () => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const settings = await getAllSettings();
    return successResponse(settings);
  });
};
