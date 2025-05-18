import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 80vh;

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
`;

export const Content = styled.section`
  display: flex;
  position: relative;

  width: 100%;
  height: 50%;

  justify-content: space-evenly;
  align-items: center;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding:  0 50px;
    };
  `};
`;

export const Steps = styled.div`
  display: flex;

  align-items: center;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      flex-direction: column;
      align-items: start;
      width: 100%;
    };
  `};
`;

export const Step = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin: 10px;
      flex-direction: row;
      width: 100%;
    };
  `};
`;

export const Poppup = styled.button`
  border: 0;
  background: transparent;
  position: absolute;

  padding: 10px 25px;

  top: -50px;

  ${({ theme }) => css`
    color: ${theme.colors.success};
    font-size: 15px;
    font-weight: 500;
  `};
`;

export const StepLabel = styled.div`
  display: flex;
  position: absolute;

  margin-top: 75px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    p {
      color: ${theme.colors.dark_charcoal};
      white-space: nowrap;
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      position: relative;
      margin-top: 0px;
      margin-left: 20px;
    };
  `};
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  padding: 5px 10px;

  background-color: #f1f1f1;

  width: 300px;
  height: 50px;

  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.font.family.montserrat_alternates};
    color: ${theme.colors.philippine_gray};
  `};
`;

export const Pulse = styled.div<{ $background: 'active' | 'completed' | 'deactivate' }>`
  position: relative;
  display: flex;

  justify-content: center;
  align-items: center;

	border-radius: 50px;

  width: 20px;
  height: 20px;
  
  
  transform: scale(1);
  
  svg {
    position: absolute;
  }
  
  ${({ theme, $background }) => $background === 'active' && css`
    animation: pulse 2s infinite;
    box-shadow: 0 0 0 0 #F55D00;

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 #F55D00;
      }
  
      50% {
        transform: scale(1);
        box-shadow: 0 0 0 10px ${theme.colors.background};
      }
  
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 ${theme.colors.background};
      }
    }
  `};
`;

export const Progress = styled.span<{ $background: 'active' | 'completed' | 'deactivate' }>`
  position: relative;
  height: 5px;
  width: 200px;
  border-radius: 3px;

  margin: 0 10px;

  ${({ theme, $background }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      display: none;
    };

    ${$background === 'active' && css`
      background-color: #F55D001a;
      `};
    
    ${$background === 'deactivate' && css`
      background-color: #f1f1f1;
      height: 3px;
    `};

    ${$background === 'completed' && css`
      background-color: ${theme.colors.success};
      box-shadow: 0px 0px 3px 0px ${theme.colors.success};
      height: 3px;
    `};
  `};

  span { 
    position:absolute;
    top:0;
    right:100%;
    bottom:0;
    left:0;
  };
  
  ${({ $background }) => $background === 'active' && css`
    span {
      animation: borealisBar 2s linear infinite;
      background-color: #F55D00;
      box-shadow: 0px 0px 3px 0px #F55D00;
    };
  `};

  @keyframes borealisBar {
    0% {
      left:0%;
      right:100%;
      width:0%;
    }
    10% {
      left:0%;
      right:75%;
      width:25%;
    }
    90% {
      right:0%;
      left:75%;
      width:25%;
    }
    100% {
      left:100%;
      right:0%;
      width:0%;
    }
  };
`;