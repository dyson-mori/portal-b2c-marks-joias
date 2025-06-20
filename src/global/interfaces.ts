import { Category, Header, Product, Sub } from "@prisma/client";

export type ProductProps = Product & {
  files: string[]; // improve this
  related: Product[];
};

export type CategoryProps = Category & {
  sub: string[]
};

export type HeaderProps = {
  header: Header[];
  category: Category & {
    title: string;
    sub: Sub[];
  }[];
};

export type StorageProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  remove_quantity: number;
  unit_amount: number;
  description: string;
  total_quantity: number;
};

export type PaidMarketProps = {
  method_payment: string;
  full_name: string;
  email: string;
  client_email?: string;
  description: string;
  phone: string;

  cpf: string;
  pick_up_in_store: boolean;

  price: number;

  zip_code: string; // '32310370';
  number: string; // '920';
  street: string; // 'rua acacias';
  neighborhood: string; // 'eldorado';
  city: string; // 'contagem';
  state: string; // 'MG';

  products: StorageProps[];
};
