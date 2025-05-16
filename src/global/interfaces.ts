import { Product } from "@prisma/client";

export type ProductProps = Product & {
  files: string[]; // improve this
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
  external_reference_id: string;
  email: string;
  name: string;
  client_id: string;
  products: StorageProps[];
  first_name: string;
  last_name: string;
};