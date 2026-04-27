import React, { useState } from 'react';
import styled from 'styled-components';
import { useDevOs } from '../../Contexts/DevOsContext';
import { fileSystem } from './ProjectData';
import { ProjectWindow } from './ProjectWindow';
import FolderIcon from '../Icons/Folder';
import FileIcon from '../Icons/File';

// --- Styled Components ---
const ExplorerWrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.surface};
`;

const SidebarItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ isActive, theme }) => isActive ? theme.colors.accent + '33' : 'transparent'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 20px;
  overflow-y: auto;
`;

const FileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const ItemLabel = styled.span`
  font-size: 12px;
  margin-top: 8px;
  word-break: break-word;
`;

// --- Komponenta ---
const Explorer: React.FC = () => {
    const { actions, state } = useDevOs();
    const [currentPath, setCurrentPath] = useState<keyof typeof fileSystem>('Projekty');

    const handleFileDoubleClick = (fileId: string, fileName: string) => {
        actions.createWindow({
            type: 'app',
            title: fileName,
            icon: FileIcon,
            component: ProjectWindow,
            props: { projectId: fileId },
            size: { width: 500, height: 400 },
            position: { x: 250, y: 150 },
        });
    };

    const content = fileSystem[currentPath];

    return (
        <ExplorerWrapper>
            <Sidebar>
                {Object.keys(fileSystem).map(folderName => (
                    <SidebarItem
                        key={folderName}
                        isActive={currentPath === folderName}
                        onClick={() => setCurrentPath(folderName as keyof typeof fileSystem)}
                    >
                        <FolderIcon size={20} />
                        <span>{folderName}</span>
                    </SidebarItem>
                ))}
            </Sidebar>
            <ContentArea>
                {/* ZMĚNA: Logika pro zobrazení obsahu */}
                {currentPath === 'Plocha' ? (
                    // Pokud jsme ve složce Plocha, použijeme ikony z kontextu
                    state.desktopIcons.map(icon => {
                        const IconComponent = icon.icon;
                        return (
                            <FileItem
                                key={icon.id}
                                onDoubleClick={() => icon.onDoubleClick(state, actions)}
                            >
                                <IconComponent size={48} />
                                <ItemLabel>{icon.title}</ItemLabel>
                            </FileItem>
                        );
                    })
                ) : content.length === 0 ? (
                    // Jinak standardní chování
                    <p>Tato složka je prázdná.</p>
                ) : (
                    content.map(item => (
                        <FileItem key={item.name} onDoubleClick={() => handleFileDoubleClick(item.id, item.name)}>
                            <FileIcon size={48} />
                            <ItemLabel>{item.name}</ItemLabel>
                        </FileItem>
                    ))
                )}
            </ContentArea>
        </ExplorerWrapper>
    );
};

export default Explorer;
