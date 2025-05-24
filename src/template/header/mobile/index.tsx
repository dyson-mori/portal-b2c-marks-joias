import React, { Fragment, useContext, useEffect, useState } from 'react';

import { Category, Header as HeaderPrisma } from '@prisma/client';

import { ShoppingContext } from '@context/shopping';

import { ShoppingCart, Logo, Box, Map, Landing } from '@assets';

import { Container, Icon, Menu, NavButton, Overlay } from './styles';
import Link from 'next/link';

interface HeaderProps {
  hide: boolean;
  param: string;
  data: {
    header: HeaderPrisma[];
    category: Category[];
  };
};

export default function Mobile({ hide, param, data }: HeaderProps) {
  const isLanding = param === '/';

  const { storage } = useContext(ShoppingContext);

  const [scrolled, setScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    setIsClosing(true);
  };

  const closeMenu = () => {
    setIsOpen(false)
    setIsClosing(false);
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
        <Logo width={100} height={100} />

        <ul>
          {data.header.map(el => (
            <li key={el.title}>
              <Link href={el.param} onClick={closeMenu}>
                {el.param === '/' && <Landing width={30} height={30} />}
                {el.param === '/tracking' && <Map width={30} height={30} />}
                {el.param === '/products' && <Box width={30} height={30} />}
                <span style={{ width: 10 }} />
                {el.title}
              </Link>
              {
                el.param === '/products' && data.category.map((item, index) => (
                  <Fragment key={index.toString()}>
                    <Link href='/products?category=argola'>
                      <div style={{ width: 50 }} />
                      {item.title}
                    </Link>
                    {item.sub?.map((sub, index) => (
                      <Link key={index.toString()} className='sub-categories' href='/products?category=anel&sub=solitario'>
                        <div style={{ width: 70 }} />
                        {sub.title}
                      </Link>
                    ))}
                  </Fragment>
                ))
              }
            </li>
          ))}
        </ul>
      </Menu>

      <Icon href='/shopping'>
        <ShoppingCart className='shopping-cart' width={30} height={30} strokeWidth={param === '/shopping' ? 2.5 : 1.5} />
        <p>{storage.length}</p>
      </Icon>
    </Container>
  )
}
