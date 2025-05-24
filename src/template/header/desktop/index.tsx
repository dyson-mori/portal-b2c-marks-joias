import React, { useContext, useEffect, useState } from 'react';

import { Category, Header as HeaderPrisma } from '@prisma/client';

import { ShoppingContext } from '@context/shopping';

import { ShoppingCart, Logo } from '@assets';

import { Container, Icon, Nav, LinkStyle } from './styles';

interface HeaderProps {
  hide: boolean;
  param: string;
  data: {
    header: HeaderPrisma[];
    category: Category[];
  };
};

export default function Desktop({ hide, param, data }: HeaderProps) {
  const isLanding = param === '/';

  const { storage } = useContext(ShoppingContext);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  if (hide) {
    return null;
  };

  return (
    <Container $scrolled={scrolled} $isLanding={isLanding}>
      <Icon href='/'>
        <Logo className='logo' width={30} height={30} />
      </Icon>
      <Nav>
        {data.header.map((item, index) => item.public && (
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
