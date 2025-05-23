import { useState } from 'react';

import Image from 'next/image';

import { Container, Options, Button, GroupMainImage } from "./styles";
import { ProductProps } from '@global/interfaces';

type Props = {
  data: ProductProps;
};

export default function Desktop({ data }: Props) {
  const [select, setSelect] = useState(0);

  return (
    <Container>
      <Options>
        {data.files.map((item, index) => (
          <Button key={index.toString()} onClick={() => setSelect(index)}>
            <Image
              priority
              width={80}
              height={80}
              src={item.replace('.webm', '.jpg')}
              alt={item}
              loading="eager"
              style={{ objectFit: 'cover' }}
            />
          </Button>
        ))}
      </Options>

      <GroupMainImage>
        {data.files.map((file, index) => (
          <Image
            key={index.toString()}
            priority
            width={500}
            height={500}
            src={file}
            alt={data.title}
            loading="eager"
            style={{
              objectFit: 'cover',
              opacity: select === index ? 1 : 0
            }}
          />
        ))}
      </GroupMainImage>

      {/* {data.files[select].endsWith('.webm') ? (
        <video style={{ objectFit: 'cover' }} loop autoPlay muted>
          <source src={data.files[select]} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
          <Image
            priority
            width={500}
            height={500}
            src={data.files[select]}
            alt={data.title}
            loading="eager"
            style={{ objectFit: 'cover' }}
          />
      )} */}
    </Container>
  )
}