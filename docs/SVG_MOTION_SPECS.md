# SVG & CSS Motion Specifications — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Scope:** Lightweight web animation specifications using CSS/SVG only (transform/opacity preferred). Respects `prefers-reduced-motion`. No WebGL, Three.js, or complex physics.

---

## 1. Motion Design Principles

- **Purposeful Motion:** Every animation communicates state change, provides feedback, or guides attention.
- **Performance First:** Transform and opacity only (GPU-accelerated). No layout-triggering properties (width, height, top, left).
- **Child-Friendly Timing:** Gentle spring easings, no jarring snaps. Durages 150–600ms.
- **Accessibility Mandatory:** All animations have reduced-motion fallbacks; motion never sole carrier of information.

---

## 2. Global Motion Tokens

```css
:root {
  /* Easing Curves */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);    /* Bouncy, friendly */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);         /* Material standard */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);              /* Deceleration */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);               /* Acceleration */

  /* Durations */
  --dur-instant: 50ms;
  --dur-fast: 150ms;
  --dur-normal: 300ms;
  --dur-slow: 500ms;
  --dur-slower: 800ms;

  /* Reduced Motion Override */
  --dur-reduced: 0.01ms;
}
```

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-instant: 0.01ms;
    --dur-fast: 0.01ms;
    --dur-normal: 0.01ms;
    --dur-slow: 0.01ms;
    --dur-slower: 0.01ms;
  }
}
```

---

## 3. Character Animations

### 3.1 Breathing Idle (All Characters)
- **Properties:** `transform: translateY()` + `scale()`
- **Keyframes:**
  ```css
  @keyframes character-breathe {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-4px) scale(1.02); }
  }
  ```
- **Applied:** `.character-idle { animation: character-breathe 4s var(--ease-smooth) infinite; }`
- **Reduced Motion:** Animation disabled; character rests at base position.

### 3.2 Expression Transitions
- **Trigger:** Character dialogue state change (data attribute `[data-expression="..."]`).
- **Method:** SVG `<use>` symbol swap or CSS `filter: hue-rotate()` for visor color shift.
- **Transition:** `opacity 150ms var(--ease-smooth), filter 150ms var(--ease-smooth)`.
- **Expressions Mapped:**
  - `happy` → Warm yellow visor (`#F5A623`), curved eye paths.
  - `curious` → Sky blue visor (`#38BDF8`), one eye enlarged (scale 1.15).
  - `thinking` → Purple visor (`#8B5CF6`), pulsing star symbol.
  - `celebrating` → Rainbow cycle (300ms per hue) + particle burst.
  - `concerned` → Soft amber visor (`#F59E0B`), downward eye curve.

### 3.3 Entrance Animation (Character Arrival)
- **Keyframes:**
  ```css
  @keyframes character-entrance {
    0%   { opacity: 0; transform: scale(0.8) translateY(20px); }
    60%  { transform: scale(1.02) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  ```
- **Duration:** 500ms `var(--ease-spring)`
- **Reduced Motion:** Instant appear (`opacity 0 → 1`, no transform).

### 3.4 Exit Animation (Character Departure)
- **Keyframes:**
  ```css
  @keyframes character-exit {
    0%   { opacity: 1; transform: scale(1) translateY(0); }
    100% { opacity: 0; transform: scale(0.9) translateY(-10px); }
  }
  ```
- **Duration:** 250ms `var(--ease-in)`
- **Reduced Motion:** Instant disappear.

### 3.5 Gesture Animations (Talking/Explaining)
- **Talking:** Subtle jaw/visor pulse (`scaleY(1) → scaleY(1.05)`) synchronized with dialogue display.
- **Explaining (Pointing):** Arm/antenna rotation (`rotate(-15deg) → rotate(15deg)`).
- **Celebrating:** Full-body bounce sequence (3 bounces, decreasing amplitude).

---

## 4. UI Micro-Interactions

### 4.1 Button Press
- **States:**
  - `:hover` → `transform: translateY(-2px); box-shadow: var(--shadow-glow);`
  - `:active` → `transform: translateY(0) scale(0.98);`
  - `:focus-visible` → `box-shadow: var(--color-focus-ring); outline: none;`
- **Transition:** `transform var(--dur-fast) var(--ease-smooth), box-shadow var(--dur-fast) var(--ease-smooth)`

### 4.2 Card Flip (Dossier Tab Switch)
- **Method:** CSS 3D transform (preserve-3d) or simple cross-fade for reduced motion.
- **Keyframes (Full Motion):**
  ```css
  @keyframes card-flip-out { 0% { transform: rotateY(0); } 100% { transform: rotateY(-90deg); opacity: 0; } }
  @keyframes card-flip-in  { 0% { transform: rotateY(90deg); opacity: 0; } 100% { transform: rotateY(0); } }
  ```
- **Duration:** 300ms each half, staggered.
- **Reduced Motion:** Simple `opacity` cross-fade 100ms.

### 4.3 Progress Fill (Memory Fragment / Challenge Completion)
- **Element:** SVG `<rect>` or `<circle>` stroke-dashoffset.
- **Animation:** `stroke-dashoffset` from full circumference to target value.
- **Duration:** 800ms `var(--ease-out)` with 100ms stagger per fragment.
- **Reduced Motion:** Instant jump to final value.

### 4.4 Star Light Pulse (Constellation / Station)
- **Keyframes:**
  ```css
  @keyframes star-pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); filter: drop-shadow(0 0 4px currentColor); }
    50%      { opacity: 1;   transform: scale(1.15); filter: drop-shadow(0 0 12px currentColor); }
  }
  ```
- **Applied:** `.star-complete { animation: star-pulse 3s var(--ease-smooth) infinite; }`
- **Reduced Motion:** Static at `opacity: 1, scale: 1`.

### 4.5 Toast / Notification Slide
- **Keyframes:**
  ```css
  @keyframes toast-enter { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
  @keyframes toast-exit  { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100%); } }
  ```
- **Duration:** 250ms enter, 200ms exit.

---

## 5. Challenge-Specific Animations

### 5.1 Part Snap (Sojourner Challenge — Component Assembly)
- **Interaction:** Drag part → drop zone → snap into place.
- **Snap Animation:**
  - On valid drop: `transform: translate(0,0) scale(1) rotate(0deg)` with spring overshoot.
  - **Keyframes:**
    ```css
    @keyframes part-snap {
      0%   { transform: var(--drag-end-transform); }
      50%  { transform: translate(0,0) scale(1.1) rotate(0deg); }
      100% { transform: translate(0,0) scale(1) rotate(0deg); }
    }
    ```
  - **Duration:** 350ms `var(--ease-spring)`
- **Invalid Drop:** Shake (`translateX(-8px) → translateX(8px) → 0`) 300ms.
- **Reduced Motion:** Instant position correction, no spring.

### 5.2 Path Draw (Ingenuity Challenge — Flight Path Planning)
- **Visual:** SVG `<path>` stroke-dashoffset drawing the planned flight route.
- **Animation:** `stroke-dashoffset` from `pathLength` to `0`.
- **Duration:** 1200ms `var(--ease-smooth)` per segment.
- **Waypoint Pulse:** Each waypoint node pulses when path reaches it.
- **Reduced Motion:** Full path appears instantly; waypoints highlighted statically.

### 5.3 Dig Motion (Surveyor 3 Challenge — Soil Sampling)
- **Visual:** Scoop arm rotation + regolith particle burst.
- **Arm Rotation:** `rotate(0deg) → rotate(-45deg) → rotate(10deg) → rotate(0deg)` (dig, lift, settle).
- **Particles:** 8–12 small ellipse elements, `transform: translate()` + `opacity` fade.
- **Duration:** 1500ms total sequence.
- **Reduced Motion:** Arm rotates directly to final position; particles appear as static dust puff.

### 5.4 Flight Glide (Ingenuity Dossier / Celebration)
- **Visual:** Character translate along curved SVG path.
- **Method:** `offset-path: path('M...'); animation: flight 4s var(--ease-smooth);`
- **Keyframes:**
  ```css
  @keyframes flight {
    0%   { offset-distance: 0%; transform: rotate(-10deg); }
    50%  { offset-distance: 50%; transform: rotate(5deg); }
    100% { offset-distance: 100%; transform: rotate(0deg); }
  }
  ```
- **Reduced Motion:** Character remains at start position; flight path shown as static dashed line.

### 5.5 Rover Drive (Apollo LRV Challenge — Distance Record)
- **Visual:** Wheels rotate (`rotate(0deg) → rotate(720deg)`), chassis subtle bounce.
- **Wheel Spin:** `animation: wheel-spin 1s linear infinite` during drive.
- **Chassis Bob:** `translateY(0) → translateY(-3px) → translateY(0)` per wheel rotation.
- **Reduced Motion:** Static rover with odometer number counting up via CSS counter (no motion).

---

## 6. Constellation Animations

### 6.1 Star Connection Lines
- **Element:** SVG `<path>` per constellation segment.
- **Animation:** `stroke-dashoffset` from full length to 0 (drawing line).
- **Trigger:** When a mission fragment is earned (star filled).
- **Duration:** 600ms `var(--ease-out)` per segment.
- **Stagger:** 150ms delay between sequential segments.
- **Reduced Motion:** Lines appear instantly solid.

### 6.2 Fragment Glow (Star Fill)
- **Sequence:**
  1. Star outline pulse (2 cycles, 400ms each).
  2. Fill color transition (stroke → fill) with radial glow expansion.
  3. Connection line draw to next star (if applicable).
- **Total Duration:** ~2.5s per fragment earned.
- **Reduced Motion:** Immediate fill, immediate line draw.

### 6.3 Archive Keeper Celebration
- **Trigger:** Final (8th) fragment earned.
- **Sequence:** Spark character spins 360° (`rotate(0) → rotate(360deg)`), emits particle burst (20 stars), constellation fully illuminates.
- **Duration:** 3s celebration, then idle loop.
- **Reduced Motion:** Spark does a quick scale pop (`scale(1.2) → scale(1)`); constellation instantly complete.

---

## 7. Scene Transition Animations

### 7.1 Screen Cross-Fade (Route Change)
- **Outgoing:** `opacity: 1 → 0, transform: scale(0.98)` (200ms).
- **Incoming:** `opacity: 0 → 1, transform: scale(1.02) → scale(1)` (300ms, delayed 50ms).
- **Reduced Motion:** Instant swap (no overlap).

### 7.2 Modal / Dialog Open
- **Backdrop:** `opacity: 0 → 1` (150ms).
- **Content:** `opacity: 0 → 1, transform: scale(0.9) → scale(1)` (250ms `var(--ease-spring)`).
- **Focus Trap:** First focusable element receives focus after animation.
- **Reduced Motion:** Instant appear.

### 7.3 Tab / Panel Switch (Dossier Sections)
- **Method:** Cross-fade only (no slide to avoid vestibular triggers).
- **Duration:** 150ms.
- **Reduced Motion:** Instant.

---

## 8. Static Fallback Specifications

For every animated element, a static equivalent is defined:

| Animated Element | Static Fallback State |
|---|---|
| Character breathing idle | Character at base position (keyframe 0%) |
| Expression transition | Target expression shown immediately |
| Character entrance | Character at full opacity, base transform |
| Character exit | Character removed from DOM (or opacity 0) |
| Button hover/active | Base style (no transform/shadow change) |
| Card flip | New content cross-faded instantly |
| Progress fill | Progress at final value |
| Star pulse | Star at full brightness, base scale |
| Part snap | Part at snapped position |
| Path draw | Full path visible, stroke solid |
| Dig motion | Scoop at rest position, static dust puff |
| Flight glide | Character at start, path shown dashed |
| Rover drive | Rover static, odometer at final number |
| Constellation lines | All earned lines solid, unearned lines dim |
| Fragment glow | Star filled, no pulse |
| Screen transitions | Instant content swap |
| Modal open | Modal at full opacity, scale 1 |

---

## 9. Implementation Notes for Frontend Developer

- **CSS-First:** All animations defined in CSS `@keyframes` with custom properties for durations/easings.
- **JS Triggers:** Add/remove CSS classes (e.g., `.is-animating`, `.is-complete`) to trigger animations; avoid inline styles.
- **Reduced Motion Hook:** Use `window.matchMedia('(prefers-reduced-motion: reduce)')` listener to set a global `data-reduced-motion` attribute on `<html>` for CSS selectors.
- **SVG Animation:** Prefer CSS animations on SVG elements over SMIL (`<animate>`) for consistent reduced-motion handling.
- **Performance:** `will-change: transform, opacity` on animating elements; remove after animation ends via `animationend` event.
- **Accessibility:** Never auto-play looping animations longer than 5s without pause control. All decorative animations respect `prefers-reduced-motion`.

---

## 10. Unresolved Decisions / Open Questions

1. **Flight Glide `offset-path` Support:** Browser support is good but verify Safari implementation for curved paths; may need JS fallback (GSAP MotionPath or manual `transform` interpolation).
2. **Particle Systems:** CSS-only particles for dig/celebration — confirm particle count stays under 20 for 60fps on low-end mobile.
3. **Constellation Line Stagger Timing:** Exact stagger delay (currently 150ms) to be tuned with UX designer for "magical but not slow" feel.
4. **Audio Sync:** If subtle UI sounds added later, animation timings must align; currently silent MVP.