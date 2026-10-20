import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getSystemTheme, isThemePreference, persistThemePreference, readThemePreference,
  resolveTheme, subscribeToSystemTheme, themePreferences, themeStorageKey,
} from '../themePreference';

afterEach(() => vi.unstubAllGlobals());

function storageFixture(values: Record<string, string> = {}) {
  const storage = {
    getItem: vi.fn((key: string) => values[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { values[key] = value; }),
  };
  vi.stubGlobal('window', { localStorage: storage });
  return storage;
}

describe('theme preference storage', () => {
  it('defaults to system without a browser or saved choice', () => {
    vi.stubGlobal('window', undefined);
    expect(readThemePreference()).toBe('system');
    storageFixture();
    expect(readThemePreference()).toBe('system');
  });

  it.each(themePreferences)('restores and persists the %s preference', preference => {
    const storage = storageFixture({ [themeStorageKey]: preference });
    expect(readThemePreference()).toBe(preference);
    persistThemePreference(preference);
    expect(storage.setItem).toHaveBeenCalledWith('portfolio.theme', preference);
  });

  it.each(['', 'auto', 'LIGHT', '{"theme":"dark"}'])('ignores invalid stored values (%s)', value => {
    storageFixture({ [themeStorageKey]: value });
    expect(isThemePreference(value)).toBe(false);
    expect(readThemePreference()).toBe('system');
  });

  it('accepts a valid legacy preference only when the new key is absent', () => {
    storageFixture({ theme: 'light' });
    expect(readThemePreference()).toBe('light');
    persistThemePreference('dark');
    expect(readThemePreference()).toBe('dark');
  });

  it('does not crash when accessing storage itself is blocked', () => {
    vi.stubGlobal('window', { get localStorage() { throw new Error('Storage denied'); } });
    expect(readThemePreference()).toBe('system');
    expect(() => persistThemePreference('light')).not.toThrow();
  });

  it('does not crash when writing storage fails', () => {
    const storage = storageFixture();
    storage.setItem.mockImplementation(() => { throw new Error('Quota exceeded'); });
    expect(() => persistThemePreference('dark')).not.toThrow();
  });
});

describe('system theme synchronization', () => {
  it('reacts to browser preference changes and removes the listener on cleanup', () => {
    const listeners = new Set<() => void>();
    const query = {
      matches: true,
      addEventListener: vi.fn((_event: string, listener: () => void) => listeners.add(listener)),
      removeEventListener: vi.fn((_event: string, listener: () => void) => listeners.delete(listener)),
    };
    const matchMedia = vi.fn(() => query);
    vi.stubGlobal('window', { matchMedia });
    const onChange = vi.fn(() => getSystemTheme());
    const unsubscribe = subscribeToSystemTheme(onChange);

    expect(getSystemTheme()).toBe('dark');
    expect(matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    query.matches = false;
    listeners.forEach(listener => listener());
    expect(onChange).toHaveReturnedWith('light');
    query.matches = true;
    listeners.forEach(listener => listener());
    expect(onChange).toHaveLastReturnedWith('dark');

    unsubscribe();
    expect(query.removeEventListener).toHaveBeenCalledWith('change', onChange);
    expect(listeners.size).toBe(0);
  });

  it.each([undefined, {}])('has a stable fallback without matchMedia (%s)', browser => {
    vi.stubGlobal('window', browser);
    expect(getSystemTheme()).toBe('dark');
    expect(() => subscribeToSystemTheme(vi.fn())()).not.toThrow();
  });

  it.each(['light', 'dark'] as const)('uses the %s browser scheme only in system mode', system => {
    expect(resolveTheme('system', system)).toBe(system);
    expect(resolveTheme('light', system)).toBe('light');
    expect(resolveTheme('dark', system)).toBe('dark');
  });
});
