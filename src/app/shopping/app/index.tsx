"use client"

import React, { Suspense, useContext, useEffect, useState } from 'react';

import { initMercadoPago } from '@mercadopago/sdk-react';

import { ShoppingContext } from '@context/shopping';
import { Shopping, Splash } from '@components';

import { Container } from './styles';

export default function ShoppingCard() {
  const { storage, setRemoveStorage, setEditStorage } = useContext(ShoppingContext);

  const [qrCode, setQrCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />
        {!qrCode && <Shopping.Form storage={storage} setCode={setQrCode} />}
        {qrCode && <Shopping.Pix qr_code={qrCode} />}
      </Container>
    </Suspense>
  )
}