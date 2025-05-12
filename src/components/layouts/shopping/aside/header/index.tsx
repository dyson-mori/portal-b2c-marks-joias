import { Container } from "./styles";

type Props = {
  steps: {
    id: string;
    name: string;
    fields: string[];
  }[];
  method: string;
  currentStep: number;
};

export default function Header({ steps, method, currentStep }: Props) {
  return (
    <Container>
      <h4>{
        currentStep === 2 ? steps.find(e => e.id === method)?.name : steps[currentStep].name
      }</h4>
    </Container>
  )
}