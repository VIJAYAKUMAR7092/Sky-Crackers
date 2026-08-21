import { AdminRole } from '@prisma/client';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';

import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "./auth-options";

export type AdminSession = Session;

/**
 * Retrieves the current admin session.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await getServerSession(authOptions);
  return session as AdminSession | null;
}

/**
 * Enforces admin authentication and optionally role-based access.
 * Throws errors that are caught by the error handler wrapper.
 * 
 * @param allowedRoles Array of roles permitted. If empty, any admin role is allowed.
 */
export async function requireAdminAuth(allowedRoles: AdminRole[] = []): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session || !session.user) {
    throw new UnauthorizedError('Authentication required to access this resource.');
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    throw new ForbiddenError('Insufficient permissions to access this resource.');
  }

  return session;
}

/**
 * Aliases for specific requirements
 */

export const getCurrentSession = getAdminSession;

export async function getCurrentAdmin() {
  const session = await getAdminSession();
  return session?.user || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return !!session?.user;
}

export async function requireAdmin() {
  // Restricted to SUPERADMIN. Expand this array for future scalability (e.g., ['SUPERADMIN', 'ADMIN'])
  return requireAdminAuth(['SUPERADMIN']);
}

export async function requireRole(roles: AdminRole[]) {
  return requireAdminAuth(roles);
}
