import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

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

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const order_id = url.searchParams.get("order_id") as string;

  const data = await prisma.order.findFirst({
    where: {
      id: order_id
    }
  });

  return NextResponse.json(data, {
    status: 200, statusText: 'products received successfully', headers: {
      'Access-Control-Allow-Origin': '*', // ou use seu domínio ngrok
    }
  });
};
