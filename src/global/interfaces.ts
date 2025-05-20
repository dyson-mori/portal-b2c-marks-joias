import { Product } from "@prisma/client";

export type ProductProps = Product & {
  files: string[]; // improve this
  related: Product[];
};

export type StorageProps = {
  id: number;
  product_id: string;
  price_id: string;
  title: string;
  price: number;
  maxQuantity: number;
  thumbnail: string;
  quantity: number;
  unit_amount: number;
  description: string;
};

export type PaidMarketProps = {
  full_name: string;
  email: string;
  description: string;
  phone: string;

  cpf: string;

  zip_code: string; // '32310370';
  number: string; // '920';
  street: string; // 'rua acacias';
  neighborhood: string; // 'eldorado';
  city: string; // 'contagem';
  state: string; // 'MG';

  products: StorageProps[];
};
