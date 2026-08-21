import { NextRequest } from 'next/server';
import { withErrorHandler } from '../../../lib/utils/error-handler';
import { successResponse } from '../../../lib/utils/api-response';
import { getProductsQuerySchema } from '../../../lib/validations/product';
import { getProducts } from '../../../lib/services/products/product.service';

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    
    // Validate incoming query parameters
    const query = getProductsQuerySchema.parse(searchParams);

    // Call service layer
    const result = await getProducts(query);

    return successResponse(result);
  });
}
