'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@prisma/client';

import { NavButton, Menu, Overlay } from './styles';
import { Box, Logo } from '@assets';

type NavigationProps = {
  navigation: Header[];
};

export default function SideMenu({ navigation }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => setIsOpen(false), 300); // match animation duration
  };

  return (
    <>
      <NavButton onClick={openMenu}>
        <span />
        <span />
        <span />
      </NavButton>

      {isOpen && (
        <>
          <Overlay isVisible={isOpen} onClick={closeMenu} />
          <Menu isClosing={isClosing}>
            <Logo width={100} height={100} />

            <ul>
              {navigation.map(el => (
                <li key={el.title}>
                  <Link href={el.param} onClick={closeMenu}>
                    <Box width={30} height={30} />
                    <span style={{ width: 10 }} />
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Menu>
        </>
      )}
    </>
  );
};
