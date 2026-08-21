import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../../lib/db/prisma";
import { AdminRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize function called");
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          // Find user
          const user = await prisma.adminUser.findUnique({
            where: { email: credentials.email },
          });

          console.log("admin record found:", !!user);

          if (!user || !user.active) {
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("password comparison success:", isValid);

          if (!isValid) {
            return null;
          }

          // Restrict current system access to SUPERADMIN only. 
          // For future scalability, you can add 'ADMIN' or 'MANAGER' to this array.
          const allowedRoles = ['SUPERADMIN'];
          if (!allowedRoles.includes(user.role)) {
            console.warn(`User ${user.email} attempted login but has insufficient role: ${user.role}`);
            return null; // Return null to trigger the generic "Invalid email or password" UI error
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as AdminRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as AdminRole,
        };
      }
      return session;
    },
  },
};
