import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  editableColorKeys, persistThemeColors, readThemeColors, themeColorsReducer, themeColorsStorageKey,
  type ThemeColors,
} from '../themeColors';
import { themeStorageKey } from '../themePreference';

afterEach(() => vi.unstubAllGlobals());

const emptyColors = (): ThemeColors => ({ light: {}, dark: {} });

function storageFixture(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => { values.set(key, value); }),
    removeItem: vi.fn((key: string) => { values.delete(key); }),
  };
  vi.stubGlobal('window', { localStorage: storage });
  return { storage, values };
}

describe('per-theme color storage', () => {
  it('returns independent empty overrides without storage or a browser', () => {
    vi.stubGlobal('window', undefined);
    const colors = readThemeColors();
    expect(colors).toEqual(emptyColors());
    expect(colors.light).not.toBe(colors.dark);
    expect(() => persistThemeColors(colors)).not.toThrow();
    storageFixture();
    expect(readThemeColors()).toEqual(emptyColors());
  });

  it('round-trips separate palettes without changing the theme or language', () => {
    const { values } = storageFixture({ [themeStorageKey]: 'system', 'portfolio.locale': 'cs' });
    const colors: ThemeColors = {
      light: { accent: '#AABBCC', text: '#112233' },
      dark: { accent: '#DDEEFF', background: '#223344' },
    };
    persistThemeColors(colors);
    expect(JSON.parse(values.get(themeColorsStorageKey)!)).toEqual({ version: 1, ...colors });
    expect(readThemeColors()).toEqual(colors);
    expect(values.get(themeStorageKey)).toBe('system');
    expect(values.get('portfolio.locale')).toBe('cs');
  });

  it('whitelists editable keys and normalizes valid six-digit HEX values', () => {
    storageFixture({ [themeColorsStorageKey]: JSON.stringify({
      version: 1,
      light: { accent: '#abcDEF', surface: '#ffffff', text: 'red', backgroundSecondary: '#123456', extra: '#112233' },
      dark: { text: '#aabbcc', background: 'url(https://example.com)' },
    }) });
    expect(readThemeColors()).toEqual({
      light: { accent: '#ABCDEF', surface: '#FFFFFF' }, dark: { text: '#AABBCC' },
    });
  });

  it.each(['#abc', '#12345678', '123456', '#12345g', '#123456\n', null, 123, {}, []])(
    'ignores invalid persisted color values (%s)', value => {
      storageFixture({ [themeColorsStorageKey]: JSON.stringify({ version: 1, light: { accent: value }, dark: {} }) });
      expect(readThemeColors()).toEqual(emptyColors());
    },
  );

  it.each(['{', 'null', '[]', '"dark"', '{}', '{"version":2}', '{"version":"1"}'])(
    'falls back safely for malformed or unsupported data (%s)', raw => {
      storageFixture({ [themeColorsStorageKey]: raw });
      expect(readThemeColors()).toEqual(emptyColors());
    },
  );

  it('keeps valid entries in one theme when the other theme is malformed', () => {
    storageFixture({ [themeColorsStorageKey]: JSON.stringify({ version: 1, light: [], dark: { text: '#ABCDEF' } }) });
    expect(readThemeColors()).toEqual({ light: {}, dark: { text: '#ABCDEF' } });
  });

  it('removes only the color key after the final reset', () => {
    const { values, storage } = storageFixture({
      [themeColorsStorageKey]: JSON.stringify({ version: 1, dark: { text: '#ABCDEF' }, light: {} }),
      [themeStorageKey]: 'dark', 'portfolio.locale': 'en',
    });
    const reset = themeColorsReducer(readThemeColors(), { type: 'reset', theme: 'dark' });
    persistThemeColors(reset);
    expect(storage.removeItem).toHaveBeenCalledWith(themeColorsStorageKey);
    expect(values.has(themeColorsStorageKey)).toBe(false);
    expect(values.get(themeStorageKey)).toBe('dark');
    expect(values.get('portfolio.locale')).toBe('en');
  });

  it('handles blocked storage access without crashing', () => {
    vi.stubGlobal('window', { get localStorage() { throw new Error('Storage denied'); } });
    expect(readThemeColors()).toEqual(emptyColors());
    expect(() => persistThemeColors({ light: {}, dark: { accent: '#ABCDEF' } })).not.toThrow();
  });

  it('retains in-memory changes when writes or removals fail', () => {
    const { storage } = storageFixture();
    storage.setItem.mockImplementation(() => { throw new Error('Quota exceeded'); });
    storage.removeItem.mockImplementation(() => { throw new Error('Storage denied'); });
    const changed = themeColorsReducer(emptyColors(), { type: 'update', theme: 'light', key: 'accent', value: '#123456' });
    expect(() => persistThemeColors(changed)).not.toThrow();
    expect(changed.light.accent).toBe('#123456');
    expect(() => persistThemeColors(emptyColors())).not.toThrow();
  });
});

describe('per-theme color changes', () => {
  it.each(editableColorKeys)('updates %s only for the active palette without mutating the old state', key => {
    const state: ThemeColors = { light: { accent: '#111111' }, dark: { accent: '#222222' } };
    const changed = themeColorsReducer(state, { type: 'update', theme: 'light', key, value: '#ab1234' });
    expect(changed.light[key]).toBe('#AB1234');
    expect(changed.dark).toBe(state.dark);
    expect(state).toEqual({ light: { accent: '#111111' }, dark: { accent: '#222222' } });
  });

  it('keeps edits to both palettes across switching, reset, and reload', () => {
    storageFixture();
    let state = themeColorsReducer(emptyColors(), { type: 'update', theme: 'dark', key: 'background', value: '#112233' });
    state = themeColorsReducer(state, { type: 'update', theme: 'light', key: 'background', value: '#DDEEFF' });
    persistThemeColors(state);
    state = themeColorsReducer(readThemeColors(), { type: 'reset', theme: 'dark' });
    persistThemeColors(state);
    expect(readThemeColors()).toEqual({ light: { background: '#DDEEFF' }, dark: {} });
  });

  it('preserves the state for invalid or unchanged updates and an empty reset', () => {
    const state: ThemeColors = { light: { text: '#ABCDEF' }, dark: {} };
    expect(themeColorsReducer(state, { type: 'update', theme: 'light', key: 'text', value: '#abcdef' })).toBe(state);
    expect(themeColorsReducer(state, { type: 'update', theme: 'light', key: 'text', value: 'invalid' })).toBe(state);
    expect(themeColorsReducer(state, { type: 'reset', theme: 'dark' })).toBe(state);
  });
});
