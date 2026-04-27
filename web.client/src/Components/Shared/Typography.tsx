import React from 'react';
import styled from 'styled-components';
import { type Theme } from '../../styles/theme';

// Automaticky vygeneruj typy z tématu
export type TypographyVariant = keyof Theme['typography'];

export type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  as?: React.ElementType;
  className?: string;
};

type StyledProps = {
  $variant?: TypographyVariant;
};

const StyledTypography = styled.p<StyledProps>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme, $variant }) =>
    $variant ? theme.typography[$variant].fontSize : 'inherit'};
  font-weight: ${({ theme, $variant }) =>
    $variant ? theme.typography[$variant].fontWeight : 'inherit'};
  line-height: 1.5;
  margin: 0;
  color: inherit;
`;

const TypographyElement = StyledTypography as React.ComponentType<
  StyledProps & {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
  }
>;

export const Text: React.FC<TypographyProps> = ({
  children,
  variant = 'bodyS',
  as = 'p',
  className,
}) => {
  return (
    <TypographyElement 
      $variant={variant} 
      as={as} 
      className={className}
    >
      {children}
    </TypographyElement>
  );
};

export default Text;
