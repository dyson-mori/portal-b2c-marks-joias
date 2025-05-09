import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled(Link)`
  position: relative;

  display: flex;

  width: calc((100% / 4) - 4px);

  margin-bottom: 6px;

  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
  };

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
  `};

  @media (max-width: 710px){
    width: calc(100% / 2.05);
    margin-bottom: 3px;
  };
`;

export const Footer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 10px;

  background: linear-gradient(180deg, rgba(48,48,48,0) 0%, rgba(48,48,48,1) 100%, rgba(0,212,255,1) 100%);

  #title {
    ${({ theme }) => css`
      color: ${theme.colors.white};
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[500]};
    `};

    width: 100%;
    font-style: italic;
  };

  #price {
    ${({ theme }) => css`
      color: ${theme.colors.white};
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[500]};
    `};

    width: 120px;
    text-align: end;
    font-style: italic;
  };

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      #title {
        font-size: ${theme.font.size.normal};
      };

      #price {
        font-size: ${theme.font.size.normal};
      };
    };
  `};
`;
