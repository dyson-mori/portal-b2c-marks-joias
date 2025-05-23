import styled, { css, keyframes } from 'styled-components';

type Variant = "primary" | "checkout";

export const Container = styled.div<{ $variant: Variant, $disabled: boolean }>`
  position: relative;
  display: flex;

  align-items: center;

  width: 100%;
  min-height: 43px;

  overflow: hidden;
  
  /* Para navegadores baseados em WebKit (Chrome, Safari) */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Para Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  ${({ theme, $variant, $disabled }) => css`
    opacity: ${$disabled ? .5 : 1};

    ${$variant === 'checkout' && css`
      border: 1px solid #dedede;
      border-radius: ${theme.settings.radius.large};
    `};

    ${$variant === 'primary' && css`
      box-shadow: ${theme.settings.box.simple};
      background-color: ${theme.colors.white};
    `}
  `};
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  width: 100%;
  height: 43px;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.size.light};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const TextArea = styled.textarea`
  border: 0;
  outline: 0;

  width: 100%;
  min-height: 180px;

  white-space: pre-line;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.size.medium};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const IconStyles = styled.div`
  position: relative;
  width: 50px;

  svg {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  };
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Skeleton = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 3px;
  background: #f0f0f0;
  background-image: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e0e0e0 40px,
    #f0f0f0 80px
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.2s infinite linear;
`;