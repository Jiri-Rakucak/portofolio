import styled from 'styled-components';

export const Hero = styled.section`
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: min(640px, calc(100svh - 180px));
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 1000px) { min-height: auto; }
`;

export const SceneLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1264px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
  pointer-events: none;
  @media (max-height: 700px) {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }
  @media (max-width: 1000px) { padding: 3rem 2rem 4rem; }
  @media (max-width: 640px) { padding: 2rem 1.25rem 3rem; }
`;

export const HeroCopy = styled.div`
  max-width: 480px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  text-align: right;
  pointer-events: auto;
  @media (max-width: 1000px) {
    max-width: 620px;
    margin-left: 0;
    align-items: flex-start;
    text-align: left;
  }
`;

export const Identity = styled.h1`
  margin: 0;
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.15;
  overflow-wrap: anywhere;
  @media (max-width: 1000px) {
    font-size: 2.5rem;
  }
`;

export const Role = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  line-height: 1.5;
`;

export const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.75;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem 1.5rem;
  margin-top: 0.75rem;
  @media (max-width: 1000px) {
    justify-content: flex-start;
  }
  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    > a:first-child { width: 100%; }
  }
`;
