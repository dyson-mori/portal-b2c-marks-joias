import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  if (url.origin !== 'http://localhost:3000') {
    return NextResponse.json("origin not found!", { status: 400, statusText: "user session not found!" });
  };

  const cookie = await cookies();
  const sessionId = cookie.get('session_id')?.value;

  if (!sessionId) {
    return NextResponse.json("user session not found!", { status: 400, statusText: "user session not found!" });
  };

  return NextResponse.json(true, { status: 200, statusText: "session was created successfully!" });
}

export async function POST() {
  const cookieStore = await cookies();
  const existing = cookieStore.get('session_id');

  if (!existing) {
    const sessionId = `marks-joias-${Math.floor(100000 + Math.random() * 900000)}`;

    const response = NextResponse.json(sessionId, {
      headers: {
        'Access-Control-Allow-Origin': '*', // ou '*'
        'Access-Control-Allow-Credentials': 'true',
      }
    });

    response.cookies.set({
      name: 'session_id',
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ← obrigatório em produção
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;
  };

  return NextResponse.json(existing, {
    headers: {
      'Access-Control-Allow-Origin': '*', // ou '*'
      'Access-Control-Allow-Credentials': 'true',
    }
  });
}
