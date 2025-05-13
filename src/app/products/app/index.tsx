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
          <Image src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747150929/IMG_7085_etrci0.jpg" width={width} height={height / 2} alt='banner' />
          {/* <Image src="https://jouomoizalhobjxhlmkc.supabase.co/storage/v1/object/sign/marks-joias-files/loja-logo.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2I2ZGIwMjQ4LTkyYzgtNDZkOS05NmE5LWUzNzJlZjUzMGNkZiJ9.eyJ1cmwiOiJtYXJrcy1qb2lhcy1maWxlcy9sb2phLWxvZ28uanBnIiwiaWF0IjoxNzQ3MDY5Mzk2LCJleHAiOjE3Nzg2MDUzOTZ9.RMS42AG1IvUfTWD7JpLmPXYoVg4r2tRzOJ9q4Q7S_T4" width={width} height={height / 2} alt='banner' /> */}
        </Banner>

        {sub.length !== 0 && (
          <SubCategories>
            {sub.map(el =>
              <Button key={el.title} $variant={select === el.title ? 'selected' : 'select'} onClick={() => onSelect(el.title)}>{el.title}</Button>
            )}
          </SubCategories>
        )}

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
                    <Product key={index.toString()} product={item} href={`/product?code=${item.code}`} />
                  )}
            </SectionProducts>
          )}
      </Container>
    </Suspense>
  )
};