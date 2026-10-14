import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { LanguageContext } from '../../../i18n/LanguageContext';
import { AppThemeProvider } from '../../../styles/ThemeProvider';
import WebSettings from '../WebSettings';

async function render(locale: 'en' | 'cs') {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: () => {}, toggleLocale: () => {} }}>
                <AppThemeProvider><WebSettings titleId="preferences-title" /></AppThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>,
    );
}

describe('preferences controls', () => {
    it.each(['en', 'cs'] as const)('renders a compact %s heading and correctly selected language', async locale => {
        const html = await render(locale);
        expect(html).toMatch(new RegExp(`<h2[^>]*id="preferences-title"[^>]*>${locale === 'cs' ? 'Nastavení' : 'Preferences'}</h2>`));
        expect(html).toMatch(new RegExp(`lang="${locale}"[^>]*aria-pressed="true"`));
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
        expect(html).toContain(locale === 'cs' ? 'Obnovit barvy' : 'Reset colors');
        expect(html).not.toContain('Some changes may break');
        expect(html).not.toContain('rozbít UI');
    });

    it('associates every native input with its visible label', async () => {
        const html = await render('en');
        const ids = [...html.matchAll(/<input[^>]*id="([^"]+)"/g)].map(match => match[1]);
        expect(ids).toHaveLength(5);
        expect(new Set(ids).size).toBe(5);
        for (const id of ids) expect(html).toContain(`for="${id}"`);
        expect(html).toContain('role="switch"');
        expect(html.match(/type="color"/g)).toHaveLength(4);
    });
});
