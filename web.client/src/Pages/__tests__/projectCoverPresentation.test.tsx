import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import i18n from '../../i18n';
import { LanguageContext } from '../../i18n/LanguageContext';
import { darkTheme, lightTheme } from '../../styles/theme';
import * as projects from '../../content/projects';
import ProjectDetailPage from '../ProjectsPages/ProjectDetailPage';
import { InlineCoverImage } from '../ProjectsPages/ProjectDetailPage.styles';

async function renderDetail(id: string, locale: 'en' | 'cs' = 'en') {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: () => {}, toggleLocale: () => {} }}>
                <ThemeProvider theme={darkTheme}>
                    <MemoryRouter initialEntries={[`/projects/${id}`]}>
                        <Routes><Route path="/projects/:projectId" element={<ProjectDetailPage />} /></Routes>
                    </MemoryRouter>
                </ThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>,
    );
}

afterEach(() => vi.restoreAllMocks());

describe('project cover presentation', () => {
    it.each(['en', 'cs'] as const)('places the %s RAG screenshot after the introduction, outside the hero', async locale => {
        const html = await renderDetail('ragsystem', locale);
        const project = projects.getProjectById('ragsystem', locale)!;
        const heroEnd = html.indexOf('</section>');
        const imagePosition = html.indexOf(`src="${project.cover!.src}"`);

        expect(html.slice(0, heroEnd)).toContain('data-cover-presentation="none"');
        expect(html.slice(0, heroEnd)).not.toContain('<img');
        expect(imagePosition).toBeGreaterThan(heroEnd);
        expect(html.indexOf(project.shortDescription)).toBeLessThan(imagePosition);
        expect(html).toContain('data-cover-presentation="inline"');
        expect(html).toContain(`aria-label="${locale === 'cs' ? 'Náhled projektu' : 'Project preview'}"`);
        expect(html).toContain(`alt="${project.cover!.alt}"`);
        expect(html.match(/<img\b/g)).toHaveLength(1);
    });

    it.each(['en', 'cs'] as const)('retains the %s Starbounder image behind its hero text', async locale => {
        const html = await renderDetail('unity-graduation-game', locale);
        const project = projects.getProjectById('unity-graduation-game', locale)!;
        const hero = html.slice(0, html.indexOf('</section>'));

        expect(hero).toContain('data-cover-presentation="background"');
        expect(hero).toContain(`src="${project.cover!.src}"`);
        expect(hero).toContain('Starbounder');
        expect(html).not.toContain('data-cover-presentation="inline"');
    });

    it('defaults older cover data without a presentation field to the original background', async () => {
        const project = projects.getProjectById('ragsystem', 'en')!;
        vi.spyOn(projects, 'getProjectById').mockReturnValue({
            ...project, cover: { src: project.cover!.src, alt: project.cover!.alt },
        });
        const html = await renderDetail(project.id);
        expect(html.slice(0, html.indexOf('</section>'))).toContain(`src="${project.cover!.src}"`);
        expect(html).toContain('data-cover-presentation="background"');
        expect(html).not.toContain('data-cover-presentation="inline"');
    });

    it('uses the configured mode rather than a hardcoded RAG project id', async () => {
        const project = projects.getProjectById('devos-portfolio', 'en')!;
        vi.spyOn(projects, 'getProjectById').mockReturnValue({
            ...project, cover: { src: '/another-preview.png', alt: 'Another interface', presentation: 'inline' },
        });
        const html = await renderDetail(project.id);
        expect(html.slice(0, html.indexOf('</section>'))).not.toContain('<img');
        expect(html).toContain('data-cover-presentation="inline"');
        expect(html).toContain('src="/another-preview.png"');
    });

    it.each([undefined, '', '   '])('keeps text and actions without a usable cover (%s)', async src => {
        const project = projects.getProjectById('ragsystem', 'en')!;
        vi.spyOn(projects, 'getProjectById').mockReturnValue({
            ...project, cover: src === undefined ? undefined : { src, alt: 'Pending', presentation: 'inline' },
        });
        const html = await renderDetail(project.id);
        expect(html).toContain(project.name);
        expect(html).toContain(`href="${project.repoUrl}"`);
        expect(html).toContain('data-cover-presentation="none"');
        expect(html).not.toContain('data-cover-presentation="inline"');
        expect(html).not.toContain('<img');
    });

    it.each([darkTheme, lightTheme])('contains the full screenshot in a stable, unframed preview', theme => {
        const sheet = new ServerStyleSheet();
        try {
            const html = renderToStaticMarkup(sheet.collectStyles(
                <I18nextProvider i18n={i18n}><ThemeProvider theme={theme}>
                    <InlineCoverImage src="/preview.png" alt="Interface preview" fit="contain" />
                </ThemeProvider></I18nextProvider>,
            ));
            const css = sheet.getStyleTags();
            expect(html).toContain('src="/preview.png"');
            expect(css).toContain('aspect-ratio:16/9');
            expect(css).toContain('object-fit:contain');
            expect(css).toContain('color:' + theme.colors.text);
            expect(css).not.toContain('position:absolute');
            expect(css).not.toContain('linear-gradient');
            expect(css).not.toContain('border-radius');
        } finally { sheet.seal(); }
    });

    it('provides a localized accessible placeholder when a preview has an invalid source', async () => {
        await i18n.changeLanguage('cs');
        const html = renderToStaticMarkup(<I18nextProvider i18n={i18n}>
            <ThemeProvider theme={lightTheme}>
                <InlineCoverImage src=" " alt="Náhled rozhraní" fit="contain" />
            </ThemeProvider>
        </I18nextProvider>);
        expect(html).toContain('role="img" aria-label="Náhled rozhraní"');
        expect(html).toContain('Obrázek není dostupný');
        expect(html).not.toContain('<img');
    });
});
