import { ArrowLeft } from "@assets";

import { Container } from "./styles";

type Props = {
  steps: {
    id: string;
    name: string;
    fields: string[];
  }[];
  method: string;
  currentStep: number;
  setStep: (e: number) => void;
};

export default function Header({ steps, method, currentStep, setStep }: Props) {
  function handleSteps(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();
    const step = currentStep === 2 ? currentStep - 1 : 0;
    setStep(step)
  };

  return (
    <Container>
      <button
        disabled={currentStep === 0}
        style={{ opacity: currentStep === 0 ? 0 : 1 }}
        onClick={handleSteps}
      >
        <ArrowLeft width={20} height={20} strokeWidth={2} />
      </button>
      <h4>{
        currentStep === 2 ? steps.find(e => e.id === method)?.name : steps[currentStep].name
      }</h4>
      <p>{currentStep + 1}/3</p>
    </Container>
  )
}