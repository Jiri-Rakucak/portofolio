import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider, ServerStyleSheet } from 'styled-components';
import { LanguageContext } from '../../i18n/LanguageContext';
import i18n from '../../i18n';
import { darkTheme } from '../../styles/theme';
import * as projectContent from '../../content/projects';
import ProjectDetailPage from '../ProjectsPages/ProjectDetailPage';
import ProjectsPage from '../ProjectsPage';

const renderPage = async (path: string, locale: 'en' | 'cs' = 'en', sheet?: ServerStyleSheet) => {
    await i18n.changeLanguage(locale);

    const page = (
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: vi.fn(), toggleLocale: vi.fn() }}>
                <ThemeProvider theme={darkTheme}>
                    <MemoryRouter initialEntries={[path]}>
                        <Routes>
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                        </Routes>
                    </MemoryRouter>
                </ThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>
    );
    return renderToStaticMarkup(sheet ? sheet.collectStyles(page) : page);
};

afterEach(() => vi.restoreAllMocks());

describe('project detail page', () => {
    it('renders Starbounder motivation, a gallery, and a prototype download CTA', async () => {
        const html = await renderPage('/projects/unity-graduation-game', 'cs');
        const project = projectContent.getProjectById('unity-graduation-game', 'cs');

        expect(html).toContain(project?.caseStudy?.motivation);
        expect(html).toContain(project?.cover?.src);
        expect(html.match(/aria-label="Zvětšit:/g)).toHaveLength(5);
        expect(html).toContain('Stáhnout prototyp');
        expect(html).toContain('<details');
        expect(html).not.toContain('project.meta');
        expect(html).not.toContain('projectWindow.');
    });

    it('omits the gallery section when a case study has no usable images', async () => {
        const project = projectContent.getProjectById('unity-graduation-game', 'en')!;
        vi.spyOn(projectContent, 'getProjectById').mockReturnValue({
            ...project, caseStudy: { ...project.caseStudy!, assets: [{ type: 'image', label: 'Pending', src: '' }] },
        });

        const html = await renderPage('/projects/unity-graduation-game');

        expect(html).not.toContain('Project screenshots');
        expect(html).toContain(project.caseStudy?.outcome);
    });

    it('renders the localized RAG case study and source link without a self-link', async () => {
        const html = await renderPage('/projects/ragsystem', 'cs');
        const project = projectContent.getProjectById('ragsystem', 'cs');

        expect(html).toContain(project?.caseStudy?.solution);
        expect(html).toContain(project?.repoUrl);
        expect(html).not.toContain('href="/projects/ragsystem"');
        expect(html).toContain(project?.cover?.src);
        expect(html).toContain(project?.cover?.alt);
        expect(html).toContain('Zdrojový kód');
    });

    it('renders a project without optional case-study content', async () => {
        const html = await renderPage('/projects/devos-portfolio');

        expect(html).toContain('DevOS Portfolio');
        expect(html).toContain('href="/"');
        expect(html).not.toContain('>Case study<');
    });

    it('offers a return link when a project id is unknown', async () => {
        const html = await renderPage('/projects/not-a-project');

        expect(html).toContain('Project was not found.');
        expect(html).toContain('href="/projects"');
        expect(html).not.toContain('project.meta');
    });
});

describe('project carousel', () => {
    it.each(['en', 'cs'] as const)('uses background covers but excludes inline screenshots in %s', async locale => {
        const html = await renderPage('/projects', locale);
        const project = projectContent.getProjectById('unity-graduation-game', locale);

        expect(html).toContain(project?.cover?.src);
        expect(html).toContain(project?.cover?.alt);
        const rag = projectContent.getProjectById('ragsystem', locale);
        expect(html).not.toContain(rag?.cover?.src);
        expect(html).not.toContain(rag?.cover?.alt);
        expect(html).toContain(rag?.name);
    });

    it('gives RAG a neutral gray gradient instead of its screenshot', async () => {
        const rag = projectContent.getProjectById('ragsystem', 'en')!;
        vi.spyOn(projectContent, 'getPortfolioProjects').mockReturnValue([rag]);
        const sheet = new ServerStyleSheet();
        try {
            const html = await renderPage('/projects', 'en', sheet);
            expect(html).not.toContain('<img');
            expect(sheet.getStyleTags()).toContain('background:linear-gradient(135deg, #1e1e1e 0%, #343434 55%, #191919 100%)');
        } finally { sheet.seal(); }
    });

    it.each(['inline', 'background', undefined] as const)('selects covers by presentation (%s), not project ID', async presentation => {
        const project = projectContent.getProjectById('ragsystem', 'en')!;
        vi.spyOn(projectContent, 'getPortfolioProjects').mockReturnValue([{
            ...project, id: 'future-project',
            cover: { src: '/future-preview.png', alt: 'Future preview', presentation },
        }]);
        const html = await renderPage('/projects');
        if (presentation === 'inline') {
            expect(html).not.toContain('/future-preview.png');
        } else {
            expect(html).toContain('/future-preview.png');
            expect(html).toContain('alt="Future preview"');
        }
    });

    it.each([undefined, '', '   '])('omits images with missing or unusable sources (%s)', async src => {
        const project = projectContent.getProjectById('unity-graduation-game', 'en')!;
        vi.spyOn(projectContent, 'getPortfolioProjects').mockReturnValue([{
            ...project, cover: src === undefined ? undefined : { src, alt: 'Pending cover' },
        }]);
        const html = await renderPage('/projects');
        expect(html).not.toContain('<img');
        expect(html).toContain(project.name);
    });

    it('renders localized navigation and keeps slides inaccessible behind the intro', async () => {
        const html = await renderPage('/projects', 'cs');

        expect(html).toContain('aria-label="Předchozí projekt"');
        expect(html).toContain('aria-label="Další projekt"');
        expect(html.match(/inert=""/g)).toHaveLength(projectContent.getPortfolioProjects('cs').length + 1);
        expect(html).not.toContain('aria-current="true"');
    });

    it('handles a catalog with only one project', async () => {
        const project = projectContent.getPortfolioProjects('en')[0];
        vi.spyOn(projectContent, 'getPortfolioProjects').mockReturnValue([project]);

        const html = await renderPage('/projects');

        expect(html).toContain(project.name);
        expect(html.match(/inert=""/g)).toHaveLength(2);
        expect(html).toMatch(/<button[^>]*aria-label="Next project"/);
    });

    it('disables navigation and shows an empty state for an empty catalog', async () => {
        vi.spyOn(projectContent, 'getPortfolioProjects').mockReturnValue([]);

        const html = await renderPage('/projects');

        expect(html).toContain('No projects are available yet.');
        expect(html.match(/disabled=""/g)).toHaveLength(2);
        expect(html).not.toContain('project.meta');
    });
});
