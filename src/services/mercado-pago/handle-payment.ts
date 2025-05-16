import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PaidMarketProps } from "@global/interfaces";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata as PaidMarketProps;
  const { email, client_id } = metadata;

  if (!email || !client_id) {
    console.warn("Metadados incompletos ->", metadata);
    return;
  };

  console.warn("Metadados Completos ->", metadata);

  // Faz alguma ação aqui - manda email pro usuario, libera acesso, erc.

  return { status: 'ok' };
}