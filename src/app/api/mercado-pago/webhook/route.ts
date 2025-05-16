import { NextResponse, NextRequest } from "next/server";
import { Payment } from "mercadopago";
import { paid_market_api, verifyMercadoPagoSignature } from "@services/mercado-pago";
import { handleMercadoPagoPayment } from "@services/mercado-pago/handle-payment";

export async function POST(request: NextRequest) {
  try {
    // verifyMercadoPagoSignature(request);

    const body = await request.json();

    const { type, data } = body;

    switch (type) {
      case "payment":
        const payment = new Payment(paid_market_api);
        const paymentData = await payment.get({ id: data.id });
        console.log({ paymentData });

        if (
          paymentData.status === "approved" || // Pagamento por cartão OU
          paymentData.date_approved !== null // Pagamento por Pix
        ) {
          await handleMercadoPagoPayment(paymentData);
        }
        break;
      // case "subscription_preapproval": Eventos de assinatura
      //   console.log("Subscription preapproval event");
      //   console.log(data);
      //   break;
      default:
        console.log("Unhandled event type:", type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}