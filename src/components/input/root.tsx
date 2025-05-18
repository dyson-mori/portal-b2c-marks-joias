import React, { ReactNode } from 'react';

import { Container } from './styles';

export const InputRoot: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container id='input-container'>
      {children}
    </Container>
  )
};