import React, { Fragment, useContext, useEffect, useState } from 'react';

import Link from 'next/link';

import { ShoppingContext } from '@context/shopping';
import { HeaderProps } from '@global/interfaces';

import { ShoppingCart, Logo, Box, Map, Landing } from '@assets';

import { Container, HeaderLogo, Icon, Menu, NavButton, Overlay } from './styles';

interface Props {
  hide: boolean;
  param: string;
  data: HeaderProps;
};

export default function Mobile({ hide, param, data }: Props) {
  const isLanding = param === '/';

  const { storage } = useContext(ShoppingContext);

  const [scrolled, setScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    setIsClosing(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false)
    setIsClosing(false);
    document.body.style.overflow = 'scroll';
  };

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
      <NavButton onClick={openMenu}>
        <span />
        <span />
        <span />
      </NavButton>

      <Logo width={40} height={40} />

      <Overlay style={{ visibility: isClosing ? 'visible' : 'hidden' }} onClick={closeMenu} />
      <Menu style={{ left: isOpen ? 0 : -300 }}>
        <HeaderLogo>
          <Logo width={50} height={50} />
        </HeaderLogo>

        <ul>
          {data.header.filter(fi => fi.param !== '/products').map(el => (
            <li key={el.title}>
              <Link href={el.param} onClick={closeMenu}>
                {el.param === '/' && <Landing width={30} height={30} strokeWidth={1.5} />}
                {el.param === '/tracking' && <Map width={30} height={30} strokeWidth={1.5} />}
                <span style={{ width: 10 }} />
                {el.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href='/products' onClick={closeMenu}>
              <Box width={30} height={30} strokeWidth={1.5} />
              <span style={{ width: 10 }} />
              Produtos
            </Link>
            {
              data.category.map((item, index) => (
                <Fragment key={index.toString()}>
                  <Link href={`/products?category=${item.title}`} onClick={closeMenu}>
                    <div style={{ width: 50 }} />
                    <strong>{item.title}</strong>
                  </Link>
                  {item.sub?.map((sub, index) => (
                    <Link key={index.toString()} className='sub-categories' href={`/products?category=${item.title}&sub=${sub.title}`} onClick={closeMenu}>
                      <div style={{ width: 70 }} />
                      {sub.title}
                    </Link>
                  ))}
                </Fragment>
              ))
            }
          </li>
        </ul>
      </Menu>

      <Icon href='/shopping'>
        <ShoppingCart className='shopping-cart' width={30} height={30} strokeWidth={param === '/shopping' ? 2.5 : 1.5} />
        <p>{storage.length}</p>
      </Icon>
    </Container>
  )
}
