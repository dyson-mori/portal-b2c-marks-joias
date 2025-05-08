import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 60vh;
  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 1.2rem;
  position: relative;
`;

export const AnimatedText = styled.div`
  animation: ${fade} 3s ease-in-out forwards;
  position: absolute;
`;
