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

The public CTA `https://jirirakucak.itch.io/starbounder` comes from the presentation notes. Current availability and downloadable platform support still need checking. No public source CTA is added because the GitHub repository is internal. A WebGL embed is only a future option, not an existing build.

## Screenshot Provenance

Only gameplay screenshots were extracted from the thesis; assignment pages and signed school documents were not copied.

| Public asset | Thesis media |
| --- | --- |
| `web.client/public/projects/unity-graduation-game/space-flight.png` | `word/media/image5.png` |
| `web.client/public/projects/unity-graduation-game/sector-map.png` | `word/media/image6.png` |
| `web.client/public/projects/unity-graduation-game/building-panel.png` | `word/media/image8.png` |

EN/CZ labels and alt text live alongside the case study in the localized `content.json` files. The current case-study UI exposes media as links, not an inline gallery.

## Follow-up Priorities

- Build a guided first session with clear goals before expanding the number of systems.
- Persist mined deposit depletion/remaining quantities: `SaveData.cs` does not currently model them, while `MineableResource.cs` changes quantities at runtime. Seed-based regeneration alone does not retain these changes.
- Clarify colony economy constraints: `ColonyManager.cs` warns about energy shortages without blocking construction, and water requirements are not enforced there. Decide whether shortages should be soft or hard constraints.
- Finish settings, input rebinding, and ship-destruction recovery.
- Add focused automated coverage for seeded generation, save/load round trips, and building requirements.
- Capture a short gameplay clip and measured results on a documented machine before making stronger performance or gameplay claims.

Moon support and status indicators remain experimental. Do not turn roadmap items into implemented-feature claims without reviewing newer source material.
