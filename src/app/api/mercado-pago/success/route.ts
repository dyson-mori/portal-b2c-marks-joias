import { NextRequest, NextResponse } from "next/server";

import { Payment } from "mercadopago";

import { paid_market_api } from "@services/mercado-pago";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const paymentId = searchParams.get("payment_id");
  const externalReferenceId = searchParams.get("external_reference");

  if (!paymentId || !externalReferenceId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 200 });
  };

  const payment = new Payment(paid_market_api);
  const paymentData = await payment.get({ id: paymentId! });

  console.log('route success payment -> ', paymentData);

  return NextResponse.json({ received: true }, { status: 200 });
};