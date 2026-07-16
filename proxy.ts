import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'avconexpo-secret-key-change-in-production'
);

// Public paths that don't require authentication
const publicPaths = ['/admin', '/api/auth/login', '/api/auth/logout'];

// Static and public assets
const publicPrefixes = ['/_next/', '/static/', '/api/', '/brand-logo.png', '/favicon.ico'];

/** Query params that create duplicate crawlable URLs with no unique content. */
const STRIP_QUERY_PARAMS = new Set([
  "_g",
  "_ga",
  "_gl",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "srsltid",
  "mc_cid",
  "mc_eid",
  "yclid",
]);

function stripJunkQueryParams(url: URL): boolean {
  let stripped = false;
  for (const key of [...url.searchParams.keys()]) {
    if (STRIP_QUERY_PARAMS.has(key.toLowerCase())) {
      url.searchParams.delete(key);
      stripped = true;
    }
  }
  return stripped;
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();
  let shouldRedirect = false;

  if (host.startsWith("www.")) {
    url.host = host.slice(4);
    shouldRedirect = true;
  }

  if (stripJunkQueryParams(url)) {
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    // Drop empty search so redirects land on clean paths (e.g. / not /?)
    if (![...url.searchParams.keys()].length) {
      url.search = "";
    }
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;

  // Check if path is public
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if path starts with public prefix
  if (publicPrefixes.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check if accessing admin dashboard
  if (pathname.startsWith('/admin/')) {
    const token = request.cookies.get('avconexpo_session')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      // Verify token
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('avconexpo_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)",
  ],
};
