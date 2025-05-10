import type { Metadata } from 'next';

import { api } from '@services/api';

import App from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Bem Vindo",
  description: 'Escolha a joia que combina com você.',
};

export default async function Category() {
  const categories = await api.category.list();

  return <App categories={categories} />;
};