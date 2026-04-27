import React from 'react';
import styled from 'styled-components';

interface TaskBarIconProps {
  // ZMĚNA: Použijeme přesnější a běžnější typ React.ComponentType
  icon: React.ComponentType<{ size?: number }>;
  onClick: () => void;
  isActive?: boolean;
  title?: string;
}

const IconWrapper = styled.button<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface}4D;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.accent};
    transform: scaleX(${({ isActive }) => (isActive ? 1 : 0)});
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }
`;

export const TaskBarIcon: React.FC<TaskBarIconProps> = ({ icon: Icon, onClick, isActive = false, title }) => {
  return (
    <IconWrapper onClick={onClick} isActive={isActive} title={title}>
      <Icon size={24} />
    </IconWrapper>
  );
};