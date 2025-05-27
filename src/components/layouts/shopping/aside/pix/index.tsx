import { useState } from "react";

import Image from "next/image";

import { BoldCopy, CubeScan } from "@assets";

import { Container, Copy } from "./styles";

type Props = {
  qr_code: string | undefined;
};

export default function Pix({ qr_code }: Props) {
  const [copied, setCopied] = useState(false);
  console.log(copied);

  async function onCopyQrCode() {
    navigator.clipboard.writeText(qr_code!)
      .then(() => setCopied(true))

    await new Promise(resolver => setTimeout(resolver, 3000))

    setCopied(false);
  };

  return (
    <Container>
      <CubeScan width={25} height={25} stroke="#555" strokeWidth={2} />

      <div style={{ height: 20 }} />

      <h1>Escaneie o QR Code</h1>

      <div style={{ height: 5 }} />

      <p>Em 5 minutos o QrCode deixará de existir!</p>

      <Image width={300} height={300} src={'data:image/png;base64,' + qr_code} alt="qr_code" />

      <p>ou</p>

      <div style={{ height: 15 }} />

      <Copy>
          <div className="copy">
            <p>{qr_code}</p>
        </div>
          <button onClick={onCopyQrCode}>
            <BoldCopy width={25} height={25} fill="#555" />
        </button>
      </Copy>
    </Container>
  )
}