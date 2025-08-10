import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "access_token";

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Only guard /admin and /staff
  const needsAuth =
    pathname.startsWith("/admin") || pathname.startsWith("/staff");
  if (!needsAuth) return NextResponse.next();

  const hasToken = req.cookies.get(COOKIE_NAME)?.value;
  if (hasToken) return NextResponse.next();

  const loginUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL || origin);
  loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"],
};
