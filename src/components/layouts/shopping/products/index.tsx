import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { DotLottiePlayer } from '@dotlottie/react-player';
import { StorageProps } from '@global/interfaces';

import { AddCircle, MinusCircle, Trash } from '@assets';

import { Container, CartEmpty, Product, Delete, AddQuantity } from './styles';
import { formats } from '@helpers/format';

interface Props {
  storage: StorageProps[];
  setEditStorage: (storage: StorageProps) => void;
  setRemoveStorage: (storage: StorageProps) => void;
};

export default function SavedProducts({ storage, setEditStorage, setRemoveStorage }: Props) {
  const lottie_styles: CSSProperties = {
    display: 'flex',
    maxWidth: "300px"
  };

  const handleQuantity = (action: 'add' | 'remove', product: StorageProps) => {
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
            src={item.thumbnail}
            width={400}
            height={400}
            alt={item.title}
            style={{ objectFit: 'cover' }}
          />
          <div className='name'>
            <Link href={`product?product_id=${item.id}`}>{item.title}</Link>
          </div>
          <div className='price'>
            <p>{formats.money(item.unit_amount)}</p>
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