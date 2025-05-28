import type { Metadata } from 'next';

import { api } from '@services/api';

import LandingPage from './landing';

export const metadata: Metadata = {
  title: "Mark's Jóias | Bem Vindo",
  description: 'Escolha a joia que combina com você.',
};

export default async function Products() {
  const landing = await api.landing.list();
  const banner = await api.banner.list();

  return <LandingPage
    banner={banner}
    categories={landing.categories}
    products={landing.products}
    feedbacks={landing.feedbacks}
  />;
};