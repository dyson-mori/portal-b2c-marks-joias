"use client"

import React, { useState } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { useTheme } from 'styled-components';
import { SubCategory } from '@prisma/client';

import { Tag } from '@assets';
import { Input, Product, Card } from '@components';
import { CategoryProps, ProductProps } from "@global/interfaces";

import { Container, Aside, Products as ProductsStyled, ProductEmpty } from './styles';

type Props = {
  products: ProductProps[];
  categories: CategoryProps[];
};

export default function Products({ products, categories }: Props) {
  const [label] = useState('');
  const [selects, setSelects] = useState([] as SubCategory[]);

  const theme = useTheme();

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
      <Aside>
        <Input.Root>
          <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
          <Input.Input placeholder='Product Name' onChange={console.log} />
        </Input.Root>
        <span style={{ height: 10 }} />
        {
          categories.map(({ title, sub }, index) =>
            <Card key={index} title={title} icon={Tag} data={sub} selects={selects} setSelect={setSelects} />
          )
        }
      </Aside>

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