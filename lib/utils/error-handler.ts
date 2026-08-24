import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError, ValidationError } from './errors';
import { errorResponse } from './api-response';

export async function withErrorHandler(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error: any) {
    console.error('API Error:', error);

    // Handle our custom AppErrors
    if (error instanceof AppError) {
      const details = error instanceof ValidationError ? error.details : undefined;
      return errorResponse(error.message, error.code, error.statusCode, details);
    }

    // Handle Zod Validation Errors
    if (error instanceof ZodError) {
      const zodError: any = error;
      const details = zodError.errors.map((e: any) => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, details);
    }

    // Handle Prisma Errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002: Unique constraint failed
      if (error.code === 'P2002') {
        return errorResponse('A record with this value already exists.', 'CONFLICT', 409);
      }
      // P2025: Record not found
      if (error.code === 'P2025') {
        return errorResponse('Record not found.', 'NOT_FOUND', 404);
      }
      // Log other Prisma errors but do not expose details to the client
      return errorResponse('Database operation failed: ' + error.message, 'DATABASE_ERROR', 500);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return errorResponse('Invalid data provided to the database.', 'DATABASE_VALIDATION_ERROR', 400);
    }

    // Handle standard generic errors safely
    return errorResponse('An unexpected error occurred.', 'INTERNAL_SERVER_ERROR', 500);
  }
}
