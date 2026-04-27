import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as S from './DraggableWindow.styles';

interface DraggableWindowProps {
  id: string;
  children: React.ReactNode;
  title?: string;
  position: { x: number; y: number }; // ZMĚNA: z initialPosition
  size: { width: number; height: number }; // ZMĚNA: z initialSize
  minWidth?: number;
  minHeight?: number;
  zIndex: number;
  isActive: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void; // PŘIDÁNO
  onResize: (id: string, size: { width: number; height: number }) => void; // PŘIDÁNO
  isMaximized: boolean;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  id, children, title = "Window", position, size, minWidth = 250, minHeight = 150,
  zIndex, isActive, onClose, onMinimize, onMaximize, onFocus, onMove, onResize, isMaximized

}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeInfo, setResizeInfo] = useState({
    direction: '', startX: 0, startY: 0, startWidth: 0, startHeight: 0, startPositionX: 0, startPositionY: 0
  });

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.nodrag')) return;
    onFocus(id);
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus(id);
    setIsResizing(true);
    setResizeInfo({
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPositionX: position.x,
      startPositionY: position.y,
    });
  };

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
        setIsDragging(false);
        // ZMĚNA: Uložíme finální pozici do kontextu
        const newPos = { x: windowRef.current?.offsetLeft ?? 0, y: windowRef.current?.offsetTop ?? 0 };
        onMove(id, newPos);
    }
    if (isResizing) {
        setIsResizing(false);
        // ZMĚNA: Uložíme finální velikost a pozici do kontextu
        const newSize = { width: windowRef.current?.offsetWidth ?? 0, height: windowRef.current?.offsetHeight ?? 0 };
        const newPos = { x: windowRef.current?.offsetLeft ?? 0, y: windowRef.current?.offsetTop ?? 0 };
        onResize(id, newSize);
        onMove(id, newPos);
    }
  }, [isDragging, isResizing, id, onMove, onResize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = windowRef.current?.parentElement;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    if (isDragging && !isMaximized) {
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      newX = Math.max(0, Math.min(newX, containerRect.width - size.width));
      newY = Math.max(0, Math.min(newY, containerRect.height - size.height));
      onMove(id, { x: newX, y: newY });
    }

    if (isResizing) {
      const { direction, startX, startY, startWidth, startHeight, startPositionX, startPositionY } = resizeInfo;
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPositionX;
      let newY = startPositionY;

      // --- OPRAVENÁ LOGIKA PRO RESIZE ---
      if (direction.includes('e')) {
        newWidth = Math.max(minWidth, startWidth + e.clientX - startX);
      }
      if (direction.includes('w')) {
        const deltaX = e.clientX - startX;
        newWidth = Math.max(minWidth, startWidth - deltaX);
        newX = startPositionX + deltaX;
      }
      if (direction.includes('s')) {
        newHeight = Math.max(minHeight, startHeight + e.clientY - startY);
      }
      if (direction.includes('n')) {
        const deltaY = e.clientY - startY;
        newHeight = Math.max(minHeight, startHeight - deltaY);
        newY = startPositionY + deltaY;
      }
      
      // Omezení pozice a velikosti
      if (newX < 0) { newWidth += newX; newX = 0; }
      if (newY < 0) { newHeight += newY; newY = 0; }
      if (newX + newWidth > containerRect.width) { newWidth = containerRect.width - newX; }
      if (newY + newHeight > containerRect.height) { newHeight = containerRect.height - newY; }

      onResize(id, { width: newWidth, height: newHeight });
      onMove(id, { x: newX, y: newY });
    }
  }, [isDragging, isResizing, dragStart, resizeInfo, size, minWidth, minHeight, isMaximized, id, onMove, onResize]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleToggleMaximize = () => {
    onMaximize(id);
  };

  const windowStyle: React.CSSProperties = isMaximized
    ? { top: 0, left: 0, width: '100%', height: '100%', zIndex }
    : { top: position.y, left: position.x, width: size.width, height: size.height, zIndex };

  const resizeHandles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  return (
    <S.WindowWrapper
      ref={windowRef}
      style={windowStyle}
      isMaximized={isMaximized}
      isActive={isActive}
      onMouseDown={() => onFocus(id)}
      isInteracting={isDragging || isResizing}
    >
      <S.TitleBar onMouseDown={handleMouseDown}>
        <S.TitleText>{title}</S.TitleText>
        <S.WindowControls className="nodrag">
          <S.ControlButton onClick={() => onMinimize(id)} title="Minimize">_</S.ControlButton>
          <S.ControlButton onClick={handleToggleMaximize} title="Maximize">{isMaximized ? '❐' : '□'}</S.ControlButton>
          <S.ControlButton className="close" onClick={() => onClose(id)} title="Close">×</S.ControlButton>
        </S.WindowControls>
      </S.TitleBar>
      <S.Content>{children}</S.Content>
      {!isMaximized && resizeHandles.map(dir => (
        <S.ResizeHandle key={dir} direction={dir} onMouseDown={(e) => handleResizeMouseDown(e, dir)} />
      ))}
    </S.WindowWrapper>
  );
};
