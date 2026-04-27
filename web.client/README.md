# Frontend

Active React/Vite frontend for the portfolio project.

## Stack

- React 19
- TypeScript 6
- Vite 8
- React Router 7
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
├── Hooks/              # Shared React hooks
├── Layout/             # Main app layout
├── Pages/              # Route pages
├── Routes/             # Router setup
└── styles/             # Theme and global styles
```

## Performance Notes

- `DesktopHomeLayout` is lazy-loaded from the home page.
- `AtomScene` is lazy-loaded from the desktop layout.
- `/DevOs` is lazy-loaded as a separate route.
- The Three.js scene still creates a large chunk, but it is isolated from the main app bundle.

## Current Known Gaps

- Mobile home is placeholder content.
- Dashboard, admin, login, browser, explorer, and project data still contain prototype/demo behavior.
- Forms currently log data rather than submit to a backend.
- Tests are not configured yet.
