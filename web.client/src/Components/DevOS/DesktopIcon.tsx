import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Text from '../Shared/Typography';

interface DesktopIconProps {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  position: { x: number; y: number };
  onDoubleClick: () => void;
  onMove: (id: string, newPosition: { x: number; y: number }) => void;
  gridSize?: number;
}

const IconWrapper = styled.div.attrs<{ style: React.CSSProperties }>(props => ({
  style: props.style,
}))`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}33; /* 33 = ~20% alpha */
  }
`;

const IconImage = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const IconTitle = styled(Text).attrs({ variant: 'bodyXS' })`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  icon: Icon,
  title,
  position,
  onDoubleClick,
  onMove,
  gridSize = 80,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - offsetRef.current.x;
      const newY = moveEvent.clientY - offsetRef.current.y;
      onMove(id, { x: newX, y: newY }); // Okamžitá aktualizace pro plynulý pohyb
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      // Přichycení do mřížky po puštění
      const finalX = Math.round((upEvent.clientX - offsetRef.current.x) / gridSize) * gridSize;
      const finalY = Math.round((upEvent.clientY - offsetRef.current.y) / gridSize) * gridSize;
      onMove(id, { x: finalX, y: finalY });

      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <IconWrapper
      style={{ top: position.y, left: position.x, zIndex: isDragging ? 100 : 1 }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      title={title}
    >
      <IconImage>
        <Icon size={32} />
      </IconImage>
      <IconTitle>{title}</IconTitle>
    </IconWrapper>
  );
};