"use client"

import React, { Suspense, useContext } from 'react';

import { useRouter } from 'next/navigation';

import { ProductProps } from '@global/interfaces';

import { ShoppingContext } from '@context/shopping';

import { useWindowDimensions } from '@hooks';
import { Product, ProductComponent, Splash } from '@components';

import { Container, Content, Related, Tag } from './styles';

type Props = {
  product: ProductProps;
};

export default function ProductScreen({ product }: Props) {
  const { storage, setStorage } = useContext(ShoppingContext);
  const { width } = useWindowDimensions();

  const route = useRouter();
  const width_section = width <= 500 ? width - 20 : width / 2 - 100;

  const handleBuyNow = () => {
    const foundProduct = storage.find(data => data.id === product.id);

    if (!foundProduct) setStorage(product);
    return route.push('/shopping');
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
          <ProductComponent.Description
            data={product}
            storage={storage}
            width={width_section}
            handleBuy={handleBuyNow}
            onAddToCart={onAddToCart}
          />
        </Content>
        <Tag>
          <h2>Produtos Relacionados</h2>
        </Tag>
        <Related>
          {product.related.map((related, index) => (
            <Product
              key={index.toString()}
              product={related}
              href={`/product?product_id=${related.id}`}
            />
          ))}
        </Related>
      </Container>
    </Suspense>
  );
};
