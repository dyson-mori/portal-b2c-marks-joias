import { DotLottiePlayer } from "@dotlottie/react-player";

import { StorageProps } from "@global/interfaces";
import { formats } from "@helpers/format";

import { Container, Lottie, Information } from "./styles";

const lottie_styles = {
  display: 'flex',
  maxWidth: "150px"
};

type CheckOutProps = {
  storage: StorageProps[];
};

export default function CheckOut({ storage }: CheckOutProps) {
  if (storage.length === 0) {
    return (
      <Container>
        <Lottie>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
        </Lottie>
      </Container>
    )
  };

  return (
    <Container>
      {storage.map((e, index) => (
        <Information key={index.toString()}>
          <p>{e.title}</p>
          <h4>{formats.money(e.price)}</h4>
        </Information>
      ))}
    </Container>
  )
};