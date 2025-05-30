// "use server"

import { PaidMarketProps } from "@global/interfaces";

import fetcher from "@helpers/fetcher";

export const api = {
  session: {
    find: () => fetcher({ method: 'GET', url: '/session' }),
    create: () => fetcher({ method: 'POST', url: '/session' }),
  },
  landing: {
    list: () => fetcher({ method: 'GET', url: '/landing' })
  },
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
    get: (cep: string) => fetcher({ url: `https://viacep.com.br/ws/${cep}/json/`, method: 'GET' }),
    fret: () => fetch(`https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx`).then(jsn => jsn.json())
  }
};
