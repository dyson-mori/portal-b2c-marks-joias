import React from "react";

import { Button } from "../../../../button";

import { Container } from "./styles";

type Props = {
  hide: boolean;
  disabled: boolean;
  loadingButton: boolean;
  currentStep: number;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({ hide, disabled, currentStep, children, loadingButton, onSubmit }: Props) {
  if (hide) {
    return;
  };

  return (
    <Container onSubmit={onSubmit}>
      {children}
      <Button type="submit" $variant={loadingButton ? "loading-success" : "success"} disabled={disabled}>
        {currentStep === 2 ? 'Finalizar' : 'Próximo'}
      </Button>
    </Container>
  )
};