import styled from 'styled-components';
import { Link } from 'react-router';
import PortfolioImage from '../../Pages/ProjectsPages/PortfolioImage';
import { angledSection } from '../../styles/angledSection';

export const ProjectsSection = styled.section`
  ${angledSection}
  position: relative;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: calc(var(--section-cut) + 3rem) 2rem calc(var(--section-cut) + 4rem);
  @media (max-width: 640px) {
    padding-inline: 1.25rem;
  }
`;

export const SectionInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-bottom: 3rem;
`;

export const HeadingCopy = styled.div`
  display: grid;
  gap: 0.8rem;
  max-width: 620px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  line-height: 1.25;
  font-weight: 600;
  margin: 0;
  overflow-wrap: anywhere;
`;

export const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.75;
  overflow-wrap: anywhere;
`;

export const TextLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.65rem;
  min-height: 44px;
  max-width: 100%;
  width: fit-content;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
  svg { flex-shrink: 0; }
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

export const ProjectList = styled.div`
  display: grid;
  gap: 3rem;
`;

export const ProjectRow = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  align-items: center;
  gap: 3rem;
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.textMuted}40;
    padding-top: 3rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }
`;

export const MediaLink = styled(Link)<{ $gradient: string }>`
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ $gradient }) => $gradient};
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

export const ProjectImage = styled(PortfolioImage)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const ProjectCopy = styled.div`
  min-width: 0;
  display: grid;
  justify-items: start;
  gap: 1rem;
`;

export const ProjectMeta = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
  span:last-child { color: ${({ theme }) => theme.colors.accent}; }
`;

export const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.25;
  overflow-wrap: anywhere;
`;

export const ProjectStack = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SkillsSection = styled.section`
  ${angledSection}
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  padding: calc(var(--section-cut) + 3rem) 2rem 4rem;
  @media (max-width: 640px) {
    padding-inline: 1.25rem;
  }
`;

export const SkillsLayout = styled(SectionInner)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 4rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
`;

export const SkillsIntro = styled.div`
  display: grid;
  justify-items: start;
  gap: 1.25rem;
  max-width: 480px;
`;

export const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
`;

export const SkillItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textMuted}40;
  padding: 1rem 0;
  &:first-child { padding-top: 0; }
`;

export const SkillLink = styled(TextLink)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const SkillDescription = styled(Copy)`
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;
