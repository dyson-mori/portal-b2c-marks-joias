import React from 'react';

import { Logo } from '@assets';

import { Container } from './styles';

export default function Footer({ hide }: { hide: boolean }) {
  if (hide) {
    return null;
  };

  return (
    <Container>
      <Logo width={100} height={100} />
      <p>Copyright © 1990 - 2025 todos os direitos reservados.</p>
    </Container>
  );
}
