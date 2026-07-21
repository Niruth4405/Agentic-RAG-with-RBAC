import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

export default auth(function proxy(req: NextAuthRequest) {
  const { pathname } = req.nextUrl;          // ✅ nextUrl exists on NextAuthRequest
  const role = (req.auth?.user as any)?.role as string | undefined;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi  = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    if (!req.auth) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};