import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import i18n from '../../i18n';
import { LanguageContext } from '../../i18n/LanguageContext';
import { contact } from '../../content/contact';
import { darkTheme } from '../../styles/theme';
import Footer from '../../Components/Shared/Footer';
import Header from '../../Components/Shared/Header';
import ServicePage from '../ServicesPages/ServicePage';

const render = async (children: ReactNode, locale: 'en' | 'cs' = 'en') => {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: () => {}, toggleLocale: () => {} }}>
                <ThemeProvider theme={darkTheme}><MemoryRouter>{children}</MemoryRouter></ThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>,
    );
};

describe('public contact information', () => {
    it.each(['en', 'cs'] as const)('renders real email and dial links with a localized %s location', async locale => {
        const html = await render(<Footer />, locale);

        expect(html).toContain(`href="mailto:${contact.email}"`);
        expect(html).toContain(`href="tel:${contact.phone}"`);
        expect(html).toContain(contact.phoneDisplay);
        expect(html).toContain(locale === 'cs' ? 'Liberec, Česká republika' : 'Liberec, Czech Republic');
        expect(html).not.toContain('{{city}}');
    });

    it('uses the corrected GitHub profile and encoded LinkedIn URL across public contact links', async () => {
        expect(contact.githubUrl).toBe('https://github.com/Jiri-Rakucak');
        for (const component of [<Header />, <Footer />, <ServicePage />]) {
            const html = await render(component);

            expect(html).toContain(`href="${contact.linkedinUrl}"`);
            expect(html).toContain(`href="${contact.githubUrl}"`);
            expect(html).not.toContain('href="https://github.com/jirirakucak"');
            expect(html).not.toContain('linkedin.com/in/jirirakucak');
        }
    });

    it('does not expose sample contacts or dead footer links', async () => {
        const html = await render(<Footer />);

        expect(html).not.toContain('123 456 789');
        expect(html).not.toContain('jiri@rakucak.cz');
        expect(html).not.toContain('href="#"');
        expect(html).toContain('aria-label="LinkedIn"');
        expect(html).toContain('aria-label="GitHub"');
    });

    it.each(['en', 'cs'] as const)('interpolates the same contacts into the %s terminal message', async locale => {
        await i18n.changeLanguage(locale);
        const output = i18n.t('terminal.contact', { ns: 'devos', ...contact });

        expect(output).toContain(contact.email);
        expect(output).toContain(contact.phoneDisplay);
        expect(output).toContain(contact.linkedinUrl);
        expect(output).toContain(contact.githubUrl);
        expect(output).not.toContain('{{');
    });
});
