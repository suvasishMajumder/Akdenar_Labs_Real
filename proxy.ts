// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Main function Next expects when using "proxy" middleware naming.
 * It also gets exported as default and wrapped by `middleware` for compatibility.
 */
export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");
  const isAdminPath = pathname.startsWith("/admin");

  // Allow Next internals & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Allow the admin login page and the admin login API (unprotected)
  // (login lives in app/admin and backend handles auth - so do not protect it)
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Protect everything under /api/* and /admin/* (except the two allowed above)
  if ((isApi || isAdminPath) && !token) {
    if (isApi) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
    // Page: redirect to admin login page
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

// Provide compatibility exports so Next can find a callable export regardless of expectations
export default proxy;
export function middleware(req: NextRequest) {
  return proxy(req);
}

// Matcher: only run middleware for API and admin paths (lighter-weight)
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
