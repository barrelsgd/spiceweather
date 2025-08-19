import { type NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "access_token";

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Allowlist: routes that must remain public
  // - Auth pages
  // - Next.js internal assets
  // - Common public files
  // - Health checks (optional)
  const PUBLIC_PATHS = ["/login", "/signup", "/api/health"] as const;

  // Skip auth for Next internals and common static files quickly
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // Require auth for everything else
  const hasToken = req.cookies.get(COOKIE_NAME)?.value;
  if (hasToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL || origin);
  loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Run middleware on all routes; early-return allowlisted ones above
  matcher: ["/((?!api/webhooks).*)"],
};
