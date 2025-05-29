import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  const allowedOrigin = process.env.NEXT_PUBLIC_MARKS_URL.replace('/api', '');

  if (origin && origin !== allowedOrigin) {
    return new NextResponse('Forbidden', { status: 403 })
  };

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // aplica em todas as rotas visíveis
}
