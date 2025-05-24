import { NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET() {
  const header = await prisma.header.findMany({
    where: {
      public: true
    },
  });

  const category = await prisma.category.findMany({
    orderBy: {
      title: 'asc'
    },
    include: {
      sub: {
        select: {
          title: true
        }
      }
    }
  });

  if (!header) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  const data = {
    header,
    category
  };

  return NextResponse.json(data, { status: 200, statusText: 'header received successfully' });
};
