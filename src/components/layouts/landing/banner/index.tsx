import React, { useEffect, useState } from 'react';

import { Banner } from '@prisma/client';

import { useWindowDimensions } from '@hooks';

import { BannerWrapper, Slide } from './styles';

type BannerProps = {
  data: Banner[]
};

const AnimatedBanner = ({ data }: BannerProps) => {
  const [index, setIndex] = useState(0);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BannerWrapper>
      {data.map((item, i) => (
        <Slide
          key={i}
          src={item.url}
          $active={i === index}
          width={width}
          height={height / 1.5}
          alt={item.url}
        />
      ))}
    </BannerWrapper>
  );
};

export default AnimatedBanner;
