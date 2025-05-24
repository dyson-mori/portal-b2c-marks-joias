import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { paid_market_api } from "@services/mercado-pago";

import { PaidMarketProps } from "@global/interfaces";
import { formats } from "@helpers/format";
import { generatePaymentId } from "@helpers/index";

export async function POST(req: NextRequest) {
  const {
    full_name,
    email,
    zip_code,
    phone,
    products,
    city,
    description,
    neighborhood,
    number,
    state,
    street,
    cpf,
    pick_up_in_store
  } = await req.json() as PaidMarketProps;

  const phoneNumberReplaced = phone.replace(/\D/g, '');
  const ddd = phoneNumberReplaced.slice(0, 2);
  const phoneNumber = phoneNumberReplaced.slice(2, phone.length);

  const items = products.map(product => ({
    id: String(product.id),
    title: product.title,
    description: product.description,
    quantity: product.quantity,
    picture_url: product.thumbnail,
    unit_price: Number(formats.formatDecimal(String(product.unit_amount))),
  }))

  try {
    const preference = new Preference(paid_market_api);

    const createdPreference = await preference.create({
      body: {
        items,
        auto_return: "approved",
        external_reference: generatePaymentId(), // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        notification_url: `${process.env.NEXT_PUBLIC_MARKS_URL}/mercado-pago/webhook`,
        metadata: {
          client_email: email,
          description,
          pick_up_in_store
        },
        payer: {
          name: full_name,
          email,
          // first_name: splitting[0],
          // last_name: splitting[splitting.length - 1],
          phone: {
            number: ddd,
            area_code: phoneNumber
          },
          address: {
            zip_code: zip_code,
            street_name: `${street} • ${neighborhood} • ${city} • ${state}`,
            street_number: number
          },
          identification: {
            type: 'CPF',
            identification: Number(cpf)
          }
        },
        payment_methods: {
          installments: 5, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        back_urls: {
          success: `${req.headers.get("origin")}/success`,
          failure: `${req.headers.get("origin")}/shopping`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({ preferenceId: createdPreference.id, initPoint: createdPreference.init_point });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}