import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import { storageService } from '@/lib/services/storage';

export const POST = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();

      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return errorResponse('No file uploaded.', 'BAD_REQUEST', 400);
      }

      if (!file.type.startsWith('image/')) {
        return errorResponse('Only image files are allowed.', 'BAD_REQUEST', 400);
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return errorResponse('Only PNG, JPG, and WEBP files are allowed.', 'BAD_REQUEST', 400);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await storageService.upload(buffer, file.name, file.type);

      return successResponse(result, 201);
    });
  } catch (error: any) {
    console.error("CRITICAL UPLOAD ERROR:", error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
