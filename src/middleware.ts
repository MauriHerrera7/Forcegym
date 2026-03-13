import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener cookies de autenticación
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
  const userRole = request.cookies.get('auth_role')?.value;

  // Rutas protegidas de Admin
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/client', request.url));
    }
  }

  // Rutas protegidas de Cliente
  if (pathname.startsWith('/client')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (userRole !== 'CLIENT' && userRole !== 'ADMIN') { // Admin can usually see client stuff
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Redirigir si ya está autenticado y trata de ir al login/register
  if (pathname.startsWith('/auth') && isAuthenticated) {
    if (userRole === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/client', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
    '/auth/:path*',
  ],
};
