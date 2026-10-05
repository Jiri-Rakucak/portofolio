import { defaultLocale, type Locale } from '../i18n/types';
import { getPortfolioContent } from './localizedContent';
import type {
    PortfolioProject,
    ProjectFile,
    ProjectStatus,
} from './contentTypes';

export type {
    PortfolioProject,
    ProjectCaseStudy,
    ProjectFile,
    ProjectStatus,
} from './contentTypes';

export type ProjectFileSystem = {
    Desktop: ProjectFile[];
    Downloads: ProjectFile[];
    Documents: ProjectFile[];
    Projects: ProjectFile[];
};

export type ProjectFolderName = keyof ProjectFileSystem;

export const getPortfolioProjects = (locale?: Locale): PortfolioProject[] =>
    getPortfolioContent(locale).projects;

export const getFeaturedProjects = (locale?: Locale): PortfolioProject[] =>
    getPortfolioProjects(locale).filter(project => project.featured);

const homeProjectIds = ['unity-graduation-game', 'ragsystem'] as const;

export const getHomeProjects = (locale?: Locale): PortfolioProject[] => {
    const projects = getPortfolioProjects(locale);
    return homeProjectIds
        .map(id => projects.find(project => project.id === id))
        .filter((project): project is PortfolioProject => project !== undefined);
};

export const getProjectById = (projectId: string, locale?: Locale) =>
    getPortfolioProjects(locale).find(project => project.id === projectId);

export const getProjectStatusLabels = (locale?: Locale): Record<ProjectStatus, string> =>
    getPortfolioContent(locale).projectStatusLabels;

export const getProjectFileSystem = (locale?: Locale): ProjectFileSystem => {
    const projects = getPortfolioProjects(locale);

    return {
        Desktop: [],
        Downloads: [],
        Documents: [],
        Projects: projects.map(project => ({
            id: project.id,
            name: `${project.name}.project`,
            type: 'file',
        })),
    };
};

export const portfolioProjects = getPortfolioProjects(defaultLocale);
export const featuredProjects = getFeaturedProjects(defaultLocale);
export const projectFileSystem = getProjectFileSystem(defaultLocale);
export const projectStatusLabels = getProjectStatusLabels(defaultLocale);
