import { NextRequest, NextResponse } from "next/server";

import { Feedbacks } from "@prisma/client";

import { prisma } from "@services/prisma";

export async function POST(request: NextRequest) {
  const { name, message, photo, social } = await request.json() as Feedbacks;

  const feedback = await prisma.feedbacks.create({
    data: {
      name,
      message,
      photo,
      social
    }
  });

  if (!feedback) {
    return NextResponse.json(undefined, { status: 400, statusText: 'unable to create this feedback!' });
  };

  return NextResponse.json(true, { status: 201, statusText: 'successfully created feedback!' });
};
