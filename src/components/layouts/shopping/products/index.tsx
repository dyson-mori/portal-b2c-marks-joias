import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { DotLottiePlayer } from '@dotlottie/react-player';
import { StorageProps } from '@global/interfaces';

import { AddCircle, MinusCircle, Trash } from '@assets';

import { formats } from '@helpers/format';
import { Container, CartEmpty, Products, Product, Delete, AddQuantity, TitleDescription, Price } from './styles';

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
    if (action === 'add' && product.remove_quantity < product.total_quantity) {
      return setEditStorage({
        ...product,
        price: product.price + product.unit_amount!,
        remove_quantity: product.remove_quantity + 1
      })
    };

    if (action === 'remove' && product.remove_quantity > 1) {
      return setEditStorage({
        ...product,
        price: product.price - product.unit_amount!,
        remove_quantity: product.remove_quantity - 1
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
      <Products>
        {storage.map((item, index) => (
          <Product key={index.toString()}>
            <Image
              priority
              src={item.thumbnail}
              width={400}
              height={400}
              alt={item.title}
            />

            <TitleDescription>
              <Link href={`product?product_id=${item.id}`}>{item.title}</Link>
              <p>{item.description}</p>
            </TitleDescription>

            <Price>
              <p>{formats.money(item.unit_amount)}</p>
            </Price>

            <AddQuantity>
              <button onClick={() => handleQuantity('remove', item)}>
                <MinusCircle width={30} height={30} strokeWidth={1} />
              </button>
              <p>{item.remove_quantity}</p>
              <button onClick={() => handleQuantity('add', item)}>
                <AddCircle width={30} height={30} strokeWidth={1} />
              </button>
            </AddQuantity>

            <Delete type='button' onClick={() => setRemoveStorage(item)}>
              <Trash width={20} height={20} stroke='red' strokeWidth={2} />
            </Delete>
          </Product>
        ))}
      </Products>
    </Container>
  )
}