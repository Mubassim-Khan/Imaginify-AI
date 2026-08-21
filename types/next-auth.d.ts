import "next-auth";
import "next-auth/jwt";

import type { DefaultSession } from "next-auth";

import type { AuthProvider } from "@/types/auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      authProvider?: AuthProvider;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    authProvider?: AuthProvider;
  }
}
