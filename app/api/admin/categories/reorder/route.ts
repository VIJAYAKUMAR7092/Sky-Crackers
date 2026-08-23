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

    // Update in transaction
    await prisma.$transaction(
      body.map((item: { id: string; displayOrder: number }) => 
        prisma.category.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        })
      )
    );

    revalidatePath('/', 'layout');
    
    

    return successResponse({ message: 'Categories reordered successfully' });
  });
}
