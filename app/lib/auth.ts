import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: { role: true },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );
        if (!valid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.fullName,
          role: user.role.name, // "admin" | "hr" | "finance" | "engineering"
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: parseInt(user.id) },
          include: { role: true },
        });
        token.role = dbUser?.role.name ?? "client";
        token.fullName = dbUser?.fullName ?? null;
        token.id = String(dbUser?.id);
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = token.role;
      (session.user as any).fullName = token.fullName;
      (session.user as any).id = token.id;
      return session;
    },
    async redirect({ url, baseUrl, token }) {
      // called after sign-in; token carries role
      const role = (token as any)?.role ?? "client";
      if (role === "admin") return `${baseUrl}/users`;
      return `${baseUrl}/`;
    },
  },
  pages: {
    signIn: "/login",
  },
});
