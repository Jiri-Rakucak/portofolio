import styled, { css } from 'styled-components';
import { Link } from 'react-router';
import { actionForeground } from './actionContrast';

export type ActionVariant = 'primary' | 'secondary' | 'link' | 'icon';
type ActionProps = { $variant?: ActionVariant; $onMedia?: boolean };

const actionStyles = css<ActionProps>`
    --action-text: ${({ theme }) => theme.colors.text};
    --action-on-text: ${({ theme }) => actionForeground(theme.colors.text)};
    ${({ $onMedia }) => $onMedia && css`
        @media (min-width: 901px) {
            --action-text: #ffffff;
            --action-on-text: #000000;
        }
    `}
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    min-width: 0;
    min-height: 48px;
    max-width: 100%;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 6px;
    font: inherit;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    overflow-wrap: anywhere;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    svg { flex-shrink: 0; }

    ${({ $variant = 'primary', theme }) => $variant === 'primary' ? css`
        background: ${theme.colors.accent};
        border-color: ${theme.colors.accent};
        color: ${actionForeground(theme.colors.accent)};
        &:hover, &:focus-visible {
            background: ${theme.colors.text};
            color: ${actionForeground(theme.colors.text)};
            border-color: ${theme.colors.text};
        }
    ` : $variant === 'secondary' ? css`
        background: transparent;
        border-color: currentColor;
        color: var(--action-text);
        &:hover, &:focus-visible {
            background: var(--action-text);
            color: var(--action-on-text);
            border-color: var(--action-text);
        }
    ` : $variant === 'link' ? css`
        min-height: 44px;
        padding: 0.5rem 0;
        background: transparent;
        color: ${theme.colors.accent};
        justify-content: flex-start;
        text-align: start;
        &:hover, &:focus-visible {
            color: ${theme.colors.text};
            text-decoration: underline;
            text-underline-offset: 5px;
            border-color: transparent;
        }
    ` : css`
        flex: 0 0 44px;
        width: 44px;
        height: 44px;
        min-height: 44px;
        padding: 0;
        background: transparent;
        color: var(--action-text);
        &:hover, &:focus-visible {
            color: ${theme.colors.accent};
            border-color: transparent;
        }
    `}

    &:focus:not(:focus-visible) { outline: none; }
    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.accent};
        outline-offset: 4px;
    }
    &:disabled {
        opacity: 0.35;
        cursor: default;
        pointer-events: none;
    }
    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

// Keep navigation and commands as distinct, natively typed elements.
export const ActionLink = styled(Link)<ActionProps>`${actionStyles}`;
export const ActionAnchor = styled.a<ActionProps>`${actionStyles}`;
export const ActionButton = styled.button.attrs({ type: 'button' })<ActionProps>`${actionStyles}`;
export const PrimaryLink = styled(ActionLink).attrs({ $variant: 'primary' })``;
export const SecondaryLink = styled(ActionLink).attrs({ $variant: 'secondary' })``;
export const TextLink = styled(ActionLink).attrs({ $variant: 'link' })``;
export const IconButton = styled(ActionButton).attrs({ $variant: 'icon' })``;
export const IconLink = styled(ActionAnchor).attrs({ $variant: 'icon' })``;
