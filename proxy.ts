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

export async function proxy(request: NextRequest) {
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
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
