import type { Metadata } from 'next';

import { api } from '@services/api';

import ProductsScreen from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Produtos",
  description: 'Escolha a joia que combina com você.',
};

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
};

export default async function Products({ searchParams }: Props) {
  const searchParam = await searchParams;
  const search = searchParam.category ? `/products?limit=${16}&category=${searchParam.category}` : undefined

  const products = await api.products.list(search);
  const sub = await api.sub.list(searchParam.category);

  return <ProductsScreen products={products} sub={sub} />;
};