import React from 'react';
import styled from 'styled-components';
import { projects } from './ProjectData';

const Wrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 0;
`;

const Description = styled.p`
  line-height: 1.6;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 15px 0;
`;

const TechTag = styled.span`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
`;

interface ProjectWindowProps {
  projectId: string;
}

export const ProjectWindow: React.FC<ProjectWindowProps> = ({ projectId }) => {
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <Wrapper>Projekt nebyl nalezen.</Wrapper>;
  }

  return (
    <Wrapper>
      <Title>{project.name}</Title>
      <Description>{project.description}</Description>
      <h3>Použité technologie:</h3>
      <TechList>
        {project.technologies.map(tech => <TechTag key={tech}>{tech}</TechTag>)}
      </TechList>
      {/* Zde můžete přidat obrázky, odkazy atd. */}
    </Wrapper>
  );
};