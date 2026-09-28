import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  getProjectById,
  getProjectStatusLabels,
  type ProjectStatus,
} from '../../content/projects';
import { useLocale } from '../../i18n/useLocale';
import { ProjectCaseStudy } from './ProjectCaseStudy';

const Wrapper = styled.article`
  height: 100%;
  overflow-y: auto;
  background:
    radial-gradient(circle at top right, ${({ theme }) => theme.colors.accent}1a, transparent 32%),
    ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Hero = styled.header`
  padding: 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const EyebrowRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 14px;
`;

const StatusPill = styled.span<{ $status: ProjectStatus }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme, $status }) =>
    $status === 'live'
      ? theme.colors.success
      : $status === 'in-progress'
        ? theme.colors.accent
        : theme.colors.textSecondary};
`;

const Category = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.82rem;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  line-height: 1.1;
`;

const Summary = styled.p`
  max-width: 760px;
  margin: 16px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
  gap: 24px;
  padding: 24px 28px 30px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const HighlightList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const HighlightItem = styled.li`
  position: relative;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;

  &::before {
    content: '';
    position: absolute;
    top: 0.72em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechTag = styled.span`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TerminalPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  overflow: hidden;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
`;

const MetadataList = styled.dl`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const MetadataItem = styled.div`
  display: grid;
  gap: 4px;
`;

const MetadataTerm = styled.dt`
  color: ${({ theme }) => theme.colors.accent};
`;

const MetadataValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ActionPanel = styled.div`
  display: grid;
  gap: 10px;
`;

const RouteAction = styled(Link)`
  display: block;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ExternalAction = styled.a`
  display: block;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const EmptyState = styled.div`
  padding: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface ProjectWindowProps {
  projectId: string;
}

export const ProjectWindow: React.FC<ProjectWindowProps> = ({ projectId }) => {
  const { t } = useTranslation('devos');
  const { locale } = useLocale();
  const project = getProjectById(projectId, locale);
  const projectStatusLabels = getProjectStatusLabels(locale);

  if (!project) {
    return <EmptyState>{t('projectWindow.notFound')}</EmptyState>;
  }

  return (
    <Wrapper>
      <Hero>
        <EyebrowRow>
          <StatusPill $status={project.status}>{projectStatusLabels[project.status]}</StatusPill>
          <Category>{project.category}</Category>
        </EyebrowRow>
        <Title>{project.name}</Title>
        <Summary>{project.shortDescription}</Summary>
      </Hero>

      <Content>
        <MainColumn>
          <Section>
            <SectionTitle>{t('projectWindow.overview')}</SectionTitle>
            <Description>{project.description}</Description>
          </Section>

          {project.caseStudy && <ProjectCaseStudy caseStudy={project.caseStudy} />}

          <Section>
            <SectionTitle>{t('projectWindow.highlights')}</SectionTitle>
            <HighlightList>
              {project.highlights.map(highlight => (
                <HighlightItem key={highlight}>{highlight}</HighlightItem>
              ))}
            </HighlightList>
          </Section>

          <Section>
            <SectionTitle>{t('projectWindow.technologies')}</SectionTitle>
            <TechList>
              {project.technologies.map(tech => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechList>
          </Section>
        </MainColumn>

        <SideColumn>
          <TerminalPanel>
            <TerminalHeader>
              <Dot />
              project.meta
            </TerminalHeader>
            <MetadataList>
              <MetadataItem>
                <MetadataTerm>{t('projectWindow.metadata.status')}</MetadataTerm>
                <MetadataValue>{projectStatusLabels[project.status]}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataTerm>{t('projectWindow.metadata.role')}</MetadataTerm>
                <MetadataValue>{project.role}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataTerm>{t('projectWindow.metadata.timeframe')}</MetadataTerm>
                <MetadataValue>{project.timeframe}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataTerm>{t('projectWindow.metadata.impact')}</MetadataTerm>
                <MetadataValue>{project.impact}</MetadataValue>
              </MetadataItem>
            </MetadataList>
          </TerminalPanel>

          <ActionPanel>
            {project.route && <RouteAction to={project.route}>{t('shared.openRoute')}</RouteAction>}
            {project.liveUrl && (
              <ExternalAction href={project.liveUrl} target="_blank" rel="noreferrer">
                {t('shared.liveSite')}
              </ExternalAction>
            )}
            {project.repoUrl && (
              <ExternalAction href={project.repoUrl} target="_blank" rel="noreferrer">
                {t('shared.sourceCode')}
              </ExternalAction>
            )}
          </ActionPanel>
        </SideColumn>
      </Content>
    </Wrapper>
  );
};
