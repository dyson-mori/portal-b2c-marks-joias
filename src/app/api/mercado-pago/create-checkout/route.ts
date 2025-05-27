import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { paid_market_api } from "@services/mercado-pago";

import { PaidMarketProps } from "@global/interfaces";
import { formats } from "@helpers/format";
import { generatePaymentId } from "@helpers/index";

// export async function OPTIONS() {
//   return NextResponse.json({}, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*', // ou restrinja ao domínio ngrok
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// };

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
    // price
  } = await req.json() as PaidMarketProps;

  // const split_name = full_name.split(' ');
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
    // const preference = new Payment(paid_market_api);
    // const createdPreference = await preference.create({
    //   body: {
    //     external_reference: generatePaymentId(), // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
    //     notification_url: `${process.env.NEXT_PUBLIC_MARKS_URL}/mercado-pago/webhook`,
    //     metadata: {
    //       client_email: email,
    //       description,
    //       pick_up_in_store
    //     },
    //     transaction_amount: price,
    //     payer: {
    //       email,
    //       first_name: split_name[0],
    //       last_name: split_name[split_name.length - 1],
    //       phone: {
    //         number: ddd,
    //         area_code: phoneNumber
    //       },
    //       address: {
    //         zip_code: zip_code,
    //         street_name: `${street} • ${neighborhood} • ${city} • ${state}`,
    //         street_number: number
    //       },
    //       identification: {
    //         type: 'CPF',
    //         number: cpf
    //       }
    //     },
    //     payment_method_id: 'pix',
    //   },
    // });

    // console.log(JSON.stringify(createdPreference, null, 2))

    await new Promise(resolver => setTimeout(resolver, 3000));

    return NextResponse.json({
      // qr_code: createdPreference.point_of_interaction?.transaction_data?.qr_code,
      // qr_code_base64: createdPreference.point_of_interaction?.transaction_data?.qr_code_base64,
      // ticket_url: createdPreference.point_of_interaction?.transaction_data?.ticket_url,
      qr_code: "00020126360014br.gov.bcb.pix0114+553197556413352040000530398654041.005802BR5916JS202505141823066009Sao Paulo62250521mpqrinter1123600963076304CBC7",
      qr_code_base64: "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",
      ticket_url: "https://www.mercadopago.com.br/payments/112360096307/ticket?caller_id=1592726893&hash=9ec3f361-4d49-4502-9ebc-cd5a3d97d541"
    }, {
      status: 201,
      // headers: {
      //   'Access-Control-Allow-Origin': '*', // ou use seu domínio ngrok
      // }
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