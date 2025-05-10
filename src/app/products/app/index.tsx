"use client"

import React, { Suspense, useState } from 'react';
import Image from 'next/image';

import { SubCategory } from '@prisma/client';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Button, Product, Splash } from '@components';
import { ProductProps } from "@global/interfaces";
import { useWindowDimensions } from '@hooks';

import { Container, SectionProducts, ProductEmpty, Banner, SubCategories } from './styles';

type Props = {
  products: ProductProps[];
  sub: SubCategory[];
};

export default function Products({ products, sub }: Props) {
  const [select, setSelect] = useState<string | undefined>(undefined);
  const { width, height } = useWindowDimensions();

  const [label] = useState('');
  const lottie_styles = {
    display: 'flex',
    maxWidth: "300px"
  };

  function onSelect(el: string) {
    setSelect(en => en === el ? undefined : el)
  };

  return (
    <Suspense fallback={<Splash />}>
      <Container>

        <Banner>
          <Image src="https://i.pinimg.com/736x/94/13/a6/9413a6d244d080b6e63e6996b10bc7a9.jpg" width={width} height={height / 2} alt='banner' />
        </Banner>

        {sub.length !== 0 && (
          <SubCategories>
            {sub.map(el =>
              <Button key={el.title} $variant={select === el.title ? 'selected' : 'select'} onClick={() => onSelect(el.title)}>{el.title}</Button>
            )}
          </SubCategories>
        )}

        {products.filter(e => e.name.toLowerCase().includes(label.toLowerCase())).length === 0 && (
          <ProductEmpty>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
            <p>Product Not Found</p>
          </ProductEmpty>
        )}

        {
          products.filter(e => e.name.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
            <SectionProducts>
              {
                products.filter(pro => pro.name.toLowerCase().includes(label.toLowerCase())
                  // products.filter(pro =>
                  //   label.length > 0
                  //     ? pro.name.toLowerCase().includes(label.toLowerCase())
                  //     : selects.every(eve => pro.categories.some(cat => cat.id === eve.id))
                )
                  .map((item, index) =>
                    <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
                  )}
            </SectionProducts>
          )}
      </Container>
    </Suspense>
  )
};