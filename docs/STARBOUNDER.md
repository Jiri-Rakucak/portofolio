# Starbounder Source Notes

## Portfolio Scope

Starbounder is a Unity/C# 2D space sandbox graduation prototype. Preserve the existing project ID `unity-graduation-game` and URL `/projects/unity-graduation-game`.

The portfolio describes implemented exploration, ship/on-foot controls, procedural generation, mining, colony construction, UI, and per-galaxy saves. It must not present the game as finished or claim complete persistence of all modified world objects.

## Reviewed Sources

- Repository: `https://github.com/pslib-cz/MP2025-26_Rakucak-Jiri_Tvorba-vesmirne-2D-hry-v-unity` (internal organization repository).
- Local checkout: `/home/jiri/projects/school/MP2025-26_Rakucak-Jiri_Tvorba-vesmirne-2D-hry-v-unity`.
- Latest local tracked commit at review: `e490a18`, dated 2026-03-23, `aktualizace dokumentace`.
- Thesis: `MP2026-Rakučák-Jiří-P4A-Tvorba-vesmírné-hry-v-unity.docx`.
- Local presentation notes supplied additional context, including the itch.io URL and prototype scope.

Remote access was unavailable during review, so this is not a claim about the latest GitHub state. The game was not run or playtested. The review used source code, thesis text, presentation notes, and screenshots.

`ProjectSettings/ProjectVersion.txt` specifies Unity `6000.2.8f1` (Unity 6.2), despite the older version in the repository README. The package manifest includes URP, Input System, and the Unity test framework; no game-specific automated test source was found in the reviewed checkout.

The thesis reports world initialization improving from roughly 30 seconds to 5 seconds after the Job System/Burst refactor. Portfolio copy attributes this to the thesis; it is not an independently reproduced benchmark.

The public CTA `https://jirirakucak.itch.io/starbounder` comes from the presentation notes. On 2026-10-04 the owner confirmed the page is correct and current; this was not independently checked. The public CTA is labelled "Download prototype" rather than "Live site". No public source CTA is added because the GitHub repository is internal. A WebGL embed is only a future option, not an existing build.

## Screenshot Provenance

Only gameplay screenshots were extracted from the thesis; assignment pages and signed school documents were not copied.

| Public asset | Thesis media |
| --- | --- |
| `web.client/public/projects/unity-graduation-game/space-flight.png` | `word/media/image5.png` |
| `web.client/public/projects/unity-graduation-game/sector-map.png` | `word/media/image6.png` |
| `web.client/public/projects/unity-graduation-game/building-panel.png` | `word/media/image8.png` |

On 2026-10-04 the owner supplied additional gameplay screenshots. The cover uses `planet-in-space-no-ship.png`: its visible generated planet and open left side suit the title overlay. The public gallery selects `space-flight.png`, `planet-landing.png`, `planet-solar-extractor.png`, `building-detail-panel.png`, and `galaxy-map.png` to show different parts of the gameplay loop. Other supplied images remain available without renaming or deletion.

EN/CZ cover alt text, screenshot captions, the download label, and the owner's personal motivation live in localized `content.json` files. Public project pages render an inline gallery with a full-size image viewer. DevOS retains its existing presentation of case-study media as links.

## Public Presentation

The public detail leads with the project cover and CTA, then motivation/overview, screenshots, the challenge/approach/result, and lessons. Highlights, technologies, and additional notes appear once in expandable technical details. Public case-study rendering is separate from DevOS window components.

Yet Another React Lightbox was evaluated through Context7. The npm registry was unavailable, so no dependency was added. The limited full-size viewer uses the native HTML `dialog` for modal focus containment and Escape behavior, with project-specific previous/next controls. It does not implement custom pan/zoom physics. Revisit the library if pinch zoom, panning, or richer media becomes necessary.

Unit tests cover public page rendering, gallery filtering and optional metadata, empty sources, localization, and image defaults. A Playwright interaction/screenshot check could not run in the current environment because Chromium lacks `libnspr4.so`; the dev server also cannot bind a port (`EPERM`). Browser verification of layout, image failures, keyboard navigation, focus return, and narrow viewports remains a follow-up.

## Follow-up Priorities

- Build a guided first session with clear goals before expanding the number of systems.
- Persist mined deposit depletion/remaining quantities: `SaveData.cs` does not currently model them, while `MineableResource.cs` changes quantities at runtime. Seed-based regeneration alone does not retain these changes.
- Clarify colony economy constraints: `ColonyManager.cs` warns about energy shortages without blocking construction, and water requirements are not enforced there. Decide whether shortages should be soft or hard constraints.
- Finish settings, input rebinding, and ship-destruction recovery.
- Add focused automated coverage for seeded generation, save/load round trips, and building requirements.
- Capture a short gameplay clip and measured results on a documented machine before making stronger performance or gameplay claims.

Moon support and status indicators remain experimental. Do not turn roadmap items into implemented-feature claims without reviewing newer source material.
