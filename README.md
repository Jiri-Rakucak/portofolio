# Jiri Rakucak Portfolio

Personal portfolio and experimental "DevOS" web experience. The project is currently frontend-first: a modern React/Vite application with an ASP.NET backend shell kept for future API work.

## Current Status

- Frontend is the active product surface.
- Backend is intentionally parked and should not drive current decisions.
- Legacy Visual Studio generated files were removed from version control.
- Package management is standardized on npm.
- React Router remains the routing layer, updated to the current v7 package model.

## Tech Stack

Frontend:

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- styled-components 6
- Three.js with React Three Fiber and Drei
- ESLint 10 with React Hooks rules

Backend:

- ASP.NET project shell currently targeting .NET 9
- Contains template/demo code and is not part of the active workflow
- If backend work becomes necessary, upgrade it to the latest stable LTS first

## Repository Structure

```text
.
├── web.client/        # Active React/Vite frontend
├── Web.Server/        # Parked ASP.NET backend shell
├── docs/              # Project context for future development sessions
├── AGENTS.md          # Instructions for coding agents working in this repo
├── Web.sln            # Visual Studio solution
└── README.md          # Main project entry point
```

## Frontend Commands

Run from `web.client/`:

```bash
npm install
npm run dev
npm run lint
npm run build
npm audit
```

Current local dev URL:

```text
https://localhost:60522/
```

## Development Notes

- Do not use Yarn or pnpm unless the package manager decision is explicitly changed.
- Keep `package-lock.json` as the only frontend lockfile.
- Avoid committing generated directories such as `.vs/`, `bin/`, `obj/`, `dist/`, and `node_modules/`.
- The DevOS and Three.js scene are lazy-loaded to keep the main bundle smaller.
- The mobile home layout is still placeholder-quality and needs product/design work.
- The backend still includes template WeatherForecast code and should be treated as inactive.

## Documentation Index

- [Frontend README](web.client/README.md)
- [Project Context](docs/CONTEXT.md)
- [Agent Instructions](AGENTS.md)

## Next Recommended Work

1. Replace placeholder mobile layout with the real portfolio experience.
2. Define real portfolio content, case studies, services, and contact flow.
3. Add tests for shared hooks, routing guards, and core UI behavior.
4. Improve DevOS internals and remove remaining placeholder app content.
5. Decide whether the backend is needed; if yes, upgrade it to the latest stable LTS.
