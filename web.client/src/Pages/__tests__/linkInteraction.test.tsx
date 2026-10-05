import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';
import Header from '../../Components/Shared/Header';
import { PrimaryLink } from '../../Components/Desktop/HomeHero.styles';
import { DetailLink } from '../ProjectsPages/ProjectsPage.styles';
import i18n from '../../i18n';
import { darkTheme, lightTheme, type Theme } from '../../styles/theme';

const renderStyles = (element: ReactElement, theme: Theme) => {
    const sheet = new ServerStyleSheet();
    try {
        const html = renderToStaticMarkup(sheet.collectStyles(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider theme={theme}>
                    <MemoryRouter>{element}</MemoryRouter>
                </ThemeProvider>
            </I18nextProvider>,
        ));
        return { html, css: sheet.getStyleTags() };
    } finally {
        sheet.seal();
    }
};

describe.each([
    ['dark', darkTheme],
    ['light', lightTheme],
] as const)('%s theme link interactions', (_name, theme) => {
    it('uses an inverse text/background pair for the primary CTA on hover and keyboard focus', () => {
        const { css } = renderStyles(<PrimaryLink to="/projects">Projects</PrimaryLink>, theme);
        const interaction = css.match(/:hover,[^{]*:focus-visible\{([^}]+)\}/)?.[1];

        expect(interaction).toContain(`background:${theme.colors.text};`);
        expect(interaction).toContain(`color:${theme.colors.background};`);
        expect(interaction).toContain(`border-color:${theme.colors.text};`);
        expect(css).toContain(`outline:2px solid ${theme.colors.accent};`);
        expect(css).not.toContain('filter:brightness');
    });

    it('highlights the project detail link with the main text color and an underline', () => {
        const { css } = renderStyles(<DetailLink to="/projects/unity-graduation-game">Detail</DetailLink>, theme);
        const interaction = css.match(/:hover,[^{]*:focus-visible\{([^}]+)\}/)?.[1];

        expect(interaction).toContain(`color:${theme.colors.text};`);
        expect(interaction).toContain('text-decoration:underline;');
        expect(css).toContain(`outline:2px solid ${theme.colors.accent};`);
    });

    it('gives the home logo a themed hover, keyboard focus, and an accessible label', async () => {
        await i18n.changeLanguage('en');
        const { html, css } = renderStyles(<Header />, theme);
        const logo = html.match(/<a\b[^>]*aria-label="Home"[^>]*>/)?.[0];
        const className = logo?.match(/class="([^"]+)"/)?.[1].split(' ').pop();

        expect(logo).toContain('href="/"');
        expect(className).toBeTruthy();
        expect(css).toContain(`.${className}:hover,.${className}:focus-visible{color:${theme.colors.text};}`);
        expect(css).toContain(`.${className}:focus-visible{outline:2px solid ${theme.colors.accent};`);
    });
});
