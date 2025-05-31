"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function revalidateProductsWithParams(params: string) {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_MARKS_URL}/products?${params}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'origin': `${process.env.NEXT_PUBLIC_MARKS_URL.replace('/api', '')}`,
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) return [];

  return await res.json();
}

export async function revalidateProductsPaths(params: string) {
  revalidatePath(params);
};