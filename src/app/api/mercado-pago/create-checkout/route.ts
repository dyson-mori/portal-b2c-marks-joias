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
  const { client_id, name, external_reference_id, products, first_name, last_name } = await req.json() as PaidMarketProps;

  try {
    const preference = new Preference(paid_market_api);

    const createdPreference = await preference.create({
      body: {
        external_reference: external_reference_id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        notification_url: `${process.env.NEXT_PUBLIC_MARKS_URL}/mercado-pago/webhook`,
        metadata: {
          client_id: client_id,
          // client_email: email,
        },
        payer: {
          // email,
          name,
          first_name,
          last_name,
        } as {
          email: string,
          name: string,
          first_name: string,
          last_name: string,
        },
        items: products.map(product => ({
          id: String(product.id),
          title: product.title,
          description: product.description,
          quantity: product.quantity,
          unit_price: Number(formats.formatDecimal(String(product.unit_amount))),
        })),
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          //   excluded_payment_methods: [
          //     {
          //       id: "bolbradesco",
          //     },
          //     {
          //       id: "pec",
          //     },
          //   ],
          excluded_payment_types: [
            {
              id: "debit_card",
            },
            {
              id: "credit_card",
            },
          ],
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