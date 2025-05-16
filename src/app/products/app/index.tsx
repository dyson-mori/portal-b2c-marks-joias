"use client"

import React, { Suspense, useState } from 'react';
import Image from 'next/image';

import { Product as PrismaProduct } from '@prisma/client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { Product, Splash } from '@components';
import { useWindowDimensions } from '@hooks';

import { Container, SectionProducts, ProductEmpty, Banner } from './styles';

type Props = {
  products: PrismaProduct[];
};

export default function Products({ products }: Props) {
  // const [select, setSelect] = useState<string | undefined>(undefined);
  const { width, height } = useWindowDimensions();

  const [label] = useState('');
  const lottie_styles = {
    display: 'flex',
    maxWidth: "300px"
  };

  // function onSelect(el: string) {
  //   setSelect(en => en === el ? undefined : el)
  // };

  return (
    <Suspense fallback={<Splash />}>
      <Container>

        <Banner>
          <Image src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747150929/IMG_7085_etrci0.jpg" width={width} height={height / 2} alt='banner' />
          {/* <Image src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747331486/inside-store_ealsn7.jpg" width={width} height={height / 2} alt='banner' /> */}
        </Banner>

        {products.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length === 0 && (
          <ProductEmpty>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
            <p>Product Not Found</p>
          </ProductEmpty>
        )}

        {
          products.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
            <SectionProducts>
              {
                products.filter(pro => pro.title.toLowerCase().includes(label.toLowerCase())
                  // products.filter(pro =>
                  //   label.length > 0
                  //     ? pro.name.toLowerCase().includes(label.toLowerCase())
                  //     : selects.every(eve => pro.categories.some(cat => cat.id === eve.id))
                )
                  .map((item, index) =>
                    <Product key={index.toString()} product={item} href={`/product?product_id=${item.id}`} />
                  )}
            </SectionProducts>
          )}
      </Container>
    </Suspense>
  )
};