import { NextResponse, NextRequest } from "next/server";

import { Payment } from "mercadopago";
import { AdditionalInfo } from "mercadopago/dist/clients/payment/commonTypes";

import { prisma } from "@services/prisma";
import { paid_market_api } from "@services/mercado-pago";
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
    // verifyMercadoPagoSignature(request); // verificar o motivo de dar erro

    const body = await request.json() as PaymentProps;
    const { type, data } = body;

    if (type === "payment") {
      const payment = new Payment(paid_market_api);
      const paymentData = await payment.get({ id: data.id }); // data.id = collection_id

      const { description } = paymentData.metadata;
      const { items, payer } = paymentData.additional_info as AdditionalInfo;
      const fullAddress = payer?.address?.street_name as string;
      const [street, neighborhood, city, state] = fullAddress.split(" • ").map(item => item.trim());

      let address_obj = {};

      const pick_up_in_store = true;

      if (!pick_up_in_store) {
        const address = await prisma.address.create({
          data: {
            city,
            neighborhood,
            number: payer!.address!.street_number!,
            state,
            street,
            zip_code: payer!.address!.zip_code!,
            complement: description
          }
        });

        address_obj = address;
      };

      const total_amount = items!.reduce((acc, item) => {
        return acc + item.unit_price * item.quantity;
      }, 0);

      await prisma.order.create({
        data: {
          status: "PENDING",
          payment_method: paymentData.payment_method!.type!,
          payment_status: paymentData.status!,
          external_reference: paymentData.external_reference!,
          shipping_sost: 0, // valor do transporte, seja correio ou particular
          total_amount: total_amount!, // valor total do produto + shipping_sost
          discount: 0,
          product: JSON.stringify(items),
          address: JSON.stringify(address_obj),
          notes: '',
          pick_up_in_store
        }
      });

      await Promise.all(
        items!.map(async (product) => {
          await prisma.product.update({
            where: {
              id: Number(product.id)
            },
            data: {
              total_quantity: {
                decrement: Number(product.quantity) // reduz do estoque atual
              }
            }
          });
        })
      );

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

  // return NextResponse.json(request.body, { status: 200 });
};
