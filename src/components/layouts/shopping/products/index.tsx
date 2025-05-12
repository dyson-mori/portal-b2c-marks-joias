import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { AddCircle, MinusCircle, Trash } from '@assets';
import { ProductProps } from '@global/interfaces';

import { Container, CartEmpty, Product, Delete, AddQuantity } from './styles';
import { formats } from '@helpers/format';

interface Props {
  storage: ProductProps[];
  setEditStorage: (storage: ProductProps) => void;
  setRemoveStorage: (storage: ProductProps) => void;
};

export default function SavedProducts({ storage, setEditStorage, setRemoveStorage }: Props) {
  const lottie_styles: CSSProperties = {
    display: 'flex',
    maxWidth: "300px"
  };

  const handleQuantity = (action: 'add' | 'remove', product: ProductProps) => {
    if (action === 'add' && product.quantity < product.maxQuantity) {
      return setEditStorage({
        ...product,
        price: product.price + product.unit_amount!,
        quantity: product.quantity + 1
      })
    };

    if (action === 'remove' && product.quantity > 1) {
      return setEditStorage({
        ...product,
        price: product.price - product.unit_amount!,
        quantity: product.quantity - 1
      })
    }
  };

  if (storage.length === 0) {
    return (
      <Container>
        <CartEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Seu carrinho está vazio</p>
        </CartEmpty>
      </Container>
    )
  };

  return (
    <Container>
      {storage.map((item, index) => (
        <Product key={index.toString()}>
          <Image
            priority
            src={item.images[0]}
            width={100}
            height={100}
            alt={item.name}
            style={{ objectFit: 'cover' }}
          />
          <div className='name'>
            <Link href={`product?id=${item.id}`}>{item.name}</Link>
          </div>
          <div className='price'>
            <p>{formats.money(item.unit_amount!)}</p>
          </div>
          <div className='quantity'>
            <AddQuantity>
              <button onClick={() => handleQuantity('remove', item)}>
                <MinusCircle width={30} height={30} strokeWidth={1} />
              </button>
              <p>{item.quantity}</p>
              <button onClick={() => handleQuantity('add', item)}>
                <AddCircle width={30} height={30} strokeWidth={1} />
              </button>
            </AddQuantity>
          </div>
          <Delete type='button' onClick={() => setRemoveStorage(item)}>
            <Trash width={20} height={20} stroke='red' strokeWidth={2} />
          </Delete>
        </Product>
      ))}
    </Container>
  )
}