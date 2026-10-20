import { useId } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { themePreferences, type ThemePreference } from '../../styles/themePreference';

const Options = styled.div`
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 210px;
    max-width: 100%;
    flex-shrink: 0;
    padding: 4px;
`;

const Track = styled.div`
    position: absolute;
    /* Leave the same 3px clearance around the thumb at either end. */
    inset: 0 calc((100% - 8px) / 6 - 14px) auto;
    z-index: 0;
    height: 36px;
    border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 25%, transparent);
    border-radius: 18px;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    pointer-events: none;

`;

const Thumb = styled.div<{ $index: number }>`
    position: absolute;
    z-index: 2;
    pointer-events: none;
    top: 4px;
    left: calc(4px + (100% - 8px) / 6 * ${({ $index }) => 2 * $index + 1});
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    transform: translateX(-50%);
    transition: left 180ms ease;

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const Choice = styled.label`
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 28px 28px;
    justify-items: center;
    align-items: center;
    min-width: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.75rem;
    line-height: 1.3;
    text-align: center;
    cursor: pointer;
`;

const Radio = styled.input`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;

    &:checked ~ span { color: ${({ theme }) => theme.colors.text}; font-weight: 600; }
    &:checked + span { background: ${({ theme }) => theme.colors.background}; }
    &:focus-visible ~ span:last-child { outline: 2px solid ${({ theme }) => theme.colors.text}; outline-offset: 3px; }
    &:hover:not(:checked) + span { background: ${({ theme }) => theme.colors.text}; }
`;

const Stop = styled.span`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
`;

type ThemeModeSwitchProps = {
    value: ThemePreference;
    onChange: (value: ThemePreference) => void;
    labelledBy: string;
};

export default function ThemeModeSwitch({ value, onChange, labelledBy }: ThemeModeSwitchProps) {
    const { t } = useTranslation('common');
    const name = useId();

    return (
        <Options role="radiogroup" aria-labelledby={labelledBy}>
            <Track aria-hidden="true" />
            <Thumb $index={themePreferences.indexOf(value)} aria-hidden="true" />
            {themePreferences.map(preference => (
                <Choice key={preference} htmlFor={`${name}-${preference}`}>
                    <Radio id={`${name}-${preference}`} name={name} type="radio" value={preference}
                        checked={value === preference} onChange={() => onChange(preference)} />
                    <Stop aria-hidden="true" />
                    <span>{t(`settings.theme.${preference}`)}</span>
                </Choice>
            ))}
        </Options>
    );
}
