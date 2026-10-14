import styled from 'styled-components';
import { focusRing } from '../Shared/controlStyles';

export const SettingRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 14%, transparent);

    &:last-child { border-bottom: 0; }
    @media (max-width: 480px) { flex-wrap: wrap; }
`;

export const Label = styled.label`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5;
`;

export const SubLabel = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.8125rem;
    font-weight: 400;
`;

const SwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: 48px;
    height: 28px;
`;

const SwitchInput = styled.input`
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;

    &:checked + span { background: ${({ theme }) => theme.colors.accent}; }
    &:checked + span::before { transform: translateX(20px); }
    &:focus-visible + span { outline: 2px solid ${({ theme }) => theme.colors.text}; outline-offset: 3px; }
`;

const Slider = styled.span`
    position: absolute;
    inset: 0;
    border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 30%, transparent);
    border-radius: 28px;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    transition: background-color 0.2s ease;

    &::before {
        position: absolute;
        content: '';
        width: 20px;
        height: 20px;
        top: 3px;
        left: 3px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.text};
        transition: transform 0.2s ease;
    }

    @media (prefers-reduced-motion: reduce) {
        &, &::before { transition: none; }
    }
`;

export function ToggleSwitch({ id, checked, onChange }: { id: string; checked: boolean; onChange: () => void }) {
    return (
        <SwitchLabel>
            <SwitchInput id={id} type="checkbox" role="switch" checked={checked} onChange={onChange} />
            <Slider aria-hidden="true" />
        </SwitchLabel>
    );
}

const ColorControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
`;

const ColorValue = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
`;

const ColorInput = styled.input`
    ${focusRing}
    width: 44px;
    height: 32px;
    padding: 3px;
    border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 30%, transparent);
    border-radius: 6px;
    background: transparent;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper { padding: 0; }
    &::-webkit-color-swatch { border: 0; border-radius: 3px; }
    &::-moz-color-swatch { border: 0; border-radius: 3px; }
`;

export function ColorPicker({ id, value, onChange }: { id: string; value: string; onChange: (value: string) => void }) {
    return (
        <ColorControl>
            <ColorValue aria-hidden="true">{value.toUpperCase()}</ColorValue>
            <ColorInput id={id} type="color" value={value} onChange={event => onChange(event.target.value)} />
        </ColorControl>
    );
}
