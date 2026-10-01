import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { LanguageContext } from '../../i18n/LanguageContext';
import i18n from '../../i18n';
import { darkTheme } from '../../styles/theme';
import * as projectContent from '../../content/projects';
import ProjectDetailPage from '../ProjectsPages/ProjectDetailPage';
import ProjectsPage from '../ProjectsPage';

const renderPage = async (path: string, locale: 'en' | 'cs' = 'en') => {
    await i18n.changeLanguage(locale);

    return renderToStaticMarkup(
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
        </I18nextProvider>,
    );
};

afterEach(() => vi.restoreAllMocks());

describe('project detail page', () => {
    it('renders the localized RAG case study and source link without a self-link', async () => {
        const html = await renderPage('/projects/ragsystem', 'cs');
        const project = projectContent.getProjectById('ragsystem', 'cs');

        expect(html).toContain(project?.caseStudy?.solution);
        expect(html).toContain(project?.repoUrl);
        expect(html).not.toContain('href="/projects/ragsystem"');
        expect(html).toContain('Zdrojový kód');
    });

    it('renders a project without optional case-study content', async () => {
        const html = await renderPage('/projects/service-pages');

        expect(html).toContain('Service Pages System');
        expect(html).toContain('href="/services"');
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
    it('renders localized navigation and keeps slides inaccessible behind the intro', async () => {
        const html = await renderPage('/projects', 'cs');

        expect(html).toContain('aria-label="Předchozí projekt"');
        expect(html).toContain('aria-label="Další projekt"');
        expect(html.match(/inert=""/g)).toHaveLength(projectContent.getPortfolioProjects('cs').length);
    });

    it('handles a catalog with only one project', async () => {
        const project = projectContent.getPortfolioProjects('en')[0];
        vi.spyOn(projectContent, 'getPortfolioProjects').mockReturnValue([project]);

        const html = await renderPage('/projects');

        expect(html).toContain(project.name);
        expect(html.match(/inert=""/g)).toHaveLength(1);
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
