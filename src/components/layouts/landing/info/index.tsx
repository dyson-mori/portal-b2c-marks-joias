import React from "react";

import { Container } from "./styles";

type InfoProps = {
  info: {
    label: string;
    icon: React.ReactNode
  }[]
};

export default function Info({ info }: InfoProps) {
  return (
    <Container>
      {info.map(el => (
        <div key={el.label}>
          {el.icon}
          <p>{el.label}</p>
        </div>
      ))}
    </Container>
  )
}