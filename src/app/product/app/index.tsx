"use client"

import React, { Suspense, useContext } from 'react';

import { useRouter } from 'next/navigation';

import { ProductProps } from '@global/interfaces';
import { CartContext } from '@context/shopping';

import { ProductComponent, Splash } from '@components';

import { Container, Content } from './styles';
import { useWindowDimensions } from '@hooks';

type Props = {
  product: ProductProps;
};

export default function ProductScreen({ product }: Props) {
  const { storage, setStorage } = useContext(CartContext);
  const { width } = useWindowDimensions();

  const route = useRouter();
  const width_section = width <= 500 ? width - 20 : width / 2 - 100;

  const handleBuyNow = () => {
    const foundProduct = storage.find(data => data.id === product.id);
    if (!foundProduct) setStorage(product);
    return route.push('/cart');
  };

  function onAddToCart() {
    setStorage(product)
  };

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        {/* <LabelTag>
          <p>{'Produto > '}<strong>{product.name}</strong></p>
        </LabelTag> */}
        <Content>
          <ProductComponent.Images data={product} width={width_section} />
          <ProductComponent.Description data={product} width={width_section} storage={storage} handleBuy={handleBuyNow} onAddToCart={onAddToCart} />
        </Content>
      </Container>
    </Suspense>
  );
};
