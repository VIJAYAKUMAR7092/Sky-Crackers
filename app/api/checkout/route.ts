import { NextResponse } from "next/server";
import { processManualCheckout } from "@/lib/services/public/checkout.service";
import { AppError } from "@/lib/utils/errors";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { emailService } from "@/lib/services/email/email.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body basic fields
    if (!body.customer || !body.address || !body.items || !body.items.length) {
      return errorResponse("Invalid checkout payload", "BAD_REQUEST", 400);
    }

    const order = await processManualCheckout(body);

    // Send Email Notification to Admin
    try {
      await emailService.sendNewOrderNotification(order);
    } catch (e) {
      console.log('Email Notification Failed', e);
    }

    
    return successResponse(order, 201);
  } catch (error: any) {
    console.error("Checkout Error:", error);
    if (error instanceof AppError) {
      return errorResponse(error.message, error.code, error.statusCode);
    }
    return errorResponse("Failed to process order", "SERVER_ERROR", 500);
  }
}
