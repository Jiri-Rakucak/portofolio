import styled, { keyframes } from 'styled-components';
import { focusRing } from '../Shared/controlStyles';
import { navigationContentWidth } from '../../styles/layout';

const slideIn = keyframes`
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
`;

export const DrawerHost = styled.dialog`
    position: fixed;
    inset: 0;
    width: min(100%, ${navigationContentWidth}px);
    height: 100dvh;
    max-width: none;
    max-height: none;
    margin: 0 auto;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    overflow: clip;

    &[open] { display: flex; justify-content: flex-end; }
    &::backdrop { background: rgb(0 0 0 / 0.16); }
`;

export const DrawerPanel = styled.div`
    display: flex;
    flex-direction: column;
    width: min(440px, 100%);
    height: 100%;
    min-height: 0;
    background: ${({ theme }) => theme.colors.background};
    border-left: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 18%, transparent);
    box-shadow: -12px 0 32px rgb(0 0 0 / 0.12);
    animation: ${slideIn} 220ms cubic-bezier(0.2, 0.7, 0.2, 1) both;

    @media (prefers-reduced-motion: reduce) { animation: none; }
`;

export const DrawerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-shrink: 0;
    padding: 1rem 1rem 1rem 1.5rem;
    border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 14%, transparent);
`;

export const DrawerTitle = styled.h2`
    margin: 0;
    min-width: 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    overflow-wrap: anywhere;
`;

export const DrawerBody = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 1.5rem;

    @media (max-width: 480px) { padding: 1.25rem; }
`;

export const DrawerCloseButton = styled.button`
    ${focusRing}
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    font-size: 1.75rem;
    cursor: pointer;

    &:hover { background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent); }
`;
