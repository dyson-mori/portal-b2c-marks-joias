"use client"

import React, { Fragment, useState } from 'react';
import Image from 'next/image';

import { ProductProps } from '@global/interfaces';

import { ContainerDesktop, ContainerMobile, Button, Options, GroupMainImage } from './styles';

type Props = {
  data: ProductProps;
  width: number;
};

export default function Images({ data, width }: Props) {
  return (
    <Fragment>
      <DesktopImage data={data} width={width} />
      <ContainerMobile>
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
      </ContainerMobile>
    </Fragment>
  )
}

function DesktopImage({ data, width }: Props) {
  const [select, setSelect] = useState(0);

  const OptionsComponent = () => {
    return (
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
    )
  };

  return (
    <ContainerDesktop style={{ width }}>
      <OptionsComponent />

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
    </ContainerDesktop>
  )
};