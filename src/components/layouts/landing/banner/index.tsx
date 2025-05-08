'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const bannerData = [
  'Promoção imperdível!',
  'Frete grátis para todo o Brasil!',
  'Novidades toda semana!',
  'Compre agora e ganhe 10% de desconto!',
];

const fade = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 60vh;
  background-color: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 1.2rem;
  position: relative;
`;

const AnimatedText = styled.div`
  animation: ${fade} 3s ease-in-out forwards;
  position: absolute;
`;

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
