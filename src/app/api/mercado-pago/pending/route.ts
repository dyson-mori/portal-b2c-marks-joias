import { NextResponse } from "next/server";

import { Payment } from "mercadopago";
import { AdditionalInfo } from "mercadopago/dist/clients/payment/commonTypes";

import { paid_market_api } from "@services/mercado-pago";
import { prisma } from "@services/prisma";

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

  JSON.stringify(paymentData, null, 2);

  if (paymentData.status === "approved" || paymentData.date_approved !== null) {
    const { description, pick_up_in_store } = paymentData.metadata;
    const { items, payer } = paymentData.additional_info as AdditionalInfo;
    const fullAddress = payer?.address?.street_name as string;
    const [street, neighborhood, city, state] = fullAddress.split(" • ").map(item => item.trim());

    let address_obj = {};

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

    // Pagamentos já foi realizado. redirecionamos para a página de sucesso
    return NextResponse.redirect(new URL(`/success?payment_id=${paymentId}&external_reference=${paymentData.external_reference}`, request.url));
  }

  // Pagamentos pendentes. redirecionamos para a página inicial
  return NextResponse.redirect(new URL("/shopping", request.url));
}