export const themePreferences = ['system', 'light', 'dark'] as const;
export type ThemePreference = typeof themePreferences[number];
export type ThemeName = Exclude<ThemePreference, 'system'>;
export const themeStorageKey = 'portfolio.theme';
const systemThemeQuery = '(prefers-color-scheme: dark)';

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function readThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(themeStorageKey) ?? window.localStorage.getItem('theme');
    return isThemePreference(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function persistThemePreference(preference: ThemePreference): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(themeStorageKey, preference);
  } catch {
    // Theme selection still works when browser storage is blocked.
  }
}

export function getSystemTheme(): ThemeName {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'dark';
  return window.matchMedia(systemThemeQuery).matches ? 'dark' : 'light';
}

export function subscribeToSystemTheme(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const query = window.matchMedia(systemThemeQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function resolveTheme(preference: ThemePreference, systemTheme: ThemeName): ThemeName {
  return preference === 'system' ? systemTheme : preference;
}
