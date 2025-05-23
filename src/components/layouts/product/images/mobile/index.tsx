import Image from 'next/image';

import { ProductProps } from "@global/interfaces";

import { Container } from "./styles";

type Props = {
  data: ProductProps;
  width: number;
};

export default function Mobile({ data, width }: Props) {
  return (
    <Container>
      {data.files.map((item, index) => (
        <Image
          key={index}
          priority
          width={width - 20}
          height={width - 20}
          src={item}
          alt={item}
          style={{
            objectFit: 'cover',
            scrollSnapAlign: 'start'
          }}
        />
      ))}
    </Container>
  )
}