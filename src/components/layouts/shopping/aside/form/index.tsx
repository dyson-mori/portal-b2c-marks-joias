import React from "react";

import { Button } from "../../../../button";

import { Container } from "./styles";

type Props = {
  loadingButton: boolean;
  currentStep: number;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({ currentStep, children, loadingButton, onSubmit }: Props) {
  return (
    <Container onSubmit={onSubmit}>
      {children}
      <Button type="submit" $variant={loadingButton ? "loading" : "primary"}>
        {currentStep === 2 ? 'Finalizar' : 'Próximo'}
      </Button>
    </Container>
  )
};