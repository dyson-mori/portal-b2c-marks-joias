"use client"

import { Category } from '@prisma/client';

import { Box, Clock, Delivery, Location, Logo } from '@assets';
// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';

import { useWindowDimensions } from '@hooks';
import { ProductProps } from '@global/interfaces';

import { Container, Hero, Banner, Categories, InfoBar, Sobre, TopVendas } from './styles';

type LandingPageProps = {
  products: ProductProps[];
  categories: Category[];
};

export default function LandingPage({ products, categories }: LandingPageProps) {
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
      label: 'Entregadores Locais Qualificados'
    },
  ];

  return (
    <Container>
      <Head>
        <title>MJ Joias</title>
      </Head>

      <Hero>
        <img src="https://i.pinimg.com/736x/73/e4/fd/73e4fd4077ce10f47eb458dea380cc2e.jpg" alt="Background" className="bg" />
        <img src="/mercedes.png" alt="Carro" className="car" />
      </Hero>

      <InfoBar>
        {info.map(el => (
          <div key={el.label}>
            {el.icon}
            <span />
            <p>{el.label}</p>
          </div>
        ))}
      </InfoBar>

      <Categories>
        <h2>Selecione sua Categoria</h2>
        <div className='categories'>
          {categories.map(el => (
            <button key={el.title}>
              {el.photo ? (
                <Image src={el.photo} width={150} height={150} alt={el.title} />
              ) : (
                <img src="https://jouomoizalhobjxhlmkc.supabase.co/storage/v1/object/sign/marks-joias-files/IMG_7033.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2I2ZGIwMjQ4LTkyYzgtNDZkOS05NmE5LWUzNzJlZjUzMGNkZiJ9.eyJ1cmwiOiJtYXJrcy1qb2lhcy1maWxlcy9JTUdfNzAzMy5qcGciLCJpYXQiOjE3NDY1NTQzODIsImV4cCI6MTc3ODA5MDM4Mn0.Xd6pRyBF2nQGR9AkkNb_smH28w2k7-YICaLXmB6N_6A" alt="Argolas" />
              )}
              <p>{el.title}</p>
            </button>
          ))}
        </div>
      </Categories>

      <Banner>
        Caso você deseja ter uma renda extra, <strong>fazemos Consignados</strong>, para saber mais ligue-nos 31 9 7556 4133
      </Banner>

      <TopVendas>
        <h2>Top Vendidos</h2>
        <div className='products'>
          {[...products, products[0], products[1]].map((el, index) => (
            <div key={el.name + index} className='product'>
              <Image src={`${el.images[0]}`} width={(width / 4) - 30} height={(width / 4) - 30} alt={el.name} />
              {/* <p>{el.name}</p> */}
            </div>
          ))}
        </div>
      </TopVendas>

      <Sobre>
        <h2>Sobre <span style={{ color: '#303030' }}>Nós</span></h2>
        <div className='logo_and_text'>
          <Logo width={100} height={100} />
          <p>
            O número do nosso atendimento no WhatsApp mudou! Continuamos com o atendimento mais próximo e humano do mercado...
          </p>
        </div>
        <div className='images'>
          <Image width={width / 4} height={width / 4} src="https://i.pinimg.com/736x/c1/aa/ef/c1aaef2f1f69e9df51c16eaac1a083e9.jpg" alt='photo' />
          <div className='middle' style={{ height: width / 4 }}>
            <img src="https://i.pinimg.com/736x/c4/b3/1d/c4b31d1f1e2631d4c89a28318d3c1046.jpg" alt='photo' />
            {/* <img src="https://i.pinimg.com/736x/8d/05/f8/8d05f8f80f985ba3239998ec2cd694bf.jpg" alt='photo' /> */}
            <div className='under'>
              <img src="https://i.pinimg.com/736x/2c/4c/96/2c4c96161a0d6387684b9542034a1471.jpg" alt='photo' />
              <span />
              <img src="https://i.pinimg.com/736x/c0/93/7b/c0937b370b136f69016ce04aafea2c3f.jpg" alt='photo' />
            </div>
          </div>
          <Image width={width / 4} height={width / 4} src="https://i.pinimg.com/736x/c1/aa/ef/c1aaef2f1f69e9df51c16eaac1a083e9.jpg" alt='photo' />
        </div>
      </Sobre>

    </Container>
  );
}
