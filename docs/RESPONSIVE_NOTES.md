# Responsive Design Notes — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Breakpoints:** Mobile ≤640px, Tablet 641–1024px, Desktop >1024px

---

## 1. Breakpoint Strategy

### 1.1 Breakpoint Definitions

```css
:root {
  /* Breakpoint values */
  --bp-mobile: 640px;      /* ≤640px */
  --bp-tablet: 1024px;     /* 641px–1024px */
  --bp-desktop: 1025px;    /* >1024px */
  
  /* Container max-widths */
  --container-mobile: 100%;
  --container-tablet: 768px;
  --container-desktop: 1200px;
  
  /* Header height */
  --header-height-mobile: 56px;
  --header-height-tablet: 60px;
  --header-height-desktop: 64px;
}
```

### 1.2 Media Query Conventions

```css
/* Mobile First - Base styles target mobile */
/* Tablet and up */
@media (min-width: 641px) { ... }

/* Desktop and up */
@media (min-width: 1025px) { ... }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { ... }

/* High contrast */
@media (prefers-contrast: more) { ... }

/* Combined */
@media (min-width: 641px) and (prefers-reduced-motion: reduce) { ... }
```

### 1.3 Device Target Matrix

| Device Class | Width Range | Primary Input | Test Devices |
|--------------|-------------|---------------|--------------|
| **Mobile** | 320–640px | Touch | iPhone SE (375px), iPhone 13 (390px), Galaxy S21 (360px), iPad Mini (768px portrait) |
| **Tablet** | 641–1024px | Touch + Keyboard | iPad (820px), iPad Pro 11" (834px), Surface Go (900px) |
| **Desktop** | >1024px | Mouse + Keyboard | 13" laptop (1280px), 24" monitor (1920px), 27" (2560px) |

---

## 2. Layout Patterns by Screen

### 2.1 Welcome Screen

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Full-width card, 16px margins, centered | Character 200px, button full-width |
| **Tablet** | Centered card, max 480px | Character 240px, button 320px |
| **Desktop** | Centered card, max 480px | Character 280px, button 320px, more vertical space |

### 2.2 Memory Station (Hub)

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Stacked: Keeper → Mars btn → Moon btn → Constellation btn | Header: icons only (44×44); Buttons full-width, 120px tall; Keeper 200px |
| **Tablet** | Keeper centered, buttons side-by-side (gap 24px) | Header: icons + short labels; Buttons 280×140px; Keeper 280px |
| **Desktop** | Generous spacing, Keeper larger | Header: full labels; Buttons 320×160px; Keeper 360px; Max container 1200px |

**Mobile Stack Order:**
```
1. Header (fixed)
2. Archive Keeper (illustration)
3. Welcome text
4. Mars Expedition button (primary)
5. Moon Expedition button (disabled)
6. Constellation button (secondary)
7. Settings link (footer)
```

### 2.3 Mars / Moon Expedition Maps

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Full viewport map, pins 48×48px | Header condensed; Map 100% width; Tooltip on tap; Pin labels hidden (tooltip only) |
| **Tablet** | Map centered, max 800px, side legend | Pins 40×40px; Legend shows mission list; Hover tooltips |
| **Desktop** | Full map, max 1200px, side legend | Pins 40×40px; Keyboard navigation; Hover tooltips; More detail in legend |

**Map Aspect Ratios:**
- Mobile: 4:3 (portrait-friendly)
- Tablet: 16:10
- Desktop: 16:9

**Pin Touch Targets:** Minimum 48×48px on mobile, 44×44px on tablet/desktop

### 2.4 Dossier Screen

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Stacked: Character → Facts (scroll) | Character 200px tall; Facts full-width scroll; Start Challenge full-width |
| **Tablet** | Two-column: Character (35%) | Facts (65%) | Character 280px; Facts max 560px; Start Challenge 280px |
| **Desktop** | Two-column: Character (30%) | Facts (70%) | Character 320px; Facts max 560px; Start Challenge 280px; More whitespace |

**Character Column:**
- Mobile: `aspect-ratio: 4/3`, `width: 100%`
- Tablet/Desktop: `width: 280-320px`, `flex-shrink: 0`

**Facts Column:**
- `max-width: 560px` (reading width)
- `overflow-y: auto` (max-height: 70vh)
- Source links: `target="_blank"` with icon

### 2.5 Challenge Screens

#### P3: Part Builder (Chassis + Palette)

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Stacked: Chassis (top) → Palette (bottom) | Chassis: 300px tall, zoomable; Palette: horizontal scroll; Slots enlarged 56×56px |
| **Tablet** | Side-by-side: Chassis (55%) | Palette (45%) | Chassis: 400px; Palette: vertical stack; Drag works cross-panel |
| **Desktop** | Side-by-side: Chassis (60%) | Palette (40%) | Chassis: 480px; Palette: vertical; More spacing |

**Mobile Chassis Interaction:**
- Pinch zoom on chassis SVG (passive listeners)
- Double-tap to reset zoom
- Palette: `overflow-x: auto`, `scroll-snap-type: x mandatory`

#### P1: Tool–Discovery Match

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Stacked columns: Instruments → Discoveries | Full-width cards; Click-to-match (tap instrument → tap discovery) |
| **Tablet** | Side-by-side with connector lines | Drag-drop or click-to-match; Lines SVG between columns |
| **Desktop** | Side-by-side, generous spacing | Same as tablet; Keyboard arrows navigate within column |

#### P4: Terrain Navigator (Ingenuity)

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Full corridor; On-screen arrows (72×72px) | Corridor full-width; Arrow pad bottom; Auto-pilot button prominent |
| **Tablet** | Centered corridor (800px); Arrows on sides | Corridor max 800px; Arrow buttons 64×64px on left/right |
| **Desktop** | Centered corridor (900px); Keyboard primary | Corridor max 900px; Arrows 56×56px; Keyboard arrows highlighted |

#### P5: Sample Analyzer (Surveyor 3)

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Centered column: Art → Meter → Button | Art 200px; Meter full-width; Dig button 140×72px |
| **Tablet** | Centered, max 500px | Art 280px; Meter 400px; Button 160×80px |
| **Desktop** | Centered, max 500px | Same as tablet; More vertical rhythm |

#### P6: Distance Comparator (Apollo 17)

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Number line horizontal scroll; Markers below | Line: `overflow-x: auto`, `min-width: 800px`; Markers: stacked buttons |
| **Tablet** | Full line visible (800px); Markers on line | Line fits viewport; Drag markers on line |
| **Desktop** | Full line (1000px); Markers on line | Line max 1000px; More tick detail |

### 2.6 Fragment Reward Screen

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Full-screen dialog (modal) | Fragment art 160px; Buttons stacked full-width |
| **Tablet** | Centered dialog, max 480px | Fragment art 200px; Buttons side-by-side |
| **Desktop** | Centered dialog, max 480px | Same as tablet |

### 2.7 Constellation of Memories

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Full viewport; Swipe to pan; Tap star | Star field 100vw; Stars 48×48px; Swipe gesture; Roving tabindex |
| **Tablet** | Full viewport; Arrow keys + click | Stars 44×44px; Hover tooltips; Spatial keyboard nav |
| **Desktop** | Full viewport; Hover + keyboard | Stars 40×40px; Constellation lines visible; Hover detail |

**Constellation Star Positions (Responsive):**
- Positions defined as percentages (x%, y%)
- SVG `viewBox="0 0 100 100"` scales to container
- Lines between stars: SVG paths, percentage-based

### 2.8 Settings Modal

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Full-screen modal (bottom sheet) | Height 100vh; Rounded top corners; Drag handle to dismiss |
| **Tablet** | Centered panel, max 480px | Standard modal; 90% max-width |
| **Desktop** | Centered panel, max 480px | Standard modal |

### 2.9 Persistent Header

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Mobile** | Icons only: Station (icon) | Constellation (icon+count) | Settings (icon) | Height 56px; Touch targets 44×44px |
| **Tablet** | Station (icon+label) | Constellation (icon+count) | Settings (icon) | Height 60px; Station label "Station" |
| **Desktop** | Station (icon+"Memory Station") | Constellation (icon+count) | Settings (icon) | Height 64px; Full label |

---

## 3. Typography Responsive Scale

```css
:root {
  /* Mobile (base) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  --text-4xl: 2.5rem;    /* 40px */
  
  /* Tablet adjustments */
  @media (min-width: 641px) {
    --text-base: 1rem;     /* 16px */
    --text-lg: 1.125rem;   /* 18px */
    --text-xl: 1.375rem;   /* 22px */
    --text-2xl: 1.75rem;   /* 28px */
    --text-3xl: 2.25rem;   /* 36px */
    --text-4xl: 3rem;      /* 48px */
  }
  
  /* Desktop adjustments */
  @media (min-width: 1025px) {
    --text-base: 1.0625rem; /* 17px */
    --text-lg: 1.25rem;     /* 20px */
    --text-xl: 1.5rem;      /* 24px */
    --text-2xl: 2rem;       /* 32px */
    --text-3xl: 2.5rem;     /* 40px */
    --text-4xl: 3.5rem;     /* 56px */
  }
}
```

**Reading Width Constraints:**
- Body text: `max-width: 65ch` (optimal reading)
- Fact cards: `max-width: 560px`
- Instructions: `max-width: 600px`

---

## 4. Spacing Responsive Scale

```css
:root {
  /* Mobile */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Tablet */
  @media (min-width: 641px) {
    --space-md: 20px;
    --space-lg: 28px;
    --space-xl: 40px;
    --space-2xl: 56px;
    --space-3xl: 72px;
  }
  
  /* Desktop */
  @media (min-width: 1025px) {
    --space-md: 24px;
    --space-lg: 32px;
    --space-xl: 48px;
    --space-2xl: 64px;
    --space-3xl: 96px;
  }
}
```

**Container Padding:**
- Mobile: `padding-inline: var(--space-md)` (16px)
- Tablet: `padding-inline: var(--space-xl)` (40px)
- Desktop: `padding-inline: var(--space-2xl)` (64px)

---

## 5. Component Responsive Behaviors

### 5.1 CharacterIllustration

| Size Prop | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| `small` | 80px | 96px | 100px |
| `medium` | 160px | 200px | 220px |
| `large` | 240px | 280px | 320px |
| `full` | 280px | 360px | 400px |

**Implementation:**
```css
.character-illustration {
  width: var(--char-width);
  height: var(--char-height);
  aspect-ratio: 3/4;
}
```

### 5.2 Buttons

| Size | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| `sm` | 36px / 12px | 36px / 12px | 36px / 12px |
| `md` | 44px / 16px | 44px / 16px | 44px / 16px |
| `lg` | 52px / 20px | 52px / 20px | 52px / 20px |
| `xl` | 64px / 24px | 60px / 24px | 60px / 24px |

**Full-Width on Mobile:**
```css
@media (max-width: 640px) {
  .btn-full-mobile { width: 100%; }
}
```

### 5.3 Fact Cards

```css
.fact-card {
  padding: var(--space-md);
  max-width: 100%;
}

@media (min-width: 641px) {
  .fact-card {
    max-width: 560px;
  }
}
```

### 5.4 Challenge Panels (P3)

```css
.challenge-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

@media (min-width: 641px) {
  .challenge-layout {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .chassis-panel { flex: 0 0 55%; }
  .palette-panel { flex: 0 0 45%; }
}

@media (min-width: 1025px) {
  .chassis-panel { flex: 0 0 60%; }
  .palette-panel { flex: 0 0 40%; }
}
```

### 5.5 Number Line (P6)

```css
.number-line {
  overflow-x: auto;
  min-width: 800px; /* Mobile scroll */
  padding-bottom: var(--space-md); /* Scrollbar space */
}

@media (min-width: 641px) {
  .number-line {
    min-width: 0;
    max-width: 800px;
    overflow-x: visible;
  }
}

@media (min-width: 1025px) {
  .number-line {
    max-width: 1000px;
  }
}
```

---

## 6. Touch & Input Adaptations

### 6.1 Touch Targets by Breakpoint

| Component | Mobile (≤640px) | Tablet (641-1024px) | Desktop (>1024px) |
|-----------|-----------------|---------------------|-------------------|
| Buttons | 56×56 px min | 48×48 px min | 44×44 px min |
| Links | 48×48 px hit area | 44×44 px | 44×44 px |
| Map Pins | 48×48 px | 44×44 px | 40×40 px |
| Challenge Slots | 56×56 px | 52×52 px | 48×48 px |
| Part Cards | Full card | Full card | 56×56 px min |
| Constellation Stars | 56×56 px | 48×48 px | 44×44 px |
| Number Line Markers | 60×60 px | 56×56 px | 48×48 px |
| Flight Controls | 72×72 px | 64×64 px | 56×56 px |
| Dig Button | 140×72 px | 140×72 px | 120×64 px |
| Modal Close | 48×48 px | 44×44 px | 40×40 px |

### 6.2 Input Method Adaptations

| Feature | Touch | Mouse | Keyboard | Switch |
|---------|-------|-------|----------|--------|
| **Drag/Drop** | Long press → drag | Click → drag | Click-to-select | Auto-scan → press |
| **Navigation** | Tap | Click | Tab/Enter/Arrows | Auto-scan |
| **Tooltips** | Tap to show | Hover | Focus | N/A |
| **Hover States** | N/A | Yes | Focus = hover | N/A |
| **Context Menus** | Long press | Right-click | Shift+F10 | N/A |

### 6.3 Gesture Support (Mobile)

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Buttons, links, pins, stars | Activate |
| Long Press (500ms) | Draggable items (parts, markers) | Initiate drag |
| Drag | Drag preview | Move item |
| Release | Drop zone | Drop item |
| Swipe (horizontal) | Constellation field | Pan sky |
| Pinch | Chassis SVG (P3 mobile) | Zoom |
| Double Tap | Chassis SVG (P3 mobile) | Reset zoom |
| Pull Down | Settings modal (bottom sheet) | Dismiss |

---

## 7. Orientation Handling

### 7.1 Portrait (Mobile Primary)

- All layouts designed mobile-first for portrait
- Vertical stacking default
- Safe area insets respected (notch, home indicator)

```css
@supports (padding: max(0px)) {
  .page-layout {
    padding-left: max(var(--space-md), env(safe-area-inset-left));
    padding-right: max(var(--space-md), env(safe-area-inset-right));
    padding-bottom: max(var(--space-md), env(safe-area-inset-bottom));
  }
}
```

### 7.2 Landscape (Mobile/Tablet)

```css
@media (orientation: landscape) and (max-width: 1024px) {
  /* Reduce vertical padding */
  :root {
    --space-lg: 16px;
    --space-xl: 24px;
  }
  
  /* Welcome/Fragment: side-by-side */
  .welcome-card,
  .fragment-reward {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  /* Constellation: wider field */
  .constellation-field {
    height: 100vh;
  }
  
  /* Challenge P3: side-by-side if width allows */
  @media (min-width: 800px) {
    .challenge-layout {
      flex-direction: row;
    }
  }
}
```

---

## 8. Performance Considerations

### 8.1 Asset Loading by Breakpoint

| Asset | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| Character SVGs | Inline (all sizes) | Inline | Inline |
| Background Images | WebP, 1x | WebP, 1.5x | WebP, 2x |
| Particle Effects | Disabled | Optional | Enabled |
| Idle Animations | Reduced | Normal | Full |

### 8.2 CSS Containment

```css
/* Limit layout thrashing */
.chassis-silhouette,
.flight-corridor,
.number-line,
.constellation-field {
  contain: layout style paint;
}

/* Content visibility for off-screen */
.dossier-facts > *:not(:first-child) {
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}
```

### 8.3 JavaScript Responsive Hooks

```typescript
// src/hooks/useBreakpoint.ts
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 640) setBreakpoint('mobile');
      else if (w <= 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  
  return breakpoint;
}

// src/hooks/useReducedMotion.ts
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  
  return reduce;
}
```

---

## 9. Testing Checklist by Breakpoint

### Mobile (≤640px) - Primary Target
- [ ] All touch targets ≥ 56×56 px
- [ ] No horizontal scroll (except P6 number line)
- [ ] Text readable at 16px base (no zoom needed)
- [ ] Header fits: Station icon, Constellation count, Settings
- [ ] Maps: pins tappable, tooltips on tap
- [ ] Dossier: character + facts stacked, scrollable
- [ ] P3: chassis zoomable, palette horizontally scrollable
- [ ] P1: click-to-match works (no drag required)
- [ ] P4: on-screen arrows 72×72px, reachable
- [ ] P6: number line horizontally scrollable
- [ ] Constellation: swipe pans, stars tappable
- [ ] Settings: bottom sheet, drag to dismiss
- [ ] Modals: full-screen, focus trap
- [ ] Safe area insets respected
- [ ] Landscape: reduced vertical spacing, side-by-side where possible

### Tablet (641–1024px)
- [ ] Two-column layouts activate (dossier, P3, P1)
- [ ] Touch targets ≥ 48×48 px
- [ ] Hover states work (mouse/trackpad)
- [ ] Keyboard navigation fully functional
- [ ] Maps: legend visible, hover tooltips
- [ ] Challenge panels side-by-side with gap
- [ ] Constellation: hover tooltips, arrow navigation
- [ ] Modals: centered, max 480px
- [ ] Header shows abbreviated labels

### Desktop (>1024px)
- [ ] Max container 1200px centered
- [ ] Touch targets ≥ 44×44 px (mouse precision)
- [ ] All hover/focus/active states polished
- [ ] Keyboard navigation complete (Tab, Arrows, Enter, Space, ESC)
- [ ] Maps: full legend, keyboard pin navigation
- [ ] Challenge panels generous spacing
- [ ] Constellation: constellation lines visible
- [ ] Reduced motion & high contrast tested
- [ ] 200% zoom: no content loss, horizontal scroll only where expected

---

## 10. CSS Architecture for Responsive

### 10.1 File Structure

```
src/styles/
├── tokens.css           # Custom properties (colors, spacing, type, breakpoints)
├── reset.css            # Normalize, box-sizing, focus-visible
├── layout.css           # AppShell, PersistentHeader, PageLayout, ScreenContainer
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   ├── modals.css
│   ├── toasts.css
│   └── navigation.css
├── screens/
│   ├── welcome.css
│   ├── station.css
│   ├── maps.css
│   ├── dossier.css
│   ├── challenges.css
│   ├── fragment.css
│   ├── constellation.css
│   └── settings.css
├── utilities/
│   ├── spacing.css
│   ├── typography.css
│   ├── visibility.css
│   └── motion.css
└── main.css             # Imports all above in order
```

### 10.2 Import Order (Cascade)

```css
/* main.css */
@import './tokens.css';
@import './reset.css';
@import './layout.css';
@import './components/buttons.css';
@import './components/cards.css';
@import './components/forms.css';
@import './components/modals.css';
@import './components/toasts.css';
@import './components/navigation.css';
@import './screens/welcome.css';
@import './screens/station.css';
@import './screens/maps.css';
@import './screens/dossier.css';
@import './screens/challenges.css';
@import './screens/fragment.css';
@import './screens/constellation.css';
@import './screens/settings.css';
@import './utilities/spacing.css';
@import './utilities/typography.css';
@import './utilities/visibility.css';
@import './utilities/motion.css';
```

---

## 11. Acceptance Criteria (Responsive)

### Layout
- [ ] No horizontal overflow at any breakpoint (except intentional P6 scroll)
- [ ] Content readable at 16px base on mobile without zoom
- [ ] Two-column layouts activate at ≥641px
- [ ] Max container 1200px on desktop
- [ ] Header height adjusts: 56/60/64px
- [ ] Safe area insets on mobile

### Touch & Input
- [ ] Touch targets meet minimums per breakpoint table
- [ ] Drag/drop has click-to-select alternative on all screens
- [ ] Keyboard navigation complete on tablet/desktop
- [ ] Switch control works on all challenge types
- [ ] Gestures: swipe constellation, pinch chassis, long-press drag

### Typography
- [ ] Reading width ≤65ch for body text
- [ ] Type scale increases at tablet/desktop breakpoints
- [ ] Line height ≥1.5 for body text
- [ ] No text smaller than 12px (captions only)

### Performance
- [ ] No layout shift on breakpoint change (contain, intrinsic sizes)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] High contrast mode works at all breakpoints
- [ ] Images served at appropriate density

### Accessibility
- [ ] Focus visible at all breakpoints
- [ ] Tab order logical in all layouts
- [ ] Screen reader: content order matches visual order
- [ ] Zoom 200%: no content loss, functional

---

*End of RESPONSIVE_NOTES.md*