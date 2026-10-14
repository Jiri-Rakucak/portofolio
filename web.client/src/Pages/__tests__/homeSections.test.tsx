import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DesktopHomeLayout from '../../Components/Desktop/DesktopHomeLayout';
import HomeProjects from '../../Components/Desktop/HomeProjects';
import HomeSkills from '../../Components/Desktop/HomeSkills';
import * as projects from '../../content/projects';
import * as services from '../../content/services';
import { LanguageContext } from '../../i18n/LanguageContext';
import i18n from '../../i18n';
import { locales, type Locale } from '../../i18n/types';
import { darkTheme } from '../../styles/theme';

vi.mock('../../Components/Desktop/HeroScene', () => ({ default: () => null }));

const render = async (element: ReactElement, locale: Locale = 'en') => {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{ locale, setLocale: vi.fn(), toggleLocale: vi.fn() }}>
                <ThemeProvider theme={darkTheme}><MemoryRouter>{element}</MemoryRouter></ThemeProvider>
            </LanguageContext.Provider>
        </I18nextProvider>,
    );
};

afterEach(() => vi.restoreAllMocks());

describe('homepage project presentation', () => {
    it.each(locales)('shows the %s central project metadata and both project covers', async locale => {
        const html = await render(<HomeProjects />, locale);
        const selected = projects.getHomeProjects(locale);

        for (const project of selected) {
            expect(html).toContain(project.name);
            expect(html).toContain(project.shortDescription);
            expect(html).toContain(`href="/projects/${project.id}"`);
            expect(html).toContain(projects.getProjectStatusLabels(locale)[project.status]);
            expect(html).toContain(project.cover?.src);
            expect(html).toContain(project.cover?.alt);
        }
        expect(html).not.toContain('DevOS Portfolio');
        expect(html).not.toContain('{{name}}');
    });

    it('keeps RAG navigable without a cover or case study', async () => {
        const project = projects.getProjectById('ragsystem', 'en')!;
        vi.spyOn(projects, 'getHomeProjects').mockReturnValue([{ ...project, cover: undefined, caseStudy: undefined }]);

        const html = await render(<HomeProjects />);

        expect(html).toContain('Personal Conversation RAG');
        expect(html).toContain('href="/projects/ragsystem"');
        expect(html).not.toContain('<img');
        expect(html).not.toContain('undefined');
    });

    it('does not render an image with an empty source', async () => {
        const project = projects.getProjectById('unity-graduation-game', 'en')!;
        vi.spyOn(projects, 'getHomeProjects').mockReturnValue([{ ...project, cover: { src: '   ', alt: 'Pending' } }]);

        const html = await render(<HomeProjects />);

        expect(html).not.toContain('<img');
        expect(html).toContain('href="/projects/unity-graduation-game"');
    });

    it('renders a localized empty state and the catalog link when selections are unavailable', async () => {
        vi.spyOn(projects, 'getHomeProjects').mockReturnValue([]);

        const html = await render(<HomeProjects />, 'cs');

        expect(html).toContain('Zatím nejsou dostupné žádné projekty.');
        expect(html).toContain('href="/projects"');
        expect(html).not.toContain('<article');
    });
});

describe('homepage skills presentation', () => {
    it.each(locales)('renders %s service links from the central content without technology buttons', async locale => {
        const html = await render(<HomeSkills />, locale);

        for (const service of services.getFeaturedServices(locale)) {
            expect(html).toContain(renderToStaticMarkup(<>{service.title}</>));
            expect(html).toContain(service.description);
            expect(html).toContain(`href="${service.route}"`);
        }
        expect(html).toContain('href="/services"');
        expect(html).not.toContain('target="_blank"');
    });

    it('handles a single service without requiring a card grid', async () => {
        const service = services.getFeaturedServices('en')[0];
        vi.spyOn(services, 'getFeaturedServices').mockReturnValue([service]);

        const html = await render(<HomeSkills />);

        expect(html.match(/<li\b/g)).toHaveLength(1);
        expect(html).toContain(service.title);
    });

    it('keeps the overview link when no featured services are configured', async () => {
        vi.spyOn(services, 'getFeaturedServices').mockReturnValue([]);

        const html = await render(<HomeSkills />);

        expect(html).toContain('href="/services"');
        expect(html).not.toContain('<li');
    });
});

it('places selected projects between the personal introduction and skills', async () => {
    const html = await render(<DesktopHomeLayout />);

    expect(html.indexOf('<h1')).toBeLessThan(html.indexOf('id="home-projects-title"'));
    expect(html.indexOf('id="home-projects-title"')).toBeLessThan(html.indexOf('id="home-skills-title"'));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).not.toContain('Comprehensive IT Services');
});
