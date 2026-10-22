import styled from "styled-components";
import { ActionAnchor, PrimaryLink, TextLink } from '../../Components/Shared/Actions';
import type { ProjectStatus } from "../../content/projects";
import PortfolioImage from './PortfolioImage';
import { angledSection } from '../../styles/angledSection';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section<{ $hasBackgroundCover: boolean }>`
  position: relative;
  isolation: isolate;
  padding: 6rem 2rem 4rem;
  min-height: ${({ $hasBackgroundCover }) => $hasBackgroundCover ? 'min(560px, 70svh)' : 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme, $hasBackgroundCover }) => $hasBackgroundCover ? '#fff' : theme.colors.text};
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${({ $hasBackgroundCover }) => $hasBackgroundCover ? 'linear-gradient(90deg, rgba(0,0,0,0.75), transparent 80%)' : 'transparent'};
    pointer-events: none;
  }
  h1 {
    max-width: 100%;
    overflow-wrap: anywhere;
    line-height: 1.15;
  }
  @media (max-width: 640px) {
    h1 {
      font-size: 2rem;
    }
  }
  @media (max-width: 900px) {
    min-height: auto;
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
    &::after { display: none; }
  }
`;

export const HeroImage = styled(PortfolioImage)`
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    position: relative;
    inset: auto;
    z-index: auto;
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;

export const InlineCoverImage = styled(PortfolioImage)`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
`;

export const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 900px) { padding: 2.5rem 2rem 3rem; }
  @media (max-width: 640px) { padding: 2rem 1.25rem 3rem; }
`;

export const EyebrowRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.2rem;
`;

export const StatusPill = styled.span<{ $status: ProjectStatus }>`
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

export const CategoryLabel = styled.span`
  color: inherit;
  font-size: 0.84rem;
`;

export const HeroDescription = styled.div`
  margin-top: 1.25rem;
  max-width: 560px;
  color: inherit;
  font-size: 1.1rem;
  line-height: 1.7;
`;

export const ContentWrapper = styled.div`
  ${angledSection}
  padding: calc(var(--section-cut) + 3rem) 2rem 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  @media (max-width: 640px) {
    padding: calc(var(--section-cut) + 2rem) 1.25rem 4rem;
    gap: 3rem;
  }
`;

export const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;





export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 300px);
  gap: 4rem;
  margin-top: 0.5rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const BodyCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  overflow-wrap: anywhere;
`;

export const HighlightList = styled.ul`
  display: grid;
  gap: 0.65rem;
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
  gap: 0.55rem;
`;

export const TechBadge = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.text};
`;





export const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const MetadataPanel = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: 1.5rem;
`;

export const MetadataList = styled.dl`
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0.9rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

export const MetadataItem = styled.div`
  display: grid;
  gap: 3px;
`;

export const MetadataTerm = styled.dt`
  color: ${({ theme }) => theme.colors.accent};
`;

export const MetadataValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: anywhere;
`;





export const PrimaryAction = PrimaryLink;
export const ExternalAction = ActionAnchor;

export const RelatedActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

export const RelatedLink = styled(TextLink)`
  align-self: flex-start;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.12rem;
  line-height: 1.8;
  max-width: 750px;
`;

export const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const StoryBlock = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
  h2 {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.15rem;
  }
`;

export const TechnicalDetails = styled.details`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  summary {
    cursor: pointer;
    padding: 1.25rem 0;
    font-size: 1.1rem;
    font-weight: 700;
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.accent};
      outline-offset: 4px;
    }
  }
`;

export const TechnicalContent = styled.div`
  display: grid;
  gap: 1.75rem;
  padding: 0.5rem 0 2rem;
`;

export const EmptyState = styled.div`
  padding: 8rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;
