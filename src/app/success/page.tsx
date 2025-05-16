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
    collection_id: string; // "111355260729"
    collection_status: string; // "approved"
    external_reference: string; // "null"
    merchant_account_id: string; // "null"
    merchant_order_id: string; // "31053116485"
    payment_id: string; // "111355260729"
    payment_type: string; // "credit_card"
    preference_id: string; // "2437907601-4e2aa743-5341-4c28-8fa3-983a3bfd337a"
    processing_mode: string; // "aggregator"
    site_id: string; // "MLB"
    status: string; // "approved"
  }>
};

export default async function Success({ searchParams }: Props) {
  const { collection_id, collection_status, payment_id, status, external_reference, payment_type, merchant_order_id, preference_id, site_id, merchant_account_id, processing_mode } = await searchParams;

  const products = await api.paid_market.success(
    `?status=sucesso&collection_id=${collection_id}&collection_status=${collection_status}&payment_id=${payment_id}&status=${status}&external_reference=${external_reference}&payment_type=${payment_type}&merchant_order_id=${merchant_order_id}&preference_id=${preference_id}&site_id=${site_id}&processing_mode=${processing_mode}&merchant_account_id=${merchant_account_id}`
  );

  return <App data={products} />;
};
