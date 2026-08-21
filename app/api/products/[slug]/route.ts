import { NextRequest } from 'next/server';
import { withErrorHandler } from '../../../../lib/utils/error-handler';
import { successResponse } from '../../../../lib/utils/api-response';
import { productSlugParamSchema } from '../../../../lib/validations/product';
import { getProductBySlug } from '../../../../lib/services/products/product.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withErrorHandler(async () => {
    // Await params as per Next.js 15+ standards
    const resolvedParams = await params;
    
    // Validate route parameters
    const { slug } = productSlugParamSchema.parse(resolvedParams);

    // Call service layer
    const product = await getProductBySlug(slug);

    return successResponse(product);
  });
}
