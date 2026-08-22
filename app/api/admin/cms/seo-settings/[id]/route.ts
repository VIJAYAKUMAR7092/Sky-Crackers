import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { deleteSEOSettings } from '@/lib/services/cms/cms.service';

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      await deleteSEOSettings((await params).id);
      return successResponse({ message: 'Deleted successfully' });
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
