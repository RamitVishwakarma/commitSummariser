import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [
  "/dashboard",
  "/commits",
  "/repositories",
  "/summaries",
  "/settings",
  "/export",
];

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Forward the session cookie to the backend auth check
  const cookieHeader = request.headers.get("cookie") ?? "";

  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (res.status === 401) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    // Backend unreachable — let the page handle it gracefully
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/commits/:path*",
    "/repositories/:path*",
    "/summaries/:path*",
    "/settings/:path*",
    "/export/:path*",
  ],
};
