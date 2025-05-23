"use client"

import React, { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { Container, IconStyles, Input as InputStyled, Skeleton, TextArea as TextAreaStyled } from './styles';

type Variant = "primary" | "checkout";

type RootProp = {
  children: ReactNode;
  variant: Variant;
  border?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

function Root({ children, variant, border, disabled = false, isLoading }: RootProp) {
  const style = {
    borderRadius: border
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <Container style={style} $variant={variant} $disabled={disabled} id='input-container'>
      {children}
    </Container>
  )
};

type IconProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  width: number;
  height: number;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
};

const IconComponent: React.FC<IconProps> = ({ icon: Icon, width, height, fill, stroke, strokeWidth }) => (
  <IconStyles>
    <Icon width={width} height={height} fill={fill ?? 'transparent'} stroke={stroke ?? 'transparent'} strokeWidth={strokeWidth} />
  </IconStyles>
);

const InputComponent: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return (
    <InputStyled {...rest} />
  );
};

const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ ...rest }) => {
  return (
    <TextAreaStyled {...rest} />
  );
};

export const Input = {
  Root,
  Icon: IconComponent,
  Input: InputComponent,
  TextArea,
}