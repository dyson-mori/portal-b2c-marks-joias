import { NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET() {
  // const url = new URL(request.url);
  // const title = url.searchParams.get("title");

  // if (title) {
  //   const categories = await prisma.category.findFirst({
  //     where: {
  //       title: title
  //     },
  //     include: {
  //       sub: {
  //         select: {
  //           title: true
  //         }
  //       },
  //     }
  //   });

  //   if (!categories) {
  //     return NextResponse.json({}, { status: 400, statusText: 'category server error' });
  //   };

  //   const data = {
  //     ...categories,
  //     sub: categories.sub.map(el => el.title)
  //   }

  //   return NextResponse.json(data, { status: 200, statusText: 'sub category received successfully!' });
  // };

  const categories = await prisma.category.findMany({
    where: {
      show_on_landing: true,
    },
    orderBy: {
      title: 'asc'
    },
    select: {
      id: true,
      sub: {
        select: {
          title: true
        }
      },
      title: true,
      thumbnail: true,
      show_on_landing: true,
    }
  });

  if (!categories) {
    return NextResponse.json([], { status: 400, statusText: 'category server error' });
  };

  const data = categories.map(item => ({
    ...item,
    sub: item.sub.map(el => el.title)
  }))

  return NextResponse.json(data, { status: 200, statusText: 'category received successfully' });
};
