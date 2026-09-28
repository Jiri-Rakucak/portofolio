import type { PortfolioProject } from './contentTypes';

const projectAddressPrefixPattern = /^(portfolio:\/\/)?(projects?\/?)?/i;

export const normalizeProjectSearchQuery = (query: string) =>
    query
        .trim()
        .toLowerCase()
        .replace(projectAddressPrefixPattern, '')
        .replace(/^\/+/, '')
        .trim();

const getCaseStudySearchText = (project: PortfolioProject) => {
    if (!project.caseStudy) return [];

    return [
        project.caseStudy.summary,
        project.caseStudy.problem,
        project.caseStudy.solution,
        project.caseStudy.outcome,
        ...project.caseStudy.lessons,
        ...(project.caseStudy.sections ?? []).flatMap(section => [section.title, section.body]),
        ...(project.caseStudy.assets ?? []).flatMap(asset => [asset.type, asset.label, asset.src ?? '', asset.alt ?? '']),
    ];
};

const getProjectSearchText = (project: PortfolioProject) => [
    project.id,
    project.name,
    project.shortDescription,
    project.description,
    project.status,
    project.category,
    project.role,
    project.timeframe,
    project.impact,
    ...project.technologies,
    ...project.highlights,
    ...getCaseStudySearchText(project),
].join(' ').toLowerCase();

export const filterProjectsBySearch = (projects: PortfolioProject[], query: string) => {
    const normalizedQuery = normalizeProjectSearchQuery(query);

    if (!normalizedQuery) return projects;

    const terms = normalizedQuery.split(/\s+/).filter(Boolean);

    return projects.filter(project => {
        const searchText = getProjectSearchText(project);
        return terms.every(term => searchText.includes(term));
    });
};
