import type { Theme } from './theme';
import type { ThemeName } from './themePreference';

export const editableColorKeys = ['accent', 'background', 'surface', 'text'] as const satisfies readonly (keyof Theme['colors'])[];
export type EditableColorKey = typeof editableColorKeys[number];
export type ColorOverrides = Partial<Record<EditableColorKey, string>>;
export type ThemeColors = Record<ThemeName, ColorOverrides>;
export const themeColorsStorageKey = 'portfolio.colors';

const emptyThemeColors = (): ThemeColors => ({ light: {}, dark: {} });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeColor(value: unknown): string | undefined {
  return typeof value === 'string' && value.length === 7 && /^#[0-9a-f]{6}$/i.test(value)
    ? value.toUpperCase()
    : undefined;
}

function parseOverrides(value: unknown): ColorOverrides {
  const overrides: ColorOverrides = {};
  if (!isRecord(value)) return overrides;
  for (const key of editableColorKeys) {
    const color = normalizeColor(value[key]);
    if (color) overrides[key] = color;
  }
  return overrides;
}

export function readThemeColors(): ThemeColors {
  if (typeof window === 'undefined') return emptyThemeColors();
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(themeColorsStorageKey) ?? 'null');
    if (!isRecord(saved) || saved.version !== 1) return emptyThemeColors();
    return { light: parseOverrides(saved.light), dark: parseOverrides(saved.dark) };
  } catch {
    return emptyThemeColors();
  }
}

export function persistThemeColors(colors: ThemeColors): void {
  if (typeof window === 'undefined') return;
  try {
    if (!Object.keys(colors.light).length && !Object.keys(colors.dark).length) {
      window.localStorage.removeItem(themeColorsStorageKey);
    } else {
      window.localStorage.setItem(themeColorsStorageKey, JSON.stringify({ version: 1, ...colors }));
    }
  } catch {
    // Color changes still work in memory when browser storage is unavailable.
  }
}

type ThemeColorsAction =
  | { type: 'update'; theme: ThemeName; key: EditableColorKey; value: string }
  | { type: 'reset'; theme: ThemeName };

export function themeColorsReducer(state: ThemeColors, action: ThemeColorsAction): ThemeColors {
  if (action.type === 'reset') {
    return Object.keys(state[action.theme]).length ? { ...state, [action.theme]: {} } : state;
  }

  const color = normalizeColor(action.value);
  if (!editableColorKeys.some(key => key === action.key) || !color || state[action.theme][action.key] === color) return state;
  return { ...state, [action.theme]: { ...state[action.theme], [action.key]: color } };
}
