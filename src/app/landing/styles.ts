import styled, { css } from 'styled-components';

const prefix = {
  padding_spacing: '15px 50px'
};

export const Container = styled.main`
  font-family: sans-serif;
`;

export const Hero = styled.section`
  position: relative;
  text-align: center;

  height: 80vh;
  margin-bottom: 15px;

  img.bg {
    width: 100%;
    height: 100%;
    filter: blur(4px);
    /* border-radius: 0 0 50% 50% / 0 0 10% 10%; */
    object-fit: cover;
  };

  .car {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
  };
`;

export const Banner = styled.div`
  display: flex;

  justify-content: center;

  padding: ${prefix.padding_spacing};

  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);
  color: white;

  ${({ theme }) => css`
    font-size: ${theme.font.size.medium};
  `};

  @media (max-width: 500px){
    flex-direction: column;
    align-items: center;
    padding: 15px 5px;

    ${({ theme }) => css`
      p {
        font-size: ${theme.font.size.normal};
        text-align: center;
        margin: 10px;
      }
    `};
  };
`;
