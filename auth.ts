import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { z } from "zod";

import { resolveAuthUser } from "@/lib/auth/resolve-auth-user";
import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const githubEmailsSchema = z.array(
  z.object({
    email: z.string().email(),
    primary: z.boolean(),
    verified: z.boolean(),
  }),
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  providers: [
    Google,
    GitHub,
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        await connectToDatabase();
        const user = (await User.findOne({ email: parsed.data.email.toLowerCase() })
          .select("+password")
          .lean()) as any;

        if (!user?.password || !(await compare(parsed.data.password, user.password))) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image: user.photo,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;
      if (account.provider === "credentials") return true;

      if (account.provider === "google") {
        return (profile as { email_verified?: boolean } | undefined)
          ?.email_verified === true;
      }

      if (account.provider === "github") {
        if (!account.access_token || !user.email) return false;

        try {
          const response = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${account.access_token}`,
              "User-Agent": "Imaginify",
              "X-GitHub-Api-Version": "2022-11-28",
            },
            cache: "no-store",
            signal: AbortSignal.timeout(5_000),
          });

          if (!response.ok) return false;

          const parsed = githubEmailsSchema.safeParse(await response.json());
          if (!parsed.success) return false;

          const email = user.email.toLowerCase();
          return parsed.data.some(
            (entry) => entry.verified && entry.email.toLowerCase() === email,
          );
        } catch {
          return false;
        }
      }

      return false;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        const resolvedUser = await resolveAuthUser({ user, account });

        token.id = resolvedUser.id;
        token.authProvider = resolvedUser.provider;
      } else if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      if (session.user && token.authProvider) {
        session.user.authProvider = token.authProvider;
      }
      return session;
    },
    authorized({ auth: session, request }) {
      const path = request.nextUrl.pathname;
      const publicPaths = ["/", "/sign-in", "/sign-up", "/api/auth", "/api/register", "/api/webhooks"];
      return publicPaths.some((route) => path === route || path.startsWith(`${route}/`)) || !!session;
    },
  },
});
