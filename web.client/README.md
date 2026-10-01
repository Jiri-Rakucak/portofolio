# Frontend

Active React/Vite frontend for the portfolio project.

## Stack

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- i18next / react-i18next
- styled-components 6
- Three.js, React Three Fiber, Drei
- ESLint 10

## Requirements

- Node.js `>=20.19.0`
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm audit
```

The Vite dev server is configured for HTTPS and defaults to:

```text
https://localhost:60522/
```

## Routing

Routes are defined in `src/Routes/AppRoutes.tsx`.

The app uses React Router 7 in Data Mode:

- `createBrowserRouter` from `react-router`
- `RouterProvider` from `react-router/dom`
- route elements remain component based for now

The DevOS route is lazy-loaded through `src/Routes/DevOsRoute.tsx` so its window manager and Three.js dependencies do not inflate the initial application bundle.

Canonical route paths are lowercase. Legacy mixed-case service and DevOS paths are kept as redirects in `src/Routes/AppRoutes.tsx`.

The project carousel is available at `/projects`. A single `/projects/:projectId` route resolves central project data, so adding a project does not require adding a route. Public details render the same optional case-study content as DevOS ProjectWindow.

## Important Folders

```text
src/
├── Auth/               # Route protection helpers
├── Components/
│   ├── Applications/   # DevOS window contents
│   ├── Desktop/        # Desktop home and Three.js scene
│   ├── DevOS/          # Window manager and taskbar UI
│   ├── Mobile/         # Mobile home layout
│   ├── Settings/       # Theme settings controls
│   └── Shared/         # Header, footer, forms, typography
├── Contexts/           # App and DevOS state
├── content/            # Central projects and services data
├── Hooks/              # Shared React hooks
├── i18n/               # Locale config and JSON translation resources
├── Layout/             # Main app layout
├── Pages/              # Route pages
├── Routes/             # Router setup
└── styles/             # Theme and global styles
```

## Performance Notes

- `DesktopHomeLayout` is lazy-loaded from the home page.
- `AtomScene` is lazy-loaded from the desktop layout.
- `/devos` is lazy-loaded as a separate route.
- The Three.js scene still creates a large chunk, but it is isolated from the main app bundle.

## Content Model

Portfolio projects and services are centralized as localized JSON resources:

- `src/i18n/locales/en/content.json`
- `src/i18n/locales/cs/content.json`

Typed helpers expose that data from `src/content/`:

- `projects.ts`: project metadata, case-study metadata, featured projects, DevOS file-system entries, and project lookup helpers
- `services.ts`: service metadata used by homepage cards and the service directory

Keep new project/service metadata in the locale JSON first, then consume it through the helper functions. This avoids duplicate content between homepage cards, DevOS Explorer, Browser, ProjectWindow, Terminal, the service directory, and detailed service pages.

Optional project case-study fields are supported through the `caseStudy` object:

- `summary`
- `problem`
- `solution`
- `outcome`
- `lessons`
- `sections`
- `assets`

Use these for deeper project stories in DevOS ProjectWindow. The `unity-graduation-game` entry is currently a structured placeholder for the Unity graduation project and should be replaced with real gameplay notes, screenshots, build links, and outcome details before it becomes public portfolio copy.

DevOS project discovery currently uses this content model in two places:

- Explorer: project catalog and entry point into ProjectWindow case studies
- Browser: featured project preview surface with route/source actions and address-bar project search
- Terminal: command-driven project and service discovery
- About Me: localized profile document with keyword tooltips
- Component Lab: localized design-system preview with theme tokens, typography, and component states

Future admin direction: the current TypeScript content model can become an API-backed or CMS-backed data source later. An admin page could create and edit projects/services, persist them through the backend, and expose the same shape back to the frontend.

## Localization

The app uses `i18next` and `react-i18next` without language-specific route prefixes. The selected language is stored in `localStorage` under `portfolio.locale`.

Locale files live in:

- `src/i18n/locales/en/common.json`
- `src/i18n/locales/cs/common.json`
- `src/i18n/locales/en/devos.json`
- `src/i18n/locales/cs/devos.json`
- `src/i18n/locales/en/content.json`
- `src/i18n/locales/cs/content.json`

Add new UI strings to `common.json` unless they are DevOS-only. Add portfolio projects and services to both `content.json` files with matching IDs so helpers and tests can keep locale data aligned.

The service directory is rendered by `src/Pages/ServicesPages/ServicePage.tsx` and uses the same localized service content for its compact track list. Detailed service pages are rendered by `src/Pages/ServicesPages/ServiceDetailPage.tsx`; the route only passes a service ID, and title, subtitle, capabilities, stack, and related links come from localized service detail content.

DevOS-only profile copy, tooltip text, Lab copy, and terminal text live in `devos.json`.

## Current Known Gaps

- Mobile home is placeholder content.
- Dashboard, admin, login, and some DevOS apps still contain prototype/demo behavior.
- Service forms are hidden until a real backend or form provider exists; the services page uses direct contact links for now.
- Tests currently cover the localized central content model only.
