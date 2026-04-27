# Agent Instructions

This repository is a personal portfolio project with an experimental DevOS-style frontend. Treat the React frontend as the active product and the ASP.NET backend as parked until the owner explicitly asks for backend work.

## Working Rules

- Keep all code and code comments in English.
- Prefer small, focused files under 500 lines.
- Follow the existing React/Vite/styled-components patterns unless a change has a clear payoff.
- Do not commit or push unless explicitly requested.
- Do not revert user changes or unrelated work.
- Use npm for frontend dependencies. Do not add Yarn or pnpm lockfiles.
- Keep generated files out of version control.

## Active Stack

Frontend:

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- styled-components 6
- Three.js / React Three Fiber / Drei
- ESLint 10

Backend:

- ASP.NET shell only
- Not part of the current active workflow
- Upgrade to the latest stable LTS before real backend work

## Commands

Run frontend commands from `web.client/`:

```bash
npm install
npm run dev
npm run lint
npm run build
npm audit
```

Do not run backend upgrades or backend migrations unless the task specifically asks for backend work.

## Routing Notes

- Router setup lives in `web.client/src/Routes/AppRoutes.tsx`.
- `RouterProvider` is imported from `react-router/dom`.
- `createBrowserRouter`, `Link`, `Navigate`, `Outlet`, and `ScrollRestoration` are imported from `react-router`.
- `src/Routes/DevOsRoute.tsx` exists to keep DevOS dependencies lazy-loaded.

## Performance Notes

- DevOS and the Three.js scene are intentionally split into separate lazy chunks.
- Do not reintroduce static imports from route setup to DevOS or Three.js modules.
- Large Three.js chunks are acceptable when isolated from the initial bundle.

## Testing Expectations

There is no test setup yet. For new functionality, add focused tests when practical:

- expected behavior
- edge case
- error case

When adding the first test suite, prefer Vitest and Testing Library for frontend unit/component tests.

## Documentation Map

- `README.md`: main project overview
- `web.client/README.md`: frontend workflow and structure
- `docs/CONTEXT.md`: current state, decisions, and next work
- `AGENTS.md`: instructions for coding agents

## Known Project State

- Mobile layout is still placeholder-quality.
- Several pages are prototype/demo pages.
- Forms do not submit to a real backend.
- Backend still contains template WeatherForecast code.
- The project has been cleaned of Visual Studio generated metadata and build artifacts.
