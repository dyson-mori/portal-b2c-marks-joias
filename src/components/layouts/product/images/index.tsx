"use client"

import { ProductProps } from '@global/interfaces';

import Mobile from './mobile';
import Desktop from './desktop';

type Props = {
  data: ProductProps;
  width: number;
};

/**
 * mobile:      ≤ 767px            iPhone, Android phones
 * tablet:      768px ~ 1024px     iPad, Galaxy Tab
 * desktop:     > 1024px           Laptops, monitores maiores
 * */

export default function ImageRoot({ data, width }: Props) {
  if (width <= 767) {
    return <Mobile data={data} width={width} />;
  } else if (width >= 767) {
    return <Desktop data={data} />
  } else {
    return <p>ops...</p>
  }
};
