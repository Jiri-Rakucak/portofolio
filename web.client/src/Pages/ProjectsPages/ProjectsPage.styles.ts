import styled from "styled-components";
import { Link } from "react-router";

export const projectGradients: Record<string, string> = {
  "devos-portfolio":
    "radial-gradient(ellipse at 30% 40%, #667eea55, #764ba244), linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  "unity-graduation-game":
    "radial-gradient(ellipse at 70% 50%, #fa709a44, #fee14033), linear-gradient(135deg, #1a1a2e 0%, #2d1b00 100%)",
  "service-pages":
    "radial-gradient(ellipse at 40% 60%, #4facfe44, #00f2fe33), linear-gradient(135deg, #1a1a2e 0%, #0a1628 100%)",
  ragsystem:
    "radial-gradient(ellipse at 60% 30%, #00f2fe44, #4facfe33), linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
};

export const fallbackGradient =
  "radial-gradient(ellipse at 50% 50%, #a18cd144, #fbc2eb33), linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 100%)";





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
  height: calc(100svh - 120px);
  min-height: 520px;
  width: 100%;
  max-width: 1264px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
`;

export const CarouselTrack = styled.div<{ $offset: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $offset }) => $offset}%);
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Slide = styled.div<{ $bg: string }>`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ $bg }) => $bg};

  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(40px) saturate(1.4);
    -webkit-backdrop-filter: blur(40px) saturate(1.4);
  }
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  padding: 3rem 5.5rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 640px) {
    padding: 2rem 4.5rem 4rem;
    gap: 0.8rem;
  }
`;

export const SlideCategory = styled.span`
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.55);
`;

export const SlideTitle = styled.h2`
  margin: 0;
  font-size: 3.6rem;
  overflow-wrap: anywhere;
  line-height: 1.08;
  color: #fff;
  font-weight: 800;
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const SlideDescription = styled.p`
  margin: 0;
  max-width: 560px;
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
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
`;

export const IntroTitle = styled.h2`
  margin: 0;
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
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





export const ArrowButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: 1.2rem;" : "right: 1.2rem;")}
  transform: translateY(-50%);
  padding: 0;
  padding-left: ${({ $side }) => ($side === "left" ? "0" : "3px")};
  padding-right: ${({ $side }) => ($side === "right" ? "0" : "3px")};
  z-index: 5;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-50%) scale(1.06);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
    &:hover {
      transform: translateY(-50%);
      background: ${({ theme }) => theme.colors.backgroundSecondary};
    }
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
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: 32px;
  height: 32px;
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
      $active ? theme.colors.text : theme.colors.backgroundSecondary};
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

export const DetailLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  padding: 0.5rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;





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
