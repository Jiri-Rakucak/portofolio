import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDevOs } from '../../Contexts/DevOsContext';
import HomeIcon from '../Icons/Home';
import { TaskBarIcon } from './TaskBarIcon';

// --- Styled Components pro TaskBar ---

const StyledTaskBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10000; /* Taskbar musí být vždy nahoře */
`;

const StartButton = styled.button`
  height: 100%;
  padding: 0 20px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

const TaskArea = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin: 0 10px;
`;

const SystemTray = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Clock = styled.div`
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
`;

// --- Hlavní komponenta ---

export const TaskBar: React.FC = () => {
    const { state, actions } = useDevOs();
    const [time, setTime] = useState(new Date());

    // Efekt pro aktualizaci hodin každou vteřinu
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <StyledTaskBar>
            <StartButton onClick={() => actions.toggleStartMenu()}>
                Start
            </StartButton>

            <TaskArea>
                {state.windows.map(window => {
                    // ZMĚNA: Zajistíme, že ikona není undefined před předáním.
                    let IconComponent: React.ComponentType<{ size?: number }> = HomeIcon; 
                    if (typeof window.icon === 'function') {
                        IconComponent = window.icon;
                    }
                    return (
                        <TaskBarIcon
                            key={window.id}
                            icon={IconComponent} // Předáváme ověřenou komponentu
                            onClick={() => actions.focusWindow(window.id)}
                            isActive={state.activeWindowId === window.id}
                            title={window.title}
                        />
                    );
                })}
            </TaskArea>

            <SystemTray>
                <Clock>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Clock>
            </SystemTray>
        </StyledTaskBar>
    );
};
