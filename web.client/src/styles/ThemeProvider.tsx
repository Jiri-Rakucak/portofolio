import React, { createContext, useEffect, useReducer, useMemo, useContext } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import type { Theme } from './theme';
import { GlobalStyles } from './globalStyles';
import { useThemePreference } from './useThemePreference';
import type { ThemeName, ThemePreference } from './themePreference';
import { persistThemeColors, readThemeColors, themeColorsReducer, type EditableColorKey } from './themeColors';

interface AppThemeContextProps {
  themeName: ThemeName;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  theme: Theme;
  updateColor: (key: EditableColorKey, value: string) => void;
  resetTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeName, themePreference, setThemePreference } = useThemePreference();
  const [customColors, dispatchColors] = useReducer(themeColorsReducer, undefined, readThemeColors);

  useEffect(() => {
    persistThemeColors(customColors);
  }, [customColors]);

  const updateColor = (key: EditableColorKey, value: string) => {
    dispatchColors({ type: 'update', theme: themeName, key, value });
  };

  const resetTheme = () => {
    dispatchColors({ type: 'reset', theme: themeName });
  };

  const theme = useMemo(() => {
    const baseTheme = themeName === 'light' ? lightTheme : darkTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...customColors[themeName],
      },
    };

  }, [themeName, customColors]);

  return (
    <AppThemeContext.Provider value={{ themeName, themePreference, setThemePreference, theme, updateColor, resetTheme }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </StyledThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = (): AppThemeContextProps => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
