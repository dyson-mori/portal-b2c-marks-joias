import { NextResponse } from "next/server";

import { cookies, headers } from "next/headers";

export async function GET() {
  const header = await headers();
  const cookie = await cookies();

  const sessionId = cookie.get('@marks:session_id')?.value;

  if (!sessionId || header.get('origin') !== process.env.NEXT_PUBLIC_MARKS_URL.replace('api', '')) {
    return NextResponse.json("user session not found!", { status: 400, statusText: "user session not found!" });
  };

  return NextResponse.json(true, { status: 200, statusText: "session was created successfully!" });
}

export async function POST() {
  const cookieStore = await cookies();
  const existing = cookieStore.get('@marks:session_id');

  if (!existing) {
    const sessionId = `marks-joias-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const response = NextResponse.json(sessionId, {
      status: 200,
      statusText: "this session already exists!"
    });

    response.cookies.set({
      name: '@marks:session_id',
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ← obrigatório em produção
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 1, // 7 dias
    });

    return response;
  };

  return NextResponse.json(existing, {
    status: 201,
    statusText: "session was created successfully!"
  });
}
