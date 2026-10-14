import styled from 'styled-components';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { focusRing } from './controlStyles';

interface MenuToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  controls: string;
  ref?: Ref<HTMLButtonElement>;
}

const Dot = styled.span<{ $isOpen: boolean }>`
  width: 8px;
  height: 8px;
  background-color: ${({ theme, $isOpen }) => ($isOpen ? theme.colors.accent : theme.colors.text)};
  border-radius: 50%;
  display: block;
  transition: background-color 0.3s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const DotRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  width: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledMenuToggle = styled.button`
  ${focusRing}
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const MenuToggle = ({ isOpen, controls, ref, ...props }: MenuToggleProps) => {
  return (
    <StyledMenuToggle {...props} ref={ref} type="button" aria-expanded={isOpen} aria-controls={controls}>
      <DotRow aria-hidden="true">
        <Dot $isOpen={isOpen} />
        <Dot $isOpen={isOpen} />
        <Dot $isOpen={isOpen} />
      </DotRow>
      <DotRow aria-hidden="true">
        <Dot $isOpen={isOpen} />
        <Dot $isOpen={isOpen} />
        <Dot $isOpen={isOpen} />
      </DotRow>
      <DotRow aria-hidden="true">
        <Dot $isOpen={isOpen} />
        <Dot $isOpen={isOpen} />
        <Dot $isOpen={isOpen} />
      </DotRow>
    </StyledMenuToggle>
  );
};

export default MenuToggle;
