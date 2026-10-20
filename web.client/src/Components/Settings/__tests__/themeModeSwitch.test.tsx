import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import i18n from '../../../i18n';
import { darkTheme, lightTheme } from '../../../styles/theme';
import { themePreferences } from '../../../styles/themePreference';
import ThemeModeSwitch from '../ThemeModeSwitch';

describe('three-position theme switch', () => {
  it.each(['en', 'cs'] as const)('labels the group and all choices in %s', async locale => {
    await i18n.changeLanguage(locale);
    const html = renderToStaticMarkup(<I18nextProvider i18n={i18n}>
      <ThemeProvider theme={darkTheme}>
        <ThemeModeSwitch value="system" onChange={vi.fn()} labelledBy="theme-label" />
      </ThemeProvider>
    </I18nextProvider>);
    expect(html).toContain('role="radiogroup" aria-labelledby="theme-label"');
    for (const preference of themePreferences) {
      expect(html).toContain(i18n.t(`settings.theme.${preference}`));
    }
    const names = [...html.matchAll(/<input[^>]*name="([^"]+)"/g)].map(match => match[1]);
    expect(names).toHaveLength(3);
    expect(new Set(names).size).toBe(1);
  });

  it.each(themePreferences)('selects exactly one native radio for %s', value => {
    const html = renderToStaticMarkup(<ThemeProvider theme={darkTheme}>
      <ThemeModeSwitch value={value} onChange={vi.fn()} labelledBy="theme-label" />
    </ThemeProvider>);
    expect(html.match(/checked=""/g)).toHaveLength(1);
    expect(html).toMatch(new RegExp(`type="radio"[^>]*checked=""[^>]*value="${value}"`));
  });

  it.each([lightTheme, darkTheme])('keeps detents, bounded sizing, focus, and reduced motion in either palette', theme => {
    const sheet = new ServerStyleSheet();
    try {
      renderToStaticMarkup(sheet.collectStyles(<ThemeProvider theme={theme}>
        <ThemeModeSwitch value="dark" onChange={vi.fn()} labelledBy="theme-label" />
      </ThemeProvider>));
      const css = sheet.getStyleTags();
      expect(css).toContain('width:210px;max-width:100%');
      expect(css).toContain('grid-template-columns:repeat(3, minmax(0, 1fr))');
      expect(css).toContain('width:5px;height:5px');
      expect(css).toContain('width:28px;height:28px;border-radius:50%');
      expect(css).toContain(`background:${theme.colors.accent}`);
      expect(css).toContain('inset:0 calc((100% - 8px) / 6 - 14px) auto');
      expect(css).toContain('left:calc(4px + (100% - 8px) / 6 * 5)');
      expect(css).toContain('isolation:isolate');
      expect(css).toContain('z-index:2;pointer-events:none');
      expect(css).toContain('z-index:1');
      expect(css).toContain('transform:translateX(-50%)');
      expect(css).toContain(':focus-visible');
      expect(css).toContain('prefers-reduced-motion');
    } finally { sheet.seal(); }
  });

  it.each(themePreferences)('centers the circular thumb on the %s detent', value => {
    const sheet = new ServerStyleSheet();
    try {
      renderToStaticMarkup(sheet.collectStyles(<ThemeProvider theme={darkTheme}>
        <ThemeModeSwitch value={value} onChange={vi.fn()} labelledBy="theme-label" />
      </ThemeProvider>));
      const stop = 2 * themePreferences.indexOf(value) + 1;
      expect(sheet.getStyleTags()).toContain(`left:calc(4px + (100% - 8px) / 6 * ${stop})`);
    } finally { sheet.seal(); }
  });
});
