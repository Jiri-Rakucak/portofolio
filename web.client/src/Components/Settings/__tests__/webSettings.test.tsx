import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { LanguageContext } from '../../../i18n/LanguageContext';
import { AppThemeProvider } from '../../../styles/ThemeProvider';
import WebSettings from '../WebSettings';
import { themeColorsStorageKey } from '../../../styles/themeColors';
import { themeStorageKey } from '../../../styles/themePreference';

afterEach(() => vi.unstubAllGlobals());

async function render(locale: 'en' | 'cs') {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: () => {}, toggleLocale: () => {} }}>
                <AppThemeProvider><WebSettings /></AppThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>,
    );
}

describe('preferences controls', () => {
    it.each(['en', 'cs'] as const)('renders correctly selected %s language without duplicating the drawer heading', async locale => {
        const html = await render(locale);
        expect(html).not.toContain('<h2');
        expect(html).toMatch(new RegExp(`lang="${locale}"[^>]*aria-pressed="true"`));
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
        expect(html).toContain(locale === 'cs' ? 'Obnovit barvy' : 'Reset colors');
        expect(html).not.toContain('Some changes may break');
        expect(html).not.toContain('rozbít UI');
    });

    it('associates every native input with its visible label', async () => {
        const html = await render('en');
        const ids = [...html.matchAll(/<input[^>]*id="([^"]+)"/g)].map(match => match[1]);
        expect(ids).toHaveLength(7);
        expect(new Set(ids).size).toBe(7);
        for (const id of ids) expect(html).toContain(`for="${id}"`);
        expect(html).toContain('role="radiogroup"');
        expect(html.match(/type="radio"/g)).toHaveLength(3);
        expect(html).toMatch(/type="radio"[^>]*checked=""[^>]*value="system"/);
        expect(html.match(/type="color"/g)).toHaveLength(4);
    });

    it.each(['en', 'cs'] as const)('labels the active color palette and reset scope in %s', async locale => {
        for (const theme of ['light', 'dark'] as const) {
            const saved: Record<string, string> = {
                [themeStorageKey]: theme,
                [themeColorsStorageKey]: JSON.stringify({ version: 1, [theme]: { accent: '#123abc' } }),
            };
            vi.stubGlobal('window', { localStorage: { getItem: (key: string) => saved[key] ?? null } });
            const html = await render(locale);
            expect(html).toContain(i18n.t(`settings.colors.title.${theme}`));
            expect(html).toContain(`aria-label="${i18n.t(`settings.resetLabel.${theme}`)}"`);
            expect(html).toMatch(/type="color"[^>]*value="#123ABC"/);
        }
    });
});
