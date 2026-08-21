export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public readonly details?: any;

  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400);
    this.details = details;
  }
}

export class OrderNotFoundError extends AppError {
  constructor(message = 'Order not found') {
    super(message, 'ORDER_NOT_FOUND', 404);
  }
}

export class CustomerNotFoundError extends AppError {
  constructor(message = 'Customer not found') {
    super(message, 'CUSTOMER_NOT_FOUND', 404);
  }
}

export class CouponNotFoundError extends AppError {
  constructor(message = 'Coupon not found') {
    super(message, 'COUPON_NOT_FOUND', 404);
  }
}

export class DeliveryZoneNotFoundError extends AppError {
  constructor(message = 'Delivery zone not found') {
    super(message, 'DELIVERY_ZONE_NOT_FOUND', 404);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(message, 'CONFLICT', 409);
  }
}
