import React from 'react';

import { HeaderProps } from '@global/interfaces';
import { useWindowDimensions } from '@hooks';

import Desktop from './desktop';
import Mobile from './mobile';

interface DataProps {
  hide: boolean;
  param: string;
  data: HeaderProps;
};

export default function Header({ hide, param, data }: DataProps) {
  const { width } = useWindowDimensions();
  return width <= 720 ? (
    <Mobile hide={hide} param={param} data={data} />
  ) : (
    <Desktop hide={hide} param={param} data={data} />
  )
}
