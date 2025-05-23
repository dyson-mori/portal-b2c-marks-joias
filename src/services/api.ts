// "use server";

import { PaidMarketProps } from "@global/interfaces";

// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";

interface FetcherParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  next?: RequestInit['next'];
  body?: object;
  cache?: 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'reload' | 'only-if-cached',
  // body?: Record<string, object>;
  header?: HeadersInit;
}

const NEXT_URL = process.env.NEXT_PUBLIC_MARKS_URL;

const fetcher = async ({
  url,
  method,
  body,
  header = {},
  next = {},
  cache = 'default'
}: FetcherParams) => {
  try {
    // const cookieStore = cookies();
    const fullUrl = `${NEXT_URL}${url}`;

    const isBodyAllowed = method !== 'GET' && method !== 'DELETE';

    const res = await fetch(fullUrl, {
      method,
      cache,
      next,
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
    list: (param?: string) => fetcher({ method: 'GET', url: param ?? '/products' }),
    find: (product_id: number) => fetcher({ method: 'GET', url: `/product?product_id=${product_id}` }),
  },
  product: {
    find: (product_id: string) => fetcher({ method: 'GET', url: `/product?product_id=${product_id}` })
  },
  header: {
    list: () =>
      fetcher({
        method: 'GET',
        url: '/header',
        cache: 'no-cache',
        next: {
          revalidate: 60 /*secounds*/ * 60 /*minutes*/ * 24 /*hours*/ * 3 /*days*/
        }
      })
  },
  category: {
    list: () => fetcher({ method: 'GET', url: '/category', cache: 'force-cache' }),
  },
  shopping: {
    search: (products_id: string) => fetcher({ method: 'GET', url: `/shopping?${products_id}` }),
  },
  paid_market: {
    success: (gateway: string) => fetcher({ method: 'GET', url: `/mercado-pago/success${gateway}` }),
    create: (body: PaidMarketProps) => fetcher({ method: 'POST', url: '/mercado-pago/create-checkout', body })
  },
  tracking: {
    search: (order_id: string) => fetcher({ method: 'GET', url: `/tracking?order_id=${order_id}` }),
  },
  banner: {
    list: () =>
      fetcher({
        method: 'GET',
        url: '/banner',
        cache: 'force-cache',
        next: {
          revalidate: 60 /*secounds*/ * 60 /*minutes*/ * 24 /*hours*/ * 3 /*days*/
        }
      }),
  },
  correio: {
    get: (cep: string) =>
      fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        cache: 'no-store'
      }).then(jsn => jsn.json()),
    fret: () =>
      fetch(`https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx`).then(jsn => jsn.json())
  }
};
