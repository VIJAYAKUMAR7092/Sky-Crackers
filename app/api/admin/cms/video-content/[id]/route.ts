import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { updateVideoContent, deleteVideoContent } from '@/lib/services/cms/cms.service';

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      const body = await request.json();
      const result = await updateVideoContent((await params).id, body);
      return successResponse(result);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      await deleteVideoContent((await params).id);
      return successResponse({ message: 'Deleted successfully' });
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
