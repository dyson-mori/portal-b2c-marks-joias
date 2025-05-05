import type { Metadata } from 'next';

import App from './app';

export const metadata: Metadata = {
  title: "Mark's Jóias | Shopping Card",
  description: 'Quase lá',
};

export default async function CardPage() {
  return <App />;
};
