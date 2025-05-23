import { Product } from "@prisma/client";

export type ProductProps = Product & {
  files: string[]; // improve this
  related: Product[];
};

export type StorageProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  unit_amount: number;
  description: string;
  total_quantity: number;
};

export type PaidMarketProps = {
  full_name: string;
  email: string;
  client_email?: string;
  description: string;
  phone: string;

  cpf: string;
  pick_up_in_store: boolean;

  zip_code: string; // '32310370';
  number: string; // '920';
  street: string; // 'rua acacias';
  neighborhood: string; // 'eldorado';
  city: string; // 'contagem';
  state: string; // 'MG';

  products: StorageProps[];
};
