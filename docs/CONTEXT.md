# Project Context

This document preserves the current project state for future development sessions.

## Product Direction

The project is a personal portfolio with an interactive operating-system-inspired experience called DevOS. The portfolio should demonstrate modern frontend engineering, 3D/web interaction, service offerings, and eventually real project case studies.

## Current Architecture

The active application is `web.client`, a React/Vite single-page app. It uses React Router in Data Mode and styled-components for theme-aware UI. The homepage switches between a desktop and mobile layout with `useBreakpoint`.

The desktop homepage includes:

- Three.js atom scene
- DevOS launch call to action
- service cards linking to detailed service pages

The DevOS route includes:

- desktop icons
- draggable/resizable windows
- taskbar
- placeholder app windows such as browser, explorer, terminal, games, and lab

The ASP.NET project exists as a future backend placeholder. It should remain out of scope until backend functionality is explicitly needed.

## Recent Technical Decisions

- npm is the only frontend package manager.
- `yarn.lock` was removed.
- React Router was kept, upgraded, and moved to current v7 import conventions.
- DevOS was moved behind a lazy route boundary.
- `AtomScene` was moved behind a lazy component boundary.
- Vite 8 build output now keeps the main app bundle significantly smaller than before.
- Generated `.vs/`, `obj/`, and `.csproj.user` files were removed and ignored.

## Verification Baseline

The current frontend baseline should pass:

```bash
cd web.client
npm run lint
npm run build
npm audit
```

Expected audit state:

```text
found 0 vulnerabilities
```

The production build still reports a large chunk warning for the isolated `AtomScene` chunk. This is acceptable because the chunk contains Three.js dependencies and is loaded only where the 3D scene is used.

## Important Constraints

- Keep route setup free of static DevOS/Three imports.
- Do not work on backend unless requested.
- Keep docs updated when project structure, commands, or architectural decisions change.
- Do not introduce additional package managers.

## Next Work Candidates

1. Replace mobile placeholder content.
2. Turn service pages into polished portfolio/service pages with consistent copy.
3. Add real project data and case study pages.
4. Add Vitest and Testing Library.
5. Refactor DevOS placeholder apps into focused modules.
6. Decide whether forms need a backend or third-party form service.
7. If backend is needed, upgrade it to the latest stable LTS first.
