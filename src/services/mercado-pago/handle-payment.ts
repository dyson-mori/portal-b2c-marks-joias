import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PaidMarketProps } from "@global/interfaces";
import { transporter } from "@services/nodemailer";

// const message = {
//   from: "Nodemailer <marks-joias@gmail.com>",
//   to: "Nodemailer <ssergiojunioleal@gmail.com>",
//   subject: "Testing Email",
//   text: "For clients with plaintext support only...",
//   html: "<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>",
//   amp: `<!doctype html>
//     <html ⚡4email>
//       <head>
//         <meta charset="utf-8">
//         <style amp4email-boilerplate>body{visibility:hidden}</style>
//         <script async src="https://cdn.ampproject.org/v0.js"></script>
//         <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
//       </head>
//       <body>
//         <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
//         <p>GIF (requires "amp-anim" script in header):<br/>
//           <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
//       </body>
//     </html>`,
// };

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata as PaidMarketProps;
  const { email } = metadata;

  if (!email) {
    return { status: 500 };
  };

  const message = {
    from: `Mark's Jóias <marks>`,
    to: 'ssergiojunioleal@gmail.com',
    subject: "Using NodeMailer With Next Api",
    html: "<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>",
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
    amp: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>GIF (requires "amp-anim" script in header):<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`,
  };


  await transporter.sendMail(message);

  /*
    Faz alguma ação aqui - manda email pro usuario, libera acesso, erc.

    send a message to the customer and the store informing them about the purchase
  */

  return { status: 201 };
}