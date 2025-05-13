import React from 'react';
import type { Metadata } from 'next';

import { api } from '@services/api';

import App from './app';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { product_id } = await searchParams;

  const product = await api.product.find(product_id!);

  return {
    title: "Mark's Jóias | " + product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description!
    }
  };
};

export default async function Product({ searchParams }: Props) {
  const { product_id } = await searchParams;
  const product = await api.product.find(product_id!);

  return <App product={product} />;
};
