import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';
import { ProjectsSection, SkillsSection } from '../../Components/Desktop/HomeSections.styles';
import { ContentWrapper } from '../ProjectsPages/ProjectDetailPage.styles';
import ServicePage from '../ServicesPages/ServicePage';
import ServiceDetailPage from '../ServicesPages/ServiceDetailPage';
import { LanguageContext } from '../../i18n/LanguageContext';
import i18n from '../../i18n';
import { darkTheme } from '../../styles/theme';

const renderStyles = (element: ReactElement) => {
    const sheet = new ServerStyleSheet();
    try {
        renderToStaticMarkup(sheet.collectStyles(
            <I18nextProvider i18n={i18n}>
                <LanguageContext.Provider value={{ locale: 'en', setLocale: () => {}, toggleLocale: () => {} }}>
                    <ThemeProvider theme={darkTheme}><MemoryRouter>{element}</MemoryRouter></ThemeProvider>
                </LanguageContext.Provider>
            </I18nextProvider>,
        ));
        return sheet.getStyleTags();
    } finally {
        sheet.seal();
    }
};

describe.each([
    ['homepage projects', <ProjectsSection />],
    ['homepage skills', <SkillsSection />],
    ['project detail', <ContentWrapper />],
    ['skills directory', <ServicePage />],
    ['skill detail', <ServiceDetailPage serviceId="frontend-development" />],
] as const)('%s angled section', (_name, element) => {
    it('uses the same bounded cut rather than a viewport-width-dependent slope', () => {
        const css = renderStyles(element);

        expect(css).toContain('--section-cut:48px;');
        expect(css).toContain('clip-path:polygon(0 0, 100% var(--section-cut), 100% 100%, 0 100%);');
        expect(css).not.toMatch(/clip-path:[^;]*vw/);
    });

    it('reduces the cut at narrow widths without changing text size with the viewport', () => {
        const css = renderStyles(element);

        expect(css).toMatch(/@media\s*\(max-width:\s*640px\)[^{]*\{[^}]*--section-cut:32px;/);
        expect(css).not.toMatch(/font-size:[^;]*vw/);
    });

    it('reserves padding beyond the cut so overlapping bands do not clip their content', () => {
        const css = renderStyles(element);

        expect(css).toContain('margin-top:calc(-1 * var(--section-cut));');
        expect(css).toContain('padding:calc(var(--section-cut) + 3rem)');
    });
});
