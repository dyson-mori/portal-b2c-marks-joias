// components/Modal.tsx
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        {/* <CloseButton onClick={onClose}>×</CloseButton> */}
        {children}
      </Container>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  animation: ${fadeIn} 0.3s ease forwards;
  position: relative;
`;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 0.5rem;
//   right: 1rem;
//   font-size: 1.5rem;
//   background: none;
//   border: none;
//   cursor: pointer;
// `;
