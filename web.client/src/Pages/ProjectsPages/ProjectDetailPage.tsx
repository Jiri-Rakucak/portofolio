import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Text from "../../Components/Shared/Typography";
import {
  getProjectById,
  getPortfolioProjects,
  getProjectStatusLabels,
} from "../../content/projects";
import { useLocale } from "../../i18n/useLocale";
import ProjectGallery from "./ProjectGallery";
import ProjectStory from "./ProjectStory";
import {
  Container,
  HeroSection,
  HeroImage,
  InlineCoverImage,
  HeroContent,
  EyebrowRow,
  StatusPill,
  CategoryLabel,
  HeroDescription,
  HeroActions,
  ContentWrapper,
  Section,
  TwoColumn,
  MainColumn,
  SubSection,
  Lead,
  BodyCopy,
  HighlightList,
  HighlightItem,
  TechList,
  TechBadge,
  SideColumn,
  MetadataPanel,
  MetadataList,
  MetadataItem,
  MetadataTerm,
  MetadataValue,
  PrimaryAction,
  ExternalAction,
  RelatedActions,
  RelatedLink,
  EmptyState,
  TechnicalDetails,
  TechnicalContent,
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
          <PrimaryAction to="/projects">
            {t("projectsPage.backToProjects")}
          </PrimaryAction>
        </EmptyState>
      </Container>
    );
  }

  const study = project.caseStudy;
  const cover = project.cover?.src?.trim() ? project.cover : undefined;
  const hasBackgroundCover = Boolean(cover && cover.presentation !== "inline");
  const assets = study?.assets ?? [];
  const hasImages = assets.some(
    (asset) => asset.type === "image" && asset.src?.trim(),
  );
  const resources = assets.filter(
    (asset) => asset.type !== "image" && asset.src?.trim(),
  );
  const relatedProjects = getPortfolioProjects(locale)
    .filter((item) => item.id !== project.id)
    .slice(0, 3);

  return (
    <Container>
      <HeroSection
        $hasBackgroundCover={hasBackgroundCover}
        data-cover-presentation={hasBackgroundCover ? "background" : "none"}
      >
        {cover && hasBackgroundCover && (
          <HeroImage
            src={cover.src}
            alt={cover.alt}
            fit="cover"
            position="75% center"
            loading="eager"
            fetchPriority="high"
          />
        )}
        <HeroContent>
          <EyebrowRow>
            <StatusPill $status={project.status}>
              {statusLabels[project.status]}
            </StatusPill>
            <CategoryLabel>{project.category}</CategoryLabel>
          </EyebrowRow>
          <Text variant="h1" as="h1">
            {project.name}
          </Text>
          <HeroDescription>{project.shortDescription}</HeroDescription>
          <HeroActions>
            {project.liveUrl && (
              <ExternalAction
                $variant="primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                {project.liveLabel || t("projectsPage.liveSite")}
              </ExternalAction>
            )}
            {project.repoUrl && (
              <ExternalAction
                $variant={project.liveUrl ? 'secondary' : 'primary'}
                $onMedia={hasBackgroundCover}
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t("projectsPage.sourceCode")}
              </ExternalAction>
            )}
            {project.route && project.route !== `/projects/${project.id}` && (
              <PrimaryAction to={project.route}>
                {t("projectsPage.openProject")}
              </PrimaryAction>
            )}
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <ContentWrapper>
        {cover && !hasBackgroundCover && (
          <Section
            aria-label={t("projectsPage.previewTitle")}
            data-cover-presentation="inline"
          >
            <InlineCoverImage
              src={cover.src}
              alt={cover.alt}
              fit="contain"
              loading="lazy"
            />
          </Section>
        )}
        <Section>
          <TwoColumn>
            <MainColumn>
              <Text variant="h2" as="h2">
                {t(
                  study?.motivation
                    ? "projectsPage.motivationTitle"
                    : "projectsPage.overviewTitle",
                )}
              </Text>
              <Lead>{study?.motivation || project.description}</Lead>
            </MainColumn>
            <SideColumn>
              <MetadataPanel>
                <MetadataList>
                  <MetadataItem>
                    <MetadataTerm>{t("projectsPage.metaRole")}</MetadataTerm>
                    <MetadataValue>{project.role}</MetadataValue>
                  </MetadataItem>
                  <MetadataItem>
                    <MetadataTerm>
                      {t("projectsPage.metaTimeframe")}
                    </MetadataTerm>
                    <MetadataValue>{project.timeframe}</MetadataValue>
                  </MetadataItem>
                </MetadataList>
              </MetadataPanel>
            </SideColumn>
          </TwoColumn>
        </Section>

        {hasImages && (
          <Section aria-label={t("projectsPage.galleryTitle")}>
            <Text variant="h2" as="h2">
              {t("projectsPage.galleryTitle")}
            </Text>
            <ProjectGallery key={project.id} assets={assets} />
          </Section>
        )}

        {study && <ProjectStory caseStudy={study} />}

        <Section>
          <TechnicalDetails>
            <summary>{t("projectsPage.technicalTitle")}</summary>
            <TechnicalContent>
              <SubSection>
                <Text variant="h3" as="h3">
                  {t("projectsPage.highlightsTitle")}
                </Text>
                <HighlightList>
                  {project.highlights.map((highlight) => (
                    <HighlightItem key={highlight}>{highlight}</HighlightItem>
                  ))}
                </HighlightList>
              </SubSection>
              <SubSection>
                <Text variant="h3" as="h3">
                  {t("projectsPage.technologiesTitle")}
                </Text>
                <TechList>
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </TechList>
              </SubSection>
              {study?.sections?.map((note) => (
                <SubSection key={note.title}>
                  <Text variant="h3" as="h3">
                    {note.title}
                  </Text>
                  <BodyCopy>{note.body}</BodyCopy>
                </SubSection>
              ))}
            </TechnicalContent>
          </TechnicalDetails>
        </Section>

        {resources.length > 0 && (
          <Section>
            <Text variant="h2" as="h2">
              {t("projectsPage.resourcesTitle")}
            </Text>
            <RelatedActions>
              {resources.map((asset) => (
                <ExternalAction
                  key={asset.src}
                  $variant="secondary"
                  href={asset.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  {asset.label}
                </ExternalAction>
              ))}
            </RelatedActions>
          </Section>
        )}

        <Section>
          <RelatedLink to="/projects">
            {t("projectsPage.backToProjects")}
          </RelatedLink>
          {relatedProjects.length > 0 && (
            <>
              <Text variant="h2" as="h2">
                {t("projectsPage.relatedTitle")}
              </Text>
              <RelatedActions>
                {relatedProjects.map((item) => (
                  <RelatedLink
                    key={item.id}
                    to={`/projects/${item.id}`}
                  >
                    {item.name}
                  </RelatedLink>
                ))}
              </RelatedActions>
            </>
          )}
        </Section>
      </ContentWrapper>
    </Container>
  );
}
