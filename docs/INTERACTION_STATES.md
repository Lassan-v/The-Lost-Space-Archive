# Interaction States — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Scope:** All interactive components across all screens

---

## 1. State Definitions & Visual Language

### 1.1 Universal State Tokens (CSS Custom Properties)

```css
:root {
  /* Transition Timing */
  --transition-fast: 100ms ease-out;
  --transition-normal: 200ms ease-out;
  --transition-slow: 300ms ease-out;
  
  /* Elevation/Shadow */
  --elevation-1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  --elevation-2: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --elevation-3: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
  --elevation-4: 0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04);
  
  /* Focus Ring (always visible) */
  --focus-ring: 3px solid var(--color-focus);
  --focus-ring-offset: 2px;
  
  /* Reduced Motion Override */
  --transition-fast-rm: 0.01ms;
  --transition-normal-rm: 0.01ms;
  --transition-slow-rm: 0.01ms;
}

/* High Contrast Overrides */
@media (prefers-contrast: more) {
  :root {
    --focus-ring: 3px solid var(--color-focus);
    --elevation-1: none;
    --elevation-2: none;
    --elevation-3: none;
    --elevation-4: none;
    --border-width: 3px;
  }
}

/* Reduced Motion Overrides */
@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: var(--transition-fast-rm);
    --transition-normal: var(--transition-normal-rm);
    --transition-slow: var(--transition-slow-rm);
  }
}
```

### 1.2 State Priority Order (CSS Cascade)
1. **Disabled** (highest - non-interactive)
2. **Loading/Busy** (processing)
3. **Error/Invalid** (validation failure)
4. **Active/Pressed** (pointer down)
5. **Focus** (keyboard focus - always visible)
6. **Hover** (pointer over)
7. **Selected/Checked** (toggle state)
8. **Default** (base state)

---

## 2. Component Interaction State Tables

### 2.1 Buttons (All Variants)

| State | Visual | Motion | Audio | Keyboard | Touch | Screen Reader |
|-------|--------|--------|-------|----------|-------|---------------|
| **Default** | Variant styles (bg, border, text) | None | None | Focusable | Visible | Announced as button |
| **Hover** | `transform: translateY(-1px)`; elevation +1; bg lighten 10% | 100ms ease-out | None | N/A | N/A | N/A |
| **Focus** | **3px solid var(--color-focus)**, offset 2px; outline-none | Instant | None | **Visible always** | N/A | Announced + focus |
| **Active** | `transform: translateY(0) scale(0.98)`; bg darken 10% | 50ms | Click sound (if enabled) | Space/Enter | Touch down | Pressed state |
| **Disabled** | Opacity 0.5; cursor not-allowed; no elevation | None | None | **Removed from tab order** | No response | `aria-disabled="true"` |
| **Loading** | Spinner replaces content; `aria-busy="true"` | Spinner 1s linear | None | Kept in tab order | No response | "Loading" announced |

**Variant-Specific:**
- **Primary:** Accent bg → hover lighten → active darken
- **Secondary:** Transparent bg + accent border → hover: accent bg 15% → active: accent bg 25%
- **Ghost:** No bg/border → hover: accent bg 10% → active: accent bg 20%
- **Danger:** Error color bg → hover lighten → active darken

---

### 2.2 Links (Navigation)

| State | Visual | Motion | Keyboard | Touch | Screen Reader |
|-------|--------|--------|----------|-------|---------------|
| **Default** | Accent color; underline on hover only | None | Focusable | Visible | "Link, [text]" |
| **Hover** | Underline; color lighten 10% | 100ms | N/A | N/A | N/A |
| **Focus** | **3px focus ring**; outline-none; underline | Instant | **Visible always** | N/A | Announced + focus |
| **Active** | Color darken 15% | 50ms | Enter | Touch down | Pressed |
| **Visited** | Muted accent (purple tint) | None | N/A | N/A | "Visited link" |
| **Disabled** (aria) | Muted; cursor not-allowed | None | Removed | No response | `aria-disabled="true"` |

---

### 2.3 Memory Station Button (Persistent Header)

| State | Visual | Motion | Audio | Notes |
|-------|--------|--------|-------|-------|
| **Default** | Icon + label (desktop) / icon only (mobile); accent bg | Idle pulse (2s, respects RM) | None | Always first in tab order |
| **Hover** | Scale 1.04; elevation +1 | 100ms | Hover tone (subtle) | Desktop only |
| **Focus** | **3px focus ring**; offset 2px | Instant | None | **Always visible** |
| **Active** | Scale 0.98 | 50ms | Click | Touch/Enter |
| **Loading** | Spinner in button; label "Saving..." | Spinner | None | During progress save |

---

### 2.4 Destination Buttons (Memory Station: Mars / Moon)

| State | Visual | Motion | Audio | Notes |
|-------|--------|--------|-------|-------|
| **Default (Active)** | Primary style; accent bg; white text | Idle subtle glow (3s) | None | Mars in MVP |
| **Default (Locked)** | 40% opacity; lock icon overlay; muted bg | None | None | Moon in MVP |
| **Hover (Active)** | Scale 1.02; elevation +2; glow intensify | 150ms | Hover tone | Tooltip shows |
| **Hover (Locked)** | Opacity 60%; "Coming Soon" badge appears | 150ms | None | Tooltip: "Coming Soon" |
| **Focus (Active)** | **3px focus ring**; elevation +2 | Instant | None | **Always visible** |
| **Focus (Locked)** | **3px focus ring** (muted color); badge | Instant | None | Announced "Locked" |
| **Active** | Scale 0.98 | 50ms | Click | Navigate |

---

### 2.5 Map Pins (Mars / Moon Expedition)

| State | Visual | Motion | Audio | Notes |
|-------|--------|--------|-------|-------|
| **Default (Active)** | 40×40 px pin; accent color; pulse animation | Pulse 2s ease-in-out | None | Respects reduced motion |
| **Default (Locked)** | 40×40 px pin; 40% opacity; lock overlay | None | None | |
| **Hover/Focus** | Scale 1.3; elevation +3; tooltip appears | 150ms | Hover tone | Tooltip: name + status |
| **Active** | Scale 1.1 | 50ms | Click | Navigate to dossier |
| **Focus (Keyboard)** | **3px focus ring** around pin | Instant | None | Arrow keys navigate pins |

**Reduced Motion:** Pulse → static glow (box-shadow)

---

### 2.6 Dossier Screen Elements

#### Character Illustration

| State | Visual | Motion | Notes |
|-------|--------|--------|-------|
| **Default** | Full illustration | Idle: blink (4s), breathe (3s) | CSS keyframes |
| **Hover** | Slight scale 1.01 | 200ms | Subtle |
| **Reduced Motion** | Static | None | `prefers-reduced-motion` |
| **High Contrast** | 3px outline strokes | As per motion pref | |

#### Fact Cards

| State | Visual | Notes |
|-------|--------|-------|
| **Default** | Card elevation-1; border subtle | Read-only, not focusable |
| **Hover** | Elevation-2; border accent | Desktop only |
| **Focus** | Never focused (content) | Skip link bypasses |

#### Start Challenge Button

| State | Visual | Motion | Audio |
|-------|--------|--------|-------|
| **Default** | Primary xl; full-width mobile | None | None |
| **Hover** | Elevation-3; lighten | 100ms | Hover tone |
| **Focus** | **3px focus ring** | Instant | None |
| **Active** | Scale 0.98; darken | 50ms | Click |

---

### 2.7 Challenge Components (Patterns P1-P6)

#### P3: Chassis Silhouette - Drop Zones (Slots)

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Empty** | Dashed outline (2px); label text inside | None | None | Tab focusable | `role="button"`, `aria-dropeffect="move"`, `aria-label="Empty slot for [part]"` |
| **Hover (Valid Drag)** | Solid accent outline (3px); glow; label → "Drop [part] here" | 100ms | Hint tone | N/A | `aria-dropeffect="move"` |
| **Hover (Invalid Drag)** | Dashed red outline (2px); shake | 200ms | Error tone | N/A | `aria-invalid="true"` |
| **Filled** | Solid outline; part icon + checkmark; label hidden | Snap 200ms | Success chime | Tab focusable | `aria-label="[part] placed on rover"` |
| **Hint (After 2 Fails)** | **Pulse accent glow** (2px outline) | Pulse 1s (RM: static) | Audio hint | N/A | `aria-describedby="hint-text"` |
| **Focus** | **3px focus ring** (offset) | Instant | None | Tab/Arrows | Announced |
| **Drag Over** | As Hover Valid | Instant | None | N/A | `aria-dropeffect="move"` |

#### P3: Part Cards (Palette)

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Default** | Elevated card; icon + label + job | None | None | Tab focusable | `role="button"`, `draggable="true"`, `aria-label="[label]. [job]. Drag to chassis."` |
| **Hover** | Lift (translateY -2px); elevation-3 | 100ms | None | N/A | N/A |
| **Focus** | **3px focus ring** | Instant | None | Tab | Announced |
| **Dragging** | Opacity 0.8; rotate 3deg; `will-change: transform`; ghost image | Continuous | Drag start tone | `aria-grabbed="true"` | `aria-grabbed="true"` |
| **Placed** | Muted opacity 0.6; checkmark badge; `pointer-events: none` | Fade 200ms | Success | Removed from tab order | `aria-label="[label]. Placed on rover."` |
| **Return (Fail)** | Bounce animation (300ms) | 300ms elastic | Bounce tone | N/A | Live: "Try another spot" |

#### P1: Match Column Items (Instruments/Discoveries)

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Default** | Button style; icon + label + desc | None | None | Tab | `role="button"`, `aria-pressed="false"` |
| **Hover** | Accent bg 10%; elevation-1 | 100ms | None | N/A | N/A |
| **Focus** | **3px focus ring** | Instant | None | Tab/Arrows | Announced |
| **Selected** | Accent bg 20%; border accent; **elevation-2** | 150ms | Select tone | Enter/Space | `aria-pressed="true"` |
| **Matched** | Success bg 15%; checkmark; **disabled** | 200ms | Success | Removed | `aria-pressed="true"`, `disabled`, `aria-label="Matched to [other]"` |
| **Fail Shake** | Horizontal shake (3×) | 300ms | Error | N/A | Live: "Not quite" |

#### P4: Flight Corridor - Helicopter Sprite

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Idle** | At position; subtle hover bob | Bob 2s (RM: static) | Engine hum (loop) | N/A | `role="img"`, `aria-label="Ingenuity helicopter"` |
| **Moving** | Position update; rotor spin | Step 100ms (RM: instant) | Engine pitch | Arrows | Live: "Position: X, Y" |
| **Checkpoint Reached** | Checkpoint glows; checkmark | 300ms | Checkpoint chime | N/A | Live: "Checkpoint [n] reached" |
| **Off Corridor** | Red flash; respawn at last | 500ms | Warning | N/A | Live: "Off course. Returning to checkpoint [n]" |
| **Auto-Pilot** | Smooth to next checkpoint | 1s ease (RM: instant) | Narration | Space | Live: "Auto-pilot to checkpoint [n]" |

#### P5: Depth Meter & Dig Button

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Meter Default** | Track + fill (0%) | None | None | N/A | `role="progressbar"`, `aria-valuenow=0` |
| **Meter Filling** | Fill width animate | 500ms (RM: instant) | Dig sound | N/A | `aria-valuenow=[current]` |
| **Meter Tick Passed** | Tick highlight | 200ms | Tick tone | N/A | Live: "Depth [n] cm" |
| **Dig Button Default** | Large primary xl | Idle pulse | None | Tab | `role="button"` |
| **Dig Button Hover** | Scale 1.02 | 100ms | Hover | N/A | N/A |
| **Dig Button Focus** | **3px focus ring** | Instant | None | Tab | Announced |
| **Dig Button Active** | Scale 0.98 | 50ms | Click + dig | Enter/Space | Pressed |

#### P6: Number Line Markers

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Default** | Circle on line; label above | None | None | Tab | `role="slider"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=40` |
| **Hover** | Scale 1.2; label bold | 100ms | None | N/A | N/A |
| **Focus** | **3px focus ring**; scale 1.15 | Instant | None | Tab | Announced + value |
| **Dragging** | Follow pointer; snap preview to ticks | Continuous | Drag tone | `←/→` (1km), `PgUp/PgDn` (5km) | `aria-valuenow` live |
| **Placed (Correct)** | Checkmark; lock position; success color | 200ms | Success | Removed | `aria-valuenow=target`, `readonly` |
| **Placed (Incorrect)** | Shake; snap to nearest 5km on 2nd try | 300ms | Error → hint | N/A | Live: "Close! Try [target] km" |

---

### 2.8 Fragment Reward Screen

| Element | State | Visual | Motion | Audio | Notes |
|---------|-------|--------|--------|-------|-------|
| **Dialog** | Entrance | Fade + scale (0.3s) | 300ms | Fanfare | `role="dialog"`, focus trap |
| **Fragment Art** | Idle | Glow pulse (2s) | 2s (RM: static) | None | `aria-hidden="true"` |
| **Fragment Art** | Hover | Scale 1.05 | 150ms | None | |
| **Buttons** | As Button spec | | | | Primary: View Constellation; Secondary: Back to Station |

---

### 2.9 Constellation Stars

| State | Visual | Motion | Audio | Keyboard | ARIA |
|-------|--------|--------|-------|----------|------|
| **Dim (Locked)** | Gray outline; 30% opacity; no fill | None | None | **Not in tab order** | `aria-disabled="true"`, `aria-label="Mission not yet explored"` |
| **Lit (Collected)** | Warm yellow fill + glow; pulse | Pulse 3s (RM: static) | None | **In tab order** (roving) | `aria-label="[title]. [caption]"` |
| **Hover (Lit)** | Scale 1.3; glow intensify | 150ms | Hover tone | N/A | Tooltip shows caption |
| **Focus (Lit)** | **3px focus ring**; scale 1.2 | Instant | None | Arrow keys navigate | Announced + caption |
| **Active (Lit)** | Scale 1.1 | 50ms | Click | Enter/Space | Opens detail modal |

**Keyboard Navigation (Constellation):**
- Arrow Up/Down/Left/Right: Nearest neighbor spatial navigation
- Tab: Cycles through lit stars only (roving tabindex)
- Home: First star (Sojourner)
- End: Last collected star

---

### 2.10 Settings Modal Toggles

| State | Visual | Motion | Keyboard | ARIA |
|-------|--------|--------|----------|------|
| **Default (Off)** | Track: muted bg; Thumb: left | None | Tab | `role="switch"`, `aria-checked="false"` |
| **Hover** | Track: accent 20% | 100ms | N/A | N/A |
| **Focus** | **3px focus ring** on label+track | Instant | Tab | Announced |
| **Active (On)** | Track: accent bg; Thumb: right + check | 200ms spring | Enter/Space | `aria-checked="true"` |
| **Disabled** | Opacity 0.5 | None | Removed | `aria-disabled="true"` |

---

### 2.11 Toast Notifications

| Type | Visual | Motion | Audio | Auto-Dismiss | ARIA |
|------|--------|--------|-------|--------------|------|
| **Info** | Blue accent; icon | Slide up 300ms | Soft tone | 5s | `role="status"`, `aria-live="polite"` |
| **Success** | Green accent; checkmark | Slide up 300ms | Success chime | 4s | `role="status"`, `aria-live="polite"` |
| **Warning** | Amber accent; exclamation | Slide up 300ms | Warning tone | 6s | `role="status"`, `aria-live="polite"` |
| **Error** | Red accent; X icon | Slide up 300ms | Error tone | **Persistent** | `role="alert"`, `aria-live="assertive"` |
| **Hint** | Purple accent; lightbulb | Slide up 300ms | Hint tone | 8s | `role="status"`, `aria-live="polite"` |

**Reduced Motion:** No slide; fade only (100ms)

---

### 2.12 Modal Dialogs (Settings, Confirm Exit, Fragment Detail)

| State | Visual | Motion | Focus Management | ARIA |
|-------|--------|--------|------------------|------|
| **Closed** | Hidden (`display: none`) | None | N/A | N/A |
| **Opening** | Overlay fade (150ms) → Dialog scale+fade (200ms) | 200ms | Focus trapped; initial focus on `initialFocusRef` or close button | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="title"` |
| **Open** | Overlay: semi-transparent dark; Dialog: elevated | None | Tab cycles within; ESC closes | As above |
| **Closing** | Dialog scale+fade (150ms) → Overlay fade (150ms) | 150ms | Focus returns to trigger | N/A |
| **Focus Trap** | N/A | N/A | **Enforced** (FocusTrap) | N/A |

**Reduced Motion:** All transitions 0.01ms

---

### 2.13 Tooltip

| State | Visual | Motion | Trigger | ARIA |
|-------|--------|--------|---------|------|
| **Hidden** | `opacity: 0; pointer-events: none` | None | N/A | N/A |
| **Showing** | Fade in (150ms) | 150ms | Hover (200ms delay) + Focus (immediate) | `role="tooltip"`, `id="tooltip-[id]"` |
| **Shown** | Visible; positioned | None | N/A | Child has `aria-describedby="tooltip-[id]"` |
| **Hiding** | Fade out (100ms) | 100ms | Mouse leave (100ms delay) + Blur | N/A |

**Touch:** Tap to show, tap elsewhere to dismiss (no hover)

---

## 3. Cross-Cutting Interaction Rules

### 3.1 Focus Management

| Scenario | Behavior |
|----------|----------|
| **Route Change** | Focus moves to `main#main-content` (PageLayout) |
| **Modal Open** | Focus to `initialFocusRef` or first focusable in dialog |
| **Modal Close** | Focus returns to trigger element |
| **Toast Appear** | No focus change (live region announces) |
| **Error Inline** | Focus to first error field |
| **Challenge Success** | Focus to "View Constellation" button in fragment reward |
| **Constellation Star Select** | Focus stays on star; detail modal opens with focus on close |

### 3.2 Touch Target Minimums

| Element | Minimum | Preferred |
|---------|---------|-----------|
| Buttons (all) | 44×44 px | 56×56 px |
| Links (inline) | 44×44 px (hit area) | 48×48 px |
| Map Pins | 40×40 px | 48×48 px |
| Challenge Slots | 44×44 px | 56×56 px |
| Part Cards | 56×56 px | Full card |
| Constellation Stars | 44×44 px | 56×56 px |
| Number Line Markers | 44×44 px | 60×60 px |
| Flight Controls | 64×64 px | 72×72 px |
| Dig Button | 120×64 px | 140×72 px |
| Modal Close | 44×44 px | 48×48 px |
| Toggle Switches | 44×24 px (track) | 56×32 px |

### 3.3 Drag & Drop Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Alternative** | Click-to-select: Tab to source → Enter → Tab to target → Enter |
| **Screen Reader** | `aria-grabbed`, `aria-dropeffect`, live region for feedback |
| **Touch** | Long press (500ms) → drag preview; release to drop |
| **Reduced Motion** | No drag preview animation; instant snap |
| **High Contrast** | 3px drag preview outline; drop zone 3px border |

### 3.4 Audio Feedback Mapping

| Event | Sound | Conditions |
|-------|-------|------------|
| Button click | Click (soft) | `audioEnabled` |
| Button hover | Hover tone (subtle) | `audioEnabled`, desktop only |
| Part place success | Chime (major) | `audioEnabled` |
| Part place fail | Bounce (playful) | `audioEnabled` |
| Match success | Chime (ascending) | `audioEnabled` |
| Match fail | Error (gentle) | `audioEnabled` |
| Checkpoint reached | Ding | `audioEnabled` |
| Dig action | Dig sound | `audioEnabled` |
| Marker place | Snap | `audioEnabled` |
| Fragment reward | Fanfare | `audioEnabled` |
| Toast appear | By type | `audioEnabled` |
| Narration | Speech synthesis | `narrationEnabled` |

---

## 4. State Combination Matrix (Testing Checklist)

| Component | Default | Hover | Focus | Active | Disabled | Loading | Selected | Error | Hint |
|-----------|---------|-------|-------|--------|----------|---------|----------|-------|------|
| Primary Button | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - |
| Secondary Button | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - |
| Memory Station Btn | ✓ | ✓ | ✓ | ✓ | - | ✓ | - | - | - |
| Destination Btn (Active) | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - |
| Destination Btn (Locked) | ✓ | ✓ | ✓ | - | ✓ | - | - | - | - |
| Map Pin (Active) | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - |
| Map Pin (Locked) | ✓ | ✓ | ✓ | - | ✓ | - | - | - | - |
| Chassis Slot (Empty) | ✓ | ✓ | ✓ | - | - | - | - | ✓ | ✓ |
| Chassis Slot (Filled) | ✓ | - | ✓ | - | - | - | ✓ | - | - |
| Part Card (Available) | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - |
| Part Card (Dragging) | - | - | - | ✓ | - | - | - | - | - |
| Part Card (Placed) | ✓ | - | - | - | ✓ | - | ✓ | - | - |
| Match Item (Default) | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - |
| Match Item (Selected) | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| Match Item (Matched) | ✓ | - | - | - | ✓ | - | ✓ | - | - |
| Helicopter | ✓ | - | - | - | - | - | - | ✓ | - |
| Depth Meter | ✓ | - | - | - | - | - | - | - | - |
| Dig Button | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - |
| Number Line Marker | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | ✓ | - |
| Constellation Star (Dim) | ✓ | ✓ | - | - | ✓ | - | - | - | - |
| Constellation Star (Lit) | ✓ | ✓ | ✓ | ✓ | - | - | - | - | - |
| Toggle Switch | ✓ | ✓ | ✓ | ✓ | ✓ | - | ✓ | - | - |
| Modal | - | - | ✓ | - | - | - | - | - | - |
| Toast | - | - | ✓ | - | - | - | - | - | - |

---

## 5. Reduced Motion & High Contrast Behavior Summary

### 5.1 Reduced Motion (`prefers-reduced-motion: reduce`)

| Animation Type | Behavior |
|----------------|----------|
| CSS Transitions | Duration → 0.01ms |
| CSS Animations | Duration → 0.01ms, iteration-count → 1 |
| JS Animations (Framer Motion, etc.) | Disabled via context |
| Scroll Behavior | `auto` (no smooth scroll) |
| Parallax | Disabled |
| Particle Systems | Hidden |
| Idle Animations (blink, breathe, pulse) | Static frame |
| Drag Preview | No rotation/opacity animation |
| Toast Slide | Fade only |
| Modal Scale | Fade only |
| Focus Ring | Instant (no pulse) |

### 5.2 High Contrast (`prefers-contrast: more`)

| Element | Change |
|---------|--------|
| Text | 7:1 minimum (all sizes) |
| UI Elements | 4.5:1 minimum |
| Focus Rings | 3px solid (no offset) |
| Borders | 3px minimum |
| Shadows | Removed (replaced by borders) |
| Opacity/Transparency | Removed (solid colors) |
| Color-Only Indicators | Added icons/shapes/text |
| Disabled State | 50% opacity + strikethrough text |
| Selected State | Bold border + checkmark icon |
| Error State | Red border + icon + text (not just red) |
| Success State | Green border + icon + text |
| Links | Underline always (not just hover) |

---

## 6. Acceptance Criteria (Interaction States)

### Functional
- [ ] Every interactive element has all 6 states defined (Default, Hover, Focus, Active, Disabled, Loading where applicable)
- [ ] Focus ring visible on **every** focusable element (3px, offset 2px, accent color)
- [ ] No color-only state communication (icons + text + shape)
- [ ] Touch targets meet 56×56 px preferred minimum
- [ ] Drag/drop has full keyboard alternative
- [ ] Reduced motion disables all non-essential animation
- [ ] High contrast meets 7:1 text, 4.5:1 UI, 3px borders
- [ ] Screen reader announces all state changes via live regions

### Accessibility
- [ ] Tab order logical on every screen
- [ ] Focus never lost (modals trap, route changes target main)
- [ ] `aria-live` regions for all dynamic feedback
- [ ] `aria-pressed`, `aria-selected`, `aria-checked`, `aria-expanded` used correctly
- [ ] `aria-disabled` on non-interactive elements (not just CSS)
- [ ] Touch: tap shows tooltip; long-press initiates drag
- [ ] Keyboard: all interactions operable via Tab/Enter/Space/Arrows

### Visual
- [ ] State transitions smooth (100-200ms) unless reduced motion
- [ ] Elevation increases on hover/active for buttons
- [ ] Loading states have spinners + `aria-busy`
- [ ] Error states have inline messaging + `aria-invalid`
- [ ] Selected states visually distinct from hover/focus

---

*End of INTERACTION_STATES.md*