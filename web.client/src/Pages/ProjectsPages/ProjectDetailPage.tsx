import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Text from "../../Components/Shared/Typography";
import {
  getProjectById,
  getPortfolioProjects,
  getProjectStatusLabels,
} from "../../content/projects";
import { useLocale } from "../../i18n/useLocale";
import { ProjectCaseStudy } from "../../Components/Applications/ProjectCaseStudy";

import {
  Container, HeroSection, EyebrowRow, StatusPill, CategoryLabel, HeroDescription,
  TagRow, Tag, ContentWrapper, Section, Divider, TwoColumn, MainColumn, SubSection,
  BodyCopy, HighlightList, HighlightItem, TechList, TechBadge, SideColumn,
  TerminalPanel, TerminalHeader, Dot, MetadataList, MetadataItem, MetadataTerm,
  MetadataValue, ActionPanel, PrimaryAction, ExternalAction, RelatedActions,
  RelatedLink, EmptyState,
} from "./ProjectDetailPage.styles";

export default function ProjectDetailPage() {
  const { projectId = "" } = useParams<{ projectId: string }>();
  const { t } = useTranslation("common");
  const { locale } = useLocale();
  const project = getProjectById(projectId, locale);
  const statusLabels = getProjectStatusLabels(locale);

  if (!project) {
    return (
      <Container>
        <EmptyState>
          <h1>{t("projectsPage.projectNotFound")}</h1>
          <PrimaryAction to="/projects">{t("projectsPage.backToProjects")}</PrimaryAction>
        </EmptyState>
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

        <Text variant="h1" as="h1">{project.name}</Text>

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
                <Text variant="h2" as="h2">
                  {t("projectsPage.overviewTitle")}
                </Text>
                <BodyCopy>{project.description}</BodyCopy>
              </SubSection>

              {project.caseStudy && <ProjectCaseStudy caseStudy={project.caseStudy} />}

              <SubSection>
                <Text variant="h2" as="h2">
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
                <Text variant="h2" as="h2">
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
                {project.route && project.route !== `/projects/${project.id}` && (
                  <PrimaryAction to={project.route}>
                    {t("projectsPage.openProject")}
                  </PrimaryAction>
                )}
                {project.liveUrl && (
                  <ExternalAction
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("projectsPage.liveSite")}
                  </ExternalAction>
                )}
                {project.repoUrl && (
                  <ExternalAction
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("projectsPage.sourceCode")}
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
              <Text variant="h2" as="h2">{t("projectsPage.relatedTitle")}</Text>
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
