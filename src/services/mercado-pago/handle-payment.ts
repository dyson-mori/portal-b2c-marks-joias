import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const { user_email, teste_id } = metadata;

  if (!user_email || !teste_id) {
    console.warn("Metadados incompletos", metadata);
    return;
  }
  // Faz alguma ação aqui - manda email pro usuario, libera acesso, erc.

  return { status: 'ok' };
}