import HomeHero from './HomeHero';
import HomeProjects from './HomeProjects';
import HomeSkills from './HomeSkills';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  width: 100%;
`;

export default function DesktopHomeLayout() {
  return (
    <Container>
      <HomeHero />
      <HomeProjects />
      <HomeSkills />
    </Container>
  );
}
