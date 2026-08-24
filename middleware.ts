import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // We only care about /admin routes
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
  ],
};
