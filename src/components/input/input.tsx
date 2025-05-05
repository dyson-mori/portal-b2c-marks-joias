"use client"

import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { Input as InputStyled, TextArea as TextAreaStyled } from './styles';

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return (
    <InputStyled {...rest} />
  );
};

export const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ ...rest }) => {
  return (
    <TextAreaStyled {...rest} />
  );
};
