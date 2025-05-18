import { NextResponse, NextRequest } from "next/server";
import { Payment } from "mercadopago";
import { paid_market_api } from "@services/mercado-pago";
import { handleMercadoPagoPayment } from "@services/mercado-pago/handle-payment";
import { prisma } from "@services/prisma";

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

      const address = await prisma.address.create({
        data: {
          city: 'contagem',
          neighborhood: 'eldorado',
          number: '920',
          state: 'MG',
          street: 'rua acacias',
          zip_code: '32310370',
          complement: 'casa 1'
        }
      });

      await prisma.order.create({
        data: {
          status: 0,
          payment_method: 'credit card',
          payment_status: paymentData.status!,
          external_reference: paymentData.external_reference,
          total_amount: 31000, // rever isso
          shipping_sost: 40, // rever isso
          discount: 0,
          products: {
            connect: paymentData.additional_info!.items?.map(el => ({
              id: Number(el.id)
            }))
          },
          delivery_address_id: address.id,
          notes: '',
          quantity: 1,
          unitPrice: 0,
        }
      });

      await Promise.all(
        paymentData.additional_info!.items!.map(async (produto) => {
          await prisma.product.update({
            where: {
              id: Number(produto.id)
            },
            data: {
              quantity: {
                decrement: Number(produto.quantity) // reduz do estoque atual
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
