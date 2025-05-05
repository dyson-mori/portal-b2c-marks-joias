"use client"

import React, { useState } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Product } from '@components';
import { CategoryProps, ProductProps } from "@global/interfaces";

import { Container, Products as ProductsStyled, ProductEmpty } from './styles';

type Props = {
  products: ProductProps[];
  categories: CategoryProps[];
};

export default function Products({ products }: Props) {
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
    <Container>
      {products.filter(e => e.name.toLowerCase().includes(label.toLowerCase())).length === 0 && (
        <ProductEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Product Not Found</p>
        </ProductEmpty>
      )}

      {
        products.filter(e => e.name.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
          <ProductsStyled>
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
          </ProductsStyled>
        )}
    </Container>
  )
};