import type { Metadata } from 'next';

import { api } from '@services/api';

import App from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Obrigado pela Preferência",
  description: 'Obrigado pela Compra.',
};

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    payment_id: string; // "111355260729"
    external_reference: string; // PAY-1748045032618-OEDB7C
    status?: string; // "approved"
  }>
};

export default async function Success({ searchParams }: Props) {
  const { payment_id, external_reference } = await searchParams;

  const products = await api.paid_market.success(`?payment_id=${payment_id}&external_reference=${external_reference}`);

  return <App data={products} />;
};
