export type ProjectStatus = 'live' | 'in-progress' | 'concept';

export type ProjectAssetType = 'image' | 'video' | 'webgl' | 'link';

export type ProjectCaseStudySection = {
    title: string;
    body: string;
};

export type ProjectAsset = {
    type: ProjectAssetType;
    label: string;
    src?: string;
    alt?: string;
};

export type ProjectCaseStudy = {
    summary: string;
    motivation?: string;
    problem: string;
    solution: string;
    outcome: string;
    lessons: string[];
    sections?: ProjectCaseStudySection[];
    assets?: ProjectAsset[];
};

export type PortfolioProject = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    status: ProjectStatus;
    category: string;
    role: string;
    timeframe: string;
    impact: string;
    technologies: string[];
    highlights: string[];
    route?: string;
    liveUrl?: string;
    liveLabel?: string;
    cover?: { src: string; alt: string };
    repoUrl?: string;
    featured?: boolean;
    caseStudy?: ProjectCaseStudy;
};

export type ProjectFile = {
    id: string;
    name: string;
    type: 'file';
};

export type TechnologyLink = {
    name: string;
    url: string;
};

export type ServiceCapability = {
    title: string;
    description: string;
};

export type ServiceRelatedLink = {
    label: string;
    route: string;
};

export type ServiceDetail = {
    title: string;
    subtitle: string;
    introTitle: string;
    introBody: string[];
    capabilitiesTitle: string;
    capabilities: ServiceCapability[];
    stackTitle: string;
    stackDescription: string;
    stack: string[];
    relatedTitle: string;
    relatedDescription: string;
    relatedLinks: ServiceRelatedLink[];
};

export type ServiceSummary = {
    id: string;
    title: string;
    description: string;
    route: string;
    tags: string[];
    technologies: TechnologyLink[];
    gradient: string;
    featuredOnHome?: boolean;
    viewTransitionName: string;
    detail: ServiceDetail;
};

export type PortfolioContent = {
    projectStatusLabels: Record<ProjectStatus, string>;
    projects: PortfolioProject[];
    services: ServiceSummary[];
};
