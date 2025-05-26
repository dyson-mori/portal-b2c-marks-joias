import { useState } from "react";

import Image from "next/image";

import { BoldCopy, CubeScan } from "@assets";

import { Container, Copy, Skeleton } from "./styles";

type Props = {
  loading: boolean;
  qr_code: string | undefined;
};

export default function Pix({ loading, qr_code }: Props) {
  const [copied, setCopied] = useState(false);
  console.log(copied);

  async function onCopyQrCode() {
    navigator.clipboard.writeText(qr_code!)
      .then(() => setCopied(true))

    await new Promise(resolve => setTimeout(resolve, 3000))

    setCopied(false);
  };

  return (
    <Container>
      {loading ? (
        <Skeleton style={{ width: 25, height: 25 }} />
      ) : (
        <CubeScan width={25} height={25} stroke="#555" strokeWidth={2} />
      )}

      <div style={{ height: 20 }} />

      {loading ? <Skeleton style={{ width: 300, height: 20 }} /> : <h1>Escaneie o QR Code</h1>}

      <div style={{ height: 5 }} />

      {loading ? <Skeleton style={{ width: 300, height: 20 }} /> : <p>Em 5 minutos o QrCode deixará de existir!</p>}

      {loading ? (
        <Skeleton style={{ margin: 15, width: 300, height: 300 }} />
      ) :
        <Image width={300} height={300} src={'data:image/png;base64,' + qr_code} alt="qr_code" />
      }

      {loading ? <Skeleton style={{ width: 50, height: 20 }} /> : <p>ou</p>}

      <div style={{ height: 15 }} />

      <Copy>
        {loading ? (
          <Skeleton style={{ width: 240, height: 50 }} />
        ) : (
          <div className="copy">
            <p>{qr_code}</p>
          </div>
        )}
        {loading ? (
          <Skeleton style={{ margin: '0 5px', width: 50, height: 50 }} />
        ) : (
          <button onClick={onCopyQrCode}>
            <BoldCopy width={25} height={25} fill="#555" />
          </button>
        )}
      </Copy>
    </Container>
  )
}