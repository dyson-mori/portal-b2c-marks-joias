import React from 'react';

import { Button } from '@components';
import { ProductProps, StorageProps } from '@global/interfaces';

import { Container, Delivery as DeliveryStyled } from './styles';

import { Devolution } from '@assets';
import { formats } from '@helpers/format';

type Props = {
  width: number;
  data: ProductProps;
  storage: StorageProps[];
  handleBuy(): void;
  onAddToCart(): void;
};

export default function Description({ data, width, storage, handleBuy, onAddToCart }: Props) {
  const label = storage.find(item => item.id === data.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho';

  return (
    <Container style={{ width: width - 100 }}>
      <h1>{data.title}</h1>

      <div style={{ height: 10 }} />

      <pre>{data.description}</pre>

      <DeliveryStyled>
        <p>Disponível em estoque</p>
      </DeliveryStyled>

      <h2>{formats.money(data.price)}</h2>
      <p>6x sem juros de R$ 50,20</p>

      {/* <DeliveryStyled>
        <Delivery width={20} height={20} fill="#47C747" /> &nbsp;&nbsp;
        <p>Enviamos para todo o Brasil</p>
      </DeliveryStyled> */}

      <DeliveryStyled>
        <Devolution width={20} height={20} stroke="#47C747" strokeWidth={1.8} /> &nbsp;&nbsp;
        <p>7 dias para trocas e devoluções</p>
      </DeliveryStyled>

      <Button onClick={handleBuy}>Comprar</Button>
      <div style={{ height: 10 }} />
      <Button $variant='select' onClick={onAddToCart}>{label}</Button>
    </Container>
  )
}