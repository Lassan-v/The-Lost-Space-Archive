# Screen Specifications — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Breakpoints:** Mobile ≤640px, Tablet 641–1024px, Desktop >1024px

---

## 1. Global Layout System

### 1.1 Spacing Scale (CSS Custom Properties)
```css
:root {
  --space-xs: 4px;    /* 4px */
  --space-sm: 8px;    /* 8px */
  --space-md: 16px;   /* 16px */
  --space-lg: 24px;   /* 24px */
  --space-xl: 32px;   /* 32px */
  --space-2xl: 48px;  /* 48px */
  --space-3xl: 64px;  /* 64px */
}
```

### 1.2 Border Radius Scale
```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### 1.3 Typography Scale
```css
:root {
  --text-xs: 0.75rem;    /* 12px - captions, labels */
  --text-sm: 0.875rem;   /* 14px - body small, button text */
  --text-base: 1rem;     /* 16px - body default */
  --text-lg: 1.125rem;   /* 18px - body large, instructions */
  --text-xl: 1.25rem;    /* 20px - headings small */
  --text-2xl: 1.5rem;    /* 24px - headings medium */
  --text-3xl: 2rem;      /* 32px - headings large */
  --text-4xl: 2.5rem;    /* 40px - hero */
  
  --font-family: 'Nunito', system-ui, sans-serif;  /* Rounded, friendly */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
}
```

### 1.4 Color Tokens (Semantic — Actual Values TBD by Visual Designer)
```css
:root {
  /* Foundation */
  --color-bg-primary: #0B1426;        /* Deep navy */
  --color-bg-secondary: #14213D;      /* Elevated surfaces */
  --color-bg-tertiary: #1E3A5F;       /* Cards, panels */
  
  /* Accent */
  --color-accent-primary: #F5A623;    /* Warm yellow/orange */
  --color-accent-secondary: #E85D04;  /* Orange */
  --color-accent-purple: #8B5CF6;     /* Purple support */
  
  /* Semantic */
  --color-text-primary: #FFFFFF;      /* On dark bg */
  --color-text-secondary: #B8C5D6;    /* Muted */
  --color-text-inverse: #0B1426;      /* On light bg */
  --color-text-accent: #F5A623;       /* Highlight */
  
  /* Interactive */
  --color-interactive: #F5A623;       /* Primary buttons */
  --color-interactive-hover: #FFB84D;
  --color-interactive-active: #D48B00;
  --color-interactive-disabled: #4A5A7A;
  
  /* State */
  --color-success: #22C55E;
  --color-warning: #F5A623;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* Focus */
  --color-focus: #F5A623;
  --color-focus-ring: 3px solid var(--color-focus);
  
  /* Borders */
  --color-border-subtle: #2D4A7A;
  --color-border-strong: #4A6FA5;
}

/* High Contrast Override */
@media (prefers-contrast: more) {
  :root {
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #E0E0E0;
    --color-bg-primary: #000000;
    --color-bg-secondary: #1A1A1A;
    --color-bg-tertiary: #2A2A2A;
    --color-interactive: #FFFF00;
    --color-interactive-hover: #FFFF33;
    --color-border-strong: #FFFFFF;
    --color-focus: #FFFF00;
  }
}
```

### 1.5 Touch Targets
- **Minimum:** 44×44 px (WCAG AA)
- **Preferred:** 56×56 px (child-friendly, all primary actions)
- **Spacing between targets:** ≥ 8px

### 1.6 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 2. Screen Specifications

### 2.1 Welcome Screen

**Route:** `/` (initial entry)  
**Layout:** Centered card, max-width 480px

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        [Archive Keeper]                         │
│                      (animated illustration)                    │
│                                                                 │
│                    The Lost Space Archive                       │
│                                                                 │
│              "Welcome, Explorer! Ready to                      │
│               discover lost space missions?"                   │
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │                  [ Begin Exploring ]                │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
│    [ Settings ]  ← Accessibility panel (bottom-left)           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**States:**
- **Default:** Idle animation on character
- **Focus:** Button has visible focus ring
- **Loading:** If checking localStorage >200ms, show subtle spinner
- **Reduced Motion:** Character static, no pulse on button

**Responsive:**
- Mobile: Full-width card, 16px margins
- Tablet/Desktop: Centered 480px card

---

### 2.2 Memory Station (Hub)

**Route:** `/station`  
**Layout:** Full viewport, persistent header

```
┌─────────────────────────────────────────────────────────────────┐
│  [≡ Memory Station]                    [⚙ Settings] [★ 1/8]    │
│  (aria-label="Return to Memory Station")                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                        [Archive Keeper]                         │
│                      (larger, expressive idle)                  │
│                                                                 │
│              "Welcome back to the Memory Station!              │
│               Where would you like to explore?"                │
│                                                                 │
│    ┌─────────────────────────┐  ┌─────────────────────────┐   │
│    │      [ Mars Expedition  ]  │   [ Moon Expedition  ]  │   │
│    │    (active, primary)    │  │   (disabled in MVP)     │   │
│    │                         │  │   "Coming Soon" badge   │   │
│    └─────────────────────────┘  └─────────────────────────┘   │
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │              [ View Constellation ]                 │     │
│    │              (secondary, shows 1/8)                 │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Header Specs:**
- Fixed position, z-index 100
- Height: 56px mobile, 64px desktop
- Memory Station button: 48×48 px touch target, icon + text on desktop
- Settings: 44×44 px, opens modal
- Constellation preview: Shows lit count, clickable

**Destination Buttons:**
- Minimum 200×120 px (mobile: full-width stacked)
- Mars: Primary style (accent bg)
- Moon: Disabled style (muted bg, lock icon, "Coming Soon" label)
- Hover/Focus: Scale 1.02, elevation increase
- Disabled: `aria-disabled="true"`, cursor not-allowed

**Constellation Button:**
- Secondary style, shows fraction (e.g., "1/8")
- Opens constellation overlay

**States:**
- **Default:** As above
- **Returning User:** "Welcome back!" message, Continue button highlighted
- **Empty (no progress):** "Begin Exploring" on Mars button
- **Focus:** Visible ring on all interactive elements
- **Reduced Motion:** No character idle animation, instant transitions

**Responsive:**
- Mobile: Stacked buttons, header condenses to icons only
- Tablet: Side-by-side buttons, header shows labels
- Desktop: Generous spacing, character larger

---

### 2.3 Mars Expedition Map / Moon Expedition Map

**Routes:** `/mars`, `/moon`  
**Layout:** Full viewport, illustrative map

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Memory Station]                              [★ 1/8] [⚙]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              MARS EXPEDITION                                    │
│              (or MOON EXPEDITION)                               │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │                                     │                │
│         │           [Mars Globe]              │                │
│         │                                     │                │
│         │    ● Sojourner (active, pulsing)    │                │
│         │    🔒 Spirit (locked)               │                │
│         │    🔒 Opportunity (locked)          │                │
│         │    🔒 Ingenuity (locked)            │                │
│         │                                     │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
│    "Tap a mission to explore. Locked missions coming soon!"    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Map Area:**
- Aspect ratio: 4:3 (mobile), 16:9 (desktop)
- Illustrative style (not photorealistic)
- Pins: 40×40 px touch target minimum
- Active pin: Pulsing glow (respects reduced motion = static glow)
- Locked pin: 40% opacity, lock overlay, disabled

**Pin Interaction:**
- **Hover/Focus:** Tooltip with mission name + status
- **Click/Tap Active:** Navigate to dossier
- **Click/Tap Locked:** Toast "Coming Soon — more missions arriving!"
- **Keyboard:** Arrow keys navigate between pins, Enter activates

**Tooltip Content:**
- Active: "Sojourner — First Wheels on Mars — Tap to explore"
- Locked: "Spirit — Water Detective — Coming Soon"

**Persistent Elements:**
- Back button (top-left): "← Memory Station"
- Constellation preview (top-right): Star icon + count
- Settings (top-right): Gear icon

**States:**
- **Default:** As above
- **Loading:** Skeleton globe + pin placeholders
- **Error:** "Unable to load map. [Retry]" button
- **Reduced Motion:** No pin pulse, static glow only

**Responsive:**
- Mobile: Map fills width, pins larger (48×48), tooltip on tap
- Tablet: Map centered, side legend with mission list
- Desktop: Full map, hover tooltips, keyboard navigation

---

### 2.4 Dossier Screen

**Route:** `/dossier/:id` (e.g., `/dossier/sojourner-mpf`)  
**Layout:** Two-column (desktop), stacked (mobile)

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Mars Map]  Sojourner — Mars Pathfinder        [★ 1/8] [⚙]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌────────────────────────────────────────┐  │
│  │              │  │         STORY & FACTS                  │  │
│  │  [Character  │  │  ┌──────────────────────────────────┐  │  │
│  │   Art]       │  │  │  "Sojourner was the first robot  │  │  │
│  │              │  │  │   car to drive on Mars."         │  │  │
│  │  (illustrated,           │  │  [Source: SRC-SOJ-001]   │  │  │
│  │   expressive)             ├────────────────────────────┤  │  │
│  │              │  │  │  "It landed July 4, 1997 in       │  │  │
│  │              │  │  │   Ares Vallis."                   │  │  │
│  │              │  │  │  [Source: SRC-SOJ-001]           │  │  │
│  └──────────────┘  │  ├──────────────────────────────────┤  │  │
│                    │  │  │  "It had a solar panel,        │  │  │
│                    │  │  │   cameras, a rock-touching     │  │  │
│                    │  │  │   arm, and 6 wheels."          │  │  │
│                    │  │  │  [Source: SRC-SOJ-001]         │  │  │
│                    │  │  ├────────────────────────────────┤  │  │
│                    │  │  │  "It worked for 83 Mars days — │  │  │
│                    │  │  │   12 times longer than         │  │  │
│                    │  │  │   planned!"                    │  │  │
│                    │  │  │  [Source: SRC-SOJ-001]         │  │  │
│                    │  │  └────────────────────────────────┘  │  │
│                    │  │                                      │  │
│                    │  │  ⚠ Simulation — simplified for       │  │
│                    │  │     learning. Real mission data      │  │
│                    │  │     from NASA sources.               │  │
│                    │  │                                      │  │
│                    │  │  ┌────────────────────────────────┐  │  │
│                    │  │  │      [ Start Challenge ]       │  │  │
│                    │  │  └────────────────────────────────┘  │  │
│                    │  └──────────────────────────────────────┘  │
│  (Mobile: stacked,                │
│   character above                 │
│   facts, full width)              │
└─────────────────────────────────────────────────────────────────┘
```

**Left Column (Character Art):**
- Width: 280px desktop, 100% mobile
- Aspect ratio: 3:4
- Illustrated character (Archive Keeper + rover)
- Subtle idle animation (breathing, blink) — respects reduced motion

**Right Column (Story/Facts Panel):**
- Max-width: 560px
- Scrollable if content exceeds viewport
- Fact cards: Each with source citation line (small, muted)
- Simulation banner: Always visible, distinct style (amber bg, icon)

**Fact Card Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  "Child-friendly fact sentence. One concept per card."    │
│  ────────────────────────────────────────────────────────  │
│  [Source: SRC-XXX-001]          ← Small, muted, clickable  │
└────────────────────────────────────────────────────────────┘
```

**Start Challenge Button:**
- Full-width on mobile, 280px on desktop
- Primary style, prominent
- `aria-describedby` points to instruction text

**Header:**
- Back button: "← Mars Map" (or "← Moon Map")
- Dossier title: Hardware name + mission
- Constellation + Settings icons

**States:**
- **Default:** As above
- **Loading:** Skeleton for character + fact cards
- **Error:** "Unable to load dossier. [Retry]" inline
- **Focus:** Button focus visible, fact cards not focusable (read-only)
- **Reduced Motion:** Character static

**Responsive:**
- Mobile: Stacked, character 200px tall, facts full-width scroll
- Tablet: Side-by-side, character 300px, facts flexible
- Desktop: Side-by-side, character 320px, facts max 560px

---

### 2.5 Challenge Screens (Patterns P1–P6)

**Route:** `/challenge/:dossierId`  
**Layout:** Pattern-specific, all share header/footer

#### Common Challenge Header
```
┌─────────────────────────────────────────────────────────────────┐
│  [← Dossier]  Build Sojourner: First Wheels on Mars  [★] [⚙]   │
├─────────────────────────────────────────────────────────────────┤
│  Instruction: "Drag each part to build Sojourner.               │
│  Tap a part to hear its job."                                   │
│  ⚠ Simulation — simplified for learning. Real mission data     │
│  from NASA sources.                                              │
└─────────────────────────────────────────────────────────────────┘
```

#### Common Challenge Footer
```
┌─────────────────────────────────────────────────────────────────┐
│  [ Live Feedback Region (aria-live="polite") ]                 │
│                                                                 │
│  [ Memory Station ]  ← Persistent, always accessible           │
└─────────────────────────────────────────────────────────────────┘
```

---

#### Pattern P3: Rover Part Builder (Sojourner MVP)

**Layout:** Two-panel (desktop), stacked (mobile)

```
┌─────────────────────────────────────────────────────────────────┐
│  Header + Instruction                                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │      CHASSIS            │  │       PARTS PALETTE         │  │
│  │      SILHOUETTE         │  │                             │  │
│  │                         │  │  ┌─────────────────────┐    │  │
│  │   ┌───────────────┐     │  │  │ ☀ Solar Panel       │    │  │
│  │   │   [SLOT]      │     │  │  │    Makes electricity│    │  │
│  │   │  (top deck)   │     │  │  │    from sunlight    │    │  │
│  │   └───────────────┘     │  │  └─────────────────────┘    │  │
│  │                         │  │                             │  │
│  │  ┌───┐           ┌───┐   │  │  ┌─────────────────────┐    │  │
│  │  │[S]│           │[S]│   │  │  │ 📷 Front Cameras    │    │  │
│  │  │   │           │   │   │  │  │    Spot rocks ahead │    │  │
│  │  └───┘           └───┘   │  │  └─────────────────────┘    │  │
│  │                          │  │                             │  │
│  │       ┌───────────┐      │  │  ┌─────────────────────┐    │  │
│  │       │   [SLOT]  │      │  │  │ 📷 Rear Camera      │    │  │
│  │       │  (arm)    │      │  │  │    See behind       │    │  │
│  │       └───────────┘      │  │  └─────────────────────┘    │  │
│  │                          │  │                             │  │
│  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ │  │  ┌─────────────────────┐    │  │
│  │  │[S]│ │[S]│ │[S]│ │[S]│ │  │  │ 🤖 APXS Arm         │    │  │
│  │  └───┘ └───┘ └───┘ └───┘ │  │  │    Touch rocks to   │    │  │
│  │  (6 wheels)              │  │  │    learn composition│    │  │
│  │                          │  │  └─────────────────────┘    │  │
│  └─────────────────────────┘  │                             │  │
│                               │  ┌─────────────────────┐    │  │
│                               │  │ ⚙ Wheels (6)        │    │  │
│                               │  │    Drive on Mars    │    │  │
│                               │  └─────────────────────┘    │  │
│                               └─────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  Footer (Feedback + Memory Station button)                      │
└─────────────────────────────────────────────────────────────────┘
```

**Chassis Silhouette:**
- SVG illustration, not photo
- 5 drop zones (slots), each with `data-slot="solar|front-cam|rear-cam|apxs|wheels"`
- Slot visual: Dashed outline, label inside ("Solar Panel goes here")
- Filled state: Part snaps in, outline becomes solid, checkmark

**Parts Palette:**
- 5 cards, each draggable (`draggable="true"` + keyboard fallback)
- Card structure: Icon (48×48), Label, Job description (1 line)
- `aria-label="Solar Panel — Makes electricity from sunlight. Drag to top deck."`
- Keyboard: Tab to card, Enter to "pick up", Tab to slot, Enter to "place"

**Interaction States:**
- **Dragging:** Card lifts (transform), slot highlights if valid target
- **Hover Valid Slot:** Slot glows accent color
- **Drop Success:** Snap animation, audio chime, part reads job (TTS)
- **Drop Fail:** Card bounces back, toast "Try another spot?"
- **After 2 Fails:** Correct slot pulses gently, audio hint

**Accessibility Alternatives:**
- **Audio Build Mode:** "Solar Panel — makes electricity. Press Space to place."
- **Switch Control:** Auto-scan parts → press to select → auto-scan empty slots → press to place
- **High Contrast:** 3px outlines on slots/cards, 7:1 text

---

#### Pattern P1: Tool–Discovery Match (Spirit, Apollo 16)

**Layout:** Two-column matching (desktop), stacked cards (mobile)

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: "Spirit's Water Detective Kit"                         │
├─────────────────────────────────────────────────────────────────┤
│  Instruction: "Spirit found rocks that formed in water.         │
│  Match each tool to what it discovered."                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │      INSTRUMENTS        │  │      DISCOVERIES            │  │
│  │                         │  │                             │  │
│  │  ┌──────────────────┐  │  │  ┌──────────────────────┐  │  │
│  │  │ 🔭 Mini-TES      │──┼──┤  │  │ Silica at Home Plate│  │  │
│  │  │   (thermal spec) │  │  │  │  (hot water proof)   │  │  │
│  │  └──────────────────┘  │  │  └──────────────────────┘  │  │
│  │                         │  │                             │  │
│  │  ┌──────────────────┐  │  │  ┌──────────────────────┐  │  │
│  │  │ ⚗ Mössbauer Spec │──┼──┤  │  │ Goethite at Husband │  │  │
│  │  │   (iron minerals)│  │  │  │  Hill (water mineral) │  │  │
│  │  └──────────────────┘  │  │  └──────────────────────┘  │  │
│  │                         │  │                             │  │
│  │  ┌──────────────────┐  │  │  ┌──────────────────────┐  │  │
│  │  │ 🧪 APXS          │──┼──┤  │  │ Carbonates at       │  │  │
│  │  │   (chemistry)    │  │  │  │  Comanche (neutral pH)│  │  │
│  │  └──────────────────┘  │  │  └──────────────────────┘  │  │
│  │                         │  │                             │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Drag instrument card → discovery slot
- Or: Click instrument → click discovery (click-to-match)
- Keyboard: Tab instrument, Enter, Tab discovery, Enter
- Success: Line draws between, checkmarks, audio
- Fail: Cards return, gentle shake, "Not quite..."

**Apollo 16 Variant:** Rock cards ↔ Site slots (same mechanic)

---

#### Pattern P4: Terrain Navigator (Ingenuity)

**Layout:** Full-viewport flight corridor

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: "Ingenuity's Flight Path"                              │
├─────────────────────────────────────────────────────────────────┤
│  Instruction: "Ingenuity flies by watching the ground.          │
│  Tap arrows to guide it over 3 checkpoints. Keep it steady!"   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │                                                         │  │
│    │   ┌─────┐                                    ┌─────┐    │  │
│    │   │ ☐ 1 │  ●──────────────────────────────●  │ ☐ 3 │    │  │
│    │   └─────┘   FLIGHT CORRIDOR (dashed)         └─────┘    │  │
│    │        ▲                                                    │  │
│    │        │   ┌─────┐                                          │  │
│    │        └──●│ ☐ 2 │●──────────────                         │  │
│    │            └─────┘                                          │  │
│    │                                                         │  │
│    │        [🚁 Ingenuity Sprite]                              │  │
│    │                                                         │  │
│    └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │  [←]  [↑]  [→]  [↓]   ← On-screen arrows (touch)        │  │
│    └─────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Controls:**
- Keyboard: Arrow keys (discrete nudges)
- Touch: Large on-screen arrows (64×64 px)
- Auto-pilot (accessibility): Space advances to next checkpoint

**Success:** Reach all 3 checkpoints in order
**Fail:** Leave corridor → respawn at last checkpoint, corridor widens after 3 fails

---

#### Pattern P5: Sample Analyzer (Surveyor 3)

**Layout:** Centered interaction

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: "Surveyor 3's Soil Sampler"                            │
├─────────────────────────────────────────────────────────────────┤
│  Instruction: "Surveyor 3 dug trenches to test Moon soil.       │
│  Drag the arm to dig 3 times. Watch the depth meter."           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │           [Surveyor 3 Art]          │                │
│         │        (arm animates on dig)        │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │  DEPTH METER: ████████░░  12 / 18 cm │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │         [ DIG ]  (large button)     │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         "Dig 1: 6 cm — Soil holds firm"  ← Live feedback       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Single "DIG" button (min 120×64 px)
- Each press: depth +6 cm, arm animates, feedback updates
- After 3 digs (18 cm): Success → Fragment
- Auto-dig (accessibility): Space runs all 3 with narration

---

#### Pattern P6: Distance Comparator (Apollo 17)

**Layout:** Horizontal number line

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: "LRV-3: The Longest Moon Drive"                        │
├─────────────────────────────────────────────────────────────────┤
│  Instruction: "Drag the mission markers to the number line.     │
│  How far did each LRV drive? Apollo 17 went farthest!"          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │  0    5    10   15   20   25   30   35   40  km      │
│         │  |-----|-----|-----|-----|-----|-----|-----|-----|   │
│         │                    ▲                ▲                │
│         │               [A15]              [A17]               │
│         │                    ▲                ▲                │
│         │               [A16]                                           │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │  [Apollo 15]  [Apollo 16]  [Apollo 17]               │
│         │  (draggable markers, snap to 5km ticks)              │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         "Apollo 15 at 28 km"  ← Live feedback (screen reader)  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Drag markers along line, snap to 5km ticks
- Keyboard: Tab marker, Enter, ←/→ to slide, Enter to place
- Screen reader: Announces position as "Apollo 15 at 28 km"
- Success: All 3 within ±3 km (28, 27, 36)
- Fail: "Close! Apollo 17 went past 35 km." Markers snap to nearest 5km on retry

---

### 2.6 Memory Fragment Reward Screen

**Route:** `/fragment/:dossierId` (transient, not in history)  
**Layout:** Centered modal-like card

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Dossier]                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              ✨  MEMORY FRAGMENT FOUND!  ✨                     │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │                                     │                │
│         │        [Fragment Art]               │                │
│         │     (e.g., wheel track in dust)     │                │
│         │                                     │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         "Sojourner's First Wheel Track"                         │
│                                                                 │
│         "First wheels on Mars. 83 sols.                        │
│         16 rocks analyzed. Proved small                        │
│         rovers can explore big planets."                        │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │  ★ Added to Constellation! (1/8)    │                │
│         │     [View Constellation]            │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │        [ Back to Memory Station ]   │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Fragment Art:**
- Small illustrated vignette (120×120 px)
- Subtle glow animation (respects reduced motion)
- Unique per dossier (see CHALLENGE_SPECS.md for each)

**Buttons:**
- Primary: "View Constellation" → opens constellation
- Secondary: "Back to Memory Station" → returns to hub

**States:**
- **Default:** As above
- **Focus:** Button focus rings
- **Reduced Motion:** Static fragment, no glow pulse

---

### 2.7 Constellation of Memories

**Route:** `/constellation` (also accessible from Station header)  
**Layout:** Full viewport night sky

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Memory Station]  Constellation of Memories   [★ 3/8] [⚙]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         ┌─────────────────────────────────────────────────┐    │
│         │                                                 │    │
│         │         ★  ●  ●  ★  ●  ★  ●  ●   ← Stars       │    │
│         │           \  |  /                                │    │
│         │            \ | /                                 │    │
│         │             \|/                                  │    │
│         │                                                 │    │
│         │   (8 positions, lit = collected, dim = locked)  │    │
│         │                                                 │    │
│         └─────────────────────────────────────────────────┘    │
│                                                                 │
│         ┌─────────────────────────────────────────────────┐    │
│         │  "Tap a glowing star to revisit a memory."      │    │
│         └─────────────────────────────────────────────────┘    │
│                                                                 │
│         ┌─────────────────────────────────────────────────┐    │
│         │            [ Continue Exploring ]               │    │
│         └─────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Star Positions (Fixed Layout):**
```
        ★ (1) Sojourner
      ●     ●
    ●   ★ (2) Spirit     ●
  ●       ●             ●
●   ★ (3) Opportunity   ●
  ●       ●             ●
    ●   ★ (4) Ingenuity  ●
      ●     ●
        ★ (5) Surveyor 3
              ★ (6) Apollo 15
              ★ (7) Apollo 16
              ★ (8) Apollo 17
```
*Actual positions designed by Visual Designer; this is logical mapping*

**Interaction:**
- **Hover/Focus Lit Star:** Shows fragment caption in tooltip
- **Click/Tap Lit Star:** Opens fragment detail modal (read-only)
- **Dim Star:** `aria-disabled="true"`, tooltip "Mission not yet explored"
- **Keyboard:** Arrow keys navigate between stars, Enter opens detail
- **Touch:** Tap star, swipe to navigate

**Fragment Detail Modal:**
```
┌─────────────────────────────────────────────────────────────────┐
│  [× Close]                                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         [Fragment Art Large]                                    │
│                                                                 │
│         "Sojourner's First Wheel Track"                         │
│                                                                 │
│         "First wheels on Mars. 83 sols.                        │
│         16 rocks analyzed. Proved small                        │
│         rovers can explore big planets."                        │
│                                                                 │
│         [ Close ]                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**States:**
- **Default:** Night sky animated (subtle star twinkle)
- **Reduced Motion:** Static stars, no twinkle
- **High Contrast:** Stars have thick outlines, bright yellow lit / gray dim
- **Focus:** Visible ring on each star (3px)
- **Mobile:** Swipe gesture to pan constellation

---

### 2.8 Settings / Accessibility Panel

**Route:** Modal overlay (accessible from any screen via header)  
**Layout:** Centered panel, max-width 480px

```
┌─────────────────────────────────────────────────────────────────┐
│  [× Close]                  Settings & Accessibility           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  MOTION                                                  │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ [☑] Reduce Motion  ← Synced with OS preference    │  │   │
│  │  │     (Disables animations, transitions, parallax)  │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  CONTRAST                                                │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ [☑] High Contrast  ← Synced with OS preference    │  │   │
│  │  │     (Thicker outlines, 7:1 text, bold focus)      │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AUDIO                                                   │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ [☑] Sound Effects  (chimes, feedback sounds)      │  │   │
│  │  │ [☑] Narration  (part jobs, instructions read aloud)│  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  PROGRESS                                                │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ [ Reset Progress ]  ← Dev only (Shift+Ctrl+R)     │  │   │
│  │  │     "This clears all collected fragments."        │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ABOUT                                                   │   │
│  │  Version 1.0.0  •  NASA Space Apps Challenge 2026       │   │
│  │  [ View Credits ]  [ View AI Disclosure ]               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- Modal: `role="dialog"`, `aria-modal="true"`, focus trap
- ESC closes, focus returns to trigger button
- Toggles apply immediately (CSS custom properties)
- OS preference sync: Read `prefers-reduced-motion`, `prefers-contrast` on load
- Audio toggles control Web Audio API / HTMLMediaElement volume

**States:**
- **Default:** Checkboxes reflect current state
- **Focus:** Visible on all toggles/buttons
- **Screen Reader:** Each toggle announced with state

---

### 2.9 Error / Empty States

#### 2.9.1 Network / Load Error (Dossier, Map, Challenge)
```
┌─────────────────────────────────────────────────────────────────┐
│  Header                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │         📡  Connection Issue        │                │
│         │                                     │                │
│         │  "Unable to load this screen.       │                │
│         │   Please check your connection      │                │
│         │   and try again."                   │                │
│         │                                     │                │
│         │         [ Try Again ]               │                │
│         │         [ Back to Station ]         │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                         │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.9.2 Empty Constellation (No Fragments Yet)
```
┌─────────────────────────────────────────────────────────────────┐
│  Header                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         "Your constellation is waiting for its first star."    │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │     [ Begin Exploring ]             │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.9.3 localStorage Unavailable Banner (Persistent, Top)
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠ Progress won't save if you close this tab. Consider         │
│  allowing storage in your browser settings.  [ Dismiss ]       │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.9.4 Challenge Exit Confirmation Modal
```
┌─────────────────────────────────────────────────────────────────┐
│  Leave Challenge?                        [×]                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "Your progress is saved. You can continue later."             │
│                                                                 │
│  [ Stay and Continue ]  [ Go to Memory Station ]               │
│  (Focus on "Stay" by default)                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Screen Specifications Summary Table

| Screen | Route | Key Components | Responsive Breakpoints |
|--------|-------|----------------|----------------------|
| Welcome | `/` | Character, Begin button, Settings link | Mobile: full card; Desktop: centered 480px |
| Memory Station | `/station` | Header, Keeper, Destination buttons (2), Constellation link, Settings | Mobile: stacked buttons; Tablet+: side-by-side |
| Mars Map | `/mars` | Header, Globe illustration, 4 pins (1 active), Tooltips | Mobile: full-width map; Desktop: larger map + legend |
| Moon Map | `/moon` | Same as Mars, 4 Moon pins | Same |
| Dossier | `/dossier/:id` | Header, Character art, Fact cards (scroll), Simulation banner, Start Challenge | Mobile: stacked; Tablet+: two-column |
| Challenge (P3) | `/challenge/:id` | Header, Chassis + Palette, Feedback, Memory Station btn | Mobile: stacked panels; Desktop: side-by-side |
| Challenge (P1) | `/challenge/:id` | Header, Two-column match, Feedback | Mobile: stacked lists; Desktop: side-by-side |
| Challenge (P4) | `/challenge/:id` | Header, Flight corridor, Sprite, Arrow controls | Mobile: full corridor; Desktop: centered |
| Challenge (P5) | `/challenge/:id` | Header, Art, Depth meter, Dig button | All: centered column |
| Challenge (P6) | `/challenge/:id` | Header, Number line, Draggable markers | Mobile: horizontal scroll; Desktop: full line |
| Fragment Reward | `/fragment/:id` | Header, Fragment art, Caption, Constellation preview, Buttons | All: centered card |
| Constellation | `/constellation` | Header, Star field (8 positions), Tooltips, Continue button | Mobile: swipe pan; Desktop: hover tooltips |
| Settings | Modal | Motion, Contrast, Audio, Progress, About | All: centered panel |
| Error States | Inline/Modal | Message, Retry, Back button | All: centered card |

---

*End of SCREEN_SPECS.md*