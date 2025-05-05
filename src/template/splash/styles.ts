import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #f1f1f1;

  overflow: hidden;

  svg {
    animation: float 4s ease-in-out infinite;
  };

  p {
    margin-top: 20px;
  }

  @keyframes float {
    0% {
      filter: drop-shadow(5px 5px 5px #aaa);
      transform: translateY(0px);
    }
    50% {
      filter: drop-shadow(5px 5px 25px #aaa);
      transform: translateY(-25px);
    }
    100% {
      filter: drop-shadow(5px 5px 5px #aaa);
      transform: translateY(0px);
    }
  }
`;

type Props = {
  color: string;
};

export const LoadingStyled = styled.div<Props>`
  .loader {
    margin: 10px;
    width: 50px;
    aspect-ratio: 1;
    display: grid;
  };

  ${({ color }) => css`
    --c:#0000 calc(100%/3), ${color} 0 calc(2*100%/3),#0000 0;
  `};

  --c1:linear-gradient(90deg,var(--c));
  --c2:linear-gradient( 0deg,var(--c));

  .loader:before,
  .loader:after {
    content: "";
    grid-area: 1/1;
    margin: 0 0 15px 15px;
    background: var(--c1),var(--c2),var(--c1),var(--c2);
    background-size: 300% 4px,4px 300%;
    background-repeat: no-repeat;
    animation: l12 1s infinite linear;
  }

  .loader:after {
    margin: 15px 15px 0 0;
    transform: scale(-1,-1);
  }

  @keyframes l12 {
    0%   {background-position: 50%  0,100% 100%,0    100%,0 0}
    25%  {background-position: 0    0,100% 50% ,0    100%,0 0}
    50%  {background-position: 0    0,100% 0   ,50%  100%,0 0}
    75%  {background-position: 0    0,100% 0   ,100% 100%,0 50%}
    75.01%{background-position: 100% 0,100% 0   ,100% 100%,0 50%}
    100% {background-position: 50%  0,100% 0   ,100% 100%,0 100%}
  }
`;