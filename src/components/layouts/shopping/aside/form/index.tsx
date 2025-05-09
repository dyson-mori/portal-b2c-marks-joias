import React from "react";

import { Button } from "../../../../button";

import { Container } from "./styles";

type Props = {
  disabled: boolean;
  loadingButton: boolean;
  currentStep: number;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({ disabled, currentStep, children, loadingButton, onSubmit }: Props) {
  return (
    <Container onSubmit={onSubmit}>
      {children}
      <Button type="submit" $variant={loadingButton ? "loading" : "primary"} disabled={disabled}>
        {currentStep === 2 ? 'Finalizar' : 'Próximo'}
      </Button>
    </Container>
  )
};