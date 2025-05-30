"use client"

import styled from "styled-components"

const Container = styled.main`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export default function NotFound() {
  return (
    <Container>
      <p>Página não  encontrada!</p>
    </Container>
  )
}