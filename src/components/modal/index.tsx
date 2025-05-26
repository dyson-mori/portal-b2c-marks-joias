import React, { CSSProperties, ReactNode, useRef, forwardRef, useEffect } from "react";

import { Container, Content } from "./styles";

interface Props {
  open: boolean;
  onClickOutside?: (b: boolean) => void;
  children: ReactNode;
  style?: CSSProperties;
};

function useClickOutside(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const Modal = forwardRef<HTMLDivElement, Props>(
  ({ open, onClickOutside, children, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const contentStyle: CSSProperties = {
      visibility: open ? 'visible' : 'hidden',
      opacity: open ? 1 : 0,
    };

    const content_styles = {
      top: open ? '50%' : '65%',
      transition: '0.5s'
    };

    useClickOutside(contentRef, () => {
      if (onClickOutside) {
        document.body.style.overflow = 'scroll';
        onClickOutside(false);
      }
    });

    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      }
    }, [open]);

    return (
      <Container ref={ref} style={contentStyle}>
        <Content ref={contentRef} style={content_styles} {...rest}>
          {children}
        </Content>
      </Container>
    );
  }
);

Modal.displayName = "Modal"

export { Modal }