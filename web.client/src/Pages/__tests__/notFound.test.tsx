import { afterEach, describe, expect, it, vi } from 'vitest';
import { isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createBrowserRouter, createMemoryRouter, matchRoutes, MemoryRouter, RouterProvider } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import i18n from '../../i18n';
import { LanguageContext } from '../../i18n/LanguageContext';
import { darkTheme, lightTheme } from '../../styles/theme';
import { createAppRouter } from '../../Routes/AppRoutes';
import MainLayout from '../../Layout/MainLayout';
import Page404 from '../404Page';

vi.mock('react-router', async importOriginal => {
    const actual = await importOriginal<typeof import('react-router')>();
    return { ...actual, createBrowserRouter: vi.fn() };
});

afterEach(() => vi.clearAllMocks());

function configuredRoutes() {
    createAppRouter(null, null);
    const calls = vi.mocked(createBrowserRouter).mock.calls;
    const call = calls[calls.length - 1];
    if (!call) throw new Error('The application router was not configured');
    return call[0];
}

function localized(children: ReactNode, locale: 'en' | 'cs') {
    return (
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: () => {}, toggleLocale: () => {} }}>
                <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>
    );
}

async function renderPage(locale: 'en' | 'cs') {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(localized(<MemoryRouter><Page404 /></MemoryRouter>, locale));
}

describe('not-found page', () => {
    it.each(['en', 'cs'] as const)('renders the %s message and explicit recovery links', async locale => {
        const html = await renderPage(locale);
        expect(html).toMatch(new RegExp(`<h1[^>]*>${locale === 'cs' ? 'Stránka nenalezena' : 'Page not found'}</h1>`));
        expect(html).toContain(locale === 'cs' ? 'Vrátit se domů' : 'Return home');
        expect(html).toContain(locale === 'cs' ? 'Prohlédnout projekty' : 'View projects');
        expect(html).toContain('href="/"');
        expect(html).toContain('href="/projects"');
        expect(html.match(/<a\b/g)).toHaveLength(2);
        expect(html.match(/<h1\b/g)).toHaveLength(1);
        expect(html).toContain('aria-labelledby=');
        expect(html).not.toContain('notFound.');
        expect(html).not.toContain('Click anywhere');
    });

    it.each([darkTheme, lightTheme])('uses bounded open content and visible action states in either theme', theme => {
        const sheet = new ServerStyleSheet();
        try {
            renderToStaticMarkup(sheet.collectStyles(<ThemeProvider theme={theme}>
                <MemoryRouter><Page404 /></MemoryRouter>
            </ThemeProvider>));
            const css = sheet.getStyleTags();
            expect(css).toContain('max-width:672px');
            expect(css).toContain('flex-wrap:wrap');
            expect(css).toContain(':focus-visible');
            expect(css).toContain('prefers-reduced-motion');
            expect(css).not.toContain('position:absolute');
            expect(css).not.toContain('height:100vh');
            expect(css).not.toMatch(/font-size:[^;]*vw/);
        } finally { sheet.seal(); }
    });
});

describe('not-found routing', () => {
    it.each(['en', 'cs'] as const)('renders an unknown direct-entry URL inside the public %s layout', async locale => {
        await i18n.changeLanguage(locale);
        const router = createMemoryRouter(configuredRoutes(), {
            initialEntries: ['/missing/nested/page?private=not-for-display#secret'],
        });
        try {
            const html = renderToStaticMarkup(localized(<RouterProvider router={router} />, locale));
            expect(html).toContain('<header');
            expect(html).toContain('<main');
            expect(html).toContain('<footer');
            expect(html).toContain(locale === 'cs' ? 'Stránka nenalezena' : 'Page not found');
            expect(html).not.toContain('not-for-display');
            expect(html).not.toContain('#secret');
            expect(router.state.location.pathname).toBe('/missing/nested/page');
            expect(router.state.errors).toBeNull();
        } finally { router.dispose(); }
    });

    it('keeps the fallback under MainLayout instead of duplicating the public shell', () => {
        const matches = matchRoutes(configuredRoutes(), '/unknown')!;
        const parent = matches[0].route.element;
        const fallback = matches[matches.length - 1].route.element;
        expect(isValidElement(parent) && parent.type).toBe(MainLayout);
        expect(isValidElement(fallback) && fallback.type).toBe(Page404);
    });

    it.each([
        ['/', '/'],
        ['/projects', '/projects'],
        ['/projects/ragsystem', '/projects/:projectId'],
        ['/projects/not-a-project', '/projects/:projectId'],
        ['/services/consulting', '/services/consulting'],
        ['/Services/Consulting', '/Services/Consulting'],
        ['/devos', '/devos'],
        ['/login', '/login'],
        ['/admin', '/admin'],
    ])('does not intercept existing route %s', (url, expectedPath) => {
        const matches = matchRoutes(configuredRoutes(), url)!;
        expect(matches[matches.length - 1]?.route.path).toBe(expectedPath);
    });
});
