import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { Files, Product } from "@prisma/client";

import { prisma } from "@services/prisma";
import { stripe } from "@services/stripe";

function formatCode(code: number, last_product: number) {
  // const seq = '123456';
  // console.log(seq.slice(String(1).length + 1, String(seq).length));

  if (String(code).length === 2) {
    return Number(`${code}0000`) + last_product
  };

  return Number(`${code}00000`) + last_product
};

export async function GET() {
  const product = await stripe.products.list({
    expand: ['data.default_price']
  });

  const data = product.data.map(row => {
    const price = row.default_price as Stripe.Price;
    return {
      id: row.id,
      name: row.name,
      images: row.images,
      description: row.description,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100)
    }
  })

  // const product = await prisma.product.findMany({
  //   orderBy: {
  //     created_at: 'desc'
  //   },
  //   include: {
  //     files: true,
  //   }
  // });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json(data, { status: 201, statusText: 'products received successfully' });
};

// remover qualquer tipo de adição ao subir em produção, apenas o painel poderá cadastrar/editar/deletar novos produtos
export async function POST(request: NextRequest) {
  const { title, description, price, quantity, category_id, files } = await request.json() as Product & { files: Files[] };

  const category = await prisma.category.findFirst({
    where: {
      id: category_id,
    }
  });

  const last_product = await prisma.product.count();

  const product = await prisma.product.create({
    data: {
      code: formatCode(category!.code, last_product),
      category_id,
      title,
      description,
      price,
      quantity,
      files: {
        createMany: {
          data: files.map((el, i) => ({
            code: `${last_product}-file${i}`,
            url: el.url
          }))
        }
      }
    }
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'register fail' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'products received successfully' });
};

// export async function PUT(request: NextRequest) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");
//   const body = await request.json() as Product & { category: Array<Category> };

//   const categories = await prisma.product.findFirst({
//     where: {
//       id: `${id}`
//     },
//     include: {
//       categories: true,
//       files: true,
//     }
//   });

//   const product = await prisma.product.update({
//     where: {
//       id: `${id}`
//     },
//     data: {
//       title: body.title,
//       description: body.description,
//       price: body.price,
//       categories: {
//         connect: body.category.map(({ id }) => ({ id }))
//       }
//     }
//   });

//   if (!product) {
//     throw new Error('Product Server Error');
//   };

//   return NextResponse.json(product);
// };

// export async function DELETE(request: NextRequest) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");
//   const data = await prisma.product.delete({
//     where: {
//       id: `${id}`,
//     },
//     include: {
//       files: true
//     }
//   });

//   if (!data) {
//     throw new Error('Register failed');
//   };

//   for (const key in data.files) {
//     if (Object.prototype.hasOwnProperty.call(data.files, key)) {
//       const element = data.files[key];
//       await cloudinary.uploader.destroy(element.cloudinary_id)
//     }
//   };

//   return NextResponse.json(`Product [${id}] has been deleted`);
// };