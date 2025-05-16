import { MercadoPagoConfig } from "mercadopago";
// import { NextResponse } from "next/server";
// import crypto from "crypto";

export const paid_market_api = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
});

export function verifyMercadoPagoSignature(request: Request) {
  const signature = request.headers.get("x-signature");
  const topic = request.headers.get("x-topic");
  const userId = request.headers.get("x-user-id");

  if (!signature || !topic || !userId) {
    throw new Error("Assinatura inválida: headers ausentes.");
  }

  // Aqui poderia ter mais lógica de validação se o Mercado Pago fornecesse um segredo (como Stripe faz)
  // MAS o Mercado Pago não fornece HMAC nem segredo compartilhado — ou seja, não dá para validar criptograficamente
  // Neste caso, pode-se apenas registrar a tentativa e seguir com cautela.

  console.log("Headers do Mercado Pago:", {
    signature,
    topic,
    userId,
  });

  // Opcionalmente: você pode bloquear se o `userId` for diferente do seu ID de conta
  const MP_USER_ID = process.env.MERCADO_PAGO_USER_ID;

  if (MP_USER_ID && userId !== MP_USER_ID) {
    throw new Error("Webhook recebido de fonte não autorizada.");
  }
}

/*

export function verifyMercadoPagoSignature(request: Request) {
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");
  if (!xSignature || !xRequestId) {
    return NextResponse.json(
      { error: "Missing x-signature or x-request-id header" },
      { status: 400 }
    );
  }

  const signatureParts = xSignature.split(",");
  let ts = "";
  let v1 = "";
  signatureParts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key.trim() === "ts") {
      ts = value.trim();
    } else if (key.trim() === "v1") {
      v1 = value.trim();
    }
  });

  if (!ts || !v1) {
    return NextResponse.json(
      { error: "Invalid x-signature header format" },
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id");

  let manifest = "";
  if (dataId) {
    manifest += `id:${dataId};`;
  }
  if (xRequestId) {
    manifest += `request-id:${xRequestId};`;
  }
  manifest += `ts:${ts};`;

  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET as string;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);
  const generatedHash = hmac.digest("hex");

  if (generatedHash !== v1) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
}


*/
