# UX Flow — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Scope:** MVP (Sojourner only) → Full (8 dossiers)

---

## 1. Complete User Flow Diagram (Text-Based)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WELCOME / ENTRY POINT                                │
│  • App loads → check localStorage for progress                              │
│  • Show welcome screen with Archive Keeper character                        │
│  • "Begin Exploring" button (or "Continue" if returning)                   │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MEMORY STATION (HUB)                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Persistent Header: "The Lost Space Archive" + Memory Station Button  │  │
│  │  (always accessible, top-left, aria-label="Return to Memory Station")  │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  Archive Keeper character (animated idle)                             │  │
│  │  Welcome message: "Welcome to the Memory Station!                    │  │
│  │   Choose a destination to explore."                                   │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  [ Mars Expedition ]  [ Moon Expedition ]  ← Destination buttons      │  │
│  │  (Moon disabled in MVP; shows "Coming Soon" on hover/focus)          │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  [ Constellation ] ← Shows collected fragments (1/8, 2/8, etc.)      │  │
│  │  [ Settings ] ← Accessibility panel (motion, contrast, audio)        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
        ┌─────────────────────┐         ┌─────────────────────┐
        │  MARS EXPEDITION    │         │   MOON EXPEDITION   │
        │      MAP            │         │      MAP            │
        ├─────────────────────┤         ├─────────────────────┤
        │  Mars globe/illustration with 4 dossier pins:     │  │
        │  • Sojourner (active)     • Spirit (locked)       │  │
        │  • Opportunity (locked)   • Ingenuity (locked)    │  │
        │                                                     │  │
        │  Tap/click Sojourner pin → Dossier                 │  │
        │  Tap locked pin → "Coming Soon" toast               │  │
        │  Persistent "Back to Station" button               │  │
        └───────────┬───────────┘         └───────────┬───────────┘
                    │                                 │
                    ▼                                 ▼
        ┌─────────────────────────────────────────────────────────────┐
        │                      DOSSIER SCREEN                         │
        │  (Same layout for all 8 dossiers; content varies)           │
        ├─────────────────────────────────────────────────────────────┤
        │  Header: Hardware name + mission badge + "Back to Map"     │
        │  ┌──────────────────┬───────────────────────────────────┐  │
        │  │  Character Art   │  STORY / FACTS PANEL (scrollable) │  │
        │  │  (illustrated)   │  • 3-5 child-friendly fact cards  │  │
        │  │                  │  • Source citation line per fact  │  │
        │  │                  │  • Simulation banner (always)     │  │
        │  └──────────────────┴───────────────────────────────────┘  │
        │  [ Start Challenge ] ← Primary CTA button                   │
        │  Persistent "Memory Station" button (top-left)             │
        └──────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
        ┌─────────────────────────────────────────────────────────────┐
        │                    CHALLENGE SCREEN                         │
        │  (Pattern varies per dossier: P1-P6)                        │
        ├─────────────────────────────────────────────────────────────┤
        │  Header: Challenge name + "Back to Dossier"                │
        │  ┌──────────────────────────────────────────────────────┐  │
        │  │  Instruction text (≤2 sentences, terms defined)     │  │
        │  │  Simulation banner                                   │  │
        │  ├──────────────────────────────────────────────────────┤  │
        │  │  Challenge interaction area (varies by pattern)      │  │
        │  │  • P3: Chassis silhouette (left) + Parts palette    │  │
        │  │    (right) — Sojourner                               │  │
        │  │  • P1: Instrument cards + Discovery slots — Spirit  │  │
        │  │  • P1: Rock cards + Site slots — Apollo 16           │  │
        │  │  • P4: Flight corridor + helicopter sprite —        │  │
        │  │    Ingenuity                                         │  │
        │  │  • P5: Dig button + depth meter — Surveyor 3        │  │
        │  │  • P6: Number line + mission markers — Apollo 17    │  │
        │  ├──────────────────────────────────────────────────────┤  │
        │  │  Live feedback region (ARIA polite)                 │  │
        │  │  [ Memory Station ] button (persistent)             │  │
        │  └──────────────────────────────────────────────────────┘  │
        └──────────────────────────┬──────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
           ┌─────────────────┐           ┌─────────────────┐
           │  SUCCESS        │           │  INCORRECT /    │
           │  (All criteria  │           │  RETRY          │
           │   met)          │           │  (Gentle reset, │
           └────────┬────────┘           │   hint after 2) │
                    │                    └────────┬────────┘
                    │                             │
                    ▼                             │
           ┌─────────────────┐                    │
           │  MEMORY FRAGMENT│                    │
           │  REWARD SCREEN  │                    │
           ├─────────────────┤                    │
           │  • Fragment art + caption            │
           │  • "Added to Constellation" preview  │
           │  • [ View Constellation ]            │
           │  • [ Back to Memory Station ]        │
           └────────┬────────┘                    │
                    │                             │
                    ▼                             │
           ┌─────────────────┐                    │
           │  CONSTELLATION  │◄───────────────────┘
           │  OF MEMORIES    │   (Return from any
           ├─────────────────┤    screen via header)
           │  • Night sky, 8 star positions      │
           │  • Lit stars = collected fragments  │
           │  • Tap lit star → fragment caption  │
           │  • [ Continue Exploring ] → Station │
           └─────────────────┘
```

---

## 2. MVP vs. Full Scope Flow Differences

| Flow Step | MVP (Sojourner Only) | Full Scope (8 Dossiers) |
|-----------|---------------------|------------------------|
| **Memory Station** | Moon button disabled ("Coming Soon") | Both Mars & Moon active |
| **Mars Map** | 1 active pin (Sojourner), 3 locked | 4 active pins |
| **Moon Map** | Not accessible | 4 active pins (Surveyor 3, Apollo 15/16/17) |
| **Dossier** | Sojourner content only | 8 unique dossiers |
| **Challenge** | P3: Part Builder only | P1 (×2), P3, P4, P5, P6 |
| **Constellation** | 1/8 stars lit | 8/8 stars lit progressively |
| **Progress** | `completedDossiers: ["sojourner-mpf"]` | All 8 IDs tracked |

---

## 3. Edge Cases & System Behaviors

### 3.1 Locked Dossiers (MVP + Full)
- **Visual:** Pin/icon at 40% opacity, lock overlay, disabled pointer events
- **Interaction:** Hover/focus → tooltip "Coming Soon — more missions arriving"
- **Keyboard:** Tab skips locked pins; Enter on locked pin announces "Locked"
- **Screen Reader:** `aria-disabled="true"` + `aria-label="Spirit — coming soon"`

### 3.2 Mid-Flow Exit (Browser Close / Tab Switch)
- **Trigger:** `beforeunload` event or `visibilitychange` (hidden)
- **Action:** Save current state to localStorage immediately
- **Progress Keys:**
  ```json
  {
    "currentLocation": "challenge|dossier|map|station|constellation",
    "currentDossier": "sojourner-mpf|null",
    "challengeProgress": { "placedParts": ["solar-panel", "wheels"] },
    "completedDossiers": ["sojourner-mpf"],
    "collectedFragments": ["sojourner-wheel-track"]
  }
  ```
- **Resume:** On reload, read `currentLocation` → restore to that screen with progress intact

### 3.3 Browser Refresh (F5 / Cmd+R)
- Same as mid-flow exit — localStorage persists
- No confirmation modal on refresh (only on explicit "Memory Station" click during challenge)

### 3.4 Progress Reset (Dev / Testing Only)
- **Location:** Settings panel → "Reset Progress" (hidden behind dev key combo: `Shift+Ctrl+R`)
- **Action:** Clear all localStorage keys; show confirmation toast "Progress reset. Welcome back!"
- **No user-facing reset in MVP** (prevents accidental loss)

### 3.5 localStorage Unavailable (Private Mode / Quota Exceeded)
- **Detection:** `try { localStorage.setItem('test', 'x') } catch (e) { fallback }`
- **Fallback:** In-memory state object (lost on refresh)
- **User Notice:** Non-dismissible banner: "Progress won't save if you close this tab. Consider allowing storage."

### 3.6 "Memory Station" Click During Challenge
- **Behavior:** Modal confirmation (not browser `confirm()`)
- **Modal Content:**
  - Title: "Leave Challenge?"
  - Body: "Your progress is saved. You can continue later."
  - Buttons: [ Stay ] [ Go to Station ] (focus on "Stay" by default)
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, focus trap, ESC closes = Stay

### 3.7 Reduced Motion + High Contrast Both Enabled
- **CSS Cascade Order:**
  1. Base styles
  2. `@media (prefers-reduced-motion: reduce)` → instant transitions
  3. `@media (prefers-contrast: more)` → thick outlines, 7:1 text
  4. Combined: both apply additively (tested matrix)
- **No conflicts:** Motion reduces animation; contrast increases visibility

### 3.8 Screen Reader + Mobile (iOS VoiceOver / Android TalkBack)
- **Testing Matrix:** iOS 16+ Safari + VoiceOver; Android 13+ Chrome + TalkBack
- **Key Requirements:**
  - All drag/drop has keyboard + button alternative
  - Live regions use `aria-live="polite"` (not assertive)
  - Touch targets 56×56 px minimum
  - Swipe navigation for constellation stars

---

## 4. Navigation Rules (Always Visible)

| Element | Location | Behavior |
|---------|----------|----------|
| **Memory Station Button** | Top-left, fixed position, z-index 100 | Always returns to hub; saves progress first |
| **Back Button** | Top-left of child screens (map, dossier, challenge) | Returns to parent screen; preserves scroll/state |
| **Breadcrumb** | Below header on dossier/challenge | "Memory Station → Mars → Sojourner" (clickable segments) |
| **Constellation Link** | Station header + fragment reward screen | Opens constellation overlay |

---

## 5. Acceptance Criteria (Flow-Level)

### Functional
- [ ] Cold start → Welcome → Station → Mars Map → Sojourner Pin → Dossier → Challenge → Fragment → Constellation → Station (full loop)
- [ ] Returning user (localStorage) → "Continue" → resumes at `currentLocation`
- [ ] Locked pins show "Coming Soon" on hover/focus/keyboard
- [ ] Mid-challenge exit + reload → resumes at challenge with parts placed
- [ ] "Memory Station" button works from every screen (including modal)
- [ ] Constellation shows correct lit count (1/8, 2/8... 8/8)
- [ ] Simulation banner visible on dossier + challenge screens

### Accessibility
- [ ] Tab order logical on every screen (header → main → footer)
- [ ] Focus visible on all interactive elements (3px ring, offset 2px)
- [ ] Screen reader announces: location, progress, feedback, errors
- [ ] Reduced motion disables all non-essential animation
- [ ] High contrast meets 7:1 text, 4.5:1 UI, 3px focus rings
- [ ] Touch targets ≥ 56×56 px on mobile
- [ ] No color-only state indicators (icons + text + shape)

### Factual Integrity
- [ ] Dossier facts cite source IDs from NASA_SOURCES.md
- [ ] Simulation banner links to source register
- [ ] No NASA logos/patches in game art
- [ ] Spirit/Opportunity/Apollo LRVs treated as separate records

---

## 6. State Transition Table

| From State | Trigger | To State | Persistence Action |
|------------|---------|----------|-------------------|
| Welcome | Click "Begin" | Station | Write `currentLocation: "station"` |
| Station | Click Mars | Mars Map | Write `currentLocation: "mars-map"` |
| Mars Map | Click Sojourner pin | Sojourner Dossier | Write `currentLocation: "dossier", currentDossier: "sojourner-mpf"` |
| Dossier | Click "Start Challenge" | Challenge (P3) | Write `currentLocation: "challenge", challengeProgress: {}` |
| Challenge | Part placed | Challenge (updated) | Write `challengeProgress.placedParts.push(partId)` |
| Challenge | All 5 parts placed | Fragment Reward | Write `completedDossiers.push(), collectedFragments.push(), currentLocation: "fragment"` |
| Fragment Reward | Click "View Constellation" | Constellation | Write `currentLocation: "constellation"` |
| Constellation | Click "Continue Exploring" | Station | Write `currentLocation: "station"` |
| Any Screen | Click "Memory Station" | Station (with confirm if challenge) | Write `currentLocation: "station"` |
| Any Screen | Browser close/refresh | — | Auto-save current state |
| App Load | localStorage exists | Resume at `currentLocation` | Read + hydrate state |

---

*End of UX_FLOW.md*