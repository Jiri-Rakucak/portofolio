import { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Text from "../Components/Shared/Typography";
import {
  getPortfolioProjects,
  getProjectStatusLabels,
  type PortfolioProject,
} from "../content/projects";
import { useLocale } from "../i18n/useLocale";
import ArrowRight from "../Components/Icons/ArrowRight";

/* ------------------------------------------------------------------ */
/*  Gradient map – visual bg per category (placeholder for screenshots)*/
/* ------------------------------------------------------------------ */

const categoryGradients: Record<string, string> = {
  Portfolio:
    "radial-gradient(ellipse at 30% 40%, #667eea55, #764ba244), linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  "3D web":
    "radial-gradient(ellipse at 60% 30%, #f093fb44, #f5576c33), linear-gradient(135deg, #1a1a2e 0%, #2d132c 100%)",
  "3D Web":
    "radial-gradient(ellipse at 60% 30%, #f093fb44, #f5576c33), linear-gradient(135deg, #1a1a2e 0%, #2d132c 100%)",
  "Unity / Game development":
    "radial-gradient(ellipse at 70% 50%, #fa709a44, #fee14033), linear-gradient(135deg, #1a1a2e 0%, #2d1b00 100%)",
  "Unity / Game Development":
    "radial-gradient(ellipse at 70% 50%, #fa709a44, #fee14033), linear-gradient(135deg, #1a1a2e 0%, #2d1b00 100%)",
  "Obsahový systém":
    "radial-gradient(ellipse at 40% 60%, #4facfe44, #00f2fe33), linear-gradient(135deg, #1a1a2e 0%, #0a1628 100%)",
  "Content System":
    "radial-gradient(ellipse at 40% 60%, #4facfe44, #00f2fe33), linear-gradient(135deg, #1a1a2e 0%, #0a1628 100%)",
};

const fallbackGradient =
  "radial-gradient(ellipse at 50% 50%, #a18cd144, #fbc2eb33), linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 100%)";

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

const Page = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ------------------------------------------------------------------ */
/*  Carousel                                                           */
/* ------------------------------------------------------------------ */
const CarouselContainer = styled.div`
  max-width: 1264px;
  margin: 0 0;
`;

const CarouselViewport = styled.section`
  position: relative;
  height: calc(100vh - 68px);
  width: 100%;
  max-width: 1264px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
`;

const CarouselTrack = styled.div<{ $offset: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $offset }) => $offset}%);
`;

const Slide = styled.div<{ $bg: string }>`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ $bg }) => $bg};

  /* blur overlay to simulate screenshot bg */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(40px) saturate(1.4);
    -webkit-backdrop-filter: blur(40px) saturate(1.4);
  }
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 640px) {
    padding: 0 1.5rem;
  }
`;

const SlideCategory = styled.span`
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.55);
`;

const SlideTitle = styled.h2`
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.08;
  color: #fff;
  font-weight: 800;
`;

const SlideDescription = styled.p`
  margin: 0;
  max-width: 560px;
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
`;

const SlideTechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.4rem;
`;

const SlideTechPill = styled.span`
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.65);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
`;

const SlideActions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.6rem;
`;

const SlideLink = styled(Link)`
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.92rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;

/* ------------------------------------------------------------------ */
/*  Intro overlay (first slide state)                                  */
/* ------------------------------------------------------------------ */

const IntroOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

const IntroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};
`;

const IntroSubtitle = styled.p`
  margin: 1rem 0 0;
  max-width: 520px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ------------------------------------------------------------------ */
/*  Navigation arrows                                                  */
/* ------------------------------------------------------------------ */

const ArrowButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: 1.2rem;" : "right: 1.2rem;")}
  transform: translateY(-50%);
  z-index: 5;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.45);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.06);
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
    &:hover {
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.25);
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Dot indicators                                                     */
/* ------------------------------------------------------------------ */

const DotRow = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  gap: 0.55rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "28px" : "10px")};
  height: 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ $active }) =>
    $active ? "#fff" : "rgba(255, 255, 255, 0.3)"};

  &:hover {
    background: ${({ $active }) =>
      $active ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  }
`;

/* ------------------------------------------------------------------ */
/*  Detail section below carousel                                      */
/* ------------------------------------------------------------------ */

const DetailSection = styled.section`
  width: 100%;
  padding: 4rem 2rem 5rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

const DetailGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(240px, 0.7fr);
  gap: 2.5rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const DetailMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const DetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const DetailBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const HighlightList = styled.ul`
  display: grid;
  gap: 0.55rem;
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
  gap: 0.5rem;
`;

const TechBadge = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.text};
`;

const DetailSide = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const TerminalDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
`;

const MetaList = styled.dl`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0.85rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const MetaItem = styled.div`
  display: grid;
  gap: 3px;
`;

const MetaTerm = styled.dt`
  color: ${({ theme }) => theme.colors.accent};
`;

const MetaValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const { t } = useTranslation("common");
  const { locale } = useLocale();
  const projects = getPortfolioProjects(locale);
  const statusLabels = getProjectStatusLabels(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      setIntroVisible(false);
      setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)));
    },
    [projects.length],
  );

  const goNext = useCallback(() => {
    if (introVisible) {
      setIntroVisible(false);
      setActiveIndex(0);
    } else {
      goTo(activeIndex + 1);
    }
  }, [introVisible, activeIndex, goTo]);

  const goPrev = useCallback(() => {
    if (activeIndex === 0 && !introVisible) {
      setIntroVisible(true);
    } else {
      goTo(activeIndex - 1);
    }
  }, [activeIndex, introVisible, goTo]);

  const active: PortfolioProject | undefined = projects[activeIndex];

  return (
    <Page>
      {/* ---- Carousel ---- */}
      <CarouselContainer>
        <CarouselViewport>
          {/* Intro overlay */}
          <IntroOverlay $visible={introVisible}>
            <IntroTitle>{t("projectsPage.title")}</IntroTitle>
            <IntroSubtitle>{t("projectsPage.description")}</IntroSubtitle>
          </IntroOverlay>

          {/* Slides */}
          <CarouselTrack $offset={-activeIndex * 100}>
            {projects.map((project) => (
              <Slide
                key={project.id}
                $bg={categoryGradients[project.category] ?? fallbackGradient}
              >
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
                  <SlideActions>
                    <SlideLink to={`/projects/${project.id}`}>
                      {t("projectsPage.viewDetail")}
                    </SlideLink>
                  </SlideActions>
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
                />
              ))}
            </DotRow>
          )}
        </CarouselViewport>

        {/* Arrows */}
        <ArrowButton
          $side="left"
          onClick={goPrev}
          disabled={introVisible}
          aria-label="Previous project"
        >
          <ArrowRight size={24} />
        </ArrowButton>
        <ArrowButton
          $side="right"
          onClick={goNext}
          disabled={!introVisible && activeIndex === projects.length - 1}
          aria-label="Next project"
        >
          <ArrowRight size={24} />
        </ArrowButton>
      </CarouselContainer>

      {/* ---- Detail below ---- */}
      {active && !introVisible && (
        <DetailSection>
          <DetailGrid>
            <DetailMain>
              <DetailBlock>
                <Text variant="h2">{t("projectsPage.overviewTitle")}</Text>
                <DetailBody>{active.description}</DetailBody>
              </DetailBlock>

              <DetailBlock>
                <Text variant="h2">{t("projectsPage.highlightsTitle")}</Text>
                <HighlightList>
                  {active.highlights.map((h) => (
                    <HighlightItem key={h}>{h}</HighlightItem>
                  ))}
                </HighlightList>
              </DetailBlock>

              <DetailBlock>
                <Text variant="h2">{t("projectsPage.technologiesTitle")}</Text>
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
