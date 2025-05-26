import { NextRequest, NextResponse } from "next/server";
import { Payment, Preference } from "mercadopago";
import { paid_market_api } from "@services/mercado-pago";

import { PaidMarketProps } from "@global/interfaces";
import { formats } from "@helpers/format";
import { generatePaymentId } from "@helpers/index";

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
    pick_up_in_store,
    method_payment,
    price
  } = await req.json() as PaidMarketProps;

  const split_name = full_name.split(' ');
  const phoneNumberReplaced = phone.replace(/\D/g, '');
  const ddd = phoneNumberReplaced.slice(0, 2);
  const phoneNumber = phoneNumberReplaced.slice(2, phone.length);

  const items = products.map(product => ({
    id: String(product.id),
    title: product.title,
    description: product.description,
    quantity: product.remove_quantity,
    picture_url: product.thumbnail,
    unit_price: Number(formats.formatDecimal(String(product.unit_amount))),
  }));

  if (method_payment === 'pix') {
    const preference = new Payment(paid_market_api);
    const createdPreference = await preference.create({
      body: {
        external_reference: generatePaymentId(), // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        notification_url: `${process.env.NEXT_PUBLIC_MARKS_URL}/mercado-pago/webhook`,
        metadata: {
          client_email: email,
          description,
          pick_up_in_store
        },
        transaction_amount: price,
        payer: {
          email,
          first_name: split_name[0],
          last_name: split_name[split_name.length - 1],
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
            number: cpf
          }
        },
        payment_method_id: 'pix',
      },
    });

    return NextResponse.json(createdPreference, {
      status: 201, headers: {
        'Access-Control-Allow-Origin': '*', // ou use seu domínio ngrok
      }
    });
  };

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