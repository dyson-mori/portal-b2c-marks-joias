import { Category, SubCategory } from "@prisma/client";

export type ProductProps = {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  defaultPriceId?: string;
  unit_amount?: string;
};

export interface CategoryProps extends Category {
  sub: SubCategory[];
};
