"use server";

import { cookies } from "next/headers";

interface FetcherParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  next?: RequestInit['next'];
  body?: object;
  cache?: 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'reload' | 'only-if-cached',
  // body?: Record<string, object>;
  cookie?: object;
  header?: HeadersInit;
}

const NEXT_URL = process.env.NEXT_PUBLIC_MARKS_URL;

const fetcher = async ({
  url,
  method,
  body,
  next = {},
  header,
  cache = 'default'
}: FetcherParams) => {
  try {
    const cookieStore = await cookies();
    const fullUrl = `${NEXT_URL}${url}`;
    const verify = url.includes('https');
    const isBodyAllowed = method !== 'GET' && method !== 'DELETE';

    const res = await fetch(verify ? url : fullUrl, {
      method,
      cache,
      next,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'origin': `${NEXT_URL.replace('/api', '')}`,
        Cookie: cookieStore.toString(),
        ...header,
      },
      ...(isBodyAllowed && body ? { body: JSON.stringify(body) } : {})
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Fetch error (${res.status}): ${errorText}`);
      return null;
    }

    // if (['POST', 'PUT', 'DELETE'].includes(method)) {
    //   revalidatePath(url);
    // }

    return await res.json();

  } catch (error) {
    console.error("Unexpected fetcher error:", error);
    return null;
  }
};

export default fetcher;