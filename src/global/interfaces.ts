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
  cep: string;
  description: string;
  phone: string;

  external_reference_id: string;
  client_id: string;
  products: StorageProps[];
  // last_name: string;
};
