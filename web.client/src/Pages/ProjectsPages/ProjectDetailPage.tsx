import styled from "styled-components";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Text from "../../Components/Shared/Typography";
import {
  getProjectById,
  getPortfolioProjects,
  getProjectStatusLabels,
  type ProjectStatus,
} from "../../content/projects";
import { useLocale } from "../../i18n/useLocale";

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  padding: 6rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EyebrowRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
`;

const StatusPill = styled.span<{ $status: ProjectStatus }>`
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme, $status }) =>
    $status === "live"
      ? theme.colors.success
      : $status === "in-progress"
        ? theme.colors.accent
        : theme.colors.textSecondary};
`;

const CategoryLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.84rem;
`;

const HeroDescription = styled.div`
  margin-top: 1.5rem;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Tag = styled.span`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.84rem;
`;

const ContentWrapper = styled.div`
  margin: -2vw auto 0;
  padding: calc(10vw + 4rem) 2rem 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  clip-path: polygon(0 0, 100% 15vw, 100% 100%, 0 100%);
`;

const Section = styled.section`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0;
  width: 100%;
  max-width: 900px;
`;

/* ------------------------------------------------------------------ */
/*  Two-column layout (mirroring ProjectWindow)                        */
/* ------------------------------------------------------------------ */

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
  gap: 2.5rem;
  margin-top: 0.5rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BodyCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const HighlightList = styled.ul`
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const HighlightItem = styled.li`
  position: relative;
  padding-left: 1.15rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;

  &::before {
    content: "";
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
  gap: 0.55rem;
`;

const TechBadge = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.text};
`;

/* ------------------------------------------------------------------ */
/*  Terminal-style metadata panel                                      */
/* ------------------------------------------------------------------ */

const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const TerminalPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.65rem 0.85rem;
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
  gap: 0.85rem;
  margin: 0;
  padding: 0.9rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const MetadataItem = styled.div`
  display: grid;
  gap: 3px;
`;

const MetadataTerm = styled.dt`
  color: ${({ theme }) => theme.colors.accent};
`;

const MetadataValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

/* ------------------------------------------------------------------ */
/*  Actions and related                                                */
/* ------------------------------------------------------------------ */

const ActionPanel = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const PrimaryAction = styled(Link)`
  display: block;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ExternalAction = styled.a`
  display: block;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const RelatedActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

const RelatedLink = styled(Link)`
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  transition: all 0.2s ease;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  padding: 8rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type ProjectDetailPageProps = {
  projectId: string;
};

export default function ProjectDetailPage({
  projectId,
}: ProjectDetailPageProps) {
  const { t } = useTranslation("common");
  const { locale } = useLocale();
  const project = getProjectById(projectId, locale);
  const statusLabels = getProjectStatusLabels(locale);

  if (!project) {
    return (
      <Container>
        <EmptyState>{t("projectsPage.projectNotFound")}</EmptyState>
      </Container>
    );
  }

  const allProjects = getPortfolioProjects(locale);
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <Container>
      <HeroSection>
        <EyebrowRow>
          <StatusPill $status={project.status}>
            {statusLabels[project.status]}
          </StatusPill>
          <CategoryLabel>{project.category}</CategoryLabel>
        </EyebrowRow>

        <Text variant="h1">{project.name}</Text>

        <HeroDescription>
          <Text variant="h3">{project.shortDescription}</Text>
        </HeroDescription>

        <TagRow>
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </TagRow>
      </HeroSection>

      <ContentWrapper>
        {/* Main content – two column */}
        <Section>
          <TwoColumn>
            <MainColumn>
              <SubSection>
                <Text variant="h2">
                  {t("projectsPage.overviewTitle")}
                </Text>
                <BodyCopy>{project.description}</BodyCopy>
              </SubSection>

              <SubSection>
                <Text variant="h2">
                  {t("projectsPage.highlightsTitle")}
                </Text>
                <HighlightList>
                  {project.highlights.map((highlight) => (
                    <HighlightItem key={highlight}>
                      {highlight}
                    </HighlightItem>
                  ))}
                </HighlightList>
              </SubSection>

              <SubSection>
                <Text variant="h2">
                  {t("projectsPage.technologiesTitle")}
                </Text>
                <TechList>
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </TechList>
              </SubSection>
            </MainColumn>

            <SideColumn>
              <TerminalPanel>
                <TerminalHeader>
                  <Dot />
                  project.meta
                </TerminalHeader>
                <MetadataList>
                  <MetadataItem>
                    <MetadataTerm>
                      {t("projectsPage.metaStatus")}
                    </MetadataTerm>
                    <MetadataValue>
                      {statusLabels[project.status]}
                    </MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataTerm>
                      {t("projectsPage.metaRole")}
                    </MetadataTerm>
                    <MetadataValue>{project.role}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataTerm>
                      {t("projectsPage.metaTimeframe")}
                    </MetadataTerm>
                    <MetadataValue>{project.timeframe}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataTerm>
                      {t("projectsPage.metaImpact")}
                    </MetadataTerm>
                    <MetadataValue>{project.impact}</MetadataValue>
                  </MetadataItem>
                </MetadataList>
              </TerminalPanel>

              <ActionPanel>
                {project.route && (
                  <PrimaryAction to={project.route}>
                    {t("projectsPage.viewDetail")}
                  </PrimaryAction>
                )}
                {project.liveUrl && (
                  <ExternalAction
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </ExternalAction>
                )}
                {project.repoUrl && (
                  <ExternalAction
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </ExternalAction>
                )}
                <PrimaryAction to="/projects">
                  {t("projectsPage.backToProjects")}
                </PrimaryAction>
              </ActionPanel>
            </SideColumn>
          </TwoColumn>
        </Section>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <>
            <Divider />

            <Section>
              <Text variant="h2">{t("projectsPage.relatedTitle")}</Text>
              <Text variant="bodyS">
                {t("projectsPage.relatedDescription")}
              </Text>
              <RelatedActions>
                {relatedProjects.map((p) => (
                  <RelatedLink
                    key={p.id}
                    to={`/projects/${p.id}`}
                    viewTransition
                  >
                    {p.name}
                  </RelatedLink>
                ))}
              </RelatedActions>
            </Section>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}
