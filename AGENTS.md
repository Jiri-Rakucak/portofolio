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
- i18next / react-i18next
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
npm run test
npm run build
npm audit
```

Do not run backend upgrades or backend migrations unless the task specifically asks for backend work.

## Routing Notes

- Router setup lives in `web.client/src/Routes/AppRoutes.tsx`.
- `RouterProvider` is imported from `react-router/dom`.
- `createBrowserRouter`, `Link`, `Navigate`, `Outlet`, and `ScrollRestoration` are imported from `react-router`.
- `src/Routes/DevOsRoute.tsx` exists to keep DevOS dependencies lazy-loaded.
- New canonical routes should use lowercase URL paths. Keep redirects only for legacy paths that may already be linked.
- Public projects use `/projects/:projectId` and resolve IDs from central content. Do not add a separate route for each project.
- The catch-all 404 is a child of `MainLayout`, with localized `notFound` copy and explicit recovery links. Keep it in the public shell without adding duplicate headers or full-screen clickable overlays. Missing project IDs retain the project detail's own fallback.

## Page Metadata

- `Layout/MetadataLayout.tsx` is the pathless outer route for all existing layouts/routes. It renders `metadata/PageMetadata.tsx` outside lazy boundaries, without adding visible markup.
- Declare typed `handle.metadata` via `metadataHandle` in route definitions; do not infer page kinds from URL strings or duplicate head effects inside pages. `serviceRoute` keeps the metadata service ID and rendered service ID aligned, including `ui-ux-design` at `/services/ux-ui-design`.
- `metadata/pageMetadata.ts` derives project/service titles and descriptions from central content. General metadata copy belongs under `metadata` in both `common.json` files. Resolve strings with `i18n.getFixedT(locale, 'common')` so a language switch does not briefly use the previous global i18next language.
- `metadata/documentMetadata.ts` updates the existing document title and a single description/robots tag through DOM APIs, preserving unrelated metadata. Do not add parallel React-hoisted title/meta tags on top of the static HTML fallback.
- Missing pages/projects/services and login/admin use client-side `noindex, follow`; valid public pages reset to `index, follow`. This is neither authorization nor deployment-level HTTP status handling.
- Keep the static English homepage title/description in `index.html` aligned with their runtime fallback. This SPA has no per-route prerendering yet; no production URL, canonical/hreflang tags, or social preview images have been assumed.

## Performance Notes

- DevOS and the Three.js scene are intentionally split into separate lazy chunks.
- Do not reintroduce static imports from route setup to DevOS or Three.js modules.
- Large Three.js chunks are acceptable when isolated from the initial bundle.
- The public hero uses `Hooks/useReducedMotion.ts` and `Desktop/heroActivity.ts`: static/demand rendering for reduced motion, no frame loop when hidden/offscreen, and capped DPR. Keep `animated` propagation through pointer rotation, Atom, and Fragments; a static scene must still show initialized electron trails. `atomParticles.ts` owns elapsed-time orbital updates and bounded deltas. Do not replace this with CSS-only reduced-motion handling.
- Public `PortfolioImage` defaults to lazy/async. Only the background detail cover, active carousel cover, and explicitly opened viewer use eager/high hints; inline RAG previews and below-fold thumbnails stay lazy. Priority is a browser hint, not a guarantee. Preserve reserved dimensions and failure fallbacks.

## Testing Expectations

Vitest is configured for frontend unit tests. For new functionality, add focused tests when practical:

- expected behavior
- edge case
- error case

Current tests cover the central content model in `web.client/src/content/__tests__/`.
Project page rendering, optional case studies, missing IDs, and carousel states are covered in `web.client/src/Pages/__tests__/`.

## Content Model

Use `web.client/src/content/` as the source of truth for portfolio metadata:

- `projects.ts` for typed project access and DevOS project file entries
- `services.ts` for typed service access, service directory cards, and detailed service pages
- `contact.ts` for language-neutral owner contact details and social URLs; reuse these in the header, footer, service contact, About Me, and Terminal

Localized source data lives in:

- `web.client/src/i18n/locales/en/content.json`
- `web.client/src/i18n/locales/cs/content.json`

Keep project and service IDs aligned across locales.

Projects may include optional `caseStudy` content with `summary`, `problem`, `solution`, `outcome`, `lessons`, `sections`, and `assets`. ProjectWindow renders this when present. `unity-graduation-game` is Starbounder, a graduation prototype reviewed against its local Unity repository and thesis. Keep its prototype scope explicit; source notes and verification limits live in `docs/STARBOUNDER.md`.

Public pages also support optional project `cover` (`src`, localized `alt`, optional `presentation`), localized `liveLabel`, and `caseStudy.motivation`. `cover.presentation` controls public detail and carousel media: `background` (default, Starbounder) keeps the existing hero/carousel image; `inline` (RAG) puts the contained full preview below the detail's text hero, inside the first content-band section so the angled cut cannot crop it, and uses the project gradient instead of an image behind carousel text. RAG's gradient is neutral gray. Keep both locale settings aligned. Do not branch on project IDs or change homepage/DevOS layouts to implement these modes. Public gallery/story components live in `Pages/ProjectsPages/` and must not introduce UI changes in DevOS. The gallery and Preferences drawer use native `dialog`; preserve modal focus containment, Escape, and focus return.

Header navigation uses ordinary disclosure buttons and links, not ARIA menu roles. Keep mouse hover as a preview; click/keyboard activation pins the disclosure open. Close it on outside pointer interaction, focus leaving, link selection, or Escape (nested skills first). Navigation state and event handling live in `headerNavigationState.ts` and `useHeaderNavigation.ts`; do not replace native buttons with clickable divs. Preferences return focus to the visible navigation toggle because their initiating item is hidden after opening. Keep dialog lifecycle cleanup in `dialogLifecycle.ts`, including the prior scroll style and priority. Settings use labelled native controls, pressed-state language buttons, and a color-only reset; do not imply the reset also changes language or theme.

Preferences are a right-side drawer in `Components/Settings/PreferencesDrawer.tsx`, not a centered card/modal. Its transparent native-dialog host is aligned with the 1264px navigation content width from `styles/layout.ts`; the panel is capped at 440px and fills narrow viewports. Keep the title/close button outside the independently scrolling body. The panel slides down from above and exits upward, not horizontally. Use subtle dimming without blur, reduced-motion-safe entry/exit, and cancellable exit completion in `drawerMotion.ts`; never let an animation callback close a newly mounted drawer after unmount. The native modal primitive is intentional for focus containment/inert background behavior, not a centered visual layout. Light-theme secondary/muted tokens have focused contrast tests; do not claim these cover custom color overrides or all controls.

`styles/ThemeProvider.tsx` is the single theme owner; the old `Contexts/AppContext.tsx` was removed. `useThemePreference.ts` separates the selected `system | light | dark` preference from the resolved `light | dark` palette. System is the default and follows `prefers-color-scheme` live through `useSyncExternalStore`. Preferences use a three-position native-radio control with visible detents in `ThemeModeSwitch.tsx`; preserve its labels, keyboard behavior, and reduced motion. Store the validated preference as `portfolio.theme`, accepting the legacy `theme` key only if the new key is absent; blocked storage must not break selection. The resolved mode also owns root `data-theme` and native `color-scheme`.

`styles/themeColors.ts` owns editable color keys, validation, per-theme reducer transitions, and persistence. Custom colors use `portfolio.colors` with `{ version: 1, light: {...}, dark: {...} }`. Accept only six-digit HEX strings for `accent`, `background`, `surface`, and `text`; never spread unvalidated storage into the theme. Edits and reset apply to the resolved active light/dark palette, including in system mode, and preserve the other palette. Reset removes only those overrides, never theme/language; remove the color storage key when both palettes are empty. Settings headings and reset labels identify the active palette. Malformed/unsupported data falls back to defaults; blocked storage must keep in-memory edits usable. Persistence does not enforce contrast on custom colors.

Desktop home hero lives in `Components/Desktop/HomeHero.tsx`. `HeroScene` keeps the atom lazy and isolates rendering failures from navigation. `AtomScene` defaults to its existing DevOS window layout; only the homepage passes `layout="hero"` for full-bleed rendering and camera framing. Keep project browsing as the primary hero action and DevOS as secondary. Mobile home remains deferred.

Homepage mouse tilt is isolated in `HeroPointerRotation`, `heroPointer.ts`, and `heroPointerEvents.ts`. Listen on the hero DOM ref (including copy/buttons), use client coordinates relative to its bounds, and animate a separate parent group using Three.js damping. Keep angles bounded and disable following for reduced motion or non-mouse input. Hero OrbitControls are removed to avoid competing rotation. Preserve DevOS controls and the atom's geometry/base pose/orbit appearance; the hero's motion policy pauses all animation when needed, and orbital timing is frame-rate-independent.

The header intentionally has no logo. Keep the Home link in its dropdown and navigation aligned right. The dropdown background extends behind the top icons with a continuous surface and only rounded bottom corners; do not turn it into a detached bordered popover. Starbounder is a 2D game; do not introduce 3D presentation that suggests otherwise.

Desktop home continues with `HomeProjects` and `HomeSkills`, styled by `HomeSections.styles.ts`. Keep these as open sections, not glass service cards. `getHomeProjects` in `content/projects.ts` curates Starbounder and RAG independently of the global featured flag; do not include DevOS here without the owner's approval. RAG uses the owner-provided `ragsystem-preview.png` as its central `cover` in both locales; retain the shared gradient only as the missing-media fallback.

Use `styles/angledSection.ts` for sloped content bands: shared 48px/32px cuts and content padding that clears the cut. Do not reintroduce viewport-width-based slopes. Shared project preview gradients live in `styles/projectMedia.ts`.

Public copy should be concrete, personal, and professional in both languages. Keep internal backend/form implementation notes in documentation, not visitor-facing contact or skills text.

Do not duplicate project/service metadata inside components. If future admin functionality is introduced, preserve the content shape and swap the static exports for API-backed data.

## Localization Notes

- Use `i18next` and `react-i18next` for UI text.
- Do not add `/en` or `/cs` route prefixes unless explicitly requested.
- General UI strings belong in `web.client/src/i18n/locales/*/common.json`.
- DevOS-only UI strings, terminal output, About Me profile copy, and Component Lab copy belong in `web.client/src/i18n/locales/*/devos.json`.
- Language selection is stored in `localStorage` under `portfolio.locale` and controlled from Preferences.

## Documentation Map

- `README.md`: public-facing GitHub overview, quick start, and documentation entry point
- `web.client/README.md`: frontend workflow and structure
- `docs/CONTEXT.md`: current state, decisions, and next work
- `docs/DEPLOYMENT.md`: domain-independent static hosting, upload procedure, and browser checks
- `docs/PUBLICATION.md`: publication checks, local review limits, and historical privacy findings
- `AGENTS.md`: instructions for coding agents

## Deployment

- `deploy/nginx.conf` is a reviewable HTTP server-block template, not a verified copy of the live Oracle configuration. It intentionally sends a temporary noindex header; remove it only when publishing on the stable origin. Do not hardcode the temporary IP into metadata or assume the template was applied.
- `deploy/upload.sh` requires explicit `DEPLOY_HOST` and absolute `DEPLOY_DIR`; optional key/health URL come from the environment. Keep assets-first/index-last publication, upload failure handling, and retention of old hashed chunks. Never run an upload or server reload without the owner's explicit request. The ignored `web.client/deploy.sh` is legacy/local and deletes old output; do not use it as the versioned workflow.
- Vite builds must work without .NET or certificate files. Dev HTTPS reuses existing PEM files only, with HTTP fallback. Backend configuration remains parked.
- Node-only deployment tests live in `web.client/tests/`, type-checked by `tsconfig.node.json`, with fake transports; they must not contact a real host. Nginx syntax/integration and native browser/WebGL checks require the appropriate environment.

## Known Project State

- The repository is still private; a public-facing README does not authorize a visibility change, license selection, or history rewrite. Historical `.vs/`, build metadata, and commit identities need a publication review even though generated files are absent from the current tree. Keep machine-specific paths and restricted-source URLs out of current public-facing docs.
- Mobile layout is still placeholder-quality.
- Several pages and DevOS apps are still prototype/demo quality.
- Service forms are hidden until a real backend or form provider exists.
- Backend still contains template WeatherForecast code.
- The project has been cleaned of Visual Studio generated metadata and build artifacts.
