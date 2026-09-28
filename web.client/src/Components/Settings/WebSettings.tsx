import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Text from '../Shared/Typography';
import { useAppTheme } from '../../styles/ThemeProvider';
import { SettingRow, Label, SubLabel, ToggleSwitch, ColorPicker } from './SettingsAtoms';
import type { Theme } from '../../styles/theme';
import { useLocale } from '../../i18n/useLocale';
import { locales, type Locale } from '../../i18n/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error}15;
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error};
  }
`;

const LanguageOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  min-width: 88px;
  padding: 0.55rem 0.8rem;
  border-radius: 6px;
  border: 1px solid ${({ $isActive, theme }) => $isActive ? theme.colors.accent : theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ $isActive, theme }) => $isActive ? theme.colors.accent + '33' : theme.colors.surface};
  cursor: pointer;
  font-weight: 700;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const WebSettings: React.FC = () => {
  const { t } = useTranslation('common');
  const { themeName, toggleTheme, theme, updateColor, resetTheme } = useAppTheme();
  const { locale, setLocale } = useLocale();

  const editableColors: { key: keyof Theme['colors']; label: string; desc: string }[] = [
    { key: 'accent', label: t('settings.colors.accent.label'), desc: t('settings.colors.accent.description') },
    { key: 'background', label: t('settings.colors.background.label'), desc: t('settings.colors.background.description') },
    { key: 'surface', label: t('settings.colors.surface.label'), desc: t('settings.colors.surface.description') },
    { key: 'text', label: t('settings.colors.text.label'), desc: t('settings.colors.text.description') },
  ];

  return (
    <Container>
      <div style={{ marginBottom: '1.5rem' }}>
        <Text variant="h2">{t('settings.title')}</Text>
        <Text variant="bodyS">
          {t('settings.intro')}
        </Text>
        <Text variant="bodyS">
          {t('settings.warning')}
        </Text>
      </div>

      <SettingRow>
        <Label>
          {t('settings.darkMode.label')}
          <SubLabel>{t('settings.darkMode.description')}</SubLabel>
          <SubLabel>{t('settings.darkMode.warning')}</SubLabel>
        </Label>
        <ToggleSwitch checked={themeName === 'dark'} onChange={toggleTheme} />
      </SettingRow>

      <SettingRow>
        <Label>
          {t('settings.language.label')}
          <SubLabel>{t('settings.language.description')}</SubLabel>
        </Label>
        <LanguageOptions>
          {locales.map((language: Locale) => (
            <LanguageButton
              key={language}
              type="button"
              $isActive={locale === language}
              onClick={() => setLocale(language)}
            >
              {t(`settings.language.${language}`)}
            </LanguageButton>
          ))}
        </LanguageOptions>
      </SettingRow>

      <div style={{ marginTop: '1rem' }}>
        <Text variant="h4">{t('settings.colors.title')}</Text>
        {editableColors.map((item) => (
          <SettingRow key={item.key}>
            <Label>
              {item.label}
              <SubLabel>{item.desc}</SubLabel>
            </Label>
            <ColorPicker 
              value={theme.colors[item.key]} 
              onChange={(val) => updateColor(item.key, val)} 
            />
          </SettingRow>
        ))}
      </div>

      <Button onClick={resetTheme}>{t('settings.reset')}</Button>
    </Container>
  );
};

export default WebSettings;
