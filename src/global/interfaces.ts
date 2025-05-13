import { Category, SubCategory } from "@prisma/client";

export type ProductProps = {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  defaultPriceId?: string;
  unit_amount: number;
  quantity: number;
  maxQuantity: number;
};

export type StorageProps = {
  id: string;
  price_id: string;
  name: string;
  price: number;
  maxQuantity: number;
  image: string;
  quantity: number;
  unit_amount: number;
};

export interface CategoryProps extends Category {
  sub: SubCategory[];
};
