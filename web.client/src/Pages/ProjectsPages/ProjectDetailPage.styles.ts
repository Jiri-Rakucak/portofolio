import styled from "styled-components";
import { Link } from "react-router";
import type { ProjectStatus } from "../../content/projects";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section`
  padding: 6rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h1 {
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  @media (max-width: 640px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const EyebrowRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
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
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.84rem;
`;

export const HeroDescription = styled.div`
  margin-top: 1.5rem;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-top: 2rem;
`;

export const Tag = styled.span`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.84rem;
`;

export const ContentWrapper = styled.div`
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

export const Section = styled.section`
  max-width: 900px;
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
  max-width: 900px;
`;





export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
  gap: 2.5rem;
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
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
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





export const ActionPanel = styled.div`
  display: grid;
  gap: 0.65rem;
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

export const EmptyState = styled.div`
  padding: 8rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;
