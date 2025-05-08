import styled, { css } from 'styled-components';

const prefix = {
  padding_spacing: '15px 50px'
};

export const Container = styled.main`
  font-family: sans-serif;
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
