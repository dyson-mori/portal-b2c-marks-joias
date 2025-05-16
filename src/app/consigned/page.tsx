import type { Metadata } from 'next';

import Page from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Consignado",
  description: 'Trabalhe com nossos e aumente sua renda!',
};

export default async function Consigned() {
  return <Page />;
};