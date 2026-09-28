import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  getProjectById,
  getPortfolioProjects,
  getProjectStatusLabels,
} from '../../content/projects';
import { getServices } from '../../content/services';
import { useDevOs } from '../../Contexts/DevOsContext';
import { useLocale } from '../../i18n/useLocale';
import FileIcon from '../Icons/File';
import { ProjectWindow } from './ProjectWindow';

type TerminalLine = {
  id: number;
  kind: 'system' | 'command' | 'output' | 'error';
  text: string;
};

const TerminalWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #08090c;
  color: #d6f8d6;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.86rem;
`;

const Output = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Line = styled.div<{ $kind: TerminalLine['kind'] }>`
  white-space: pre-wrap;
  line-height: 1.5;
  color: ${({ $kind }) => {
    if ($kind === 'command') return '#79c0ff';
    if ($kind === 'error') return '#ff7b72';
    if ($kind === 'system') return '#a5d6ff';
    return '#d6f8d6';
  }};
`;

const InputRow = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
`;

const Prompt = styled.span`
  color: #79c0ff;
`;

const CommandInput = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #d6f8d6;
  font: inherit;
`;

const createInitialLines = (version: string, intro: string): TerminalLine[] => [
  {
    id: 1,
    kind: 'system',
    text: version,
  },
  {
    id: 2,
    kind: 'output',
    text: intro,
  },
];

const formatList = (items: string[]) => items.map(item => `  - ${item}`).join('\n');

const Terminal: React.FC = () => {
  const { t } = useTranslation('devos');
  const { locale } = useLocale();
  const { actions } = useDevOs();
  const initialLines = useMemo(
    () => createInitialLines(t('terminal.version'), t('terminal.intro')),
    [t],
  );
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [command, setCommand] = useState('');
  const nextLineId = useRef(initialLines.length + 1);
  const projects = useMemo(() => getPortfolioProjects(locale), [locale]);
  const services = useMemo(() => getServices(locale), [locale]);
  const projectStatusLabels = getProjectStatusLabels(locale);

  const projectIds = useMemo(
    () => projects.map(project => project.id).join(', '),
    [projects]
  );

  useEffect(() => {
    setLines(currentLines => {
      const canReplaceIntro =
        currentLines.length === 2 &&
        currentLines[0]?.kind === 'system' &&
        currentLines[1]?.kind === 'output';

      if (!canReplaceIntro) return currentLines;

      nextLineId.current = initialLines.length + 1;
      return initialLines;
    });
  }, [initialLines]);

  const appendLines = (newLines: Omit<TerminalLine, 'id'>[]) => {
    setLines(currentLines => [
      ...currentLines,
      ...newLines.map(line => ({
        ...line,
        id: nextLineId.current++,
      })),
    ]);
  };

  const openProject = (projectId: string) => {
    const project = getProjectById(projectId, locale);
    if (!project) {
      appendLines([
        {
          kind: 'error',
          text: t('terminal.projectNotFound', { projectId, projectIds }),
        },
      ]);
      return;
    }

    actions.createWindow({
      type: 'app',
      title: project.name,
      icon: FileIcon,
      component: ProjectWindow,
      props: { projectId },
      size: { width: 760, height: 560 },
      position: { x: 240, y: 110 },
    });

    appendLines([
      {
        kind: 'output',
        text: t('terminal.openedCaseStudy', { projectName: project.name }),
      },
    ]);
  };

  const runCommand = (rawCommand: string) => {
    const trimmedCommand = rawCommand.trim();
    if (!trimmedCommand) return;

    appendLines([{ kind: 'command', text: `$ ${trimmedCommand}` }]);

    const [name, ...args] = trimmedCommand.split(/\s+/);
    const normalizedName = name.toLowerCase();

    if (normalizedName === 'clear') {
      setLines([]);
      return;
    }

    if (normalizedName === 'help') {
      appendLines([
        {
          kind: 'output',
          text: t('terminal.help'),
        },
      ]);
      return;
    }

    if (normalizedName === 'about') {
      appendLines([
        {
          kind: 'output',
          text: t('terminal.about'),
        },
      ]);
      return;
    }

    if (normalizedName === 'projects') {
      appendLines([
        {
          kind: 'output',
          text: projects
            .map(project => `${project.id}\n  ${project.name} | ${projectStatusLabels[project.status]} | ${project.category}`)
            .join('\n\n'),
        },
      ]);
      return;
    }

    if (normalizedName === 'project') {
      const projectId = args[0];
      const project = projectId ? getProjectById(projectId, locale) : undefined;

      if (!projectId || !project) {
        appendLines([
          {
            kind: 'error',
            text: t('terminal.projectUsage', { projectIds }),
          },
        ]);
        return;
      }

      appendLines([
        {
          kind: 'output',
          text: [
            `${project.name}`,
            `${projectStatusLabels[project.status]} | ${project.category}`,
            project.shortDescription,
            '',
            t('terminal.highlights'),
            formatList(project.highlights),
          ].join('\n'),
        },
      ]);
      return;
    }

    if (normalizedName === 'open') {
      const projectId = args[0];
      if (!projectId) {
        appendLines([
          {
            kind: 'error',
            text: t('terminal.openUsage', { projectIds }),
          },
        ]);
        return;
      }
      openProject(projectId);
      return;
    }

    if (normalizedName === 'services') {
      appendLines([
        {
          kind: 'output',
          text: services
            .map(service => `${service.title}\n  ${service.description}\n  ${service.route}`)
            .join('\n\n'),
        },
      ]);
      return;
    }

    if (normalizedName === 'contact') {
      appendLines([
        {
          kind: 'output',
          text: t('terminal.contact'),
        },
      ]);
      return;
    }

    appendLines([
      {
        kind: 'error',
        text: t('terminal.unknownCommand', { command: name }),
      },
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(command);
    setCommand('');
  };

  return (
    <TerminalWrapper>
      <Output>
        {lines.map(line => (
          <Line key={line.id} $kind={line.kind}>{line.text}</Line>
        ))}
      </Output>
      <InputRow onSubmit={handleSubmit}>
        <Prompt>$</Prompt>
        <CommandInput
          value={command}
          onChange={event => setCommand(event.target.value)}
          autoFocus
          spellCheck={false}
          aria-label={t('terminal.commandAria')}
        />
      </InputRow>
    </TerminalWrapper>
  );
};

export default Terminal;
