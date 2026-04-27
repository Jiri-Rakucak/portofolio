import styled, { css } from 'styled-components';

interface WindowWrapperProps {
  isMaximized: boolean;
  isActive: boolean;
  isInteracting?: boolean;
}

export const WindowWrapper = styled.div<WindowWrapperProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  user-select: none;
  overflow: hidden;
  
  /* Styly pro normální okno */
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme.colors.border === 'none' ? 'rgba(0,0,0,0.1)' : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface}E6; /* E6 = 90% alpha */
  backdrop-filter: blur(15px);
  box-shadow: ${({ theme }) => theme.shadows.md};
  opacity: 0.95;
  transition: 
    box-shadow 0.3s ease, 
    opacity 0.3s ease, 
    border-color 0.3s ease,
    border-radius 0.3s ease,
    top ${({ isInteracting }) => (isInteracting ? '0s' : '0.3s cubic-bezier(0.25, 1, 0.5, 1)')},
    left ${({ isInteracting }) => (isInteracting ? '0s' : '0.3s cubic-bezier(0.25, 1, 0.5, 1)')},
    width ${({ isInteracting }) => (isInteracting ? '0s' : '0.3s cubic-bezier(0.25, 1, 0.5, 1)')},
    height ${({ isInteracting }) => (isInteracting ? '0s' : '0.3s cubic-bezier(0.25, 1, 0.5, 1)')};


  /* Styly pro aktivní okno */
  ${({ isActive, theme }) =>
    isActive &&
    css`
      opacity: 1;
      border-color: ${theme.colors.accent};
      box-shadow: 0 8px 30px ${theme.colors.accent}33;
    `}

  /* Styly pro maximalizované okno */
  ${({ isMaximized }) =>
    isMaximized &&
    css`
      border-radius: 0;
      border: none;
    `}
`;

export const TitleBar = styled.div`
  height: 32px;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 12px;
  cursor: move;
  color: white;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0; /* Zabrání smrštění */

  &:active {
    cursor: grabbing;
  }
`;

export const TitleText = styled.span`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const WindowControls = styled.div`
  display: flex;
  gap: 4px;
`;

export const ControlButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.close:hover {
    background: #e74c3c;
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow: auto;
  background: transparent; /* Pozadí je na WindowWrapper */
  color: ${({ theme }) => theme.colors.text};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
  }
`;

export const ResizeHandle = styled.div<{ direction: string }>`
  position: absolute;
  background: transparent;
  z-index: 10;

  ${({ direction }) => {
    switch (direction) {
      case 'n': return 'top: -4px; left: 8px; right: 8px; height: 8px; cursor: n-resize;';
      case 's': return 'bottom: -4px; left: 8px; right: 8px; height: 8px; cursor: s-resize;';
      case 'e': return 'right: -4px; top: 8px; bottom: 8px; width: 8px; cursor: e-resize;';
      case 'w': return 'left: -4px; top: 8px; bottom: 8px; width: 8px; cursor: w-resize;';
      case 'ne': return 'top: -4px; right: -4px; width: 12px; height: 12px; cursor: ne-resize;';
      case 'nw': return 'top: -4px; left: -4px; width: 12px; height: 12px; cursor: nw-resize;';
      case 'se': return 'bottom: -4px; right: -4px; width: 12px; height: 12px; cursor: se-resize;';
      case 'sw': return 'bottom: -4px; left: -4px; width: 12px; height: 12px; cursor: sw-resize;';
      default: return '';
    }
  }}
`;