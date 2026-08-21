import { NextRequest } from 'next/server';
import { withErrorHandler } from '../../../lib/utils/error-handler';
import { successResponse } from '../../../lib/utils/api-response';
import { getActiveCategories } from '../../../lib/services/categories/category.service';

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    // Call service layer (no specific query params for public read yet)
    const categories = await getActiveCategories();

    return successResponse(categories);
  });
}
