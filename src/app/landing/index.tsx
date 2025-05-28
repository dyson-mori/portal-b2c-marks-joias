"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Category, Banner } from '@prisma/client';

import { Box, Clock, Delivery, Location } from '@assets';

import { ProductProps } from '@global/interfaces';
import { useWindowDimensions } from '@hooks';
import { Landing } from '@components';

import { Container, Notice } from './styles';

type LandingPageProps = {
  products: ProductProps[];
  categories: Category[];
  banner: Banner[];
  feedbacks: [];
};

export default function LandingPage({ products, categories, banner, feedbacks }: LandingPageProps) {
  const route = useRouter();

  const { width } = useWindowDimensions();

  const info = [
    {
      icon: <Location width={24} height={24} />,
      label: 'Loja Física'
    },
    {
      icon: <Box width={24} height={24} stroke='#FA0B5B' strokeWidth={1.5} />,
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

  // const posts = [
  //   {
  //     name: "Carla",
  //     photo: "https://i.pinimg.com/736x/52/83/48/528348061779d1f996c453311c3ba469.jpg",
  //     message: "✨ Realce sua beleza com nossas joias e semijoias exclusivas! São peças delicadas e sofisticadas para todos os estilos e ocasiões.",
  //     created_at: "01/02/2025",
  //   },
  //   {
  //     name: "Anna",
  //     photo: "https://i.pinimg.com/736x/bb/82/fd/bb82fdd9f0cd91a431e818cf5e0a8194.jpg",
  //     message: "💎 Surpreenda-se com o brilho das nossas coleções! Trabalhamos com joias e semijoias que unem elegância, qualidade e muito charme.",
  //     created_at: "05/03/2025",
  //   },
  //   {
  //     name: "Mia",
  //     photo: "https://i.pinimg.com/736x/ff/02/a2/ff02a2a22ca4bb45125763832839bf81.jpg",
  //     message: "💖 Transforme seu look com acessórios que encantam! Aqui você encontra joias e semijoias ideais para o dia a dia ou eventos especiais.",
  //     created_at: "06/03/2025",
  //   },
  //   {
  //     name: "Moto",
  //     photo: "https://i.pinimg.com/736x/33/3f/1f/333f1f5c53a0c65841b4d4ae7371851b.jpg",
  //     message: "🌟 Sofisticação que cabe no seu bolso! Nossa loja oferece joias e semijoias com design moderno e variedade para todos os gostos.",
  //     created_at: "01/04/2025",
  //   }
  // ];

  function onSelectCategoryTitle(title: string) {
    route.push(`/products?category=${title}`)
  };

  return (
    <Container>
      <Landing.Banner data={banner} />
      <Landing.Info info={info} />
      <Landing.Categories categories={categories} onSelectCategory={onSelectCategoryTitle} />

      <Notice>
        ✨
        <p>Trabalhe com nossos <Link href='/consigned'>Consignados</Link> e aumente sua renda com peças que vendem sozinhas!</p>
        ✨
      </Notice>

      <Landing.Sales products={products} />
      <Landing.About width={width} />
      {feedbacks.length !== 0 && <Landing.Feedback posts={feedbacks} />}
    </Container>
  );
}
