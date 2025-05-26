import { Container } from "./styles";

type Props = {
  qr_code: string;
};

export default function Pix({ qr_code }: Props) {
  return (
    <Container>
      <img
        width={250}
        height={250}
        src={'data:image/png;base64,' + qr_code}
        alt="qr_code"
      />
    </Container>
  )
}