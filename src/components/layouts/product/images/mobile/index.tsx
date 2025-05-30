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
      {data.files.map((file, index) => file.endsWith('.webm') ? (
        <video
          key={index.toString()}
          loop
          muted
          autoPlay
          style={{ width: width - 20, height: width - 20, objectFit: 'cover', scrollSnapAlign: 'start' }}
        >
          <source src={file} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
            key={index.toString()}
            priority
            width={width - 20}
            height={width - 20}
            src={file}
            alt={file}
            style={{
              objectFit: 'cover',
              scrollSnapAlign: 'start'
            }}
          />
      ))}
    </Container>
  )
}