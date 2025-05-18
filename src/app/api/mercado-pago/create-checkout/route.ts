import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { paid_market_api } from "@services/mercado-pago";

import { PaidMarketProps } from "@global/interfaces";
import { formats } from "@helpers/format";

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // ou restrinja ao domínio ngrok
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export async function POST(req: NextRequest) {
  const { full_name, email, cep, phone, cpf, client_id, external_reference_id, products } = await req.json() as PaidMarketProps;

  const splitting = full_name.split(' ');
  const ddd = phone.slice(0, 2);
  const phoneNumber = phone.slice(2, phone.length);

  // return NextResponse.json({ ok: true })

  try {
    const preference = new Preference(paid_market_api);

    const createdPreference = await preference.create({
      body: {
        external_reference: external_reference_id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        notification_url: `${process.env.NEXT_PUBLIC_MARKS_URL}/mercado-pago/webhook`,
        metadata: {
          client_id: client_id,
          client_email: email,
        },
        payer: {
          name: full_name,
          email,
          phone: {
            number: ddd,
            area_code: phoneNumber
          },
          address: {
            zip_code: cep,
            street_name: '',
            street_number: ''
          },
          identification: {
            type: 'CPF',
            identification: Number(cpf)
          },
          first_name: splitting[0],
          last_name: splitting[splitting.length - 1],
        } as object,
        items: products.map(product => ({
          id: String(product.id),
          title: product.title,
          description: product.description,
          quantity: product.quantity,
          picture_url: product.thumbnail,
          unit_price: Number(formats.formatDecimal(String(product.unit_amount))),
        })),
        payment_methods: {
          installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
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

    return NextResponse.json({ preferenceId: createdPreference.id, initPoint: createdPreference.init_point }, {
      headers: {
        'Access-Control-Allow-Origin': '*', // ou use seu domínio ngrok
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}