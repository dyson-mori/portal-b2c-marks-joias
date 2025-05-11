import type { Metadata } from 'next';

import { api } from '@services/api';

import LandingPage from './landing';

export const metadata: Metadata = {
  title: "Mark's Jóias | Bem Vindo",
  description: 'Escolha a joia que combina com você.',
};

export default async function Products() {
  const products = await api.products.list(`/products?limit=${8}`);
  const categories = await api.category.list();

  return <LandingPage products={products} categories={categories} />;
};