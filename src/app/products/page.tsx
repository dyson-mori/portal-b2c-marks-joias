import type { Metadata } from 'next';

import { api } from '@services/api';

import ProductsScreen from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Produtos",
  description: 'Escolha a joia que combina com você.',
};

export default async function Products() {
  const products = await api.products.list();
  const categories = await api.category.list();

  return <ProductsScreen products={products} categories={categories} />;
};