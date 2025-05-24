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
    }
  });

  if (!header) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  const data = {
    header,
    category: category.map(item => ({
      ...item,
      sub: item.id === 1 ? [
        { title: 'casamento' },
        { title: 'solitário' },
        { title: 'relacionamento' },
      ] : []
    }))
  };

  return NextResponse.json(data, { status: 200, statusText: 'header received successfully' });
};
