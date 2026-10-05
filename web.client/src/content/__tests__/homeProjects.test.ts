import { afterEach, describe, expect, it, vi } from 'vitest';
import { getHomeProjects, getPortfolioProjects } from '../projects';
import * as content from '../localizedContent';
import { locales } from '../../i18n/types';

afterEach(() => vi.restoreAllMocks());

describe('homepage project selection', () => {
    it.each(locales)('selects only Starbounder and RAG from the %s catalog', locale => {
        const projects = getHomeProjects(locale);

        expect(projects.map(project => project.id)).toEqual(['unity-graduation-game', 'ragsystem']);
        expect(projects[0]).toBe(getPortfolioProjects(locale).find(project => project.id === 'unity-graduation-game'));
        expect(projects[1]).toBe(getPortfolioProjects(locale).find(project => project.id === 'ragsystem'));
    });

    it('preserves the curated order when the source catalog order changes', () => {
        const source = content.getPortfolioContent('en');
        vi.spyOn(content, 'getPortfolioContent').mockReturnValue({ ...source, projects: [...source.projects].reverse() });

        expect(getHomeProjects('en').map(project => project.id)).toEqual(['unity-graduation-game', 'ragsystem']);
    });

    it('omits missing selected projects without substituting the portfolio itself', () => {
        const source = content.getPortfolioContent('en');
        vi.spyOn(content, 'getPortfolioContent').mockReturnValue({
            ...source, projects: source.projects.filter(project => project.id === 'devos-portfolio'),
        });

        expect(getHomeProjects('en')).toEqual([]);
    });
});
