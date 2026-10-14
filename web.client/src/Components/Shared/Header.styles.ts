import styled, { css } from 'styled-components';
import { Link } from 'react-router';
import { focusRing } from './controlStyles';
import { navigationContentWidth } from '../../styles/layout';

const navigationControl = css`
  ${focusRing}
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent);
  }

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: ${navigationContentWidth}px;
  margin: 0 auto;
`;

export const NavBg = styled.div`
  height: 68px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const RightSection = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 0 0 8px 8px;
  pointer-events: auto;
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SocialLink = styled.a`
  ${focusRing}
  display: grid;
  place-items: center;
  width: 36px;
  height: 44px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover { background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent); }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  top: -12px;
  right: -16px;
  z-index: -1;
  width: min(220px, calc(100vw - 24px));
  max-height: calc(100dvh - 16px);
  overflow-y: auto;
  padding: 1rem;
  padding-top: 5rem;
  border: 0;
  border-radius: 0 0 1rem 1rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &[hidden] { display: none; }
`;

export const StyledNavLink = styled(Link)`${navigationControl}`;
export const StyledNavButton = styled.button`${navigationControl}`;

export const SubMenuTrigger = styled(StyledNavButton)`
  justify-content: space-between;
  width: 100%;
`;

export const TriggerLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Chevron = styled.span<{ $expanded: boolean }>`
  font-size: 0.7rem;
  transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'none'};
`;

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.25rem 0 0.5rem 1.25rem;
  padding-left: 0.5rem;
  border-left: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 20%, transparent);

  &[hidden] { display: none; }
`;

export const SubMenuLink = styled(Link)`
  ${navigationControl}
  font-size: 0.875rem;
`;
