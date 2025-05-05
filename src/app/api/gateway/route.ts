import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@services/stripe";
import { ProductProps } from "@global/interfaces";

type Gateway = {
  address: string;
  cep: string;
  cpf: string;
  credit_card_name: string;
  description: string;
  document_number: string;
  expiration_date: string;
  full_name: string;
  method: string;
  email: string;
  phone: string;
  price: 268.8
  products: ProductProps[];
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id") as string;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const products = session.line_items?.data.map(({ id, price }) => ({
    id,
    product: price!.product as Stripe.Product,
  }));

  const data = {
    fullname: session.customer_details?.name,
    products: products?.map(el => ({ ...el, image: el.product.images[0] }))
  };

  return NextResponse.json(data, { status: 200, statusText: 'gateway recieved successfully' });
};

export async function POST(request: NextRequest) {
  const { products, email } = await request.json() as Gateway;


  const successUrl = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl.replace('/api', ''),
    cancel_url: cancelUrl.replace('/api', ''),
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: products.map(item => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.images[0]], // opcional
        },
        unit_amount: Number(item.unit_amount) * 100, // em centavos
      },
      quantity: 1,
      // quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ['BR'], // ou ['US', 'BR'], etc.
    },
  });

  return NextResponse.json(checkoutSession.url, { status: 201, statusText: 'gateway created successfully' });
};