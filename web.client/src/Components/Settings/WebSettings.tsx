import React from 'react';
import styled from 'styled-components';
import Text from '../Shared/Typography';
import { useAppTheme } from '../../styles/ThemeProvider';
import { SettingRow, Label, SubLabel, ToggleSwitch, ColorPicker } from './SettingsAtoms';
import type { Theme } from '../../styles/theme';

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

const WebSettings: React.FC = () => {
  const { themeName, toggleTheme, theme, updateColor, resetTheme } = useAppTheme();

  // Seznam barev, které chceme umožnit měnit
  const editableColors: { key: keyof Theme['colors']; label: string; desc: string }[] = [
    { key: 'accent', label: 'Accent Color', desc: 'Main highlight color for buttons and links' },
    { key: 'background', label: 'Background Color', desc: 'Main page background' },
    { key: 'surface', label: 'Surface Color', desc: 'Background for cards and modals' },
    { key: 'text', label: 'Text Color', desc: 'Primary text color' },
  ];

  return (
    <Container>
      <div style={{ marginBottom: '1.5rem' }}>
        <Text variant="h2">Preferences</Text>
        <Text variant="bodyS">
          Customize the look and feel of the website.
        </Text>
        <Text variant="bodyS">
           Some chnages may broke the UI. In that case, use the reset button below.
        </Text>
      </div>

      <SettingRow>
        <Label>
          Dark Mode
          <SubLabel>Switch between light and dark theme</SubLabel>
          <SubLabel>This may affect the visibility of some UI elements.</SubLabel>
        </Label>
        <ToggleSwitch checked={themeName === 'dark'} onChange={toggleTheme} />
      </SettingRow>

      <div style={{ marginTop: '1rem' }}>
        <Text variant="h4">Colors</Text>
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

      <Button onClick={resetTheme}>Reset to Defaults</Button>
    </Container>
  );
};

export default WebSettings;