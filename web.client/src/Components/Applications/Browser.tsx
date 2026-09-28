import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
    getFeaturedProjects,
    getPortfolioProjects,
    getProjectStatusLabels,
} from '../../content/projects';
import { filterProjectsBySearch } from '../../content/projectSearch';
import { useLocale } from '../../i18n/useLocale';

const BrowserWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
`;

const BookmarksBar = styled.div`
    display: flex;
    gap: 8px;
    padding: 8px;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    overflow-x: auto;
`;

const BookmarkItem = styled.button<{ $isActive: boolean }>`
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.text};
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid ${({ $isActive, theme }) => $isActive ? theme.colors.accent : theme.colors.border};
    background: ${({ $isActive, theme }) => $isActive ? theme.colors.accent + '33' : theme.colors.surface};
    cursor: pointer;
`;

const NavigationPanel = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
`;

const Toolbar = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavigationButtons = styled.div`
    display: flex;
    gap: 4px;
`;

const IconButton = styled.button`
    min-width: 32px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    &:disabled {
        cursor: default;
        opacity: 0.45;
    }
`;

const AddressBar = styled.div`
    flex: 1;

    input {
        width: 100%;
        height: 30px;
        padding: 0 10px;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 4px;
        background: ${({ theme }) => theme.colors.backgroundSecondary};
        color: ${({ theme }) => theme.colors.text};
    }
`;

const SearchMeta = styled.span`
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.76rem;

    @media (max-width: 720px) {
        display: none;
    }
`;

const ContentArea = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 18px;
`;

const BrowserHero = styled.article`
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(240px, 0.7fr);
    gap: 18px;
    min-height: 100%;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const PreviewPanel = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 22px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background:
        linear-gradient(135deg, ${({ theme }) => theme.colors.accent}1f, transparent 36%),
        ${({ theme }) => theme.colors.backgroundSecondary};
`;

const PreviewTop = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
`;

const TitleGroup = styled.div`
    display: grid;
    gap: 8px;
`;

const Eyebrow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.82rem;
`;

const Status = styled.span`
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
`;

const ProjectTitle = styled.h2`
    margin: 0;
    font-size: clamp(1.7rem, 4vw, 2.5rem);
    line-height: 1.1;
`;

const Summary = styled.p`
    max-width: 720px;
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
`;

const HighlightList = styled.ul`
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const TechRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const TechTag = styled.span`
    padding: 5px 9px;
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 0.8rem;
`;

const ActionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;
`;

const RouteAction = styled(Link)`
    padding: 9px 12px;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    font-weight: 700;
`;

const ExternalAction = styled.a`
    padding: 9px 12px;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-decoration: none;
    font-weight: 700;

    &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
    }
`;

const ProjectRail = styled.aside`
    display: grid;
    align-content: start;
    gap: 10px;
`;

const RailTitle = styled.h3`
    margin: 0 0 4px;
    font-size: 0.95rem;
`;

const RailItem = styled.button<{ $isActive: boolean }>`
    display: grid;
    gap: 6px;
    padding: 12px;
    border: 1px solid ${({ $isActive, theme }) => $isActive ? theme.colors.accent : theme.colors.border};
    border-radius: 6px;
    background: ${({ $isActive, theme }) => $isActive ? theme.colors.accent + '24' : theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    text-align: left;
`;

const RailItemTitle = styled.span`
    font-weight: 700;
`;

const RailItemDescription = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.82rem;
    line-height: 1.4;
`;

const EmptyState = styled.div`
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const getProjectAddress = (projectId?: string) => `portfolio://projects/${projectId ?? ''}`;

const Browser: React.FC = () => {
    const { t } = useTranslation('devos');
    const { locale } = useLocale();
    const [searchQuery, setSearchQuery] = useState('');
    const allProjects = useMemo(() => getPortfolioProjects(locale), [locale]);
    const defaultProjects = useMemo(() => {
        const featuredProjects = getFeaturedProjects(locale);
        return featuredProjects.length > 0 ? featuredProjects : allProjects;
    }, [allProjects, locale]);
    const projects = useMemo(
        () => searchQuery.trim()
            ? filterProjectsBySearch(allProjects, searchQuery)
            : defaultProjects,
        [allProjects, defaultProjects, searchQuery],
    );
    const projectStatusLabels = getProjectStatusLabels(locale);
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '');
    const selectedProject = projects.find(project => project.id === selectedProjectId) ?? projects[0];
    const address = selectedProject?.id ? getProjectAddress(selectedProject.id) : 'portfolio://projects';
    const isSearching = searchQuery.trim().length > 0;

    if (!selectedProject) {
        return (
            <BrowserWrapper>
                <BookmarksBar />
                <NavigationPanel>
                    <Toolbar>
                        <NavigationButtons>
                            <IconButton type="button" disabled>{"<"}</IconButton>
                            <IconButton type="button" disabled>{">"}</IconButton>
                            <IconButton type="button" onClick={() => setSearchQuery('')} title={t('browser.clearSearch')}>{"↻"}</IconButton>
                        </NavigationButtons>
                        <AddressBar>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={event => setSearchQuery(event.target.value)}
                                placeholder={t('browser.searchPlaceholder')}
                                aria-label={t('browser.searchAria')}
                            />
                        </AddressBar>
                        {isSearching && <SearchMeta>{t('browser.searchResults', { count: projects.length })}</SearchMeta>}
                    </Toolbar>
                    <ContentArea>
                        <EmptyState>
                            {allProjects.length === 0
                                ? t('browser.empty')
                                : t('browser.noSearchResults', { query: searchQuery })}
                        </EmptyState>
                    </ContentArea>
                </NavigationPanel>
            </BrowserWrapper>
        );
    }

    return (
        <BrowserWrapper>
            <BookmarksBar>
                {projects.map(project => (
                    <BookmarkItem
                        key={project.id}
                        $isActive={project.id === selectedProject.id}
                        onClick={() => setSelectedProjectId(project.id)}
                    >
                        {project.name}
                    </BookmarkItem>
                ))}
            </BookmarksBar>

            <NavigationPanel>
                <Toolbar>
                    <NavigationButtons>
                        <IconButton type="button" disabled>{"<"}</IconButton>
                        <IconButton type="button" disabled>{">"}</IconButton>
                        <IconButton type="button" onClick={() => setSearchQuery('')} title={t('browser.clearSearch')}>{"↻"}</IconButton>
                    </NavigationButtons>
                    <AddressBar>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={event => setSearchQuery(event.target.value)}
                            placeholder={isSearching ? t('browser.searchPlaceholder') : address}
                            aria-label={t('browser.searchAria')}
                        />
                    </AddressBar>
                    {isSearching && <SearchMeta>{t('browser.searchResults', { count: projects.length })}</SearchMeta>}
                </Toolbar>

                <ContentArea>
                    <BrowserHero>
                        <PreviewPanel>
                            <PreviewTop>
                                <TitleGroup>
                                    <Eyebrow>
                                        <Status>{projectStatusLabels[selectedProject.status]}</Status>
                                        <span>{selectedProject.category}</span>
                                    </Eyebrow>
                                    <ProjectTitle>{selectedProject.name}</ProjectTitle>
                                </TitleGroup>
                            </PreviewTop>

                            <Summary>{selectedProject.description}</Summary>

                            <HighlightList>
                                {selectedProject.highlights.map(highlight => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </HighlightList>

                            <TechRow>
                                {selectedProject.technologies.map(tech => (
                                    <TechTag key={tech}>{tech}</TechTag>
                                ))}
                            </TechRow>

                            <ActionRow>
                                {selectedProject.route && (
                                    <RouteAction to={selectedProject.route}>{t('shared.openRoute')}</RouteAction>
                                )}
                                {selectedProject.liveUrl && (
                                    <ExternalAction href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                                        {t('shared.liveSite')}
                                    </ExternalAction>
                                )}
                                {selectedProject.repoUrl && (
                                    <ExternalAction href={selectedProject.repoUrl} target="_blank" rel="noreferrer">
                                        {t('shared.source')}
                                    </ExternalAction>
                                )}
                            </ActionRow>
                        </PreviewPanel>

                        <ProjectRail>
                            <RailTitle>
                                {isSearching
                                    ? t('browser.searchResults', { count: projects.length })
                                    : t('browser.featuredProjects')}
                            </RailTitle>
                            {projects.map(project => (
                                <RailItem
                                    key={project.id}
                                    $isActive={project.id === selectedProject.id}
                                    onClick={() => setSelectedProjectId(project.id)}
                                >
                                    <RailItemTitle>{project.name}</RailItemTitle>
                                    <RailItemDescription>{project.shortDescription}</RailItemDescription>
                                </RailItem>
                            ))}
                        </ProjectRail>
                    </BrowserHero>
                </ContentArea>
            </NavigationPanel>
        </BrowserWrapper>
    );
}

export default Browser;
