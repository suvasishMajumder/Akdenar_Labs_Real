import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;
  const method = req.method;

  // ⭐ Allow admin login API
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // ⭐ PUBLIC ROUTES (POST allowed)
  if (pathname === "/api/enquiry" && method === "POST") {
    return NextResponse.next();
  }

  if (pathname === "/api/jobs" && method === "POST") {
    return NextResponse.next();
  }

  if (pathname === "/api/upload" && method === "POST") {
    return NextResponse.next();
  }

  if (pathname === "/api/newsletter" && method === "POST") {
    return NextResponse.next();
  }

  // ⭐ PROTECTED ROUTES (Only Admin)
  const apiProtected =
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/dashboard-stats") ||
    (pathname === "/api/enquiry" && method === "GET"); // admin enquiry list

  const pageProtected = pathname.startsWith("/admin");
  console.log(pathname);
  if ((apiProtected || pageProtected) && !token) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
