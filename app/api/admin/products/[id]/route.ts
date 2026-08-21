import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { getProductById, updateProduct, softDeleteProduct } from '@/lib/services/products/product.service';
import { updateProductSchema, productParamSchema } from '@/lib/validations/product';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();

      const { id } = productParamSchema.parse(await params);
      const product = await getProductById(id);

      return successResponse(product);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();

      const { id } = productParamSchema.parse(await params);
      const body = await request.json();
      const data = updateProductSchema.parse(body);

      const product = await updateProduct(id, data);
      return successResponse(product);
    });
  } catch (error: any) {
    console.error('PATCH ERROR:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();

      const { id } = productParamSchema.parse(await params);
      const product = await softDeleteProduct(id);

      return successResponse(product);
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
};
