import styled from "styled-components";
import PortfolioImage from './PortfolioImage';
import { IconButton, TextLink } from '../../Components/Shared/Actions';

export const Page = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;




export const ArrowScope = styled.div`
  max-width: 1480px;
  width: 100%;
  position: relative;
`;

export const CarouselContainer = styled.div`
  max-width: 1264px;
  margin: 0 auto;
`;

export const CarouselViewport = styled.section`
  position: relative;
  display: grid;
  min-height: max(520px, calc(100svh - 120px));
  width: 100%;
  max-width: 1264px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  touch-action: pan-y pinch-zoom;
  @media (max-width: 900px) {
    height: auto;
    min-height: 0;
    border-radius: 0;
  }
`;

export const CarouselTrack = styled.div<{ $offset: number; $introVisible: boolean }>`
  display: flex;
  min-width: 0;
  width: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $offset }) => $offset}%);
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  @media (max-width: 900px) {
    display: ${({ $introVisible }) => $introVisible ? 'none' : 'grid'};
    height: auto;
    transform: none;
    transition: none;
  }
`;

export const Slide = styled.div<{ $bg: string; $hasCover: boolean; $active: boolean }>`
  flex: 0 0 100%;
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ $bg }) => $bg};

  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: ${({ $hasCover }) => $hasCover ? 'linear-gradient(90deg, rgba(0,0,0,0.75), transparent 85%)' : 'transparent'};
    backdrop-filter: ${({ $hasCover }) => $hasCover ? 'none' : 'blur(40px) saturate(1.4)'};
    -webkit-backdrop-filter: ${({ $hasCover }) => $hasCover ? 'none' : 'blur(40px) saturate(1.4)'};
  }
  @media (max-width: 900px) {
    display: ${({ $active }) => $active ? 'flex' : 'none'};
    height: auto;
    min-width: 0;
    background: ${({ theme }) => theme.colors.background};
    &::before { display: none; }
  }
`;

export const SlideMedia = styled.div<{ $bg: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $bg }) => $bg};
  @media (max-width: 900px) {
    position: relative;
    inset: auto;
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

export const SlideCover = styled(PortfolioImage)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  padding: 3rem 5.5rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 900px) {
    padding: 2rem;
    gap: 0.8rem;
  }
  @media (max-width: 640px) { padding: 1.75rem 1.25rem 1rem; }
`;

export const SlideCategory = styled.span`
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.55);
  @media (max-width: 900px) { color: ${({ theme }) => theme.colors.textSecondary}; }
`;

export const SlideTitle = styled.h2`
  margin: 0;
  font-size: 3.6rem;
  overflow-wrap: anywhere;
  line-height: 1.08;
  color: #fff;
  font-weight: 800;
  @media (max-width: 900px) { font-size: 2.5rem; color: ${({ theme }) => theme.colors.text}; }
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const SlideDescription = styled.p`
  margin: 0;
  max-width: 560px;
  font-size: 1.05rem;
  line-height: 1.65;
  overflow-wrap: anywhere;
  color: rgba(255, 255, 255, 0.72);
  @media (max-width: 900px) { color: ${({ theme }) => theme.colors.textSecondary}; }
`;

export const SlideTechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.4rem;
`;

export const SlideTechPill = styled.span`
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.65);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  overflow-wrap: anywhere;
  max-width: 100%;
  @media (max-width: 900px) {
    color: ${({ theme }) => theme.colors.textSecondary};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;





export const IntroOverlay = styled.div<{ $visible: boolean }>`
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
  @media (max-width: 900px) {
    display: ${({ $visible }) => $visible ? 'flex' : 'none'};
    position: relative;
    inset: auto;
    min-height: 280px;
    padding: 3rem 1.25rem 2rem;
    text-align: left;
    align-items: flex-start;
    transition: none;
  }
`;

export const IntroTitle = styled.h2`
  margin: 0;
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 640px) {
    font-size: 2.4rem;
  }
`;

export const IntroSubtitle = styled.p`
  margin: 1rem 0 0;
  max-width: 520px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;





export const CarouselControls = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  > * { pointer-events: auto; }
  @media (max-width: 900px) {
    position: relative;
    inset: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.25rem 1.5rem;
  }
`;

export const ArrowButton = styled(IconButton)<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: 1.2rem;" : "right: 1.2rem;")}
  transform: translateY(-50%);
  z-index: 5;
  width: 52px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  @media (max-width: 900px) {
    position: static;
    transform: none;
    width: 44px;
    height: 44px;
  }
`;





export const DotRow = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  gap: 1rem;
  @media (max-width: 900px) {
    position: static;
    transform: none;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0;
    max-width: calc(100% - 104px);
  }
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  padding: 0;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  display: grid;
  place-items: center;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const PageTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
`;

export const DetailLink = TextLink;





export const DetailSection = styled.section`
  width: 100%;
  padding: 4rem 2rem 5rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

export const DetailGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(240px, 0.7fr);
  gap: 2.5rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const DetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const DetailBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

export const HighlightList = styled.ul`
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const HighlightItem = styled.li`
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

export const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TechBadge = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const DetailSide = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TerminalPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

export const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

export const TerminalDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
`;

export const MetaList = styled.dl`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0.85rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

export const MetaItem = styled.div`
  display: grid;
  gap: 3px;
`;

export const MetaTerm = styled.dt`
  color: ${({ theme }) => theme.colors.accent};
`;

export const MetaValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;
