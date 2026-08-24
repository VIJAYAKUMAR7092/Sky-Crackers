import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth/server-auth';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import { withErrorHandler } from '@/lib/utils/error-handler';
import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest) {
  return withErrorHandler(async () => {
    await requireAdmin();
    const body = await request.json();
    
    

    if (!Array.isArray(body)) {
      return errorResponse('Invalid payload, expected array of {id, displayOrder}', 'BAD_REQUEST', 400);
    }

    // Execute sequentially inside a transaction with a higher timeout 
    // to avoid connection pool exhaustion and 5000ms timeout issues
    await prisma.$transaction(async (tx) => {
      for (const item of body) {
        await tx.category.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        });
      }
    }, {
      maxWait: 5000,
      timeout: 20000,
    });

    revalidatePath('/', 'layout');
    
    

    return successResponse({ message: 'Categories reordered successfully' });
  });
}
