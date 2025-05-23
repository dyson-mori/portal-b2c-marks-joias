import React from 'react';

import { Button } from '@components';
import { ProductProps, StorageProps } from '@global/interfaces';

import { Container, Delivery as DeliveryStyled } from './styles';

import { formats } from '@helpers/format';

type Props = {
  data: ProductProps;
  storage: StorageProps[];
  handleBuy(): void;
  onAddToCart(): void;
};

export default function Description({ data, storage, handleBuy, onAddToCart }: Props) {
  const label = storage.find(item => item.id === data.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho';
  const isItInStock = data.total_quantity === 0;

  return (
    <Container>
      <h1>{data.title}</h1>

      <div style={{ height: 10 }} />

      <pre>{data.description}</pre>

      <DeliveryStyled $isItInStock={isItInStock}>
        <p>{isItInStock ? 'Esgotado' : 'Disponível em estoque'}</p>
      </DeliveryStyled>

      <h2>{formats.money(data.price)}</h2>
      <p className='discount'>5x sem juros de {formats.money(data.price / 5)}</p>

      <div style={{ height: 10 }} />

      {/* <DeliveryStyled>
        <Delivery width={20} height={20} fill="#47C747" /> &nbsp;&nbsp;
        <p>Enviamos para todo o Brasil</p>
      </DeliveryStyled> */}

      {/* <DeliveryStyled>
        <Devolution width={20} height={20} stroke="#47C747" strokeWidth={1.8} /> &nbsp;&nbsp;
        <p>7 dias para trocas e devoluções</p>
      </DeliveryStyled> */}

      <Button $variant='success' disabled={isItInStock} onClick={handleBuy}>
        {isItInStock ? 'Esgotado' : 'Comprar'}
      </Button>
      <div style={{ height: 10 }} />
      <Button $variant='select' disabled={isItInStock} onClick={onAddToCart}>{label}</Button>
    </Container>
  )
}