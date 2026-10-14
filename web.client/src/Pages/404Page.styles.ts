import styled from 'styled-components';

export const Page = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: min(620px, calc(100svh - 68px));
  padding: 4rem 2rem 6rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 640px) { padding: 3rem 1.25rem 4rem; }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 672px;
  min-width: 0;
  text-align: center;
`;

export const ErrorCode = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 8rem;
  font-weight: 600;
  line-height: 1;

  @media (max-width: 640px) { font-size: 6rem; }
`;

export const Heading = styled.h1`
  margin: 0;
  max-width: 100%;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  overflow-wrap: anywhere;

  @media (max-width: 640px) { font-size: 2rem; }
`;

export const Message = styled.p`
  margin: 0;
  max-width: 44ch;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.75;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem 1.5rem;
  margin-top: 0.75rem;

  a { max-width: 100%; overflow-wrap: anywhere; }
  svg { display: block; }
  @media (prefers-reduced-motion: reduce) { a { transition: none; } }
`;
