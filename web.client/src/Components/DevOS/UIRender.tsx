import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { DraggableWindow } from './DraggableWindow';
import { useDevOs } from '../../Contexts/DevOsContext';
import { TaskBar } from './TaskBar';
import { DesktopIcon } from './DesktopIcon';


// --- Styled Components ---

const DevOsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DesktopArea = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  /* Umožňuje umístit TaskBar na spodek */
  padding-bottom: 50px; /* Výška TaskBaru */
`;

const DevOsTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.text} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none; /* Aby neblokoval klikání na okna */
`;

const ExitButton = styled(Link)`
  position: fixed;
  bottom: 60px; /* Posunuto nad TaskBar */
  right: 1rem;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.surface}99; /* 99 = ~60% alpha */
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10001; /* Nad TaskBarem */

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    transform: translateY(-2px);
  }
`;

const DesktopGrid = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
`;
// --- Hlavní komponenta ---

const UIRender: React.FC = () => {
    const { state, actions } = useDevOs();

    return (
        <DevOsContainer>
            <DesktopArea>
                {/* Pokud nejsou žádná okna, zobraz titul */}
                {state.windows.length === 0 && <DevOsTitle>DevOS</DevOsTitle>}
                
                {/* Renderuje pouze viditelná (ne minimalizovaná) okna */}
                {state.windows
                    .filter(window => window.state !== 'minimized')
                    .map(window => {
                        const WindowComponent = window.component as React.ComponentType<Record<string, unknown>>;

                        return (
                            <DraggableWindow
                                key={window.id}
                                id={window.id}
                                title={window.title}
                                zIndex={window.zIndex}
                                position={window.position}
                                size={window.size}
                                isActive={state.activeWindowId === window.id}
                                isMaximized={window.state === 'maximized'}
                                onClose={() => actions.closeWindow(window.id)}
                                onMinimize={() => actions.minimizeWindow(window.id)}
                                onMaximize={() => actions.maximizeWindow(window.id)}
                                onFocus={actions.focusWindow}
                                onMove={actions.updateWindowPosition}
                                onResize={actions.updateWindowSize}
                            >
                                <WindowComponent {...(window.props ?? {})} />
                            </DraggableWindow>
                        );
                    })
                }
                <DesktopGrid>
                    {/* Přidej další ikony na plochu podle potřeby */}
                    {state.desktopIcons.map(icon => (
                        <DesktopIcon
                            key={icon.id}
                            id={icon.id}
                            icon={icon.icon}
                            title={icon.title}
                            position={icon.position}
                            onDoubleClick={() => icon.onDoubleClick(state, actions)}
                            onMove={actions.updateIconPosition}
                        />
                    ))}

                </DesktopGrid>
            </DesktopArea>
            
            <TaskBar />
            <ExitButton to="/">Exit DevOS</ExitButton>
        </DevOsContainer>
    );
};

export default UIRender;
