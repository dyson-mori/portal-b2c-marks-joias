import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PaidMarketProps } from "@global/interfaces";
import { transporter } from "@services/nodemailer";
import { formats } from "@helpers/format";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata as PaidMarketProps;
  const { client_email } = metadata;

  if (!client_email) {
    return { status: 500 };
  };

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Confirmação de Compra</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td bgcolor="#ff0d6a" align="center" style="padding: 20px 0;">
              <img src="https://res.cloudinary.com/doo9pfft1/image/upload/v1748011679/logo-128x128_2x_white_pvlrh2.png"
                alt="MJ Logo" width="100" height="100" style="display: block;" />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color: #ffffff; border-radius: 6px;">
                <tr>
                  <td align="center" style="padding: 20px 20px;">
                    <h2 style="margin: 0; font-family: Montserrat, sans-serif; font-size: 20px; color: #333;">
                      Compra realizada com sucesso!
                    </h2>
                    <p style="margin: 5px 0 0px 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      Olá ${paymentData.additional_info?.payer?.first_name?.split(' ')[0]} Recebemos o seu pedido e ele está sendo processado.
                    </p>
                    <p style="margin: 0 0 0 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      Abaixo estão os detalhes:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="start" style="padding: 20px 14%;">
                    <p style="margin: 0 0 0 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      Código do pedido
                    </p>
                    <h2 style="margin: 0; font-family: Montserrat, sans-serif; font-size: 20px; color: #333;">
                      ${paymentData.external_reference}
                    </h2>
                    <p style="margin: 10px 0 5px 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      Data da compra
                    </p>
                    <h3 style="margin: 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      ${formats.date_hours(paymentData.money_release_date!)}
                    </h3>
                    <p style="margin: 10px 0 5px 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      Valor da Compra
                    </p>
                    <h3 style="margin: 0; font-family: Montserrat, sans-serif; font-size: 15px; color: #333;">
                      ${formats.calculate_total(paymentData.additional_info!.items!)}
                    </h3>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 10px;">
              <p style="font-family: Montserrat, sans-serif; font-size: 12px; color: #888; margin: 0;">
                Este e-mail foi enviado automaticamente, não é necessário respondê-lo.<br />
                Copyright © 2002 - 2025 todos os direitos reservados.
              </p>
            </td>
          </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  await transporter.sendMail({
    from: "supp.programming@gmail.com",
    to: client_email,
    subject: "Compra Aprovada ✔",
    text: "Prazer Débora Pereira", // plain‑text body
    html
  });

  return { status: 201 };
};
