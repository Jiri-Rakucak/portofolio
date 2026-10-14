# Project Context

This document preserves the current project state for future development sessions.

## Product Direction

The project is a personal portfolio with an interactive operating-system-inspired experience called DevOS. The portfolio should demonstrate modern frontend engineering, 3D/web interaction, service offerings, and eventually real project case studies.

## Current Architecture

The active application is `web.client`, a React/Vite single-page app. It uses React Router in Data Mode and styled-components for theme-aware UI. The homepage switches between a desktop and mobile layout with `useBreakpoint`.

The desktop homepage includes:

- a personal CZ/EN introduction with projects as the primary action and DevOS as secondary
- a lazy-loaded full-bleed Three.js atom scene
- selected Starbounder and RAG project rows with large unframed previews and central metadata
- a compact text-based skills section linking to detailed skill pages, without service cards

The DevOS route includes:

- desktop icons
- draggable/resizable windows
- taskbar
- portfolio Explorer and Browser apps backed by central project content
- placeholder app windows such as terminal, games, and lab

The ASP.NET project exists as a future backend placeholder. It should remain out of scope until backend functionality is explicitly needed.

## Recent Technical Decisions

- npm is the only frontend package manager.
- `yarn.lock` was removed.
- React Router was kept, upgraded, and moved to current v7 import conventions.
- DevOS was moved behind a lazy route boundary.
- `AtomScene` was moved behind a lazy component boundary.
- The desktop hero is now isolated in `HomeHero` and `HeroScene`, with a bounded left-shifted camera projection and an optional-scene error boundary. Atom geometry and animation are unchanged; the default DevOS window layout retains its previous framing.
- Homepage atom tilt follows mouse position within the hero through a separate parent group, bounded to 12 degrees of pitch and 20 degrees of yaw with frame-rate-independent Three.js damping. Tracking includes overlaid copy/buttons, resets on leave/cancel/scroll/resize/window blur, and is disabled for reduced motion or non-mouse/coarse input. Hero drag-orbit controls are removed; the DevOS atom window retains OrbitControls, and inner atom/electron animation is unchanged.
- The placeholder header logo was removed at the owner's request. Navigation stays right-aligned, with Home in the existing dropdown.
- Starbounder remains a 2D game. A 3D planet preview is not planned for its current case study because it would misrepresent the game. A future 3D remake is only an owner idea, not portfolio scope.
- Desktop home now follows introduction -> selected projects -> skills. `getHomeProjects` explicitly selects Starbounder first, then RAG; the unfinished DevOS portfolio is not included here. This selection is independent of the general `featured` flag used elsewhere.
- Homepage project previews are open image/text rows rather than framed cards. Starbounder and RAG both use central covers. RAG's owner-provided interface preview is `/projects/ragsystem/ragsystem-preview.png`, referenced in both locale content files with localized alt text; the homepage, carousel, and detail consume it without component-local copies. The shared gradient remains a missing-media fallback.
- Angled content bands on the homepage, service directory/details, and project details share `styles/angledSection.ts`: 48px on desktop and 32px at narrow widths. Content padding clears the cut; the slope no longer grows with viewport width.
- Public skills copy in EN/CZ is concrete and personal, without corporate phrasing or internal notes about pending forms/backend work. This is a content-only change; backend implementation remains parked.
- Owner contacts and social URLs are centralized in `web.client/src/content/contact.ts`. Footer, header, services, About Me, and Terminal use the same source. Location is Liberec with localized country copy. Dead footer legal links were removed and technology labels are no longer fake links.
- Project and service metadata were centralized in `web.client/src/content/`.
- ProjectWindow was upgraded into a mini case-study view with status, role, timeframe, impact, highlights, technologies, and CTAs.
- Project content now supports optional structured case-study fields: summary, problem, solution, outcome, lessons, additional sections, and assets.
- The public project carousel lives at `/projects`; `/projects/:projectId` resolves any central content entry and renders its optional case study. Unknown IDs show a localized return link.
- Project page styles live in focused `ProjectsPages/*.styles.ts` modules. Carousel controls are localized, support arrow keys, and hide inactive slides from assistive technology.
- Personal Conversation RAG is now a featured project. Copy was checked against the local RAG repository: manual notes and ChatGPT import are implemented; Claude import and answer generation are planned; full-corpus search validation is still pending.
- The Unity graduation entry now presents Starbounder as a prototype with a source-backed bilingual case study, an itch.io link, and three screenshots extracted from its thesis. Review provenance and limitations are recorded in `docs/STARBOUNDER.md`.
- Starbounder's public carousel/detail now use a real cover; the detail has the owner's bilingual motivation, a five-image gallery, a native-dialog image viewer, and expandable technical notes. The owner confirmed the itch.io page is current. Public story/media components are independent of DevOS presentation.
- DevOS Explorer and Browser now use central project data for project discovery and previews.
- DevOS Browser address bar now filters projects by id, name, category, stack, and other metadata.
- DevOS Terminal was added as an interactive portfolio CLI with project, service, contact, and open commands.
- DevOS About Me was added as a localized profile document with keyword tooltips.
- DevOS Component Lab was added as a localized design-system showcase for theme tokens, typography, and component states.
- i18next/react-i18next was added for in-app bilingual content without `/en` or `/cs` URL prefixes.
- Project and service metadata moved from static TypeScript arrays into localized JSON resources.
- The `/services` directory was redesigned as a stronger localized service-track grid backed by the same content model.
- Detailed service pages were consolidated into one localized `ServiceDetailPage` fed by service detail content.
- Canonical routes were moved to lowercase paths with redirects from legacy mixed-case routes.
- Prototype service forms were hidden and replaced by direct contact CTA links.
- Vitest was added for content model unit tests.
- Vite 8 build output now keeps the main app bundle significantly smaller than before.
- Generated `.vs/`, `obj/`, and `.csproj.user` files were removed and ignored.

## Verification Baseline

The current frontend baseline should pass:

```bash
cd web.client
npm run lint
npm run test
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
- Prefer lowercase canonical URLs for new routes.
- Do not work on backend unless requested.
- Do not duplicate project or service data inside UI components.
- Keep docs updated when project structure, commands, or architectural decisions change.
- Do not introduce additional package managers.

## Content and Future Admin Direction

The frontend currently uses localized JSON content:

- `web.client/src/i18n/locales/en/content.json`
- `web.client/src/i18n/locales/cs/content.json`

Typed helper modules still live in `web.client/src/content/projects.ts` and `web.client/src/content/services.ts`. They are the source of truth for homepage sections, DevOS Explorer, Browser, Terminal, ProjectWindow, service directory content, and detailed service pages. The data shape is intentionally suitable for a future admin flow where the owner can add or edit projects/services directly from the site. A backend or CMS can later expose the same shape without forcing a UI rewrite.

Project case-study content is optional per project. Use it when a project needs deeper storytelling in DevOS ProjectWindow:

- `summary`: short case-study lead
- `problem`: assignment, goal, or user/business problem
- `solution`: implementation approach and important systems
- `outcome`: result, evaluation, shipped state, or lesson summary
- `lessons`: concrete bullets from the project
- `sections`: extra titled notes such as media notes or future WebGL embedding
- `assets`: screenshots, videos, WebGL builds, or external links

The `unity-graduation-game` ID remains stable, but its content now describes Starbounder: procedural space exploration, mining, colony building, Jobs/Burst generation, UI Toolkit, and per-galaxy saves. It is explicitly a prototype, not a finished game. See [Starbounder source notes](STARBOUNDER.md) for the reviewed local snapshot, reported performance figures, media provenance, and future work.

General UI translations live in `web.client/src/i18n/locales/*/common.json`. DevOS-specific labels, terminal output, About Me profile copy, and Component Lab copy live in `web.client/src/i18n/locales/*/devos.json`. The current language is stored in `localStorage` as `portfolio.locale` and controlled from Preferences.

## Next Work Candidates

1. Replace mobile placeholder content.
2. Verify Starbounder's public gallery in a browser, then add real project media and outcomes to the remaining case studies. Consider a gameplay clip later.
3. Add Testing Library when component tests become necessary.
4. Refactor remaining DevOS placeholder apps into focused modules, especially Games.
5. Decide whether forms need a backend or third-party form service.
6. If backend is needed, upgrade it to the latest stable LTS first.

## Portfolio Review Follow-ups

- Homepage introduction, selected project rows, text-based skills, contacts, and bounded angled transitions are implemented. The old glass service-card component was removed. Next assess the actual rendered spacing; RAG now has an owner-provided interface preview.
- Browser verification of the updated hero (canvas pixels, interaction, and desktop/narrow viewport layout) remains pending: the sandbox cannot bind the Vite port (`EPERM`) and the available Chromium lacks `libnspr4.so`. Unit tests exercise camera projection, hero copy/actions, and contact consumers, not actual WebGL rendering.
- Tests additionally cover localized homepage selection/rendering, missing covers or selected entries, empty service lists, section order, and shared cut/padding rules. These do not replace browser layout verification.
- Atom mouse-follow tests cover coordinate mapping, angle limits, real Three.js Euler damping across frame rates, invalid input, DOM listener cleanup, preference changes, and hero/DevOS interaction boundaries. Actual pointer/WebGL rendering still needs browser verification.
- RAG needs an anonymized CLI example, architecture visual, and measured indexing/search results.
- The carousel uses central media for Starbounder and RAG; projects without a cover still use temporary gradient backgrounds.
- Public detail cover presentation is data-driven through optional `cover.presentation`. `background` is the backward-compatible default and keeps Starbounder's existing hero. RAG uses `inline`: a normal text hero followed by the full screenshot in a stable 16:9 contained preview inside the content band. There is no title overlay or darkening on the screenshot, and the angled transition clears it. No project-ID special cases were added; homepage/carousel/DevOS presentation remains unchanged. Tests cover both modes/locales, older metadata, missing sources, arbitrary project IDs, theme styles, and accessible image fallback. Browser layout verification is still pending in the restricted environment.
- `index.html` uses the portfolio title, English fallback description, author, theme color, and `/favicon.svg`. The JR monogram uses Inter Black glyph outlines, independent of external fonts; attribution/license are in the SVG and `public/licenses/inter-OFL.txt`. The header stays logo-free. Localized per-route metadata and sharing previews remain pending; no production URL has been assumed.
- Footer uses owner-provided email, phone, location, and LinkedIn. The existing GitHub profile URL was preserved as requested; no independent account verification was performed.
- Mobile remains deferred by the owner's desktop-first preference.

## Not-found Page

- Unknown URLs now render the localized 404 page inside `MainLayout`, retaining public navigation, Preferences, the footer, and scroll restoration. Known project IDs that are missing still use the project detail's own missing-project state; explicit login/admin/DevOS routes and legacy redirects are unchanged.
- The 404 uses open typography, the shared homepage action styles, and normal links to home and projects. The old black-hole SVG component and invisible full-viewport home link were removed. Copy lives under `notFound` in both `common.json` files; styling lives in `Pages/404Page.styles.ts`.
- Unit/SSR tests cover both languages, recovery links, theme styling, actual application route matching, and direct entry to an unknown nested URL. Browser layout verification remains pending because of the environment restrictions. This is a client-side fallback; HTTP status handling is still a deployment concern.

## Navigation and Preferences

- Header disclosures retain mouse hover preview and also support click, Enter/Space, Tab navigation, outside pointer dismissal, focus leaving, and Escape. Skills collapse before the main disclosure. Choosing a navigation link closes it. Controls are native buttons with localized labels and expanded/control relationships; links keep normal navigation semantics rather than ARIA menu roles. The owner prefers the original continuous dropdown background behind the top icons, not a detached bordered popover; that appearance is restored without reverting the interaction fixes.
- Preferences now use the shared native `dialog`, with a compact 600px panel, 8px corners, visible focus rings, bounded scrolling, labelled theme/color inputs, segmented language choices, and a neutral color-only reset. This is a light styling pass, not the final settings redesign. Theme/color persistence and automatic contrast enforcement are unchanged.
- The browser provides modal focus containment. Close, Escape, and backdrop clicks dismiss the dialog; dragging from its content onto the backdrop does not. On closing, focus returns to the visible navigation toggle, not the now-hidden Preferences item. The previous body overflow value and CSS priority are restored on cleanup.
- Tests cover disclosure state transitions, dialog lifecycle/hit testing, bilingual markup, control labels, selected language, and panel CSS. Native focus cycling, real pointer/keyboard integration, and visual layout still need a browser check. Adding a DOM test environment was attempted from the npm cache, but required packages were unavailable; no dependency changes were made.
