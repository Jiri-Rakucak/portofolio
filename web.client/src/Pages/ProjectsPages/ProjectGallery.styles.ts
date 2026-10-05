import styled from 'styled-components';
import PortfolioImage from './PortfolioImage';

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Screenshot = styled.figure`
  margin: 0;
  min-width: 0;
`;

export const ImageButton = styled.button`
  display: block;
  padding: 0;
  border: 0;
  width: 100%;
  background: #080a0b;
  cursor: zoom-in;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
  &:hover {
    outline: 1px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const Thumbnail = styled(PortfolioImage)`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

export const Caption = styled.figcaption`
  padding-top: 0.65rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.88rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

export const Viewer = styled.dialog`
  width: min(1440px, calc(100vw - 2rem));
  max-width: none;
  max-height: calc(100dvh - 2rem);
  margin: auto;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: #080a0b;
  color: #fff;

  &::backdrop {
    background: rgba(0, 0, 0, 0.85);
  }
`;

export const ViewerToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.88rem;
`;

export const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  display: grid;
  place-items: center;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #ffffff40;
  border-radius: 4px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 1.6rem;

  &:hover:not(:disabled), &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const FullImage = styled(PortfolioImage)`
  width: 100%;
  height: min(72dvh, 850px);
`;

export const ViewerCaption = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem 1.5rem;
  padding-top: 0.9rem;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-wrap: anywhere;

  a {
    color: #fff;
    text-underline-offset: 4px;
  }
`;
