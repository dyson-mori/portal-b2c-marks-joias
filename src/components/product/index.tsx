import React from 'react';
import Image from 'next/image';

import { ProductProps } from "@global/interfaces";

import { Container, Footer } from './styles';

type Props = {
  product: ProductProps;
  href: string;
};

const Product: React.FC<Props> = ({ product, href }) => (
  <Container href={href}>
    <Image
      src={product.thumbnail}
      width={300}
      height={300}
      alt={product.title}
      priority
      style={{
        objectFit: 'cover',
      }}
    />
    <Footer>
      <p id='title'>{product.title}</p>
      <p id='price'>{product.price}</p>
    </Footer>
  </Container>
)

export { Product };