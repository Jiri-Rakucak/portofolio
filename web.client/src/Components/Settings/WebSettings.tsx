import { useId } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../styles/ThemeProvider';
import { SettingRow, Label, SubLabel, ColorPicker } from './SettingsAtoms';
import ThemeModeSwitch from './ThemeModeSwitch';
import { focusRing } from '../Shared/controlStyles';
import { editableColorKeys } from '../../styles/themeColors';
import { useLocale } from '../../i18n/useLocale';
import { locales } from '../../i18n/types';
import { ActionButton } from '../Shared/Actions';

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

const ResetButton = styled(ActionButton).attrs({ $variant: 'secondary' })`
    align-self: flex-start;
    font-size: 0.875rem;
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
    const { themeName, themePreference, setThemePreference, theme, updateColor, resetTheme } = useAppTheme();
    const { locale, setLocale } = useLocale();
    const controlId = useId();
    const languageLabelId = useId();
    const themeLabelId = useId();
    const colorsTitleId = useId();

    return (
        <Container>
            <div>
                <SettingRow>
                    <Label as="span" id={themeLabelId}>{t('settings.theme.label')}</Label>
                    <ThemeModeSwitch value={themePreference} onChange={setThemePreference} labelledBy={themeLabelId} />
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
                <SectionTitle id={colorsTitleId}>{t(`settings.colors.title.${themeName}`)}</SectionTitle>
                {editableColorKeys.map(key => (
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
            <ResetButton type="button" onClick={resetTheme} aria-label={t(`settings.resetLabel.${themeName}`)}>
                {t('settings.reset')}
            </ResetButton>
        </Container>
    );
}
