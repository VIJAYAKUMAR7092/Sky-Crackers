import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { withErrorHandler } from '@/lib/utils/error-handler';
import { successResponse } from '@/lib/utils/api-response';
import { getAdminProducts, createProduct } from '@/lib/services/products/product.service';
import { getAdminProductsQuerySchema, createProductSchema } from '@/lib/validations/product';

export const GET = async (request: NextRequest) => {
  return withErrorHandler(async () => {
    await requireAdmin();
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const query = getAdminProductsQuerySchema.parse(searchParams);
    const result = await getAdminProducts(query);
    return successResponse(result);
  });
};

export const POST = async (request: NextRequest) => {
  try {
    return await withErrorHandler(async () => {
      await requireAdmin();
      const body = await request.json();
      const data = createProductSchema.parse(body);
      const product = await createProduct(data);
      return successResponse(product, 201);
    });
  } catch (error: any) {
    console.error("CRITICAL API ERROR:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Internal Server Error"
    }, { status: 500 });
  }
};
