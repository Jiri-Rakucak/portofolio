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
