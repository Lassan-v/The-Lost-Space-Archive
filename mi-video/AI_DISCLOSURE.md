# AI disclosure — promo video (mi-video)

**Output:** `Renders/The_Lost_Space_Archive_Demo.mp4` (30 s, 1080×1920, H.264/AAC)

## AI tool used
- Claude Code (Anthropic) wrote the Remotion/React source in `src/`, the helper scripts in `scripts/`, and the on-screen English copy. The team reviewed all of it.

## What is *not* AI-generated imagery
- **Screens:** real captures of the live site `thelostspacearchive.vercel.app` (English UI), taken by `scripts/capture.mjs` and saved in `public/screens/`. They are not redrawn.
- **Characters and scenes:** the project's own hand-authored vector SVGs (Spark, mission characters, Mars/Moon/station scenes). `public/brand/` holds unmodified crops of `src/assets/sprites/` and `public/images/`.
- **Team logo:** Grupo Épico logo from `referencias/grupo epico logo/`.
- **No** NASA logos, insignia, flags, or mission patches appear in the video. The video carries the note: "Independent project. Not an official NASA product."

## Audio
- Music and all sound effects are original. AI-written code (`scripts/synth.mjs`) synthesizes them with oscillators and noise. The video uses no samples, downloaded audio, or third-party music.

## Facts shown
- Every mission number in the video is copied from the app's NASA-sourced cards (`src/i18n/en.ts`, `science.*` keys, which cite NASA/JPL/NSSDCA source IDs):
  - Sojourner: 83 days (planned 7)
  - Ingenuity: 72 flights
  - Apollo 17 LRV: 35.9 km total
- The video invents no data.
