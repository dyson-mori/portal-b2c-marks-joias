import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PaidMarketProps } from "@global/interfaces";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata as PaidMarketProps;
  const { email } = metadata;

  if (!email) {
    return { status: 500 };
  };

  /*
    Faz alguma ação aqui - manda email pro usuario, libera acesso, erc.

    send a message to the customer and the store informing them about the purchase
  */

  return { status: 201 };
}