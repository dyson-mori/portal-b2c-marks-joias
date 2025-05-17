import { NextResponse, NextRequest } from "next/server";
import { Payment } from "mercadopago";
import { paid_market_api, verifyMercadoPagoSignature } from "@services/mercado-pago";
import { handleMercadoPagoPayment } from "@services/mercado-pago/handle-payment";

type PaymentProps = {
  action: string; // "payment.updated",
  api_version: string; // "v1",
  data: {
    id: string;// "111383868117"
  },
  date_created: string; // "2021-11-01T02:02:02Z",
  id: string; // "123456",
  live_mode: boolean;
  type: "payment" | "subscription_preapproval"; // "payment",
  user_id: number; // 2437907601
};

export async function POST(request: NextRequest) {
  try {
    verifyMercadoPagoSignature(request); // verificar o motivo de dar erro

    const body = await request.json() as PaymentProps;
    const { type, data } = body;

    if (type === "payment") {
      const payment = new Payment(paid_market_api);
      const paymentData = await payment.get({ id: data.id }); // data.id = collection_id

      if (paymentData.status === "approved") {
        const { status } = await handleMercadoPagoPayment(paymentData);

        return NextResponse.json(status, { status: 200, statusText: 'payment received successfully!' });
      };
    };

    if (type === "subscription_preapproval") {
      console.log("Subscription preapproval event");
      console.log({ subscription_preapproval: data });
    };
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
};
