import type { Metadata } from 'next';

import { api } from '@services/api';

import ProductsScreen from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Produtos",
  description: 'Escolha a joia que combina com você.',
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Products({ searchParams }: Props) {
  const searchParam = await searchParams;
  const search = searchParam.title ? `/products?limit=${16}&title=${searchParam.title}` : undefined

  const products = await api.products.list(search);
  const category = await api.category.list();

  return <ProductsScreen products={products} categories={category} />;
};