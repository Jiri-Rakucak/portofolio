import styled from "styled-components";
import { Link } from "react-router";
import type { ProjectStatus } from "../../content/projects";
import PortfolioImage from './PortfolioImage';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section<{ $hasCover: boolean }>`
  position: relative;
  isolation: isolate;
  padding: 6rem 2rem 4rem;
  min-height: ${({ $hasCover }) => $hasCover ? 'min(560px, 70svh)' : 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme, $hasCover }) => $hasCover ? '#fff' : theme.colors.text};
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${({ $hasCover }) => $hasCover ? 'linear-gradient(90deg, rgba(0,0,0,0.75), transparent 80%)' : 'transparent'};
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
`;

export const HeroImage = styled(PortfolioImage)`
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
`;

export const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  margin: -36px auto 0;
  padding: 5rem 2rem 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  clip-path: polygon(0 0, 100% 36px, 100% 100%, 0 100%);
  @media (max-width: 640px) {
    padding: 4rem 1.25rem;
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

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0;
  width: 100%;
  max-width: 1200px;
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





export const PrimaryAction = styled(Link)`
  display: block;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  text-align: center;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const ExternalAction = styled.a`
  display: block;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  text-align: center;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const RelatedActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

export const RelatedLink = styled(Link)`
  align-self: flex-start;
  max-width: 100%;
  overflow-wrap: anywhere;
  padding: 0.6rem 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  transition: all 0.2s ease;
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
  ${ExternalAction} {
    color: inherit;
    border-color: currentColor;
    padding: 0.75rem 1.25rem;
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
