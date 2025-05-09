"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { useTheme } from 'styled-components';
import { SubCategory } from '@prisma/client';

import { Container, Title, DropDown, Button } from './styles';

interface CardProps {
  title: string;
  data: SubCategory[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selects: SubCategory[];
  setSelect: (cb: (prev: SubCategory[]) => SubCategory[]) => void;
}

export const Card: React.FC<CardProps> = ({ data, title, icon: Icon, selects, setSelect }) => {
  const theme = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerButtonsRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const height = containerButtonsRef.current?.scrollHeight ?? 0;

  const handleOpen = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
  }, []);

  const handleClickOutside = useCallback((
    // event: MouseEvent | MouseEventInit
  ) => {
    // if (
    //   dropdownRef.current &&
    //   !dropdownRef.current.contains(event.target as Node)
    // ) {
    //   setIsOpen(false);
    // }
  }, []);

  useEffect(() => {
    // const button = buttonRef.current;
    // if (!button) return;

    // button.addEventListener('click', handleOpen as EventListener);
    // document.addEventListener('mousedown', handleClickOutside as EventListener);

    // return () => {
    //   button.removeEventListener('click', handleOpen as EventListener);
    //   document.removeEventListener('mousedown', handleClickOutside as EventListener);
    // };
  }, [handleOpen, handleClickOutside]);

  const toggleSelect = (item: SubCategory) => {
    setSelect(prev => {
      const exists = prev.find(t => t.id === item.id);
      return exists
        ? prev.filter(d => d.id !== item.id)
        : [...prev, item];
    });
  };

  return (
    <Container ref={dropdownRef} style={{ height: isOpen ? height + 40 : 40 }}>
      <Title ref={buttonRef}>
        <Icon width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
        <p>{title}</p>
      </Title>

      <DropDown ref={containerButtonsRef}>
        {data.map((item) => {
          const isSelected = selects.some(s => s.id === item.id);
          return (
            <Button
              key={item.id}
              style={{
                backgroundColor: theme.colors[isSelected ? 'primary' : 'white'],
                color: theme.colors[isSelected ? 'white' : 'philippine_gray'],
                fontWeight: isSelected ? 600 : 500,
              }}
              onClick={() => toggleSelect(item)}
            >
              {item.title}
            </Button>
          );
        })}
      </DropDown>
    </Container>
  );
};
