import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Text from "../Components/Shared/Typography";
import {
  getPortfolioProjects,
  getProjectStatusLabels,
  type PortfolioProject,
} from "../content/projects";
import { useLocale } from "../i18n/useLocale";
import { ArrowRight, ArrowLeft } from "../Components/Icons/Arrows";

import {
  Page, PageTitle, ArrowScope, CarouselContainer, CarouselViewport, CarouselTrack,
  Slide, SlideCover, SlideContent, SlideCategory, SlideTitle, SlideDescription, SlideTechRow,
  SlideTechPill, IntroOverlay, IntroTitle, IntroSubtitle, ArrowButton, DotRow, Dot,
  DetailSection, DetailGrid, DetailMain, DetailBlock, DetailBody, HighlightList,
  HighlightItem, TechList, TechBadge, DetailSide, TerminalPanel, TerminalHeader,
  TerminalDot, MetaList, MetaItem, MetaTerm, MetaValue, DetailLink,
} from "./ProjectsPages/ProjectsPage.styles";
import { projectGradients, fallbackGradient } from '../styles/projectMedia';

export default function ProjectsPage() {
  const { t } = useTranslation("common");
  const { locale } = useLocale();
  const projects = getPortfolioProjects(locale);
  const statusLabels = getProjectStatusLabels(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      if (projects.length === 0) return;
      setIntroVisible(false);
      setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)));
    },
    [projects.length],
  );

  const goNext = useCallback(() => {
    if (projects.length === 0) return;
    if (introVisible) {
      setIntroVisible(false);
      setActiveIndex(0);
    } else {
      goTo(activeIndex + 1);
    }
  }, [introVisible, activeIndex, goTo, projects.length]);

  const goPrev = useCallback(() => {
    if (introVisible) return;
    if (activeIndex === 0 && !introVisible) {
      setIntroVisible(true);
    } else {
      goTo(activeIndex - 1);
    }
  }, [activeIndex, introVisible, goTo]);

  const active: PortfolioProject | undefined = projects[activeIndex];

  return (
    <Page>
      <PageTitle>{t("projectsPage.title")}</PageTitle>
      {/* ---- Carousel ---- */}
      <ArrowScope
        role="region"
        aria-label={t("projectsPage.title")}
        aria-roledescription={t("projectsPage.carousel")}
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goNext();
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            goPrev();
          }
        }}
      >
        <CarouselContainer>
          <CarouselViewport>
            {/* Intro overlay */}
            <IntroOverlay $visible={introVisible} inert={!introVisible} aria-hidden={!introVisible}>
              <IntroTitle>{t("projectsPage.title")}</IntroTitle>
              <IntroSubtitle>
                {t(projects.length ? "projectsPage.description" : "projectsPage.empty")}
              </IntroSubtitle>
            </IntroOverlay>

            {/* Slides */}
            <CarouselTrack $offset={-activeIndex * 100}>
              {projects.map((project, index) => (
                <Slide
                  key={project.id}
                  $bg={projectGradients[project.id] ?? fallbackGradient}
                  $hasCover={Boolean(project.cover?.src)}
                  inert={introVisible || index !== activeIndex}
                  aria-hidden={introVisible || index !== activeIndex}
                >
                  {project.cover?.src && (
                    <SlideCover src={project.cover.src} alt={project.cover.alt}
                      fit="cover" position="75% center" />
                  )}
                  <SlideContent>
                    <SlideCategory>{project.category}</SlideCategory>
                    <SlideTitle>{project.name}</SlideTitle>
                    <SlideDescription>
                      {project.shortDescription}
                    </SlideDescription>
                    <SlideTechRow>
                      {project.technologies.slice(0, 5).map((tech) => (
                        <SlideTechPill key={tech}>{tech}</SlideTechPill>
                      ))}
                    </SlideTechRow>
                  </SlideContent>
                </Slide>
              ))}
            </CarouselTrack>

            {/* Dots */}
            {!introVisible && (
              <DotRow>
                {projects.map((p, i) => (
                  <Dot
                    key={p.id}
                    $active={i === activeIndex}
                    onClick={() => goTo(i)}
                    aria-label={p.name}
                    aria-current={i === activeIndex ? "true" : undefined}
                    type="button"
                  />
                ))}
              </DotRow>
            )}
          </CarouselViewport>
        </CarouselContainer>

        {/* Arrows */}
        <ArrowButton
          $side="left"
          onClick={goPrev}
          disabled={introVisible}
          aria-label={t("projectsPage.previousProject")}
          type="button"
        >
          <ArrowLeft size={24} />
        </ArrowButton>
        <ArrowButton
          $side="right"
          onClick={goNext}
          disabled={projects.length === 0 || (!introVisible && activeIndex === projects.length - 1)}
          aria-label={t("projectsPage.nextProject")}
          type="button"
        >
          <ArrowRight size={24} />
        </ArrowButton>
      </ArrowScope>

      {/* ---- Detail below ---- */}
      {active && !introVisible && (
        <DetailSection aria-label={active.name}>
          <DetailGrid>
            <DetailMain>
              <DetailBlock>
                <Text variant="h2" as="h2">{t("projectsPage.overviewTitle")}</Text>
                <DetailBody>{active.description}</DetailBody>
                <DetailLink to={`/projects/${active.id}`} viewTransition>
                  {t("projectsPage.viewDetail")} <ArrowRight size={18} />
                </DetailLink>
              </DetailBlock>

              <DetailBlock>
                <Text variant="h2" as="h2">{t("projectsPage.highlightsTitle")}</Text>
                <HighlightList>
                  {active.highlights.map((h) => (
                    <HighlightItem key={h}>{h}</HighlightItem>
                  ))}
                </HighlightList>
              </DetailBlock>

              <DetailBlock>
                <Text variant="h2" as="h2">{t("projectsPage.technologiesTitle")}</Text>
                <TechList>
                  {active.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </TechList>
              </DetailBlock>
            </DetailMain>

            <DetailSide>
              <TerminalPanel>
                <TerminalHeader>
                  <TerminalDot />
                  project.meta
                </TerminalHeader>
                <MetaList>
                  <MetaItem>
                    <MetaTerm>{t("projectsPage.metaStatus")}</MetaTerm>
                    <MetaValue>{statusLabels[active.status]}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaTerm>{t("projectsPage.metaRole")}</MetaTerm>
                    <MetaValue>{active.role}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaTerm>{t("projectsPage.metaTimeframe")}</MetaTerm>
                    <MetaValue>{active.timeframe}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaTerm>{t("projectsPage.metaImpact")}</MetaTerm>
                    <MetaValue>{active.impact}</MetaValue>
                  </MetaItem>
                </MetaList>
              </TerminalPanel>
            </DetailSide>
          </DetailGrid>
        </DetailSection>
      )}
    </Page>
  );
}
