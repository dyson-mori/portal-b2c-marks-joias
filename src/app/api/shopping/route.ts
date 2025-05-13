import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

import { stripe } from "@services/stripe";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = url.searchParams.getAll('product_id') as string[];

  const products = await Promise.all(
    params.map(async (id) => {
      try {
        const product = await stripe.products.retrieve(id, {
          expand: ['default_price'],
        });
        const price = product.default_price as Stripe.Price;

        const format = {
          id: product.id,
          price_id: price.id,
          name: product.name,
          price: price.unit_amount,
          maxQuantity: Number(product.metadata.quantity),
          image: product.images[0],
          unit_amount: price.unit_amount,
          quantity: 1
        };

        return format;
      } catch (error) {
        console.error(`Erro ao buscar produto ${id}:`, error);
        return null; // ou trate conforme o caso
      }
    })
  );

  const validProducts = products.filter(Boolean);

  return NextResponse.json(validProducts, { status: 200, statusText: 'products received successfully' });
};