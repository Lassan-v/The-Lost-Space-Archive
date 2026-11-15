# AI Disclosure — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Last updated:** 2026-11-15

## Tools and assisted work

| Tool | Use | Scope |
|---|---|---|
| OpenAI image generation in Codex | Generated one original concept/expression sheet for Archive Keeper Spark; retained as provenance, no longer rendered in the app | `spark-expression-sheet.png` (not published) |
| OpenAI Codex | Assisted code and documentation edits in this project | Phase work; review changes through Git before release |
| OpenAI Codex | Assisted documentation and hand-authored SVG markup for the Stage 1B mission-character pose sheet | `docs/CHARACTER_BIBLE.md`, `docs/CHARACTER_SHOWCASE.html`, `src/assets/sprites/mission-character-poses.svg`; no image-generation model or raster generation was used for this asset |
| Anthropic Claude Code (Claude Opus 5.5) | Assisted CSS/SVG motion code (app-wide drifting starfield, screen and character idle motion) and drafted first-person character story dialogue built only from existing sourced `science.*` facts | `src/components/layout/Starfield.*`, `src/styles/motion.css`, `src/components/content/MissionCharacterPanel.*`, `src/data/missionCharacters.ts`, `src/i18n/{es,en}.ts` (`character.*.story1–5`, `character.chapter.*`); no image-generation model used |

The Spark image prompt requested a small wheeled purple robot with expressive eyes and a head-integrated projector, eight distinct poses in a 4×2 sheet, a gouache/pencil storybook style, the approved palette, and no NASA marks, mission identifiers, people, text, or watermark. The image file does not contain a baked-in disclosure label. It is retained for provenance only and is not rendered by the application. The app uses hand-authored Spark and mission-object SVG art. The team must review current event submission requirements before release.

## Generated content inventory

| Content | Tool | Disclosure / review |
|---|---|---|
| `spark-expression-sheet.png` (formerly `public/images/`) | OpenAI image generation in Codex | Not displayed and not published: moved out of the public build and kept only as local team provenance |
| `src/assets/sprites/mission-character-poses.svg` | Hand-authored vector paths with OpenAI Codex code assistance | Original SVG artwork used in runtime maps, mission dossiers, and learning activities; no raster image or image-generation model used |
| Stage 1 code and project documentation | OpenAI Codex assistance | Recorded here; code review and science review remain required |
| NASA mission facts | NASA source material curated in `docs/NASA_SOURCES.md` and `src/data/nasa/` | AI assistance is not a source; verify each claim against its cited NASA record |

## Visible disclosure

The raster concept is not used by runtime screens or documentation previews. `src/assets/sprites/spark-poses.svg` and `src/assets/sprites/mission-character-poses.svg` are hand-authored vector art with code assistance and are not described as AI-generated images. The Spark and mission-object vector assets are used by the runtime experience.

The image and app are original project work and do not use NASA logos or imply NASA sponsorship or endorsement. Runtime screens use hand-authored vector assets with code assistance; the AI-generated raster concept remains unused. The app footer discloses this distinction in Spanish and English. Check the current Space Apps submission instructions and NASA brand guidance before publication:

- [NASA Space Apps 2026 AI-generated content clarification](https://github.com/nasa/spaceapps/discussions/1947)
- [NASA Brand Guidelines](https://www.nasa.gov/nasa-brand-center/brand-guidelines/)

This register does not claim that an executive order establishes “Super Intelligence” as official terminology. Use the language specified in the current event materials.

## Update log

| Date | Change |
|---|---|
| 2026-11-14 | Recorded the generated concept's provenance and updated its status after the hand-authored vector replaced it in runtime screens. |
| 2026-11-14 | Recorded the hand-authored mission-character SVG pose sheet and its provenance. |
| 2026-11-15 | Documented runtime use of the original Spark and mission-object vectors and the bilingual in-app AI/code assistance disclosure. |
| 2026-11-15 | Recorded Claude Code assistance for the animated starfield, motion polish and five-chapter character stories (dialogue is fictional framing; facts reuse sourced cards; science review still required). |
| 2026-11-15 | Claude Code also assisted hand-authored vector icons and motion: `StorySparkle`, `ActivityIcons`, redrawn Surveyor 3 sampling scene, fragment illustrations, constellation restyle, container reveal/hover motion, and extended ridge paths in the Moon/Mars scene SVGs. No image-generation model used. |
| 2026-11-15 | Claude Code assisted the completion celebration (vector medal, confetti), the redesigned replay dialog, shared `FragmentArt`/`Confetti` components and softer reveal motion. Corrected the Spanish replay warning to say progress is erased. No image-generation model used. |
| 2026-11-15 | Release prep: AI tooling (agents, skills, prompts, assistant memory) excluded from the repository via `.gitignore`; the unused AI concept PNG removed from the public build; sprite paths updated. This disclosure file stays published. |
