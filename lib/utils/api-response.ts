import { NextResponse } from 'next/server';

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
};

export function successResponse<T>(data: T, status = 200): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, code: string, status = 400, details?: any): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, details },
    },
    { status }
  );
}
