import React, { useContext } from 'react';

import { Header as HeaderPrisma } from '@prisma/client';

import { ShoppingContext } from '@context/shopping';

import { ShoppingCart, Logo } from '@assets';

import { Container, Icon, Nav, LinkStyle } from './styles';
import SideMenu from './navigation';

interface HeaderProps {
  hide: boolean;
  param: string;
  header: HeaderPrisma[];
};

export default function Header({ hide, param, header }: HeaderProps) {
  const { storage } = useContext(ShoppingContext);

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
            $selected={param === item.param}
            key={index}
            href={item.param}
          >{item.title}</LinkStyle>
        ))}
      </Nav>
      <Icon href='/shopping'>
        <ShoppingCart className='shopping-cart' width={30} height={30} strokeWidth={param === '/shopping' ? 2.5 : 1.5} />
        <p>{storage.length}</p>
      </Icon>
    </Container>
  )
}
