import React from 'react';
import Image from 'next/image';

import { Product as PrismaProduct } from '@prisma/client';
import { Container, Footer } from './styles';

type Props = {
  product: PrismaProduct;
  href: string;
};

export const Product: React.FC<Props> = ({ product, href }) => (
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
