import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppThemeProvider, useAppTheme } from '../ThemeProvider';
import { darkTheme, lightTheme } from '../theme';
import { themeColorsStorageKey } from '../themeColors';
import { themeStorageKey } from '../themePreference';

afterEach(() => vi.unstubAllGlobals());

function Probe() {
  const { themeName, themePreference, theme } = useAppTheme();
  return <output data-preference={themePreference} data-theme={themeName}
    data-background={theme.colors.background} data-accent={theme.colors.accent} data-text={theme.colors.text} />;
}

describe('theme provider initialization', () => {
  it('defaults to automatic mode with a deterministic server fallback', () => {
    vi.stubGlobal('window', undefined);
    const html = renderToStaticMarkup(<AppThemeProvider><Probe /></AppThemeProvider>);
    expect(html).toContain('data-preference="system"');
    expect(html).toContain('data-theme="dark"');
    expect(html).toContain(`data-background="${darkTheme.colors.background}"`);
  });

  it.each(['light', 'dark'] as const)('applies the saved %s choice to the actual palette', preference => {
    vi.stubGlobal('window', { localStorage: { getItem: () => preference } });
    const html = renderToStaticMarkup(<AppThemeProvider><Probe /></AppThemeProvider>);
    const palette = preference === 'light' ? lightTheme : darkTheme;
    expect(html).toContain(`data-preference="${preference}"`);
    expect(html).toContain(`data-theme="${preference}"`);
    expect(html).toContain(`data-background="${palette.colors.background}"`);
  });

  it.each(['light', 'dark', 'system'] as const)('merges only the resolved palette overrides for %s', preference => {
    const stored: Record<string, string> = {
      [themeStorageKey]: preference,
      [themeColorsStorageKey]: JSON.stringify({
        version: 1,
        light: { accent: '#aa1122', background: '#eeffee' },
        dark: { accent: '#bb2233', background: '#112211' },
      }),
    };
    vi.stubGlobal('window', { localStorage: { getItem: (key: string) => stored[key] ?? null } });
    const html = renderToStaticMarkup(<AppThemeProvider><Probe /></AppThemeProvider>);
    const isLight = preference === 'light';
    expect(html).toContain(`data-accent="${isLight ? '#AA1122' : '#BB2233'}"`);
    expect(html).toContain(`data-background="${isLight ? '#EEFFEE' : '#112211'}"`);
    expect(html).toContain(`data-text="${(isLight ? lightTheme : darkTheme).colors.text}"`);
    expect(html).toContain(`data-preference="${preference}"`);
  });
});
