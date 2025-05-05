import React, { useContext } from 'react';

import { CartContext } from '@context/shopping';

import { ShoppingCart, Logo } from '@assets';

import { Container, Icon, Nav, LinkStyle } from './styles';

interface HeaderProps {
  hide: boolean;
  param: string;
  header: {
    href: string;
    label: string;
    public: boolean;
  }[];
};

export default function Header({ hide, param, header }: HeaderProps) {
  const { storage } = useContext(CartContext);

  if (hide) {
    return null;
  };

  return (
    <Container>
      <Icon href='/'>
        <Logo width={30} height={30} />
      </Icon>
      <Nav>
        {header.map((item, index) => item.public && (
          <LinkStyle
            param={String(param === item.href)}
            key={index}
            href={item.href}
          >{item.label}</LinkStyle>
        ))}
      </Nav>
      <Icon href='/cart'>
        <ShoppingCart width={30} height={30} strokeWidth={param === '/cart' ? 2.5 : 1.5} />
        <p id='count-cart'>{storage.length}</p>
      </Icon>
    </Container>
  )
}
