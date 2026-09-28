import { describe, expect, it } from 'vitest';
import {
    getPortfolioProjects,
    getProjectById,
    getProjectFileSystem,
    getProjectStatusLabels,
} from '../projects';
import { filterProjectsBySearch, normalizeProjectSearchQuery } from '../projectSearch';
import { getFeaturedServices, getServiceById, getServices } from '../services';
import { locales, type Locale } from '../../i18n/types';

describe('portfolio content', () => {
    it('resolves localized projects by id', () => {
        const englishProject = getProjectById('devos-portfolio', 'en');
        const czechProject = getProjectById('devos-portfolio', 'cs');

        expect(englishProject?.shortDescription).toContain('Interactive portfolio');
        expect(czechProject?.shortDescription).toContain('Interaktivní portfolio');
        expect(czechProject?.technologies).toContain('React');
    });

    it('returns undefined for unknown projects', () => {
        expect(getProjectById('missing-project', 'cs')).toBeUndefined();
    });

    it.each(locales)('exposes every %s project in the DevOS project file system', (locale: Locale) => {
        const projects = getPortfolioProjects(locale);
        const fileProjectIds = getProjectFileSystem(locale).Projects.map(file => file.id);

        expect(fileProjectIds).toEqual(projects.map(project => project.id));
    });

    it.each(locales)('keeps %s featured services routeable and technology-backed', (locale: Locale) => {
        const featuredServices = getFeaturedServices(locale);
        const services = getServices(locale);

        expect(featuredServices.length).toBeGreaterThanOrEqual(3);
        expect(featuredServices.every(service => service.route.startsWith('/services'))).toBe(true);
        expect(services.every(service => service.technologies.length > 0)).toBe(true);
    });

    it.each(locales)('provides %s detail content for every service', (locale: Locale) => {
        const services = getServices(locale);

        expect(services.every(service => service.detail.subtitle.length > 0)).toBe(true);
        expect(services.every(service => service.detail.introBody.length >= 1)).toBe(true);
        expect(services.every(service => service.detail.capabilities.length >= 4)).toBe(true);
        expect(services.every(service => service.detail.stack.length >= 3)).toBe(true);
        expect(services.every(service => service.detail.relatedLinks.length >= 1)).toBe(true);
        expect(services.every(service =>
            service.detail.relatedLinks.every(link => link.route.startsWith('/services')),
        )).toBe(true);
    });

    it('resolves localized service detail by id', () => {
        expect(getServiceById('frontend-development', 'en')?.detail.title).toBe('Frontend Development');
        expect(getServiceById('frontend-development', 'cs')?.detail.title).toBe('Frontend vývoj');
        expect(getServiceById('missing-service', 'en')).toBeUndefined();
    });

    it.each(locales)('provides %s case-study metadata for every project', (locale: Locale) => {
        const projects = getPortfolioProjects(locale);

        expect(projects.every(project => project.role.length > 0)).toBe(true);
        expect(projects.every(project => project.timeframe.length > 0)).toBe(true);
        expect(projects.every(project => project.impact.length > 0)).toBe(true);
    });

    it.each(locales)('keeps %s optional project case studies renderable', (locale: Locale) => {
        const projectsWithCaseStudy = getPortfolioProjects(locale).filter(project => project.caseStudy);

        expect(projectsWithCaseStudy.length).toBeGreaterThanOrEqual(1);
        expect(projectsWithCaseStudy.every(project => project.caseStudy?.summary.length)).toBe(true);
        expect(projectsWithCaseStudy.every(project => project.caseStudy?.problem.length)).toBe(true);
        expect(projectsWithCaseStudy.every(project => project.caseStudy?.solution.length)).toBe(true);
        expect(projectsWithCaseStudy.every(project => project.caseStudy?.outcome.length)).toBe(true);
        expect(projectsWithCaseStudy.every(project => (project.caseStudy?.lessons.length ?? 0) >= 3)).toBe(true);
        expect(projectsWithCaseStudy.every(project =>
            (project.caseStudy?.assets ?? []).every(asset => asset.type.length > 0 && asset.label.length > 0),
        )).toBe(true);
    });

    it.each(locales)('has %s display labels for every project status', (locale: Locale) => {
        const projects = getPortfolioProjects(locale);
        const projectStatusLabels = getProjectStatusLabels(locale);

        expect(projects.every(project => projectStatusLabels[project.status])).toBe(true);
    });

    it('keeps project and service ids aligned across locales', () => {
        const getIds = <T extends { id: string }>(items: T[]) => items.map(item => item.id);

        expect(getIds(getPortfolioProjects('cs'))).toEqual(getIds(getPortfolioProjects('en')));
        expect(getIds(getServices('cs'))).toEqual(getIds(getServices('en')));
    });

    it('filters projects by search terms across metadata', () => {
        const results = filterProjectsBySearch(getPortfolioProjects('en'), 'react three');

        expect(results.map(project => project.id)).toContain('atom-scene');
    });

    it('filters projects by optional case-study content', () => {
        const graduationResults = filterProjectsBySearch(getPortfolioProjects('en'), 'unity graduation');
        const webglResults = filterProjectsBySearch(getPortfolioProjects('cs'), 'webgl maturitní');

        expect(graduationResults.map(project => project.id)).toContain('unity-graduation-game');
        expect(webglResults.map(project => project.id)).toContain('unity-graduation-game');
    });

    it('normalizes browser-like project search addresses', () => {
        expect(normalizeProjectSearchQuery('portfolio://projects/devos')).toBe('devos');
        expect(normalizeProjectSearchQuery('projects/service')).toBe('service');
    });

    it('returns no projects for unmatched search terms', () => {
        expect(filterProjectsBySearch(getPortfolioProjects('en'), 'missing-term')).toEqual([]);
    });
});
