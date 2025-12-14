// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");
  const isAdminPath = pathname.startsWith("/admin");

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if ((isApi || isAdminPath) && !token) {
    if (isApi) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }

    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export default proxy;
export function middleware(req: NextRequest) {
  return proxy(req);
}

// Matcher: only run middleware for API and admin paths (lighter-weight)
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
