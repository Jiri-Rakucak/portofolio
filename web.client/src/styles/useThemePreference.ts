import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  getSystemTheme, persistThemePreference, readThemePreference, resolveTheme, subscribeToSystemTheme,
} from './themePreference';

const getServerTheme = () => 'dark' as const;

export function useThemePreference() {
  const [themePreference, setThemePreference] = useState(readThemePreference);
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme);
  const themeName = resolveTheme(themePreference, systemTheme);

  useEffect(() => {
    persistThemePreference(themePreference);
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.style.colorScheme = themeName;
  }, [themeName]);

  return { themePreference, setThemePreference, themeName };
}
