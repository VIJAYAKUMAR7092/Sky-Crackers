import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Only logged in users can reach here due to withAuth wrapper
    // We can add further generic checks if needed.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Enforce SUPERADMIN role globally for all /admin frontend routes.
        // For future scalability, update this check (e.g., ['SUPERADMIN', 'ADMIN'].includes(token?.role))
        return !!token && token.role === 'SUPERADMIN';
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Protect all /admin routes EXCEPT /admin/login
export const config = {
  matcher: [
    /*
     * Match all request paths under /admin
     * Except /admin/login
     */
    "/admin/((?!login).*)",
  ],
};
