"use server";

import { cookies } from "next/headers";

export async function cookiesActionServer(name: string, value: string) {
  const cookie = await cookies();

  cookie.set({
    name,
    value,
    maxAge: 60 * 60 * 24 * 1,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production', // ← obrigatório em produção
    sameSite: 'lax',
  });

  return true;
};