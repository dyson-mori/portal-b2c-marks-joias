import styled, { css } from 'styled-components';

export const Container = styled.footer`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;

  padding: 10px;

  ${({ theme }) => css`
    p {
      color: #fff;
      font-size: ${theme.font.size.light};
    };

    @media (max-width: 500px){
      p {
        font-size: ${theme.font.size.light};
      }
    };
  `};

  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);
`;

export const Contents = styled.div`
  display: flex;

  width: 100%;

  margin-bottom: 10px;
`;

export const Rows = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: calc(100% / 3);

  strong {
    color: #fff;
    font-weight: 500;
  }
`;

export const Copyright = styled.div`
  position: relative;
  width: 40%;

  text-align: center;

  padding: 15px 0;

  border-top-width: 1px;
  border-top-color: #ffffff3a;
  border-top-style: solid;
`;