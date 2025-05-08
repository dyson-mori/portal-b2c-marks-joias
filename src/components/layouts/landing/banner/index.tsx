import React, { useEffect, useState } from 'react';

import { BannerWrapper, AnimatedText } from './styles';

const bannerData = [
  'Promoção imperdível!',
  'Frete grátis para todo o Brasil!',
  'Novidades toda semana!',
  'Compre agora e ganhe 10% de desconto!',
];

const AnimatedBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerData.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BannerWrapper>
      <AnimatedText key={index}>{bannerData[index]}</AnimatedText>
    </BannerWrapper>
  );
};

export default AnimatedBanner;
