import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 85vh;
  /* background: rgb(250,11,91); */
  /* background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%); */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 1.2rem;
  position: relative;
`;

export const Slide = styled(Image) <{ src: string; $active: boolean }>`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.$active ? 1 : 0)};
  transition: opacity .5s ease-in-out;
  animation: ${props => (props.$active ? fadeIn : '')} .5s ease-in-out;
  z-index: ${props => (props.$active ? 2 : 1)};
  object-fit: cover;
`;
