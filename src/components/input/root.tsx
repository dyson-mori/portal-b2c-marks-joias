import React, { ReactNode } from 'react';

import { Container } from './styles';

export type Variant = "primary" | "checkout";

type RootProp = {
  children: ReactNode;
  variant: Variant;
  border?: string;
};

export default function Root({ children, variant, border }: RootProp) {
  const style = {
    borderRadius: border
  };

  return (
    <Container style={style} $variant={variant} id='input-container'>
      {children}
    </Container>
  )
};
