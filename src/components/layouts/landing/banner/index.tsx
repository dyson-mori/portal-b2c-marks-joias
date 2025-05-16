import React, { useEffect, useState } from 'react';

import { useWindowDimensions } from '@hooks';
import { BannerWrapper, Slide } from './styles';

const AnimatedBanner = () => {
  const [index, setIndex] = useState(0);
  const { width, height } = useWindowDimensions();

  const bannerData = [
    "https://res.cloudinary.com/doo9pfft1/image/upload/v1747150929/IMG_7085_etrci0.jpg",
    "https://res.cloudinary.com/doo9pfft1/image/upload/v1747331486/inside-store_ealsn7.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BannerWrapper>
      {bannerData.map((src, i) => (
        <Slide
          key={i}
          src={src}
          $active={i === index}
          width={width}
          height={height / 1.5}
          alt={src}
        />
      ))}
    </BannerWrapper>
  );
};

export default AnimatedBanner;
