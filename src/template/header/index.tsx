import React from 'react';

import { Category, Header as HeaderPrisma } from '@prisma/client';

import { useWindowDimensions } from '@hooks';

import Desktop from './desktop';
import Mobile from './mobile';

interface HeaderProps {
  hide: boolean;
  param: string;
  data: {
    header: HeaderPrisma[];
    category: Category[];
  };
};

export default function Header({ hide, param, data }: HeaderProps) {
  const { width } = useWindowDimensions();
  return width <= 720 ? (
    <Mobile hide={hide} param={param} data={data} />
  ) : (
    <Desktop hide={hide} param={param} data={data} />
  )
}
