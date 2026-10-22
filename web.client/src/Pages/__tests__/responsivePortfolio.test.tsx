import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';
import i18n from '../../i18n';
import { LanguageContext } from '../../i18n/LanguageContext';
import { darkTheme, lightTheme, type Theme } from '../../styles/theme';
import HomeLayout from '../../Components/Desktop/DesktopHomeLayout';
import { HeroSection, HeroImage, HeroContent } from '../ProjectsPages/ProjectDetailPage.styles';
import { CarouselViewport, CarouselTrack, CarouselControls, Slide, SlideMedia, SlideContent } from '../ProjectsPages/ProjectsPage.styles';

function render(element: ReactElement, theme: Theme) {
    const sheet = new ServerStyleSheet();
    try {
        const html = renderToStaticMarkup(sheet.collectStyles(
            <I18nextProvider i18n={i18n}><ThemeProvider theme={theme}>
                <LanguageContext.Provider value={{ locale: i18n.language === 'cs' ? 'cs' : 'en', setLocale: () => {}, toggleLocale: () => {} }}>
                <MemoryRouter>{element}</MemoryRouter>
                </LanguageContext.Provider>
            </ThemeProvider></I18nextProvider>,
        ));
        return { html, css: sheet.getStyleTags() };
    } finally { sheet.seal(); }
}

describe.each([darkTheme, lightTheme])('responsive portfolio style contracts', theme => {
    it.each(['en', 'cs'] as const)('renders a shared %s home without a mobile placeholder or server-side scene', async locale => {
        await i18n.changeLanguage(locale);
        const { html, css } = render(<HomeLayout />, theme);
        expect(html).toContain('Jiří Rakučák');
        expect(html).toContain('id="home-projects-title"');
        expect(html).toContain('id="home-skills-title"');
        expect(html).not.toContain('<canvas');
        expect(html).not.toContain('Mobilní verze aplikace');
        expect(css).toMatch(/@media \(max-width:\s*1000px\)/);
        expect(css).toContain('max-width:620px;margin-left:0;align-items:flex-start;text-align:left;');
        expect(css).toContain('grid-template-columns:minmax(0, 1fr)');
    });

    it('reserves separate media space and removes viewport height constraints on narrow carousels', () => {
        const { css } = render(<>
            <CarouselViewport>
                <CarouselTrack $offset={-100} $introVisible={false}>
                    <Slide $bg="#333" $hasCover $active>
                        <SlideMedia $bg="#333" /><SlideContent>Project</SlideContent>
                    </Slide>
                    <Slide $bg="#333" $hasCover={false} $active={false} inert aria-hidden>Hidden</Slide>
                </CarouselTrack>
            </CarouselViewport>
            <CarouselControls />
        </>, theme);
        expect(css).toContain('min-height:max(520px, calc(100svh - 120px))');
        expect(css).toContain('touch-action:pan-y pinch-zoom;');
        expect(css).toContain('height:auto;min-height:0;border-radius:0;');
        expect(css).toContain('display:grid;height:auto;transform:none;transition:none;');
        expect(css).toContain('position:relative;inset:auto;width:100%;aspect-ratio:16/9;');
        expect(css).toContain('display:none;height:auto;min-width:0;');
        expect(css).toContain('position:relative;inset:auto;display:flex;justify-content:center;');
    });

    it('keeps a desktop background cover but places media before text on narrow project details', () => {
        const { html, css } = render(<HeroSection $hasBackgroundCover>
            <HeroImage src="/project.png" alt="Project screenshot" />
            <HeroContent><h1>Project heading</h1></HeroContent>
        </HeroSection>, theme);
        expect(html.indexOf('alt="Project screenshot"')).toBeLessThan(html.indexOf('<h1'));
        expect(css).toContain('position:absolute;inset:0;z-index:-2');
        expect(css).toContain('position:relative;inset:auto;z-index:auto;height:auto;aspect-ratio:16/9;');
        expect(css).toContain(`min-height:auto;padding:0;color:${theme.colors.text};`);
        expect(css).toContain('::after{display:none;}');
    });
});
