# Visual Design System — The Lost Space Archive

This replaces the previous Stage A note that limited the storybook treatment to Welcome and Memory Station. The global direction is an illustrated field journal: a child opens an archive story, follows a trail across a distinct planetary world, investigates a real machine, and returns a clue to the constellation.

The implementation record and route-by-route proposal are in [PHASE3_GLOBAL_VISUAL_REDESIGN.md](PHASE3_GLOBAL_VISUAL_REDESIGN.md); durable visual rules are in [DESIGN.md](../DESIGN.md).

## Visual tokens

`src/styles/tokens.css` remains the source for application theme, spacing, state, accessibility, and type-size tokens. `src/styles/storybook-world.css` defines the global art direction and its place-specific compositions. The selected palette is deep archive navy and indigo, warm paper and ink for reading, gold for discovery, violet for guide/archive light, rust for Mars, and cool slate/lavender for lunar scenes.

| Role | Token / value | Use |
|---|---|---|
| Night foundation | `--archive-night: #10152f` | App shell and starfield |
| Raised night | `--archive-deep: #1c2446` | Night-scene surfaces |
| Field-note paper | `--archive-paper: #fff6df` | Long-form scientific text |
| Field-note ink | `--archive-ink: #202541` | Text on paper |
| Discovery accent | `--archive-gold: #f4bd55` | Primary actions and collected clues |
| Spark light | `--archive-violet: #bba2ed` | Guide and archive cues |
| Reading measure | `--archive-reading: 68ch` | Target width for explanatory copy |

### Scene palettes

These place-specific tokens bring more saturated color into the illustrated environments while preserving warm paper and ink for long-form reading. The SVG scene assets use the same palette values as their authored fills.

| Scene | Tokens | Composition / use |
|---|---|---|
| Memory Station cabin | `--scene-cabin-ink: #17153f`; `--scene-cabin-violet: #6c45b5`; `--scene-cabin-glass: #282868`; `--scene-cabin-gold: #ffd15a` | Violet cabin shell, panoramic window, gold console accents, deep blue glass. |
| Mars expedition | `--scene-mars-violet: #5b347f`; `--scene-mars-coral: #f07b62`; `--scene-mars-orange: #f28a54`; `--scene-mars-red: #b94c63`; `--scene-mars-gold: #ffc45a` | Warm coral ridges, orange ground, ochre light, with violet sky. |
| Moon expedition | `--scene-moon-indigo: #211c5c`; `--scene-moon-violet: #5b4d9b`; `--scene-moon-lavender: #b6a9d9`; `--scene-moon-silver: #d7ceef`; `--scene-moon-gold: #ffd15a` | Indigo sky, silver-lavender lunar ridges and bright star accents. |

Display headings use DynaPuff; Chewy is for short decorative accents; Nunito is used for instructions, data, sources, and controls. The fonts use the existing Google Fonts stylesheet and system fallbacks.

## Composition rules

- Welcome is an opening storybook spread; Station is a welcoming exploration cabin; Mars and Moon are distinct illustrated landscapes; dossiers are field-journal chapters; challenges are investigation tables; rewards reveal a recovered clue; the constellation is a quiet star atlas.
- Paper surfaces are reserved for reading. Do not nest cards or reuse an identical tile grid as the structure for every screen.
- Spark is a fictional guide, not mission hardware or a source. Keep character dialogue separate from verified mission facts.
- Use original hand-authored project SVGs; preserve the signature hardware of all six objects. Do not add a human avatar or NASA marks.
- The Moon destination portal shows a lunar landscape, not mission-character portraits.
- Schematic maps state that marker placement is illustrative and not coordinate-accurate.

## Controls and motion

- Child-facing touch targets are at least 44px tall; primary actions can use the 56px preferred token. Keep labels visible and language controls usable at 390px.
- Controls show distinct hover, pressed, disabled, and keyboard-focus states. Focus is never color-only or suppressed.
- Motion is tied to a meaningful action or reward. No idle constellation pulsing, full-screen moving starfield, or route transition that delays the task.
- Both the saved reduced-motion preference and OS preference must preserve the same understandable state without continuous movement.

## Accessibility and responsive behavior

- Spanish is the default and all interface copy belongs in the shared `src/i18n/es.ts` and `src/i18n/en.ts` dictionaries.
- Preserve route announcements, skip navigation, keyboard/touch alternatives, accessible names for informative art, and text alternatives to map/constellation information.
- Review the complete app at 1440×900, 1366×768, 768px, and 390px, including long English labels and browser zoom.
- WCAG 2.1 AA is the project target, not a verified conformance claim. Measure text/control contrast and verify screen-reader and keyboard flows before release.

## Asset provenance and use

- Runtime Spark and mission-object SVG vectors are hand-authored with OpenAI Codex code assistance. `public/images/spark-expression-sheet.png` was made with OpenAI image generation and remains provenance only, not runtime art.
- `public/images/scenes/memory-station-cabin.svg`, `mars-expedition.svg`, and `moon-expedition.svg` are original hand-authored vector environments created for this direction; they contain no NASA marks or historical reenactment.
- `referencias/9791333.svg` remains an untouched reference asset and is no longer used as the Memory Station background. It embeds raster artwork and its rights holder/use terms are not documented locally. `9735834.svg` is an art-direction reference and is not used as a universal background.
- The supplied Grupo Épico logo is displayed as a small project-team attribution in the footer. Usage terms were not found in the supplied files; verify before public distribution.
- No standalone NASA logo was found. Supplied 2026 Space Apps marks are not NASA seals and are not used in place of a NASA source or endorsement.
- Do not reuse the Freepik-marked moodboard image as runtime artwork.
