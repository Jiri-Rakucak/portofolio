import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useDevOs } from '../../Contexts/DevOsContext';
import {
    getProjectById,
    getProjectFileSystem,
    getProjectStatusLabels,
    type ProjectFolderName,
} from '../../content/projects';
import { useLocale } from '../../i18n/useLocale';
import { ProjectWindow } from './ProjectWindow';
import FolderIcon from '../Icons/Folder';
import FileIcon from '../Icons/File';

const ExplorerWrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Sidebar = styled.div`
  width: 210px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 14px 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarTitle = styled.div`
  padding: 0 10px 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0;
`;

const SidebarItem = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ $isActive, theme }) => $isActive ? theme.colors.accent + '33' : 'transparent'};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  min-width: 0;
  padding: 20px;
  overflow-y: auto;
`;

const WorkspaceHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const HeaderText = styled.div`
  display: grid;
  gap: 6px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const CountBadge = styled.span`
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.82rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const ProjectCard = styled.button`
  display: grid;
  gap: 12px;
  min-height: 190px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-1px);
  }
`;

const CardTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MetaPill = styled.span`
  padding: 3px 8px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.76rem;
`;

const TechPreview = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.76rem;
`;

const DesktopGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 18px;
`;

const DesktopItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const ItemLabel = styled.span`
  font-size: 12px;
  margin-top: 8px;
  word-break: break-word;
`;

const EmptyState = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Explorer: React.FC = () => {
    const { t } = useTranslation('devos');
    const { locale } = useLocale();
    const { actions, state } = useDevOs();
    const [currentPath, setCurrentPath] = useState<ProjectFolderName>('Projects');
    const projectFileSystem = getProjectFileSystem(locale);
    const projectStatusLabels = getProjectStatusLabels(locale);
    const content = projectFileSystem[currentPath];

    const openProjectWindow = (projectId: string) => {
        const project = getProjectById(projectId, locale);
        if (!project) return;

        actions.createWindow({
            type: 'app',
            title: project.name,
            icon: FileIcon,
            component: ProjectWindow,
            props: { projectId },
            size: { width: 760, height: 560 },
            position: { x: 220, y: 90 },
        });
    };

    return (
        <ExplorerWrapper>
            <Sidebar>
                <SidebarTitle>{t('explorer.portfolio')}</SidebarTitle>
                {Object.keys(projectFileSystem).map(folderName => (
                    <SidebarItem
                        key={folderName}
                        $isActive={currentPath === folderName}
                        onClick={() => setCurrentPath(folderName as ProjectFolderName)}
                    >
                        <FolderIcon size={20} />
                        <span>{folderName}</span>
                    </SidebarItem>
                ))}
            </Sidebar>

            <ContentArea>
                <WorkspaceHeader>
                    <HeaderText>
                        <Title>{currentPath}</Title>
                        <Description>{t(`explorer.folders.${currentPath}`)}</Description>
                    </HeaderText>
                    <CountBadge>
                        {currentPath === 'Desktop' ? state.desktopIcons.length : content.length} {t('explorer.items')}
                    </CountBadge>
                </WorkspaceHeader>

                {currentPath === 'Desktop' ? (
                    <DesktopGrid>
                        {state.desktopIcons.map(icon => {
                            const IconComponent = icon.icon;
                            return (
                                <DesktopItem
                                    key={icon.id}
                                    onDoubleClick={() => icon.onDoubleClick(state, actions)}
                                >
                                    <IconComponent size={48} />
                                    <ItemLabel>{icon.title}</ItemLabel>
                                </DesktopItem>
                            );
                        })}
                    </DesktopGrid>
                ) : content.length === 0 ? (
                    <EmptyState>{t('explorer.empty')}</EmptyState>
                ) : (
                    <ProjectGrid>
                        {content.map(item => {
                            const project = getProjectById(item.id, locale);
                            if (!project) return null;

                            return (
                                <ProjectCard key={item.id} onClick={() => openProjectWindow(item.id)}>
                                    <CardTop>
                                        <FileIcon size={28} />
                                        <div>
                                            <CardTitle>{project.name}</CardTitle>
                                            <MetaRow>
                                                <MetaPill>{projectStatusLabels[project.status]}</MetaPill>
                                                <MetaPill>{project.category}</MetaPill>
                                            </MetaRow>
                                        </div>
                                    </CardTop>
                                    <CardDescription>{project.shortDescription}</CardDescription>
                                    <TechPreview>{project.technologies.slice(0, 4).join(' / ')}</TechPreview>
                                </ProjectCard>
                            );
                        })}
                    </ProjectGrid>
                )}
            </ContentArea>
        </ExplorerWrapper>
    );
};

export default Explorer;
