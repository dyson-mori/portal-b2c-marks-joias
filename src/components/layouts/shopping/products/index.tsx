import React, { CSSProperties } from 'react';
import Image from 'next/image';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { Trash } from '@assets';
import { ProductProps } from '@global/interfaces';

import { Container, CartEmpty, Product, Delete } from './styles';

interface Props {
  storage: ProductProps[];
  setStorage: (storage: ProductProps) => void;
};

export default function SavedProducts({ storage, setStorage }: Props) {
  const lottie_styles: CSSProperties = {
    display: 'flex',
    maxWidth: "300px"
  };

  const test: CSSProperties = {
    justifyItems: 'center',
    gridTemplateColumns: `repeat(auto-fill, minmax(calc(100% / ${storage.length >= 3 ? 3 : 1}), 1fr))`
  };

  if (storage.length === 0) {
    return (
      <Container style={test}>
        <CartEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Seu carrinho está vazio</p>
        </CartEmpty>
      </Container>
    )
  }

  return (
    <Container style={test}>
      {storage.map((item, index) => (
        <Product key={index.toString()}>
          <Delete type='button' onClick={() => setStorage(item)}>
            <Trash width={20} height={20} stroke='red' strokeWidth={2} />
          </Delete>
          <Image
            priority
            src={item.images[0]}
            width={300}
            height={300}
            alt={item.name}
            style={{ objectFit: 'cover' }}
          />
        </Product>
      ))}
    </Container>
  )
}