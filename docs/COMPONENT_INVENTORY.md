# Component Inventory — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Tech Stack:** React + TypeScript + Vite, CSS Custom Properties, SVG

---

## 1. Component Hierarchy

```
App
├── Providers (Theme, Accessibility, Progress, Audio)
├── Router
│   ├── Welcome
│   ├── MemoryStation
│   ├── MarsMap / MoonMap
│   ├── Dossier
│   ├── Challenge (P1-P6 variants)
│   ├── FragmentReward
│   └── Constellation
├── PersistentHeader (MemoryStationButton, ConstellationPreview, SettingsButton)
├── SettingsModal
├── ErrorBoundary
└── ToastContainer
```

---

## 2. Core Layout Components

### 2.1 `AppShell`
**Purpose:** Root layout wrapper with providers and persistent elements  
**File:** `src/components/layout/AppShell.tsx`

```typescript
interface AppShellProps {
  children: React.ReactNode;
}
```

**Responsibilities:**
- Providers: `ThemeProvider`, `AccessibilityProvider`, `ProgressProvider`, `AudioProvider`
- Router outlet
- PersistentHeader (fixed, z-index 100)
- ToastContainer (portal)
- ErrorBoundary wrapper

**Accessibility:**
- `role="application"` on root
- Skip link: "Skip to main content" (first focusable element)

---

### 2.2 `PersistentHeader`
**Purpose:** Always-visible navigation and status  
**File:** `src/components/layout/PersistentHeader.tsx`

```typescript
interface PersistentHeaderProps {
  currentRoute: RouteName;
  onMemoryStationClick: () => void;
  onSettingsClick: () => void;
  onConstellationClick: () => void;
  fragmentCount: number; // 0-8
  totalFragments: 8;
}
```

**Structure:**
```
<header class="persistent-header" role="banner">
  <button 
    class="memory-station-btn"
    aria-label="Return to Memory Station"
    onClick={onMemoryStationClick}
  >
    <Icon name="station" aria-hidden="true" />
    <span class="label">Memory Station</span>
  </button>
  
  <div class="spacer" aria-hidden="true" />
  
  <button 
    class="constellation-preview"
    aria-label={`Constellation of Memories, ${fragmentCount} of ${totalFragments} fragments collected`}
    onClick={onConstellationClick}
  >
    <Icon name="star-filled" aria-hidden="true" />
    <span class="count">{fragmentCount}/{totalFragments}</span>
  </button>
  
  <button 
    class="settings-btn"
    aria-label="Settings and Accessibility"
    onClick={onSettingsClick}
  >
    <Icon name="gear" aria-hidden="true" />
  </button>
</header>
```

**Responsive:**
- Mobile (≤640px): Icons only, 44×44 px touch targets
- Tablet (641-1024px): Icons + abbreviated labels
- Desktop (>1024px): Full labels

**States:**
- Default, Hover, Focus (3px ring), Active, Disabled (Memory Station never disabled)

**Accessibility:**
- `role="banner"`
- Memory Station button: always first in tab order
- Constellation preview: live region for count updates (`aria-live="polite"`)
- Focus trap not needed (header is persistent)

---

### 2.3 `PageLayout`
**Purpose:** Consistent page structure with header offset  
**File:** `src/components/layout/PageLayout.tsx`

```typescript
interface PageLayoutProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
  className?: string;
}
```

**Structure:**
```
<main class="page-layout" id="main-content" role="main" tabIndex={-1}>
  <div class="page-header">
    {backHref && (
      <a href={backHref} class="back-link" aria-label={backLabel || `Back to ${title}`}>
        <Icon name="arrow-left" aria-hidden="true" />
        <span>{backLabel || title}</span>
      </a>
    )}
    <div class="page-title-group">
      <h1>{title}</h1>
      {subtitle && <p class="subtitle">{subtitle}</p>}
    </div>
  </div>
  <div class="page-content">{children}</div>
</main>
```

**CSS:**
- `padding-top: var(--header-height)` to clear fixed header
- Max-width: 1200px, centered
- Mobile: 16px side padding

**Accessibility:**
- `id="main-content"` for skip link target
- `tabIndex={-1}` for programmatic focus on route change
- Heading hierarchy: h1 only one per page

---

### 2.4 `ScreenContainer`
**Purpose:** Full-viewport screens (maps, constellation, challenges)  
**File:** `src/components/layout/ScreenContainer.tsx`

```typescript
interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
}
```

**Structure:**
```
<div class="screen-container" style={{ minHeight: '100vh' }}>
  <PersistentHeader />
  <main class="screen-content" id="main-content" role="main" tabIndex={-1}>
    {children}
  </main>
</div>
```

---

## 3. Navigation Components

### 3.1 `MemoryStationButton`
**Purpose:** Primary return-to-hub button (used in PersistentHeader + challenge footer)  
**File:** `src/components/navigation/MemoryStationButton.tsx`

```typescript
interface MemoryStationButtonProps {
  variant?: 'header' | 'footer' | 'standalone';
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string; // Default: "Return to Memory Station"
  children?: React.ReactNode; // For footer variant with custom text
}
```

**Variants:**
- `header`: Icon + "Memory Station" text (desktop), icon only (mobile)
- `footer`: Full-width button, "Memory Station" text, prominent
- `standalone`: Custom children, used in modals

**States:** Default, Hover, Focus, Active, Disabled, Loading

**Accessibility:**
- `type="button"`
- `aria-label` always set
- Focus ring: 3px solid var(--color-focus), offset 2px
- Touch target: 56×56 px minimum

---

### 3.2 `BackButton`
**Purpose:** Contextual back navigation (map ← station, dossier ← map, etc.)  
**File:** `src/components/navigation/BackButton.tsx`

```typescript
interface BackButtonProps {
  href: string;
  label: string; // "Mars Map", "Dossier", etc.
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent) => void; // For programmatic navigation
}
```

**Render:**
```
<a href={href} class="back-button" aria-label={ariaLabel || `Back to ${label}`}>
  <Icon name="arrow-left" aria-hidden="true" />
  <span>{label}</span>
</a>
```

**States:** Default, Hover, Focus, Active

**Accessibility:**
- Real `<a>` for browser history
- `aria-label` descriptive
- Focus visible

---

### 3.3 `Breadcrumb`
**Purpose:** Hierarchical location display (Station → Mars → Sojourner)  
**File:** `src/components/navigation/Breadcrumb.tsx`

```typescript
interface BreadcrumbProps {
  items: Array<{ label: string; href?: string; current?: boolean }>;
}
```

**Render:**
```
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    {items.map((item, i) => (
      <li key={i}>
        {item.href ? (
          <a href={item.href}>{item.label}</a>
        ) : (
          <span aria-current="page">{item.label}</span>
        )}
        {i < items.length - 1 && <Icon name="chevron-right" aria-hidden="true" />}
      </li>
    ))}
  </ol>
</nav>
```

**Accessibility:**
- `aria-label="Breadcrumb"`
- `aria-current="page"` on last item
- Separators hidden from screen readers (`aria-hidden="true"`)

---

## 4. Content Components

### 4.1 `CharacterIllustration`
**Purpose:** Animated storybook character (Archive Keeper, rovers, hardware)  
**File:** `src/components/content/CharacterIllustration.tsx`

```typescript
interface CharacterIllustrationProps {
  character: 'keeper' | 'sojourner' | 'spirit' | 'opportunity' | 'ingenuity' 
    | 'surveyor3' | 'apollo15' | 'apollo16' | 'apollo17';
  pose?: 'idle' | 'happy' | 'thinking' | 'celebrate' | 'wave';
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
  ariaLabel: string; // Required for accessibility
  reducedMotion?: boolean; // From context
}
```

**Sizes:**
- `small`: 120×120 px (constellation stars, fragment rewards)
- `medium`: 200×200 px (dossier character column mobile)
- `large`: 280×320 px (dossier character column desktop)
- `full`: 400×400 px (welcome screen)

**Implementation:**
- SVG illustration (not img) for CSS control
- CSS animations for idle poses (blink, breathe)
- `prefers-reduced-motion` → static SVG, no animations
- `will-change: transform` for animated elements

**Accessibility:**
- `role="img"` + `aria-label` (required prop)
- Decorative characters: `aria-hidden="true"` (but we always provide labels)
- Color contrast: Outline strokes ≥ 3px in high contrast mode

---

### 4.2 `FactCard`
**Purpose:** Single fact with source citation (dossier screen)  
**File:** `src/components/content/FactCard.tsx`

```typescript
interface FactCardProps {
  fact: string; // Child-friendly, one concept
  sourceId: string; // e.g., "SRC-SOJ-001"
  sourceUrl?: string; // Optional link to NASA_SOURCES.md
  termDefinitions?: Record<string, string>; // Inline term definitions
}
```

**Render:**
```
<article class="fact-card">
  <p class="fact-text">{fact}</p>
  <footer class="fact-source">
    <span class="source-label">Source:</span>
    {sourceUrl ? (
      <a href={sourceUrl} class="source-link" target="_blank" rel="noopener">
        {sourceId}
      </a>
    ) : (
      <span class="source-id">{sourceId}</span>
    )}
  </footer>
  {termDefinitions && (
    <details class="term-definitions">
      <summary>What do these words mean?</summary>
      <dl>
        {Object.entries(termDefinitions).map(([term, def]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    </details>
  )}
</article>
```

**Styling:**
- Background: var(--color-bg-tertiary)
- Border: 1px solid var(--color-border-subtle)
- Border-radius: var(--radius-md)
- Padding: var(--space-md)
- Max-width: 560px

**Accessibility:**
- Not focusable (read-only content)
- Source links: `target="_blank" rel="noopener"`, announced as "opens in new tab"
- Term definitions: `<details>` native disclosure, keyboard accessible

---

### 4.3 `SimulationBanner`
**Purpose:** Required disclaimer on dossier and challenge screens  
**File:** `src/components/content/SimulationBanner.tsx`

```typescript
interface SimulationBannerProps {
  sourceIds: string[]; // Array of source IDs for this dossier/challenge
  variant?: 'dossier' | 'challenge';
}
```

**Render:**
```
<div class="simulation-banner" role="status" aria-live="polite">
  <Icon name="info" aria-hidden="true" />
  <span class="banner-text">
    Simulation — simplified for learning. Real mission data from NASA sources.
  </span>
  <details class="sources-detail">
    <summary>View sources</summary>
    <ul>
      {sourceIds.map(id => (
        <li key={id}>
          <a href={`#${id}`} data-source-id={id}>{id}</a>
        </li>
      ))}
    </ul>
  </details>
</div>
```

**Styling:**
- Background: amber tint (var(--color-warning) at 15% opacity)
- Border-left: 4px solid var(--color-warning)
- Icon: info circle
- Font-size: var(--text-sm)

**Accessibility:**
- `role="status"` + `aria-live="polite"` (announces on mount)
- Not dismissible (required by compliance)
- High contrast: border 3px, text 7:1

---

### 4.4 `InstructionText`
**Purpose:** Challenge instructions (≤2 sentences, terms defined)  
**File:** `src/components/content/InstructionText.tsx`

```typescript
interface InstructionTextProps {
  instruction: string; // Max 2 sentences
  termDefinitions?: Record<string, string>;
  id?: string; // For aria-describedby on challenge area
}
```

**Render:**
```
<div class="instruction-text" id={id} role="group" aria-labelledby={id}>
  <p>{instruction}</p>
  {termDefinitions && (
    <ul class="inline-definitions">
      {Object.entries(termDefinitions).map(([term, def]) => (
        <li key={term}>
          <strong>{term}</strong>: {def}
        </li>
      ))}
    </ul>
  )}
</div>
```

**Styling:**
- Font-size: var(--text-lg) (18px)
- Line-height: var(--line-height-relaxed)
- Color: var(--color-text-primary)
- Max-width: 600px

**Accessibility:**
- `id` for `aria-describedby` on challenge interaction area
- Terms defined inline, no external navigation needed
- Screen reader reads full instruction + definitions

---

## 5. Challenge Interaction Components

### 5.1 `ChassisSilhouette` (P3 - Part Builder)
**Purpose:** Drop target SVG with 5 labeled slots  
**File:** `src/components/challenge/ChassisSilhouette.tsx`

```typescript
interface ChassisSilhouetteProps {
  slots: Array<{
    id: string; // 'solar', 'front-cam', 'rear-cam', 'apxs', 'wheels'
    label: string; // "Solar Panel", "Front Cameras", etc.
    position: { x: number; y: number }; // SVG coordinates
    size: { width: number; height: number };
    filled?: boolean;
    partId?: string; // Currently placed part
    onDrop: (slotId: string, partId: string) => void;
    onPartRemove: (slotId: string) => void;
  }>;
  highlightedSlotId?: string; // For hint after 2 fails
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**SVG Structure:**
```
<svg class="chassis-silhouette" viewBox="0 0 400 300" role="graphics-document" aria-label="Sojourner rover chassis with 5 part slots">
  <g class="chassis-body">
    <!-- Static chassis outline -->
  </g>
  <g class="slots">
    {slots.map(slot => (
      <g key={slot.id} class={`slot ${slot.filled ? 'filled' : 'empty'} ${slot.id === highlightedSlotId ? 'hint' : ''}`}>
        <rect
          x={slot.position.x}
          y={slot.position.y}
          width={slot.size.width}
          height={slot.size.height}
          rx={4}
          class="slot-outline"
          aria-hidden="true"
        />
        <text 
          x={slot.position.x + slot.size.width/2}
          y={slot.position.y + slot.size.height/2}
          class="slot-label"
          aria-hidden="true"
        >
          {slot.filled ? '✓' : slot.label}
        </text>
        {/* Drop zone - invisible but accessible */}
        <rect
          x={slot.position.x}
          y={slot.position.y}
          width={slot.size.width}
          height={slot.size.height}
          class="drop-zone"
          role="button"
          tabIndex={slot.filled ? -1 : 0}
          aria-label={slot.filled ? `${slot.label} placed` : `Empty slot for ${slot.label}`}
          aria-dropeffect="move"
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
        />
      </g>
    ))}
  </g>
</svg>
```

**Keyboard Interaction:**
- Tab to empty drop zone → Enter to "accept" part from palette (focus moves to palette)
- Tab to filled drop zone → Enter to "remove" part (returns to palette)
- Arrow keys: Navigate between slots

**Touch/Drag:**
- HTML5 Drag & Drop API + pointer events fallback
- Drop zone: minimum 56×56 px (enlarged from visual slot)

**States:**
- Empty: Dashed outline, label visible
- Hover Valid: Solid outline, accent glow
- Filled: Solid outline, part icon, checkmark
- Hint: Gentle pulse (respects reduced motion = static accent border)
- High Contrast: 3px outlines, no transparency

**Accessibility:**
- `role="graphics-document"` + `aria-label` on SVG
- Each drop zone: `role="button"`, `aria-label`, `aria-dropeffect="move"`
- Live region for feedback (external)

---

### 5.2 `PartCard` (P3 - Part Builder Palette)
**Purpose:** Draggable part card with icon, label, job description  
**File:** `src/components/challenge/PartCard.tsx`

```typescript
interface PartCardProps {
  part: {
    id: string;
    icon: string; // SVG icon name or component
    label: string; // "Solar Panel"
    job: string; // "Makes electricity from sunlight"
    targetSlot: string; // Slot ID it belongs to
  };
  isPlaced: boolean;
  isDragging: boolean;
  onDragStart: (partId: string) => void;
  onDragEnd: () => void;
  onClick: (partId: string) => void; // For click-to-select mode
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**Render:**
```
<article 
  class={`part-card ${isPlaced ? 'placed' : ''} ${isDragging ? 'dragging' : ''}`}
  draggable={!isPlaced}
  role="button"
  tabIndex={isPlaced ? -1 : 0}
  aria-label={`${part.label}. ${part.job}. ${isPlaced ? 'Placed on rover.' : 'Drag to chassis or press Enter to select.'}`}
  aria-grabbed={isDragging}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  <div class="part-icon" aria-hidden="true">
    <Icon name={part.icon} size={48} />
  </div>
  <div class="part-info">
    <h3 class="part-label">{part.label}</h3>
    <p class="part-job">{part.job}</p>
  </div>
  {isPlaced && <span class="placed-badge" aria-hidden="true">✓</span>}
</article>
```

**Keyboard:**
- Tab to card → Enter to "pick up" (sets `isDragging=true`, announces "Picked up Solar Panel")
- Tab to chassis slot → Enter to "place" (calls onDrop)
- ESC to cancel drag

**Touch:**
- Long press (500ms) → drag preview
- Drag gesture → move preview
- Release over slot → drop

**States:**
- Default: Elevated card, subtle shadow
- Hover: Lift (transform), shadow increase
- Dragging: Opacity 0.8, rotation 3deg, `will-change: transform`
- Placed: Muted, checkmark badge, `pointer-events: none`
- High Contrast: 3px border, no shadow

**Accessibility:**
- `aria-label` includes all info (label, job, state)
- `aria-grabbed` for drag state
- `draggable="true"` for HTML5 DnD
- Touch target: full card ≥ 56×56 px

---

### 5.3 `MatchColumn` (P1 - Tool-Discovery Match)
**Purpose:** Reusable column for matching pairs (instruments ↔ discoveries, rocks ↔ sites)  
**File:** `src/components/challenge/MatchColumn.tsx`

```typescript
interface MatchColumnProps {
  title: string; // "Instruments" or "Discoveries"
  items: Array<{
    id: string;
    label: string;
    description: string;
    icon?: string;
    matchedTo?: string; // ID of matched item in other column
  }>;
  onItemSelect: (itemId: string, columnSide: 'left' | 'right') => void;
  selectedItemId?: string; // Currently selected in this column
  hoveredItemId?: string; // For hover highlight
  side: 'left' | 'right';
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**Render:**
```
<section class="match-column" aria-labelledby={titleId}>
  <h2 id={titleId} class="column-title">{title}</h2>
  <ul class="match-items" role="list">
    {items.map(item => (
      <li key={item.id} class={`match-item ${item.matchedTo ? 'matched' : ''} ${item.id === selectedItemId ? 'selected' : ''} ${item.id === hoveredItemId ? 'hovered' : ''}`}>
        <button
          class="item-button"
          onClick={() => onItemSelect(item.id, side)}
          aria-label={`${item.label}. ${item.description}. ${item.matchedTo ? `Matched to ${item.matchedToLabel}` : 'Available to match.'}`}
          aria-pressed={item.id === selectedItemId}
          disabled={!!item.matchedTo}
        >
          {item.icon && <Icon name={item.icon} aria-hidden="true" />}
          <div class="item-text">
            <span class="item-label">{item.label}</span>
            <span class="item-description">{item.description}</span>
          </div>
          {item.matchedTo && <Icon name="check" class="match-check" aria-hidden="true" />}
        </button>
      </li>
    ))}
  </ul>
</section>
```

**Interaction:**
- Click/Enter on item in column A → selects it (highlights)
- Click/Enter on item in column B → attempts match
- Success: Both items get `matched` state, line draws (SVG overlay)
- Fail: Both deselect, gentle shake, feedback announced

**Keyboard:**
- Tab navigates items within column
- Arrow Up/Down: Navigate items
- Enter/Space: Select/Match
- ESC: Clear selection

**Accessibility:**
- `role="list"` + `role="listitem"` (native `<ul>`/`<li>`)
- Buttons: `aria-pressed` for selection state
- `aria-label` includes match status
- Disabled when matched

---

### 5.4 `FlightCorridor` (P4 - Terrain Navigator)
**Purpose:** SVG flight path with checkpoints and helicopter sprite  
**File:** `src/components/challenge/FlightCorridor.tsx`

```typescript
interface FlightCorridorProps {
  checkpoints: Array<{
    id: string;
    position: { x: number; y: number };
    label: string;
    reached: boolean;
  }>;
  helicopterPosition: { x: number; y: number };
  corridorPath: string; // SVG path data
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onAutoPilot: () => void; // Accessibility
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**SVG Structure:**
```
<svg viewBox="0 0 800 400" role="graphics-document" aria-label="Ingenuity flight corridor with 3 checkpoints">
  {/* Corridor path */}
  <path d={corridorPath} class="corridor-path" aria-hidden="true" />
  
  {/* Checkpoints */}
  <g class="checkpoints">
    {checkpoints.map(cp => (
      <g key={cp.id} class={`checkpoint ${cp.reached ? 'reached' : ''}`}>
        <circle 
          cx={cp.position.x} 
          cy={cp.position.y} 
          r={20} 
          class="checkpoint-ring" 
          aria-hidden="true"
        />
        <text 
          x={cp.position.x} 
          y={cp.position.y - 30} 
          class="checkpoint-label"
          aria-hidden="true"
        >
          {cp.label}
        </text>
        {cp.reached && <Icon name="check" x={cp.position.x-8} y={cp.position.y+4} aria-hidden="true" />}
      </g>
    ))}
  </g>
  
  {/* Helicopter sprite */}
  <g 
    class="helicopter" 
    transform={`translate(${helicopterPosition.x}, ${helicopterPosition.y})`}
    role="img"
    aria-label="Ingenuity helicopter"
  >
    <HelicopterIcon />
  </g>
</svg>
```

**Controls Overlay (Touch):**
```
<div class="flight-controls" role="group" aria-label="Flight controls">
  <button onClick={() => onNavigate('up')} aria-label="Fly up">▲</button>
  <button onClick={() => onNavigate('left')} aria-label="Fly left">◀</button>
  <button onClick={() => onNavigate('right')} aria-label="Fly right">▶</button>
  <button onClick={() => onNavigate('down')} aria-label="Fly down">▼</button>
  <button onClick={onAutoPilot} aria-label="Auto-pilot to next checkpoint">⟳</button>
</div>
```

**Keyboard:**
- Arrow keys: Nudge helicopter (discrete steps, 20px)
- Space: Auto-pilot to next checkpoint
- Reduced motion: No smooth animation, instant position update

**Accessibility:**
- Live region announces: "Checkpoint 1 reached. Altitude 3 meters. Checkpoint 2: fly forward."
- Helicopter position announced on move (throttled)
- Touch targets: 64×64 px minimum
- High contrast: 3px corridor path, large checkpoint rings

---

### 5.5 `DepthMeter` (P5 - Sample Analyzer)
**Purpose:** Visual progress meter for digging depth  
**File:** `src/components/challenge/DepthMeter.tsx`

```typescript
interface DepthMeterProps {
  currentDepth: number; // 0-18
  maxDepth: 18;
  steps: Array<{ depth: number; label: string }>; // [{depth: 6, label: "Soil holds firm"}, ...]
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**Render:**
```
<div class="depth-meter" role="progressbar" aria-valuenow={currentDepth} aria-valuemin={0} aria-valuemax={maxDepth} aria-label="Trench depth">
  <div class="meter-track">
    <div 
      class="meter-fill" 
      style={{ width: `${(currentDepth / maxDepth) * 100}%` }}
      aria-hidden="true"
    />
    {steps.map((step, i) => (
      <div key={i} class="meter-tick" style={{ left: `${(step.depth / maxDepth) * 100}%` }}>
        <span class="tick-mark" aria-hidden="true" />
        <span class="tick-label" aria-hidden="true">{step.depth} cm</span>
      </div>
    ))}
  </div>
  <div class="meter-labels" aria-live="polite">
    {currentDepth > 0 && (
      <span>Dig {Math.ceil(currentDepth / 6)}: {currentDepth} cm — {steps[Math.ceil(currentDepth / 6) - 1]?.label}</span>
    )}
  </div>
</div>
```

**Button (Dig):**
```
<button class="dig-button" onClick={onDig} aria-label="Dig deeper">
  DIG
</button>
```

**States:**
- Fill animates (respects reduced motion)
- Tick marks highlight when passed
- Label updates with each dig

**Accessibility:**
- `role="progressbar"` with proper ARIA values
- `aria-live="polite"` on label for screen readers
- Dig button: large (120×64 px), high contrast

---

### 5.6 `NumberLine` (P6 - Distance Comparator)
**Purpose:** Horizontal number line with draggable mission markers  
**File:** `src/components/challenge/NumberLine.tsx`

```typescript
interface NumberLineProps {
  maxValue: number; // 40
  tickInterval: number; // 5
  markers: Array<{
    id: string; // 'apollo15', 'apollo16', 'apollo17'
    label: string; // 'Apollo 15'
    position: number; // Current position (km)
    targetPosition: number; // Correct position
    placed: boolean;
  }>;
  onMarkerMove: (markerId: string, position: number) => void;
  onMarkerPlace: (markerId: string) => void;
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**Render:**
```
<div class="number-line" role="application" aria-label="Mission distance comparison number line, 0 to 40 kilometers">
  {/* Track */}
  <div class="line-track" aria-hidden="true">
    {Array.from({ length: maxValue / tickInterval + 1 }).map((_, i) => (
      <div key={i} class="tick" style={{ left: `${(i * tickInterval / maxValue) * 100}%` }}>
        <span class="tick-mark" aria-hidden="true" />
        <span class="tick-value" aria-hidden="true">{i * tickInterval}</span>
      </div>
    ))}
  </div>
  
  {/* Markers */}
  <div class="markers-layer">
    {markers.map(marker => (
      <button
        key={marker.id}
        class={`marker ${marker.placed ? 'placed' : ''}`}
        style={{ left: `${(marker.position / maxValue) * 100}%` }}
        role="slider"
        tabIndex={marker.placed ? -1 : 0}
        aria-label={`${marker.label}, currently at ${marker.position} kilometers`}
        aria-valuenow={marker.position}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
      >
        <span class="marker-label" aria-hidden="true">{marker.label}</span>
        {marker.placed && <Icon name="check" aria-hidden="true" />}
      </button>
    ))}
  </div>
  
  {/* Live feedback */}
  <div class="sr-only" aria-live="polite" aria-atomic="true">
    {focusedMarkerId && `${markers.find(m => m.id === focusedMarkerId)?.label} at ${markers.find(m => m.id === focusedMarkerId)?.position} km`}
  </div>
</div>
```

**Keyboard:**
- Tab to marker → Enter to "grab" → Arrow Left/Right to slide (1 km steps) → Enter to place
- Home/End: Jump to 0/max
- Page Up/Down: Jump by 5 km (tick interval)

**Touch:**
- Drag marker along line
- Snap to nearest 5 km tick on release (or on second attempt)

**Accessibility:**
- `role="slider"` on each marker with full ARIA
- Live region announces position changes
- High contrast: Thick line (4px), large ticks, bold numbers
- Touch target: Marker 60×60 px minimum

---

## 6. Reward & Progress Components

### 6.1 `FragmentReward`
**Purpose:** Memory fragment display with caption and constellation preview  
**File:** `src/components/reward/FragmentReward.tsx`

```typescript
interface FragmentRewardProps {
  fragment: {
    id: string;
    title: string;
    caption: string;
    illustration: string; // SVG icon/illustration name
  };
  constellationProgress: { collected: number; total: 8 };
  onViewConstellation: () => void;
  onBackToStation: () => void;
  reducedMotion: boolean;
}
```

**Render:**
```
<div class="fragment-reward" role="dialog" aria-modal="true" aria-labelledby="fragment-title">
  <div class="reward-content">
    <h2 id="fragment-title" class="reward-heading">✨ MEMORY FRAGMENT FOUND! ✨</h2>
    
    <div class="fragment-illustration" aria-hidden="true">
      <FragmentIllustration name={fragment.illustration} size="large" />
    </div>
    
    <h3 class="fragment-title">{fragment.title}</h3>
    <p class="fragment-caption">{fragment.caption}</p>
    
    <div class="constellation-preview">
      <span>★ Added to Constellation! ({constellationProgress.collected}/{constellationProgress.total})</span>
      <button onClick={onViewConstellation} class="btn-primary">
        View Constellation
      </button>
    </div>
    
    <button onClick={onBackToStation} class="btn-secondary">
      Back to Memory Station
    </button>
  </div>
</div>
```

**Animation:**
- Fragment illustration: Subtle glow pulse (respects reduced motion)
- Entrance: Fade + scale (0.3s, respects reduced motion)

**Accessibility:**
- `role="dialog"` + `aria-modal="true"`
- Focus trapped within dialog
- ESC closes → Back to Station
- Live announcement on mount: "Memory fragment found: Sojourner's First Wheel Track"

---

### 6.2 `ConstellationStar`
**Purpose:** Individual star in constellation (lit or dim)  
**File:** `src/components/reward/ConstellationStar.tsx`

```typescript
interface ConstellationStarProps {
  star: {
    id: string; // dossier ID
    position: { x: number; y: number }; // Percentage 0-100
    collected: boolean;
    fragment?: { title: string; caption: string; illustration: string };
  };
  onSelect: (starId: string) => void;
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**Render:**
```
<button
  class={`constellation-star ${star.collected ? 'lit' : 'dim'}`}
  style={{ left: `${star.position.x}%`, top: `${star.position.y}%` }}
  onClick={() => star.collected && onSelect(star.id)}
  disabled={!star.collected}
  aria-label={star.collected 
    ? `${star.fragment?.title}. ${star.fragment?.caption}` 
    : `Mission not yet explored. Complete the ${star.id} challenge to unlock.`}
  aria-disabled={!star.collected}
  tabIndex={star.collected ? 0 : -1}
>
  <svg class="star-shape" viewBox="0 0 24 24" aria-hidden="true">
    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
  </svg>
  {star.collected && <span class="star-glow" aria-hidden="true" />}
</button>
```

**Keyboard:**
- Arrow keys: Navigate between stars (spatial navigation)
- Enter/Space: Open fragment detail (lit stars only)
- Tab: Only lit stars in tab order

**Touch:**
- Tap lit star → open detail
- Swipe: Pan constellation (mobile)

**States:**
- Lit: Warm yellow, glow animation (reduced motion = static glow)
- Dim: Muted gray, no glow
- Hover/Focus: Scale 1.2, 3px focus ring
- High Contrast: Lit = thick yellow outline + fill; Dim = thick gray outline

**Accessibility:**
- `aria-label` dynamic based on collected state
- `aria-disabled` for dim stars
- Focus management: Only lit stars focusable

---

### 6.3 `ConstellationField`
**Purpose:** Full night sky with 8 positioned stars  
**File:** `src/components/reward/ConstellationField.tsx`

```typescript
interface ConstellationFieldProps {
  stars: ConstellationStarProps['star'][];
  onStarSelect: (starId: string) => void;
  reducedMotion: boolean;
  highContrast: boolean;
}
```

**Render:**
```
<div class="constellation-field" role="graphics-document" aria-label="Constellation of Memories, 8 stars representing completed missions">
  <div class="sky-background" aria-hidden="true">
    {/* Subtle starfield, respects reduced motion */}
  </div>
  {stars.map(star => (
    <ConstellationStar
      key={star.id}
      star={star}
      onSelect={onStarSelect}
      reducedMotion={reducedMotion}
      highContrast={highContrast}
    />
  ))}
  {/* Constellation lines connecting stars (optional, decorative) */}
  <svg class="constellation-lines" aria-hidden="true">
    {/* Lines between collected stars */}
  </svg>
</div>
```

**Keyboard Navigation:**
- Arrow keys move between stars (nearest neighbor algorithm)
- Roving tabindex: Only one star in tab order at a time

---

## 7. UI & Feedback Components

### 7.1 `Button` (Base)
**File:** `src/components/ui/Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}
```

**Variants:**
- `primary`: Accent bg, white text (main CTAs)
- `secondary`: Transparent bg, accent border/text
- `ghost`: No bg/border, accent text
- `danger`: Error color (reset progress)

**Sizes:**
- `sm`: 36px height, 12px padding (compact)
- `md`: 44px height, 16px padding (default)
- `lg`: 52px height, 24px padding (prominent)
- `xl`: 64px height, 32px padding (hero, touch-friendly)

**States:** Default, Hover, Focus, Active, Disabled, Loading

**Accessibility:**
- `type="button"` default
- Loading: `aria-busy="true"`, spinner announced
- Disabled: `aria-disabled="true"`, not in tab order
- Focus ring: 3px solid var(--color-focus), offset 2px

---

### 7.2 `Toast`
**Purpose:** Non-blocking feedback (hints, errors, success)  
**File:** `src/components/ui/Toast.tsx`

```typescript
interface ToastProps {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'hint';
  duration?: number; // ms, 0 = persistent
  onDismiss: (id: string) => void;
  action?: { label: string; onClick: () => void };
}
```

**Render:**
```
<div 
  class={`toast toast-${type}`}
  role={type === 'error' ? 'alert' : 'status'}
  aria-live={type === 'error' ? 'assertive' : 'polite'}
  aria-atomic="true"
>
  <Icon name={typeIcon} aria-hidden="true" />
  <span class="toast-message">{message}</span>
  {action && (
    <button class="toast-action" onClick={action.onClick}>
      {action.label}
    </button>
  )}
  <button class="toast-dismiss" onClick={() => onDismiss(id)} aria-label="Dismiss">
    <Icon name="x" aria-hidden="true" />
  </button>
</div>
```

**Positioning:** Bottom-right, stacked, max 3 visible

**Accessibility:**
- `role="alert"` for errors (immediate announcement)
- `role="status"` for others (polite)
- Dismiss button always accessible
- Auto-dismiss respects `prefers-reduced-motion` (no slide animation)

---

### 7.3 `Modal`
**Purpose:** Accessible dialog (settings, confirmations, fragment detail)  
**File:** `src/components/ui/Modal.tsx`

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  hideCloseButton?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}
```

**Features:**
- Focus trap (Tab cycles within modal)
- ESC closes (unless `hideCloseButton`)
- Click overlay closes (unless `hideCloseButton`)
- `aria-modal="true"`, `role="dialog"`
- Restores focus to trigger on close
- Body scroll lock when open

**Render:**
```
<div class="modal-overlay" onClick={onClose} aria-hidden="true">
  <div 
    class={`modal modal-${size}`}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    onClick={e => e.stopPropagation()}
  >
    <header class="modal-header">
      <h2 id="modal-title">{title}</h2>
      {!hideCloseButton && (
        <button class="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="x" aria-hidden="true" />
        </button>
      )}
    </header>
    <div class="modal-content" tabIndex={-1} ref={contentRef}>
      {children}
    </div>
  </div>
</div>
```

---

### 7.4 `Tooltip`
**Purpose:** Hover/focus context for pins, locked items, stars  
**File:** `src/components/ui/Tooltip.tsx`

```typescript
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement; // Single child to wrap
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number; // ms before show
  disabled?: boolean;
}
```

**Behavior:**
- Shows on hover (mouse) + focus (keyboard)
- Touch: Tap to show, tap elsewhere to dismiss
- Delay: 200ms show, 100ms hide
- Position: Auto-flip if viewport edge

**Accessibility:**
- `role="tooltip"` on tooltip element
- Child gets `aria-describedby` pointing to tooltip ID
- Not announced on hover (only focus)

---

## 8. Provider Components (Context)

### 8.1 `ThemeProvider`
**File:** `src/providers/ThemeProvider.tsx`

```typescript
interface ThemeContextValue {
  highContrast: boolean;
  toggleHighContrast: () => void;
  // CSS custom properties applied to :root
}
```

- Reads `prefers-contrast: more` on mount
- Syncs with OS changes
- Applies CSS custom properties to `:root`

---

### 8.2 `AccessibilityProvider`
**File:** `src/providers/AccessibilityProvider.tsx`

```typescript
interface AccessibilityContextValue {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  audioEnabled: boolean;
  narrationEnabled: boolean;
  toggleAudio: () => void;
  toggleNarration: () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}
```

- Reads `prefers-reduced-motion` on mount
- Provides `announce()` for live region updates
- Manages audio/narration toggles

---

### 8.3 `ProgressProvider`
**File:** `src/providers/ProgressProvider.tsx`

```typescript
interface ProgressContextValue {
  completedDossiers: string[]; // ['sojourner-mpf', ...]
  collectedFragments: string[]; // ['sojourner-wheel-track', ...]
  currentLocation: LocationState;
  challengeProgress: Record<string, any>; // Per-dossier progress
  completeDossier: (dossierId: string, fragmentId: string) => void;
  updateChallengeProgress: (dossierId: string, progress: any) => void;
  setCurrentLocation: (location: LocationState) => void;
  resetProgress: () => void; // Dev only
}
```

- Persists to localStorage on every change
- Handles localStorage unavailable fallback
- Hydrates on app load

---

### 8.4 `AudioProvider`
**File:** `src/providers/AudioProvider.tsx`

```typescript
interface AudioContextValue {
  playSound: (sound: 'success' | 'error' | 'place' | 'hint' | 'click') => void;
  speak: (text: string, priority?: 'polite' | 'assertive') => void; // Web Speech API
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
}
```

- Web Audio API for sound effects
- Speech Synthesis API for narration
- Respects `audioEnabled` / `narrationEnabled` from AccessibilityProvider

---

## 9. Component Props Summary Table

| Component | Key Props | States | A11y Features |
|-----------|-----------|--------|---------------|
| `PersistentHeader` | fragmentCount, onMemoryStationClick | Default, Focus | Skip target, live region for count |
| `MemoryStationButton` | variant, onClick, disabled | Default, Hover, Focus, Active, Disabled | aria-label, 56×56 target, focus ring |
| `BackButton` | href, label | Default, Hover, Focus, Active | Real link, aria-label |
| `CharacterIllustration` | character, pose, size, ariaLabel | Idle, Happy, Celebrate | role="img", aria-label, reduced motion |
| `FactCard` | fact, sourceId, termDefinitions | Static | Source links, inline definitions |
| `SimulationBanner` | sourceIds, variant | Static | role="status", live, source details |
| `InstructionText` | instruction, termDefinitions, id | Static | aria-describedby target |
| `ChassisSilhouette` | slots, highlightedSlotId, onDrop | Empty, Hover, Filled, Hint | role="button", aria-dropeffect, keyboard |
| `PartCard` | part, isPlaced, isDragging, onDragStart | Default, Hover, Dragging, Placed | aria-grabbed, aria-label, draggable |
| `MatchColumn` | items, onItemSelect, selectedItemId | Default, Selected, Matched | role="list", aria-pressed |
| `FlightCorridor` | checkpoints, helicopterPosition, onNavigate | Idle, Moving, Checkpoint | Live region, slider-like controls |
| `DepthMeter` | currentDepth, maxDepth, steps | Filling, Complete | role="progressbar", live label |
| `NumberLine` | markers, onMarkerMove, onMarkerPlace | Dragging, Placed | role="slider", live position |
| `FragmentReward` | fragment, constellationProgress | Entrance, Idle | role="dialog", focus trap, live announce |
| `ConstellationStar` | star, onSelect | Lit, Dim, Hover, Focus | aria-label dynamic, roving tabindex |
| `Button` | variant, size, loading | Default, Hover, Focus, Active, Disabled, Loading | aria-busy, aria-disabled |
| `Toast` | message, type, duration | Enter, Exit, Persistent | role="alert/status", live |
| `Modal` | isOpen, title, children, size | Open, Closed | Focus trap, ESC, restore focus |

---

## 10. Component File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── PersistentHeader.tsx
│   │   ├── PageLayout.tsx
│   │   └── ScreenContainer.tsx
│   ├── navigation/
│   │   ├── MemoryStationButton.tsx
│   │   ├── BackButton.tsx
│   │   └── Breadcrumb.tsx
│   ├── content/
│   │   ├── CharacterIllustration.tsx
│   │   ├── FactCard.tsx
│   │   ├── SimulationBanner.tsx
│   │   └── InstructionText.tsx
│   ├── challenge/
│   │   ├── ChassisSilhouette.tsx
│   │   ├── PartCard.tsx
│   │   ├── MatchColumn.tsx
│   │   ├── FlightCorridor.tsx
│   │   ├── DepthMeter.tsx
│   │   └── NumberLine.tsx
│   ├── reward/
│   │   ├── FragmentReward.tsx
│   │   ├── ConstellationStar.tsx
│   │   └── ConstellationField.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Toast.tsx
│   │   ├── Modal.tsx
│   │   └── Tooltip.tsx
│   └── providers/
│       ├── ThemeProvider.tsx
│       ├── AccessibilityProvider.tsx
│       ├── ProgressProvider.tsx
│       └── AudioProvider.tsx
├── hooks/
│   ├── useDragDrop.ts
│   ├── useKeyboardNavigation.ts
│   ├── useLocalStorage.ts
│   ├── useReducedMotion.ts
│   └── useAnnounce.ts
└── utils/
    ├── accessibility.ts
    ├── storage.ts
    └── constants.ts
```

---

*End of COMPONENT_INVENTORY.md*