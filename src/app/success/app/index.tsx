"use client"

import { CSSProperties, useEffect, useState } from "react";

import Image from "next/image";
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Container, Images, Label, SuccessLottie } from "./styles";

type Props = {
  data: {
    ip_address: string;
    items: {
      description: string;
      id: string;
      quantity: string;
      title: string;
        thumbnail: string;
      unit_price: string;
    }[];
    payer: {
      first_name: string;
    },
    tracking_id: string;
  };
};

const lottie_styles: CSSProperties = {
  display: 'flex',
  maxWidth: "300px"
};

export default function SuccessApp({ data }: Props) {
  const [lottie, setLottie] = useState<1 | -1 | undefined>(1);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLottie(-1); // muda para reverso após 5s
    }, 2000);

    setTimeout(() => {
      setShow(true)
    }, 4500);

    return () => clearTimeout(timeout); // limpeza do timeout
  }, []);

  return (
    <Container>

      <SuccessLottie>
        <DotLottiePlayer style={lottie_styles} src="/lottie/success.lottie" autoplay loop={lottie === 1} direction={lottie} />
      </SuccessLottie>

      <Images style={{ opacity: show ? 1 : 0 }}>
        {data.items.map((row, index) => (
          <Image
            priority
            key={index.toString()}
            width={350}
            height={350}
            src={row.thumbnail}
            alt={row.title}
          />
        ))}
      </Images>

      <Label style={{ opacity: show ? 1 : 0 }}>
        <h3>Obrigado pela Compra</h3>
        <p>Você receberá uma mensagem no whatsapp com mais detalhes sobre a sua compra</p>
      </Label>
    </Container>
  )
}