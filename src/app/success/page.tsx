import type { Metadata } from 'next';

import { api } from '@services/api';

import App from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Obrigado pela Preferência",
  description: 'Obrigado pela Compra',
};

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string }>
};

export default async function Success({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const products = await api.gateway.find(session_id);

  return <App data={products} />;
};