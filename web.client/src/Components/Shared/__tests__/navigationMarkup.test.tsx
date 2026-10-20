import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider, ServerStyleSheet } from 'styled-components';
import type { ReactNode } from 'react';
import i18n from '../../../i18n';
import { darkTheme, lightTheme } from '../../../styles/theme';
import Header from '../Header';
import MenuToggle from '../MenuToggle';
import PreferencesDrawer from '../../Settings/PreferencesDrawer';
import { NavLinks, RightSection, SocialLink } from '../Header.styles';
import GitHubIcon from '../../Icons/Github';
import LinkedInIcon from '../../Icons/Linkedin';

vi.mock('react-dom', () => ({ createPortal: (children: ReactNode) => children }));

afterEach(() => vi.unstubAllGlobals());

async function render(children: ReactNode, locale: 'en' | 'cs') {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}><ThemeProvider theme={darkTheme}>
            <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider></I18nextProvider>,
    );
}

describe('navigation markup', () => {
    it.each([darkTheme, lightTheme])('accents social icons on hover and focus without a background highlight', theme => {
        const sheet = new ServerStyleSheet();
        try {
            const html = renderToStaticMarkup(sheet.collectStyles(<ThemeProvider theme={theme}>
                <SocialLink href="https://github.com" aria-label="GitHub"><GitHubIcon /></SocialLink>
                <SocialLink href="https://www.linkedin.com" aria-label="LinkedIn"><LinkedInIcon /></SocialLink>
            </ThemeProvider>));
            const css = sheet.getStyleTags();
            expect(html.match(/fill="currentColor"/g)).toHaveLength(2);
            expect(css).toMatch(new RegExp(`:hover,[^{]*:focus-visible\\{color:${theme.colors.accent};\\}`));
            expect(css).not.toContain('background:');
            expect(css).toContain('outline:2px solid');
            expect(css).toContain('transition:color 0.2s ease');
            expect(css).toContain('prefers-reduced-motion');
        } finally { sheet.seal(); }
    });

    it.each([darkTheme, lightTheme])('keeps the disclosure background joined behind the top icons', theme => {
        const sheet = new ServerStyleSheet();
        try {
            renderToStaticMarkup(sheet.collectStyles(<ThemeProvider theme={theme}>
                <RightSection><NavLinks hidden>Navigation</NavLinks></RightSection>
            </ThemeProvider>));
            const css = sheet.getStyleTags();
            expect(css).toContain('position:relative;z-index:10');
            expect(css).toContain('top:-12px');
            expect(css).toContain('z-index:-1');
            expect(css).toContain('padding-top:5rem');
            expect(css).toContain('border:0;border-radius:0 0 1rem 1rem');
            expect(css).toContain('220px');
            expect(css).not.toContain('top:calc(100%');
            expect(css).not.toContain('0 12px 32px');
        } finally { sheet.seal(); }
    });

    it.each(['en', 'cs'] as const)('labels the %s navigation and controls hidden disclosures', async locale => {
        const html = await render(<Header />, locale);
        expect(html).toContain(`aria-label="${locale === 'cs' ? 'Hlavní navigace' : 'Main navigation'}"`);
        expect(html).toContain(`aria-label="${locale === 'cs' ? 'Otevřít navigaci' : 'Open navigation'}"`);
        expect(html.match(/aria-expanded="false"/g)).toHaveLength(2);
        expect(html.match(/hidden=""/g)).toHaveLength(2);
        expect(html).toMatch(/<button[^>]*aria-haspopup="dialog"/);
        expect(html).not.toContain('isOpen=');
    });

    it('connects a toggle to its disclosure and exposes the expanded state', async () => {
        const html = await render(<MenuToggle isOpen controls="navigation" aria-label="Close navigation" />, 'en');
        expect(html).toContain('aria-expanded="true"');
        expect(html).toContain('aria-controls="navigation"');
        expect(html).toContain('type="button"');
    });
});

describe('preferences drawer markup', () => {
    it('renders a labelled native dialog with an accessible close button, not a non-modal open attribute', async () => {
        vi.stubGlobal('document', { body: {}, head: { querySelector: () => null } });
        const html = await render(<PreferencesDrawer isOpen onClose={() => {}} labelledBy="preferences-title" title="Preferences"
            closeLabel="Close preferences" returnFocusRef={{ current: null }}>
            <p>Settings controls</p>
        </PreferencesDrawer>, 'en');
        expect(html).toMatch(/<dialog[^>]*aria-labelledby="preferences-title"/);
        expect(html).toContain('aria-label="Close preferences"');
        expect(html).toMatch(/<h2[^>]*id="preferences-title"[^>]*>Preferences<\/h2>/);
        expect(html.match(/id="preferences-title"/g)).toHaveLength(1);
        expect(html).not.toMatch(/<dialog[^>]*\bopen=/);
    });

    it('does not render a closed dialog', async () => {
        const html = await render(<PreferencesDrawer isOpen={false} onClose={() => {}} labelledBy="title" title="Preferences"
            closeLabel="Close" returnFocusRef={{ current: null }}>Hidden</PreferencesDrawer>, 'en');
        expect(html).toBe('');
    });

    it.each([darkTheme, lightTheme])('constrains the panel and preserves visible focus in either theme', theme => {
        vi.stubGlobal('document', { body: {}, head: { querySelector: () => null } });
        const sheet = new ServerStyleSheet();
        try {
            renderToStaticMarkup(sheet.collectStyles(<ThemeProvider theme={theme}>
                <PreferencesDrawer isOpen onClose={() => {}} labelledBy="title" title="Preferences"
                    closeLabel="Close" returnFocusRef={{ current: null }}>Settings controls</PreferencesDrawer>
            </ThemeProvider>));
            const css = sheet.getStyleTags();
            expect(css).toContain('440px');
            expect(css).toContain('1264px');
            expect(css).toContain(':focus-visible');
            expect(css).toContain('100dvh');
            expect(css).toContain('justify-content:flex-end');
            expect(css).toContain('overflow-y:auto');
            expect(css).toContain('min-height:0');
            expect(css).toContain('prefers-reduced-motion');
            expect(css).toContain('from{transform:translateY(-100%);}');
            expect(css).toContain('to{transform:translateY(0);}');
            expect(css).not.toContain('translateX');
            expect(css).not.toContain('backdrop-filter');
            expect(css).not.toContain('border-radius:8px');
        } finally { sheet.seal(); }
    });
});
