import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  // const limit = url.searchParams.get("limit");
  const category_title = url.searchParams.get("target");

  const category = await prisma.category.findFirst({
    where: {
      title: category_title ?? undefined
    }
  });

  const products = await prisma.product.findMany({
    orderBy: {
      created_at: 'desc'
    },
    where: {
      id: category_title ? category?.id : undefined
    },
    select: {
      title: true,
      code: true,
      price: true,
      files: true,
    }
  });

  const data = products.map(item => ({
    ...item,
    price: Number(item.price),
    thumbnail: JSON.parse(item.files)[0]
  }))

  if (!products) {
    return NextResponse.json([], { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json(data, { status: 201, statusText: 'products received successfully' });
};

// remover qualquer tipo de adição ao subir em produção, apenas o painel poderá cadastrar/editar/deletar novos produtos
// export async function POST(request: NextRequest) {
//   const { title, description, price, quantity, category_id, files } = await request.json() as Product & { files: Files[] };

//   const category = await prisma.category.findFirst({
//     where: {
//       id: category_id,
//     }
//   });

//   const last_product = await prisma.product.count();

//   const product = await prisma.product.create({
//     data: {
//       code: formatCode(category!.code, last_product),
//       category_id,
//       title,
//       description,
//       price,
//       quantity,
//       files: {
//         createMany: {
//           data: files.map((el, i) => ({
//             code: `${last_product}-file${i}`,
//             url: el.url
//           }))
//         }
//       }
//     }
//   });

//   if (!product) {
//     return NextResponse.json(product, { status: 400, statusText: 'register fail' });
//   };

//   return NextResponse.json(true, { status: 201, statusText: 'products received successfully' });
// };
