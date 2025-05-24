import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { paid_market_api } from "@services/mercado-pago";

export async function GET(request: Request) {
  // Rota para lidar com pagamentos pendentes do Mercado Pago (i.e Pix)
  // Quando o cliente clica no botão 'Voltar para o site' no Checkout depois de pagar (ou não) o Pix
  const { searchParams } = new URL(request.url);
  // Pegamos o ID do pagamento no Mercado Pago
  const paymentId = searchParams.get("payment_id");
  // Pegamos o ID do pagamento do nosso sistema
  const testeId = searchParams.get("external_reference");

  if (!paymentId || !testeId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const payment = new Payment(paid_market_api);
  const paymentData = await payment.get({ id: paymentId });

  // JSON.stringify(paymentData, null, 2);

  if (paymentData.status === "approved" || paymentData.date_approved !== null) {
    // Pagamentos já foi realizado. redirecionamos para a página de sucesso
    return NextResponse.redirect(new URL(`/success?payment_id=${paymentId}&external_reference=${paymentData.external_reference}`, request.url));
  }

  // Pagamentos pendentes. redirecionamos para a página inicial
  return NextResponse.redirect(new URL("/shopping", request.url));
}