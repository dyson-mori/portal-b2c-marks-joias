// "use server";

// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";

interface FetcherParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  // next?: RequestInit['next'];
  body?: object;
  // body?: Record<string, object>;
  header?: HeadersInit;
}

const NEXT_URL = process.env.NEXT_PUBLIC_MARKS_URL;

const fetcher = async ({
  url,
  method,
  body,
  header = {}
}: FetcherParams) => {
  try {
    // const cookieStore = cookies();
    const fullUrl = `${NEXT_URL}${url}`;

    const isBodyAllowed = method !== 'GET' && method !== 'DELETE';

    const res = await fetch(fullUrl, {
      method,
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
        ...header,
        // Cookie: cookieStore.toString()
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

export const api = {
  products: {
    list: () => fetcher({ method: 'GET', url: '/products' }),
    find: (code: number) => fetcher({ method: 'GET', url: `/product?code=${code}` })
  },
  product: {
    find: (id: string) => fetcher({ method: 'GET', url: `/product?id=${id}` })
  },
  gateway: {
    find: (session_id: string) => fetcher({ method: 'GET', url: `/gateway?session_id=${session_id}` }),
    create: (body: object) => fetcher({ method: 'POST', url: '/gateway', body })
  },
  header: {
    list: () => fetcher({ method: 'GET', url: '/header' })
  },
  category: {
    list: () => fetcher({ method: 'GET', url: '/category' })
  }
};
