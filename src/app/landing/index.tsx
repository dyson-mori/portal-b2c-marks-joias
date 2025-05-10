"use client"

import { Category } from '@prisma/client';

import { Box, Clock, Delivery, Location } from '@assets';

import { ProductProps } from '@global/interfaces';
import { useWindowDimensions } from '@hooks';
import { Landing } from '@components';

import { Container, Banner } from './styles';
import { useRouter } from 'next/navigation';

type LandingPageProps = {
  products: ProductProps[];
  categories: Category[];
};

export default function LandingPage({ products, categories }: LandingPageProps) {
  const route = useRouter();
  const { width } = useWindowDimensions();

  const info = [
    {
      icon: <Location width={24} height={24} />,
      label: 'Loja Física'
    },
    {
      icon: <Box width={24} height={24} />,
      label: 'Produtos Estocados'
    },
    {
      icon: <Clock width={24} height={24} />,
      label: '7 Dias de Garantia'
    },
    {
      icon: <Delivery width={24} height={24} fill='#FA0B5B' />,
      label: 'Entregadores Qualificados'
    },
  ];

  function onSelectCategotyTitle(title: string) {
    route.push(`/products?category=${title}`)
  };

  return (
    <Container>
      <Landing.Banner />
      <Landing.Info info={info} />
      <Landing.Categories categories={categories} onSelectCategory={onSelectCategotyTitle} />

      <Banner>
        ✨
        <p>
          Caso você deseja ter uma renda extra, <strong>fazemos Consignados</strong>, para saber mais ligue-nos 31 9 7556 4133
        </p>
        ✨
      </Banner>

      <Landing.Sales products={products} width={width} />
      <Landing.About width={width} />
      <Landing.Feedback />
    </Container>
  );
}
