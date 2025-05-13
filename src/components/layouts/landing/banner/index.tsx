import React, { useEffect, useState } from 'react';

import { useWindowDimensions } from '@hooks';
import { BannerWrapper, Slide } from './styles';

const AnimatedBanner = () => {
  const [index, setIndex] = useState(0);
  const { width, height } = useWindowDimensions();

  const bannerData = [
    "https://res.cloudinary.com/doo9pfft1/image/upload/v1747150929/IMG_7085_etrci0.jpg",
    "https://jouomoizalhobjxhlmkc.supabase.co/storage/v1/object/sign/marks-joias-files/loja-logo.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2I2ZGIwMjQ4LTkyYzgtNDZkOS05NmE5LWUzNzJlZjUzMGNkZiJ9.eyJ1cmwiOiJtYXJrcy1qb2lhcy1maWxlcy9sb2phLWxvZ28uanBnIiwiaWF0IjoxNzQ3MDY5Mzk2LCJleHAiOjE3Nzg2MDUzOTZ9.RMS42AG1IvUfTWD7JpLmPXYoVg4r2tRzOJ9q4Q7S_T4"
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
