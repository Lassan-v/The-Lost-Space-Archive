# Scene Art Direction — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Scope:** Backgrounds and environment art direction for all five primary scenes, ensuring visual cohesion, accessibility, and child-friendly appeal.

---

## 1. Universal Visual Language

- **Depth Layering:** Each scene uses 3–4 parallax layers (Far starfield → Mid-ground planetary surface/structures → Near foreground characters/UI).
- **Color Harmony:** Consistent deep navy base (`#0B1426`) with realm-specific accent palette overlays.
- **Responsive Scaling:** Background art delivered as SVG compositions, scaling cleanly from mobile (375px) to desktop (1440px+) without quality loss.
- **Performance:** Static background SVGs embedded inline or as `<img>` with proper `width`/`height` attributes; no complex filter chains or large raster images.

---

## 2. Memory Station (Archive Hub)

### 2.1 Concept
A cozy, magical orbital archive station — part library, part star map, part mission control — floating in a gentle nebula. Warm reading lights glow from portholes; floating memory fragments drift like fireflies.

### 2.2 Color Palette
- **Base:** Deep navy `#0B1426` with subtle nebula purple gradient (`#8B5CF6` at 15% opacity).
- **Accents:** Warm amber reading lights (`#F5A623`), cyan data streams (`#06B6D4`), soft white stars.

### 2.3 Layer Structure (Back → Front)
1. **Far Starfield:** Static deep-space stars (tiny circles, varied opacity 0.3–0.8), very slow parallax (0.05x).
2. **Nebula Gradient:** Large soft radial gradient overlay (purple/blue), fixed.
3. **Mid-Ground Station Hull:** Rounded organic station silhouette with glowing portholes (SVG paths with gradient fills).
4. **Floating Memory Fragments:** 8–12 small glowing star-shaped particles (animated subtle drift, `transform: translate()`).
5. **Near Foreground Console/Desk:** Interactive UI elements sit here (character docking slots, constellation tracker).

### 2.4 Key Visual Elements
- **Archive Shelves:** Curved wall segments with glowing data cubes (subtle pulse animation).
- **Central Hologram Map:** Translucent 2D projection of solar system with mission pin locations (non-interactive backdrop).
- **Welcome Mat / Docking Bay:** Soft illuminated landing pad for arriving characters.

### 2.5 Accessibility Notes
- Text content never placed directly on busy nebula; always on semi-transparent `--color-surface-overlay` cards.
- Focus indicators clearly visible against dark background (3px sky-blue ring).
- Reduced Motion: Drifting particles and pulsing data cubes stop; become static decorative elements.

---

## 3. Mars Expedition Map

### 3.1 Concept
An orbital view of Mars with a slowly rotating globe, showing mission landing sites as warm glowing pins. Dust storms swirl gently across the surface; the Martian moons Phobos and Deimos orbit in the distance.

### 3.2 Color Palette
- **Base:** Deep space navy `#0B1426`.
- **Mars Surface:** Terracotta rust tones (`#E85D04` primary, `#D97706` highlights, `#A16207` shadows).
- **Atmosphere:** Thin rose-dust haze (`#F5A623` at 10% opacity over limb).
- **Accents:** Warm yellow/orange mission pins (`#F5A623`), teal orbital path lines (`#06B6D4`).

### 3.3 Layer Structure (Back → Front)
1. **Starfield:** Same as Memory Station (shared asset).
2. **Mars Globe:** Rotating textured sphere (SVG with radial gradient simulating spherical shading + subtle crater texture pattern).
3. **Atmospheric Halo:** Thin glowing limb shader (radial gradient stroke).
4. **Mission Pin Locations:** 4 pins (Spirit Gusev Crater, Opportunity Meridiani Planum, Sojourner Ares Vallis, Ingenuity Jezero Crater) with character icons on hover/focus.
5. **Orbital Path Lines:** Curved SVG paths connecting pins in discovery order.
6. **Phobos & Deimos:** Tiny orbiting moon sprites on slow elliptical paths.

### 3.4 Key Visual Elements
- **Dust Storm Layer:** Subtle semi-transparent particle system (CSS animation) across low latitudes — disabled in reduced motion.
- **Mission Pin Tooltip:** On hover/focus, shows character name, mission, and "Tap to explore" prompt.
- **Distance Scale Bar:** Small calibrated scale indicator in corner (e.g., "1 cm = 500 km").

### 3.5 Accessibility Notes
- Pin locations reachable via keyboard (tab order follows discovery sequence).
- Color-blind safe: pins use both color (yellow) and shape (star vs. circle) to differentiate.
- Reduced Motion: Globe rotation pauses at default orientation; dust storm particles hidden.

---

## 4. Moon Expedition Map

### 4.1 Concept
A near-side view of the Moon with Earth hanging majestically in the black sky. Five landing sites marked with gentle glowing pins. Regolith texture is visible; Earth shows correct phase for current date (simplified).

### 4.2 Color Palette
- **Base:** Deep space navy `#0B1426`.
- **Moon Surface:** Cool silvery grays (`#94A3B8` base, `#CBD5E1` highlights, `#64748B` crater shadows).
- **Earth:** Vibrant blue marble (`#3B82F6` oceans, `#22C55E` landmasses, `#F1F5F9` clouds).
- **Accents:** Golden yellow mission pins (`#F5A623`), soft white Earthshine glow on Moon limb.

### 4.3 Layer Structure (Back → Front)
1. **Starfield:** Shared asset.
2. **Earth in Sky:** Large fixed Earth disc (upper right/left depending on RTL/LTR), correct phase rendered via SVG clip-path.
3. **Moon Surface:** Detailed near-side map (SVG with mare/basalt regions as darker shapes, highlands lighter).
4. **Mission Pin Locations:** 5 pins (Surveyor 3 Oceanus Procellarum, Apollo 15 Hadley-Apennine, Apollo 16 Descartes, Apollo 17 Taurus-Littrow, plus generic LRV parking spots).
5. **Orbital Trails:** Faint lines showing Apollo command module orbits.

### 4.4 Key Visual Elements
- **Regolith Texture:** Fine stipple pattern (SVG `<pattern>`) for tactile feel.
- **Earthshine:** Subtle glow on Moon's night side facing Earth.
- **Mission Pin Tooltip:** Same interaction pattern as Mars map.

### 4.5 Accessibility Notes
- Earth phase rendering uses clear shape distinction, not color alone.
- Keyboard navigation order: Surveyor 3 → Apollo 15 → Apollo 16 → Apollo 17 (chronological).
- Reduced Motion: Earth rotation paused; no shimmering Earthshine animation.

---

## 5. Dossier Backgrounds (Mission-Specific)

### 5.1 Design Pattern
Each dossier screen uses a subtle, non-distracting environmental backdrop behind the content card/panel. The background hints at the mission's world without competing with text readability.

### 5.2 Mars Dossiers (Spirit, Opportunity, Sojourner, Ingenuity)
- **Background:** Wide panoramic Mars landscape — rusty ground plane fading to dusty pink horizon.
- **Details:** Distant crater rim silhouettes, subtle dust devil tracks.
- **Overlay:** Semi-transparent navy gradient (`linear-gradient(180deg, rgba(11,20,38,0.7) 0%, rgba(11,20,38,0.3) 50%, transparent 100%)`) ensuring text contrast.
- **Color Tint:** Warm terracotta filter on any illustrative elements.

### 5.3 Moon Dossiers (Surveyor 3, Apollo 15/16/17 LRVs)
- **Background:** Lunar surface close-up — fine regolith texture, small crater rim, deep black sky.
- **Details:** Earth visible on horizon (correct relative size), long shadows from low sun angle.
- **Overlay:** Same navy gradient overlay for readability.
- **Color Tint:** Cool silver-blue filter.

### 5.4 Technical Specifications
- **Format:** Inline SVG (for CSS variable theming) or optimized WebP (for complex painterly backgrounds).
- **Dimensions:** Viewport-covering, aspect-ratio preserved (16:9 desktop, 4:5 mobile).
- **Text Safe Zone:** Central 80% width guaranteed minimum 7:1 contrast against background via overlay.

---

## 6. Challenge Screens (Clean Focus)

### 6.1 Design Pattern
Minimal backgrounds — solid `--color-bg-secondary` (`#14213D`) with a single subtle atmospheric accent element.

### 6.2 Challenge-Specific Accents
- **Part Match (Sojourner):** Faint technical schematic grid lines (`--color-border-subtle` at 0.3 opacity).
- **Path Sequence (Ingenuity):** Very subtle dotted flight path arcs in background.
- **Soil Dig (Surveyor 3):** Fine stipple texture suggesting regolith.
- **Rover Drive (Apollo 15 LRV):** Extremely subtle tire track texture lines.

### 6.3 Requirements
- Zero parallax, zero animation on background layer.
- All visual attention directed to interactive challenge components.
- Meets strictest contrast requirements (text on solid dark surface).

---

## 7. Constellation of Memories (Final Screen)

### 7.1 Concept
A breathtaking night sky where each completed mission becomes a bright star. The 8 stars connect to form a unique "Lost Archive" constellation shape. The Archive Keeper (Spark) floats nearby, celebrating.

### 7.2 Color Palette
- **Base:** Deepest navy `#050A14` (darker than other scenes for maximum star contrast).
- **Stars (Unfilled):** Dim outline circles (`--color-border-subtle`, 2px stroke).
- **Stars (Filled/Completed):** Radiant glow (`--color-accent-primary` `#F5A623` with `--shadow-glow`).
- **Connection Lines:** Thin curved paths (`--color-accent-purple` `#8B5CF6`, 1.5px stroke, dashed-to-solid animation on completion).
- **Archive Keeper:** Full character rendering with enhanced glow.

### 7.3 Layer Structure (Back → Front)
1. **Deep Starfield:** Dense but tiny stars (static).
2. **Constellation Lines:** SVG `<path>` elements connecting star positions.
3. **Star Nodes:** 8 positioned `<circle>` elements with glow filters.
4. **Archive Keeper (Spark):** Center-bottom or floating right.
5. **UI Overlay:** "Return to Station" button, progress summary.

### 7.4 Star Positions (Normalized 0–1 Coordinates)
| Mission | X | Y | Constellation Order |
|---|---|---|---|
| Sojourner | 0.15 | 0.70 | 1 |
| Spirit | 0.30 | 0.40 | 2 |
| Opportunity | 0.45 | 0.25 | 3 |
| Ingenuity | 0.60 | 0.35 | 4 |
| Surveyor 3 | 0.75 | 0.60 | 5 |
| Apollo 15 LRV | 0.85 | 0.40 | 6 |
| Apollo 16 LRV | 0.90 | 0.55 | 7 |
| Apollo 17 LRV | 0.80 | 0.75 | 8 |

- **Shape:** Forms a gentle ascending spiral suggesting a journey outward from Mars to Moon.

### 7.5 Accessibility Notes
- Constellation lines drawn with both color and pattern (dashed for incomplete, solid for complete).
- Screen reader announces: "Constellation complete: 8 of 8 memories recovered."
- Reduced Motion: Line drawing animation skipped; completed lines appear instantly solid.

---

## 8. Asset Delivery Specifications

| Asset | Format | Dimensions | Naming Convention |
|---|---|---|---|
| Memory Station Background | SVG | 1920x1080 (viewport cover) | `bg-memory-station.svg` |
| Mars Map (Globe + Pins) | SVG (multi-layer) | 1920x1080 | `bg-mars-map.svg` |
| Moon Map (Surface + Earth) | SVG (multi-layer) | 1920x1080 | `bg-moon-map.svg` |
| Mars Dossier Backdrop | SVG / WebP | 1920x1080 | `bg-dossier-mars.svg` |
| Moon Dossier Backdrop | SVG / WebP | 1920x1080 | `bg-dossier-moon.svg` |
| Challenge Screen Accents | SVG | 1920x1080 | `bg-challenge-[type].svg` |
| Constellation Background | SVG | 1920x1080 | `bg-constellation.svg` |

- All SVGs use `viewBox="0 0 1920 1080"` and `preserveAspectRatio="xMidYMid cover"`.
- CSS custom properties referenced inside SVGs via `currentColor` or explicit `var(--token-name)` for theming support.

---

## 9. Unresolved Decisions / Open Questions

1. **Dynamic Earth Phase on Moon Map:** Should Earth phase be calculated client-side from current date, or use a fixed aesthetically pleasing phase (e.g., waxing gibbous)?
2. **Mars Globe Texture Detail:** Procedural SVG crater pattern vs. pre-rendered WebP texture for performance on low-end mobile?
3. **Constellation Final Shape:** Spiral confirmed, but exact curve tension/control points to be refined with UX designer for "delightful" feel.
4. **AI Disclosure Placement on Backgrounds:** Confirm exact watermark position (see `AI_DISCLOSURE_PLACEMENT.md`).