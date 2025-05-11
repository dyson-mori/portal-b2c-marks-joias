"use client"

import React, { Fragment, useState } from 'react';
import Image from 'next/image';

import { ProductProps } from '@global/interfaces';

import { ContainerDesktop, ContainerMobile, Button, Options } from './styles';

type Props = {
  data: ProductProps;
  width: number;
};

export default function Images({ data, width }: Props) {
  return (
    <Fragment>
      <DesktopImage data={data} width={width} />
      <ContainerMobile>
        {data.images.map((item, index) => (
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
        {data.images.map((item, index) => (
          <Button key={index.toString()} onClick={() => setSelect(index)}>
            <Image
              priority
              width={80}
              height={80}
              src={item}
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

      <Image
        priority
        width={500}
        height={500}
        src={data.images[select]}
        alt={data.name}
        loading="eager"
        style={{ objectFit: 'cover' }}
      />
    </ContainerDesktop>
  )
};