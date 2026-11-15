# Accessibility Checklist — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Standard:** WCAG 2.1 Level AA + Child-Centered Design Requirements  
**Scope:** All screens, components, and interactions

---

## 1. Perceivable

### 1.1 Text Alternatives (WCAG 1.1.1)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| All non-text content has text alternative | `CharacterIllustration`: `aria-label` required prop; `FragmentIllustration`: `aria-label`; Decorative SVGs: `aria-hidden="true"` | Screen reader audit (NVDA, JAWS, VoiceOver, TalkBack) | ☐ |
| Images of text avoided | No images of text; all text is real HTML text | Visual inspection | ☐ |
| CAPTCHA not used | N/A | N/A | ☐ |
| Decorative images hidden | `aria-hidden="true"` on decorative SVGs, background illustrations | Code review | ☐ |
| Complex images (charts, maps) have extended descriptions | Map pins: tooltip + `aria-label`; Constellation: `aria-label` on each star | Screen reader test | ☐ |

### 1.2 Time-Based Media (WCAG 1.2)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| No audio-only or video-only content | N/A - no media playback | N/A | ☐ |
| No synchronized media | N/A | N/A | ☐ |
| No live audio/video | N/A | N/A | ☐ |

### 1.3 Adaptable (WCAG 1.3)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| Info/structure not dependent on presentation | Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`; Headings h1-h3 hierarchy | HTML validator + screen reader | ☐ |
| Meaningful sequence | DOM order matches visual order; Flex/Grid `order` not used to reorder content | Tab navigation test | ☐ |
| Instructions not sensory-only | No "click the red button"; all instructions use text + position + icon | Content audit | ☐ |
| Orientation not locked | Portrait + Landscape both supported; `@media (orientation: landscape)` adjustments | Device rotation test | ☐ |
| Input purpose identified (autocomplete) | N/A - no forms with personal data | N/A | ☐ |

### 1.4 Distinguishable (WCAG 1.4)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Color not sole indicator** (1.4.1) | All states: color + icon + text + shape (focus ring, checkmark, border, label) | Visual audit + color blindness simulator | ☐ |
| **Audio control** (1.4.2) | No auto-play audio; Audio toggle in Settings; Narration toggle | Manual test | ☐ |
| **Contrast (Minimum)** (1.4.3) | Text 4.5:1; Large text 3:1; UI components 3:1; High contrast mode 7:1 / 4.5:1 | Colour Contrast Analyzer | ☐ |
| **Resize text** (1.4.4) | 200% zoom: no loss of content/function; `rem` units; no `px` text sizes | Browser zoom test | ☐ |
| **Images of text** (1.4.5) | None used | Visual audit | ☐ |
| **Contrast (Enhanced)** (1.4.6) | High contrast mode: 7:1 text, 4.5:1 UI | HC mode test | ☐ |
| **Low contrast text** (1.4.7) | N/A - no background audio | N/A | ☐ |
| **Visual presentation** (1.4.8) | User can customize: reduced motion, high contrast, audio toggles; Line height 1.5; Paragraph spacing 1.5× line height; Text width ≤80ch | Settings test | ☐ |
| **Images of text (No Exception)** (1.4.9) | None | Visual audit | ☐ |
| **Reflow** (1.4.10) | 320px width: no horizontal scroll (except P6 number line); 256px height: no vertical scroll loss | Mobile viewport test | ☐ |
| **Non-text contrast** (1.4.11) | UI components 3:1; Focus rings 3:1; High contrast 4.5:1 | CCA on UI elements | ☐ |
| **Text spacing** (1.4.12) | Line height 1.5; Paragraph spacing 2×; Letter spacing 0.12×; Word spacing 0.16× | Text spacing bookmarklet | ☐ |
| **Content on hover/focus** (1.4.13) | Tooltips: dismissible, hoverable, persistent; Focus: no unexpected content | Keyboard + hover test | ☐ |

---

## 2. Operable

### 2.1 Keyboard Accessible (WCAG 2.1)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Keyboard** (2.1.1) | All functionality: Tab, Enter, Space, Arrows, ESC, Home, End, PgUp, PgDn | Full keyboard-only test | ☐ |
| **No keyboard trap** (2.1.2) | Focus trap in modals only; ESC exits; Tab cycles within | Modal test | ☐ |
| **Keyboard (No Exception)** (2.1.3) | All interactions work without timing | Full keyboard test | ☐ |
| **Character key shortcuts** (2.1.4) | No single-key shortcuts (except game controls: arrows, space) - all have modifiers or are in game context | Key audit | ☐ |

### 2.2 Enough Time (WCAG 2.2)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Timing adjustable** (2.2.1) | No time limits anywhere; Unlimited retries; No session timeout | Review | ☐ |
| **Pause, stop, hide** (2.2.2) | No moving/blinking/scrolling >5s; Idle animations respect `prefers-reduced-motion` | RM test | ☐ |
| **No timing** (2.2.3) | No time-based challenges | Review | ☐ |
| **Interruptions** (2.2.4) | No interruptions; Toasts non-modal, dismissible | Review | ☐ |
| **Re-authenticating** (2.2.5) | N/A - no authentication | N/A | ☐ |
| **Timeouts** (2.2.6) | N/A - no timeouts | N/A | ☐ |

### 2.3 Seizures and Physical Reactions (WCAG 2.3)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Three flashes** (2.3.1) | No flashing content; Animations <3Hz | Visual audit | ☐ |
| **Animation from interactions** (2.3.2) | `prefers-reduced-motion` disables all non-essential animation | RM test | ☐ |

### 2.4 Navigable (WCAG 2.4)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Bypass blocks** (2.4.1) | Skip link: "Skip to main content" (first focusable) | Keyboard test | ☐ |
| **Page titled** (2.4.2) | Each route: `<title>The Lost Space Archive - [Screen Name]</title>` | Browser tabs | ☐ |
| **Focus order** (2.4.3) | Logical: Header → Main → Footer; Modal traps; Route change focuses main | Tab test | ☐ |
| **Link purpose (in context)** (2.4.4) | All links descriptive: "Back to Mars Map", "View Constellation", "Source: SRC-SOJ-001" | Screen reader | ☐ |
| **Multiple ways** (2.4.5) | Navigation: Header buttons, Back buttons, Breadcrumb, Constellation link | Nav test | ☐ |
| **Headings and labels** (2.4.6) | Descriptive headings: "Story & Facts", "Build Sojourner", "Constellation of Memories" | Heading audit | ☐ |
| **Focus visible** (2.4.7) | **3px solid focus ring on ALL focusable elements**; offset 2px; never `outline: none` | Keyboard test | ☐ |
| **Location** (2.4.8) | Breadcrumb + Header + Page title; Constellation shows progress | Visual audit | ☐ |
| **Link purpose (link only)** (2.4.9) | All links unique + descriptive | Screen reader | ☐ |
| **Section headings** (2.4.10) | Proper heading hierarchy (h1→h2→h3) | HTML outline | ☐ |

### 2.5 Input Modalities (WCAG 2.5)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Pointer gestures** (2.5.1) | Drag/drop: click-to-select alternative; Swipe: arrow keys alternative | Touch + keyboard | ☐ |
| **Pointer cancellation** (2.5.2) | No down-event actions; Click = up-event; Drag = cancel on ESC | Touch test | ☐ |
| **Label in name** (2.5.3) | Accessible name = visible label + icon; `aria-label` includes visible text | Screen reader | ☐ |
| **Motion actuation** (2.5.4) | No motion-only controls; Shake/tilt not used | Review | ☐ |
| **Target size** (2.5.5) | **56×56 px preferred**; 44×44 px minimum; Spacing ≥8px | Ruler/DevTools | ☐ |
| **Concurrent input** (2.5.6) | Touch + keyboard + mouse all work simultaneously | Multi-input test | ☐ |

---

## 3. Understandable

### 3.1 Readable (WCAG 3.1)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Language of page** (3.1.1) | `<html lang="en">` | HTML audit | ☐ |
| **Language of parts** (3.1.2) | No mixed language content | Content audit | ☐ |
| **Unusual words** (3.1.3) | Inline definitions: `<details>` in FactCards; InstructionText term definitions | Content audit | ☐ |
| **Abbreviations** (3.1.4) | Expand on first use: "Mössbauer Spectrometer (iron mineral detector)" | Content audit | ☐ |
| **Reading level** (3.1.5) | Flesch-Kincaid Grade 3-4; Short sentences; Active voice | Readability test | ☐ |
| **Pronunciation** (3.1.6) | N/A - no ambiguous pronunciations | N/A | ☐ |

### 3.2 Predictable (WCAG 3.2)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **On focus** (3.2.1) | No component changes context on focus alone | Keyboard test | ☐ |
| **On input** (3.2.2) | No auto-submit/navigate on input; Buttons require explicit activation | Interaction test | ☐ |
| **Consistent navigation** (3.2.3) | Header, Back button, Constellation link always same position/order | Nav audit | ☐ |
| **Consistent identification** (3.2.4) | Same component = same label/behavior (Memory Station button always "Return to Memory Station") | Component audit | ☐ |
| **Change on request** (3.2.5) | No context change without user action (no auto-advance) | Review | ☐ |

### 3.3 Input Assistance (WCAG 3.3)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Error identification** (3.3.1) | No form validation errors; Challenge fail = gentle hint, not error | Review | ☐ |
| **Labels or instructions** (3.3.2) | All inputs labeled: InstructionText, Tooltips, aria-labels | Screen reader | ☐ |
| **Error suggestion** (3.3.3) | Challenge hints: "The solar panel goes on top for sunlight" | Challenge test | ☐ |
| **Error prevention (legal/financial)** (3.3.4) | N/A - no legal/financial data | N/A | ☐ |
| **Help** (3.3.5) | Settings modal: "View Credits", "View AI Disclosure"; Tooltips on locked pins | Help test | ☐ |
| **Error prevention (all)** (3.3.6) | N/A - no data submission | N/A | ☐ |

---

## 4. Robust

### 4.1 Compatible (WCAG 4.1)

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Parsing** (4.1.1) | Valid HTML5; No duplicate IDs; Proper nesting | HTML validator | ☐ |
| **Name, role, value** (4.1.2) | All custom components: proper ARIA roles, states, properties | Screen reader + axe | ☐ |
| **Status messages** (4.1.3) | Live regions: `aria-live="polite"` for feedback, `aria-live="assertive"` for errors | Screen reader | ☐ |

---

## 5. Child-Centered Design Requirements (Beyond WCAG)

### 5.1 Cognitive Accessibility

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Single learning objective per screen** | One concept per challenge; Dossier: 3-5 facts max | Content audit | ☐ |
| **Instructions ≤2 sentences** | InstructionText component enforces | Content audit | ☐ |
| **Technical terms defined inline** | FactCard `<details>`; InstructionText `termDefinitions` | Screen reader + visual | ☐ |
| **No abstract metaphors** | Concrete language: "robot car" not "autonomous vehicle" | Content audit | ☐ |
| **Consistent vocabulary** | Vocabulary schedule in LEARNING_GOALS.md enforced | Cross-reference | ☐ |
| **Immediate feedback** | Live region announces every action result | Interaction test | ☐ |
| **No punitive failure** | Unlimited retries; Gentle hints; No score/penalty | Playtest | ☐ |
| **Progress always visible** | Constellation count in header; Fragment reward shows X/8 | Visual audit | ☐ |
| **Clear return path** | Memory Station button always top-left; Back button on child screens | Nav test | ☐ |

### 5.2 Motor Accessibility

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Touch targets 56×56px** | All primary actions; 44×44px minimum | Ruler test | ☐ |
| **Drag/drop not required** | Click-to-select for all drag interactions | Keyboard test | ☐ |
| **Switch control support** | Auto-scan + single press for all challenges | Switch device test | ☐ |
| **No timing pressure** | Unlimited time; No countdowns | Review | ☐ |
| **Large clickable areas** | Full card for PartCard; Full button for Dig | Touch test | ☐ |
| **Spacing between targets** | ≥8px between interactive elements | Visual audit | ☐ |

### 5.3 Visual Accessibility

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **High contrast mode** | `prefers-contrast: more` → 7:1 text, 3px borders, no transparency | HC mode test | ☐ |
| **Reduced motion mode** | `prefers-reduced-motion` → instant transitions, no idle anim | RM test | ☐ |
| **Zoom 200% functional** | No content loss; Horizontal scroll only P6 | Browser zoom | ☐ |
| **Color blindness safe** | No color-only states; Deuteranopia/Protanopia/Tritanopia tested | Simulator test | ☐ |
| **Focus indicator** | 3px ring, high contrast, never disabled | Keyboard test | ☐ |
| **Text size** | Base 16px; Min 12px (captions only); Rem units | Visual audit | ☐ |

### 5.4 Auditory Accessibility

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Audio optional** | Sound effects toggle; Narration toggle | Settings test | ☐ |
| **No audio-only info** | All audio has visual equivalent | Review | ☐ |
| **Volume control** | Web Audio API gain node; System volume respected | Audio test | ☐ |
| **Narration quality** | Speech Synthesis API; Rate 0.9; Pitch 1.1; Child-friendly voice | TTS test | ☐ |

### 5.5 Language & Literacy

| Requirement | Implementation | Test Method | Status |
|-------------|----------------|-------------|--------|
| **Reading level Grade 3-4** | Flesch-Kincaid ≤4.0; Short words; Simple sentences | Readability score | ☐ |
| **Active voice** | "Drag the part" not "The part should be dragged" | Content audit | ☐ |
| **Present tense** | "Sojourner drives" not "Sojourner drove" | Content audit | ☐ |
| **Concrete nouns** | "Rock" not "geological specimen" | Content audit | ☐ |
| **Glossary access** | Inline definitions on demand | Interaction test | ☐ |

---

## 6. Screen Reader Testing Matrix

| Screen Reader | Browser | OS | Test Scenarios |
|---------------|---------|-----|----------------|
| **NVDA** | Firefox/Chrome | Windows 10/11 | Full flow; All challenges; Modals; Live regions |
| **JAWS** | Chrome/Edge | Windows 10/11 | Full flow; Keyboard navigation; ARIA roles |
| **VoiceOver** | Safari | macOS/iOS | Full flow; Touch gestures; Rotor navigation |
| **TalkBack** | Chrome | Android | Full flow; Touch exploration; Gestures |
| **Orca** | Firefox | Linux | Basic flow; Keyboard; Live regions |

### Critical Screen Reader Test Cases

| Scenario | Expected Announcement |
|----------|----------------------|
| App load | "The Lost Space Archive. Welcome screen. Begin Exploring button." |
| Tab to Memory Station button | "Return to Memory Station, button" |
| Mars Map pin focus | "Sojourner, First Wheels on Mars, button" |
| Locked pin focus | "Spirit, Water Detective, locked, button" |
| Dossier fact card | "Sojourner was the first robot car to drive on Mars. Source SRC-SOJ-001" |
| Challenge instruction | "Build Sojourner: First Wheels on Mars. Drag each part to build it. Tap a part to hear its job." |
| Part Card focus | "Solar Panel. Makes electricity from sunlight. Drag to chassis or press Enter to select. Button." |
| Chassis slot focus (empty) | "Empty slot for Solar Panel. Button." |
| Chassis slot focus (filled) | "Solar Panel placed on rover. Button." |
| Part placed success | "Solar Panel placed. Makes electricity from sunlight." |
| Part placed fail | "Try another spot. The solar panel goes on top for sunlight." |
| Challenge complete | "Sojourner is complete! Solar panel → power. Front cameras → spot rocks ahead. ... Memory fragment found." |
| Fragment reward dialog | "Memory fragment found: Sojourner's First Wheel Track. First wheels on Mars. 83 sols. 16 rocks analyzed. Proved small rovers can explore big planets. View Constellation button. Back to Memory Station button." |
| Constellation star focus (lit) | "Sojourner's First Wheel Track. First wheels on Mars. 83 sols. 16 rocks analyzed. Proved small rovers can explore big planets. Button." |
| Constellation star focus (dim) | "Mission not yet explored. Complete the sojourner-mpf challenge to unlock. Button unavailable." |
| Settings toggle focus | "Reduce Motion, switch, off. Press Space to toggle." |
| Toast appear (polite) | "Great match! Mini-TES spotted silica from far away." |
| Toast appear (assertive) | "Connection Issue. Unable to load this screen. Try Again button. Back to Station button." |

---

## 7. Automated Testing Integration

### 7.1 CI/CD Checks

```yaml
# .github/workflows/accessibility.yml
- name: Run axe-core
  run: npx playwright test --project=accessibility

- name: Check color contrast
  run: npm run test:contrast

- name: Validate HTML
  run: npx html-validate src/**/*.tsx

- name: Check heading hierarchy
  run: npm run test:headings
```

### 7.2 Required Tools

| Tool | Purpose | Threshold |
|------|---------|-----------|
| **axe-core** | Automated WCAG violations | 0 serious/critical |
| **eslint-plugin-jsx-a11y** | React JSX accessibility | 0 errors |
| **html-validate** | HTML structure | 0 errors |
| **Colour Contrast Analyzer** | Contrast ratios | All pass AA |
| **pa11y** | Page-level audit | 0 WCAG 2.1 AA violations |

---

## 8. Manual Testing Checklist

### 8.1 Keyboard-Only Navigation

- [ ] Tab from page load reaches Skip Link first
- [ ] Skip Link jumps to `<main id="main-content">`
- [ ] Tab order: Header → Main content → Footer (if any)
- [ ] All buttons/links focusable and activatable with Enter/Space
- [ ] Arrow keys work in: Constellation, Number Line, Flight Corridor, Match Columns
- [ ] ESC closes modals, returns focus to trigger
- [ ] No keyboard traps (except intentional modal focus trap)
- [ ] Focus visible on every interactive element (3px ring)
- [ ] Route change moves focus to main content

### 8.2 Screen Reader (NVDA + Chrome)

- [ ] Page title announced on load
- [ ] Headings hierarchy correct (h1→h2→h3)
- [ ] Landmarks: banner, main, navigation, region
- [ ] All images have `aria-label` or `alt`
- [ ] Decorative images hidden (`aria-hidden="true"`)
- [ ] Live regions announce: challenge feedback, toasts, progress
- [ ] Form controls: name, role, state announced
- [ ] Drag/drop: keyboard alternative works + announced
- [ ] Modal: focus trapped, title announced, ESC closes
- [ ] Constellation: spatial navigation announced

### 8.3 Touch / Mobile (iOS Safari + VoiceOver, Android Chrome + TalkBack)

- [ ] Touch targets ≥56×56px (48×48px min)
- [ ] Tap activates, double-tap doesn't trigger accidental
- [ ] Long press initiates drag (500ms)
- [ ] Swipe navigates constellation
- [ ] Pinch zooms chassis (P3 mobile)
- [ ] VoiceOver rotor: headings, links, buttons work
- [ ] TalkBack swipe navigation works
- [ ] Tooltips show on tap, dismiss on tap elsewhere
- [ ] No hover-only functionality

### 8.4 Reduced Motion

- [ ] `prefers-reduced-motion: reduce` → all CSS transitions 0.01ms
- [ ] Idle animations stopped (blink, breathe, pulse)
- [ ] Drag preview no rotation/opacity animation
- [ ] Toast: fade only, no slide
- [ ] Modal: fade only, no scale
- [ ] Challenge success: instant, no fanfare animation
- [ ] Constellation: static stars, no twinkle

### 8.5 High Contrast

- [ ] `prefers-contrast: more` → 7:1 text, 4.5:1 UI
- [ ] Focus rings 3px solid, no offset
- [ ] Borders 3px minimum
- [ ] No transparency/opacity for state
- [ ] Disabled: 50% opacity + strikethrough
- [ ] Selected: bold border + icon
- [ ] Error: red border + icon + text
- [ ] Links underlined always

### 8.6 Zoom 200%

- [ ] No horizontal scroll (except P6 number line)
- [ ] All content readable
- [ ] Touch targets still meet minimums
- [ ] No content overlap/clipping
- [ ] Modal still usable
- [ ] Header still accessible

---

## 9. Compliance Evidence Package

### 9.1 Required Documentation

| Document | Location | Status |
|----------|----------|--------|
| Accessibility Conformance Report (ACR) | `docs/ACR.md` | ☐ |
| VPAT 2.4 (WCAG 2.1 AA) | `docs/VPAT.md` | ☐ |
| Test Results (automated + manual) | `docs/TEST_RESULTS.md` | ☐ |
| Screen Reader Test Logs | `docs/SR_TESTS.md` | ☐ |
| Color Contrast Report | `docs/CONTRAST_REPORT.md` | ☐ |
| Keyboard Navigation Test Log | `docs/KEYBOARD_TESTS.md` | ☐ |

### 9.2 NASA Space Apps Specific

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| **AI Disclosure** | `docs/AI_DISCLOSURE.md` visible in Settings modal | Link in Settings |
| **No NASA logos/patches** | Original art only; Visual language skill compliance | Art audit |
| **Simulation labeling** | SimulationBanner on all dossier/challenge screens | Component audit |
| **Source citations** | FactCard source links to NASA_SOURCES.md | Content audit |
| **Child privacy** | No accounts, no personal data, localStorage only | Privacy audit |

---

## 10. Acceptance Criteria Summary

### WCAG 2.1 Level AA (All 50 Success Criteria)
- [ ] 1.1.1 Non-text Content
- [ ] 1.2.1-1.2.5 Time-based Media (N/A)
- [ ] 1.3.1-1.3.5 Adaptable
- [ ] 1.4.1-1.4.13 Distinguishable
- [ ] 2.1.1-2.1.4 Keyboard Accessible
- [ ] 2.2.1-2.2.6 Enough Time
- [ ] 2.3.1-2.3.2 Seizures
- [ ] 2.4.1-2.4.10 Navigable
- [ ] 2.5.1-2.5.6 Input Modalities
- [ ] 3.1.1-3.1.6 Readable
- [ ] 3.2.1-3.2.5 Predictable
- [ ] 3.3.1-3.3.6 Input Assistance
- [ ] 4.1.1-4.1.3 Robust

### Child-Centered Additions
- [ ] Single objective per screen
- [ ] Instructions ≤2 sentences
- [ ] Inline term definitions
- [ ] No punitive failure
- [ ] Persistent return path
- [ ] Touch targets 56×56px
- [ ] Switch control support
- [ ] Reading level Grade 3-4
- [ ] Audio optional
- [ ] Reduced motion + High contrast

### NASA Space Apps Compliance
- [ ] AI Disclosure visible
- [ ] No NASA branding in art
- [ ] Simulation labels present
- [ ] Sources cited
- [ ] No personal data collection

---

## 11. Known Limitations & Mitigations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Drag/drop complex for some motor impairments | High | Click-to-select alternative on all challenges; Switch auto-scan |
| Number line (P6) requires fine motor | Medium | Keyboard arrows (1km), PgUp/PgDn (5km), snap to ticks |
| Constellation spatial navigation | Medium | Roving tabindex; Arrow keys; List view alternative (future) |
| Speech Synthesis voice quality varies | Low | Narration optional; Text always available |
| localStorage not persistent in private browsing | Low | Warning banner; In-memory fallback |

---

*End of ACCESSIBILITY_CHECKLIST.md*