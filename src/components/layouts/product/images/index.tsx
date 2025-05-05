"use client"

import React, { Fragment, useState } from 'react';
import Image from 'next/image';

import { ProductProps } from '@global/interfaces';

import { ContainerDesktop, ContainerMobile, Button, Options } from './styles';

type Props = {
  data: ProductProps;
};

export default function Images({ data }: Props) {
  return (
    <Fragment>
      <MainImage data={data} />
      <ContainerMobile>
        {data.images.map((item, index) => (
          <Image
            key={index}
            priority
            width={50}
            height={50}
            // width={width - 20}
            // height={width - 20}
            src={item}
            alt={item}
            style={{
              marginRight: 5,
              objectFit: 'cover',
              borderRadius: 3,
              scrollSnapAlign: 'start'
            }}
          />
        ))}
      </ContainerMobile>
    </Fragment>
  )
}

function MainImage({ data }: Props) {
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
              style={{
                objectFit: 'cover',
                // borderRadius: 3,
              }}
            />
          </Button>
        ))}
      </Options>
    )
  };

  return (
    <ContainerDesktop>
      <OptionsComponent />

      <Image
        priority
        width={500}
        height={500}
        src={data.images[select]}
        alt={data.name}
        loading="eager"
        style={{
          objectFit: 'cover',
          // borderRadius: 3,
          // opacity: .1
        }}
      />
    </ContainerDesktop>
  )
};