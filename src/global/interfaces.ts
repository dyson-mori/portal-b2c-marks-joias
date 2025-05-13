import { Category, SubCategory } from "@prisma/client";

export type ProductProps = {
  defaultPriceId: string;
  // code: string;
  // title: string;
  // files: string[];
  // description: string;
  // price: number;
  // defaultPriceId?: string;
  // unit_amount: number;
  // quantity: number;
  // maxQuantity: number;
  title: string;
  code: number;
  price: number;
  thumbnail: string;
  description: string;
  files: string[]; // improve this
};

export type StorageProps = {
  code: number;
  price_id: string;
  title: string;
  price: number;
  maxQuantity: number;
  thumbnail: string;
  quantity: number;
  unit_amount: number;
  description: string;
};

export interface CategoryProps extends Category {
  sub: SubCategory[];
};
