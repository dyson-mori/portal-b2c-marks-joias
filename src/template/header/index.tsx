import React, { useContext } from 'react';

import { Header as HeaderPrisma } from '@prisma/client';

import { CartContext } from '@context/shopping';

import { ShoppingCart, Logo } from '@assets';

import { Container, Icon, Nav, LinkStyle } from './styles';
import SideMenu from './navigation';

interface HeaderProps {
  hide: boolean;
  param: string;
  header: HeaderPrisma[];
};

export default function Header({ hide, param, header }: HeaderProps) {
  const { storage } = useContext(CartContext);

  if (hide) {
    return null;
  };

  return (
    <Container>
      <SideMenu navigation={header} />

      <Icon href='/'>
        <Logo className='logo' width={30} height={30} />
      </Icon>
      <Nav>
        {header.map((item, index) => item.public && (
          <LinkStyle
            param={String(param === item.param)}
            key={index}
            href={item.param}
          >{item.title}</LinkStyle>
        ))}
      </Nav>
      <Icon href='/cart'>
        <ShoppingCart className='shopping-cart' width={30} height={30} strokeWidth={param === '/cart' ? 2.5 : 1.5} />
        <p>{storage.length}</p>
      </Icon>
    </Container>
  )
}
