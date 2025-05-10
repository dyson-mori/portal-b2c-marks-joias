"use client"

import React, { Suspense, useState } from 'react';
// import { useRouter } from 'next/navigation';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { Button, Product, Splash } from '@components';
import { CategoryProps, ProductProps } from "@global/interfaces";

import { Container, SectionProducts, ProductEmpty, Banner, SubCategories } from './styles';
import Image from 'next/image';
import { useWindowDimensions } from '@hooks';

type Props = {
  products: ProductProps[];
  categories: CategoryProps[];
};

export default function Products({ products }: Props) {
  // const route = useRouter();

  const { width, height } = useWindowDimensions();

  const [label] = useState('');
  const lottie_styles = {
    display: 'flex',
    maxWidth: "300px"
  };

  // const handleInput = (e) => {
  //   setSelects([]);
  //   setLabel(e.target.value);
  // };

  return (
    <Suspense fallback={<Splash />}>
      <Container>

        <Banner>
          <Image src="https://i.pinimg.com/736x/94/13/a6/9413a6d244d080b6e63e6996b10bc7a9.jpg" width={width - 100} height={height / 2} alt='banner' />
        </Banner>

        <SubCategories>
          <Button $variant='select'>Anel</Button>
          {/* <button>Anel</button>
          <button>Argola</button> */}
        </SubCategories>

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