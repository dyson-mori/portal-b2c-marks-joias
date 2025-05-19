import styled, { css } from 'styled-components';

export const Container = styled.main`
  font-family: sans-serif;
`;

export const Notice = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  padding: 15px 50px;

  color: white;

  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);
  
  p {
    ${({ theme }) => css`
      font-size: ${theme.font.size.normal};
      margin: 0 20px;
    `};
  };

  p > a {
    color: #fff;
    font-weight: 700;
  };

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
