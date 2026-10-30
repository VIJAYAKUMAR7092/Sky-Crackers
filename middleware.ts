import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IS_ORDERS_CLOSED } from "./lib/constants/site-mode";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Off-season / Diwali Orders Closed protection
  if (IS_ORDERS_CLOSED) {
    // Block checkout API completely
    if (pathname === '/api/checkout') {
      return NextResponse.json(
        { error: "Diwali orders are closed for this season. Thank you!" },
        { status: 403 }
      );
    }

    // Redirect all public store routes to "/" (where the Closed Banner is displayed)
    const isPublicStoreRoute =
      pathname.startsWith('/shop') ||
      pathname.startsWith('/checkout') ||
      pathname.startsWith('/cart') ||
      pathname.startsWith('/product') ||
      pathname.startsWith('/products') ||
      pathname.startsWith('/track-order') ||
      pathname.startsWith('/thank-you');

    if (isPublicStoreRoute) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 2. Admin routes protection
  if (pathname.startsWith('/admin')) {
    // Exclude login page from protection
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      const token = await getToken({ req });
      if (token && token.role === 'SUPERADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }

    // Protect all other /admin routes
    const token = await getToken({ req });
    if (!token || token.role !== 'SUPERADMIN') {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/shop",
    "/shop/:path*",
    "/checkout",
    "/checkout/:path*",
    "/cart",
    "/cart/:path*",
    "/product/:path*",
    "/products/:path*",
    "/track-order/:path*",
    "/thank-you/:path*",
    "/api/checkout",
  ],
};
