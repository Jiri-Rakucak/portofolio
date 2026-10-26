import { renderToStaticMarkup } from 'react-dom/server';
import { createMemoryRouter, RouterProvider, useParams } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';
import i18n from '../../i18n';
import { LanguageContext } from '../../i18n/LanguageContext';
import { darkTheme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/globalStyles';
import { pageTransitionDuration } from '../../styles/pageTransitions';
import { getServices, getFeaturedServices } from '../../content/services';
import MainLayout from '../../Layout/MainLayout';
import HomeLayout from '../../Components/Desktop/DesktopHomeLayout';
import ServicePage from '../ServicesPages/ServicePage';
import ServiceDetailPage from '../ServicesPages/ServiceDetailPage';

function ServiceRoute() {
    const { serviceId = '' } = useParams();
    return <ServiceDetailPage serviceId={serviceId} />;
}

async function render(path: string, locale: 'en' | 'cs') {
    await i18n.changeLanguage(locale);
    const router = createMemoryRouter([{ element: <MainLayout />, children: [
        { path: '/', element: <HomeLayout /> },
        { path: '/services', element: <ServicePage /> },
        { path: '/services/:serviceId', element: <ServiceRoute /> },
    ] }], { initialEntries: [path] });
    const sheet = new ServerStyleSheet();
    try {
        const html = renderToStaticMarkup(sheet.collectStyles(
            <I18nextProvider i18n={i18n}>
                <LanguageContext.Provider value={{ locale, setLocale: () => {}, toggleLocale: () => {} }}>
                    <ThemeProvider theme={darkTheme}>
                        <GlobalStyles theme={darkTheme} />
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </LanguageContext.Provider>
            </I18nextProvider>,
        ));
        return { html, css: sheet.getStyleTags() };
    } finally { sheet.seal(); router.dispose(); }
}

function namedTitles(html: string, css: string) {
    return [...css.matchAll(/\.([\w-]+)\{view-transition-name:([^;]+);/g)]
        .filter(([, , name]) => name.startsWith('title-'))
        .map(([, className, name]) => {
            const spans = [...html.matchAll(new RegExp(`<span[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/span>`, 'g'))];
            expect(spans).toHaveLength(1);
            return { name, text: spans[0][1] };
        });
}

describe('public page transitions', () => {
    it('fades only the main region in 200ms without sliding or scaling the shell', async () => {
        const { html, css } = await render('/services', 'en');
        for (const element of ['header', 'footer']) {
            const shellClass = css.match(new RegExp(`\\.([\\w-]+)\\{view-transition-name:portfolio-${element};`))?.[1];
            expect(shellClass).toBeTruthy();
            expect(html).toMatch(new RegExp(`<${element} class="[^"]*${shellClass}[^"]*"`));
        }
        expect(pageTransitionDuration).toBe('200ms');
        expect(css).toContain('animation:portfolio-page-out 200ms ease-out both');
        expect(css).toContain('animation:portfolio-page-in 200ms ease-out both');
        expect(css).toContain('::view-transition-group(portfolio-footer){animation:none;}');
        expect(css).toContain('::view-transition-old(root){animation:portfolio-page-out');
        expect(css).toContain('::view-transition-new(root){animation:portfolio-page-in');
        expect(css).toContain('::view-transition-old(portfolio-footer){display:none;}');
        expect(css).toContain('::view-transition-new(portfolio-footer){animation:none;}');
        expect(css).not.toContain('view-transition-name:portfolio-page');
        expect(css).not.toContain('slide-to-left');
        expect(css).not.toContain('400ms ease both');
        expect(css).toContain('prefers-reduced-motion: reduce');
        expect(css).toContain('animation:none!important');
    });

    it.each(['en', 'cs'] as const)('names only the title text in the %s directory and matching detail', async locale => {
        const directory = await render('/services', locale);
        const sourceTitles = namedTitles(directory.html, directory.css);
        const services = getServices(locale);
        expect(sourceTitles).toHaveLength(services.length);
        for (const service of services) {
            const detail = await render(`/services/${service.id}`, locale);
            const expected = { name: service.viewTransitionName, text: renderToStaticMarkup(<>{service.title}</>) };
            expect(sourceTitles).toContainEqual(expected);
            expect(namedTitles(detail.html, detail.css)).toEqual([expected]);
            expect(detail.html).toMatch(/<h1\b[^>]*><span\b/);
        }
        expect(directory.html).toMatch(/<h3\b[^>]*><span\b/);
    });

    it.each(['en', 'cs'] as const)('shares title-only names from the %s homepage without its arrows/descriptions', async locale => {
        const { html, css } = await render('/', locale);
        expect(namedTitles(html, css)).toEqual(getFeaturedServices(locale).map(service => ({
            name: service.viewTransitionName, text: renderToStaticMarkup(<>{service.title}</>),
        })));
    });

    it('keeps service names unique, locale-independent, and valid CSS identifiers', () => {
        const names = getServices('en').map(service => service.viewTransitionName);
        expect(new Set(names).size).toBe(names.length);
        expect(getServices('cs').map(service => service.viewTransitionName)).toEqual(names);
        expect(names.every(name => /^title-[a-z][a-z0-9-]*$/.test(name))).toBe(true);
    });
});
