import { useId } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../styles/ThemeProvider';
import { SettingRow, Label, SubLabel, ToggleSwitch, ColorPicker } from './SettingsAtoms';
import { focusRing } from '../Shared/controlStyles';
import type { Theme } from '../../styles/theme';
import { useLocale } from '../../i18n/useLocale';
import { locales } from '../../i18n/types';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const SectionTitle = styled.h3`
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const ResetButton = styled.button`
    ${focusRing}
    align-self: flex-start;
    padding: 0.6rem 0.9rem;
    border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 25%, transparent);
    border-radius: 6px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    font-size: 0.875rem;
    cursor: pointer;

    &:hover { background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent); }
`;

const LanguageOptions = styled.div`
    display: flex;
    flex-shrink: 0;
    padding: 3px;
    gap: 3px;
    border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 20%, transparent);
    border-radius: 6px;
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
    ${focusRing}
    min-width: 80px;
    min-height: 36px;
    padding: 0.4rem 0.6rem;
    border: 0;
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ $isActive, theme }) => $isActive
        ? `color-mix(in srgb, ${theme.colors.text} 14%, transparent)` : 'transparent'};
    cursor: pointer;
    font: inherit;
    font-size: 0.8125rem;
    font-weight: ${({ $isActive }) => $isActive ? 600 : 400};

    &:hover { background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 20%, transparent); }
`;

export default function WebSettings() {
    const { t } = useTranslation('common');
    const { themeName, toggleTheme, theme, updateColor, resetTheme } = useAppTheme();
    const { locale, setLocale } = useLocale();
    const controlId = useId();
    const languageLabelId = useId();
    const colorsTitleId = useId();
    const editableColors: (keyof Theme['colors'])[] = ['accent', 'background', 'surface', 'text'];

    return (
        <Container>
            <div>
                <SettingRow>
                    <Label htmlFor={`${controlId}-theme`}>{t('settings.darkMode.label')}</Label>
                    <ToggleSwitch id={`${controlId}-theme`} checked={themeName === 'dark'} onChange={toggleTheme} />
                </SettingRow>
                <SettingRow>
                    <Label as="span" id={languageLabelId}>{t('settings.language.label')}</Label>
                    <LanguageOptions role="group" aria-labelledby={languageLabelId}>
                        {locales.map(language => (
                            <LanguageButton key={language} type="button" lang={language}
                                aria-pressed={locale === language} $isActive={locale === language}
                                onClick={() => setLocale(language)}>
                                {t(`settings.language.${language}`)}
                            </LanguageButton>
                        ))}
                    </LanguageOptions>
                </SettingRow>
            </div>
            <section aria-labelledby={colorsTitleId}>
                <SectionTitle id={colorsTitleId}>{t('settings.colors.title')}</SectionTitle>
                {editableColors.map(key => (
                    <SettingRow key={key}>
                        <Label htmlFor={`${controlId}-${key}`}>
                            {t(`settings.colors.${key}.label`)}
                            <SubLabel>{t(`settings.colors.${key}.description`)}</SubLabel>
                        </Label>
                        <ColorPicker id={`${controlId}-${key}`} value={theme.colors[key]}
                            onChange={value => updateColor(key, value)} />
                    </SettingRow>
                ))}
            </section>
            <ResetButton type="button" onClick={resetTheme}>{t('settings.reset')}</ResetButton>
        </Container>
    );
}
