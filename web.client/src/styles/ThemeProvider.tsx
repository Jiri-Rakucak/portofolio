import React, { createContext, useState, useMemo, useContext } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import type { Theme } from './theme';
import { GlobalStyles } from './globalStyles';

type ThemeOverrides = Partial<Theme['colors']>;
interface AppThemeContextProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
  theme: Theme;
  updateColor: (key: keyof Theme['colors'],  value: string) => void;
  resetTheme: () => void;
}

// Vytvoření kontextu
const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark'); // Výchozí je tmavý
  const [customColors, setCustomColors] = useState<ThemeOverrides>({});
  const toggleTheme = () => {
    setThemeName(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const updateColor = (key: keyof Theme['colors'], value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetTheme = () => {
    setCustomColors({});
  };

  const theme = useMemo(() => {
    const baseTheme = themeName === 'light' ? lightTheme : darkTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...customColors,
      },
    };

  }, [themeName, customColors]);

  return (
    <AppThemeContext.Provider value={{ themeName, toggleTheme, theme, updateColor, resetTheme  }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </StyledThemeProvider>
    </AppThemeContext.Provider>
  );
};

// Custom hook pro snadný přístup k hodnotám z kontextu
export const useAppTheme = (): AppThemeContextProps => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
