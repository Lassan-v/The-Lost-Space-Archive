# Challenge Specifications — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)
**Audience:** Children aged 8–10
**Design Principle:** One explicit learning objective per challenge. Short instructions, familiar verbs, immediate kind feedback. Simulations labeled. No punitive failure.

---

## Reusable Challenge Patterns

| Pattern ID | Name | Core Mechanic | Best For |
|------------|------|---------------|----------|
| P1 | **Tool–Discovery Match** | Drag instrument card to the discovery it enabled | Instrument ↔ Result pairs |
| P2 | **Mission Timeline Sort** | Tap/click to order 3–4 event cards chronologically | Sequence of landing, deployment, key finding, end |
| P3 | **Rover Part Builder** | Drag parts (wheel, camera, arm, antenna, solar panel) onto a chassis silhouette | Learning hardware components and functions |
| P4 | **Terrain Navigator** | Tap arrow keys or on-screen buttons to guide a sprite along a simple path avoiding marked hazards | Hazard avoidance, route planning |
| P5 | **Sample Analyzer** | Choose one tool from 3 options to "scan" a rock/soil; see simplified result | Instrument purpose, evidence-based reasoning |
| P6 | **Distance Comparator** | Drag mission markers onto a number line (0–50 km) to compare traverse distances | Scale, magnitude, comparison |

All patterns support: keyboard (Tab/Enter/Arrows), touch (tap/drag), screen reader labels, reduced motion toggle, high contrast mode.

---

## 1. Spirit (MER-A) — `spirit-mer-a`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | Spirit's Water Detective Kit |
| **Dossier** | `spirit-mer-a` |
| **Source-Backed Facts** | • Discovered silica-rich deposits at Home Plate indicating past hydrothermal activity (SRC-SPIRIT-001)<br>• Found goethite at Husband Hill — a mineral that forms in water (SRC-SPIRIT-001)<br>• Identified carbonate-rich rocks (Comanche outcrop) indicating neutral-pH water (SRC-SPIRIT-001)<br>• Instruments: Mini-TES (detects minerals from afar), MB (Mössbauer Spectrometer — identifies iron minerals), APXS (chemical composition) |
| **Learning Objective** | Identify which rover instruments detect evidence of past water (minerals that form in water). |
| **Player Instruction** | "Spirit found rocks that formed in water. Match each tool to what it discovered." |
| **Controls** | **Keyboard:** Tab to focus instrument card, Enter to pick up, Tab to target slot, Enter to drop. **Touch:** Drag instrument card to discovery slot. **Screen Reader:** "Instrument: Mini-TES. Discovery: Silica-rich deposits at Home Plate." |
| **Success Condition** | All 3 instrument–discovery pairs correctly matched. |
| **Correct Feedback** | "Great match! Mini-TES spotted silica from far away. The Mössbauer Spectrometer found goethite — a mineral that only forms in water. APXS confirmed carbonates — rocks that need neutral water to form. You found 3 clues of ancient water!" |
| **Incorrect Feedback** | "Not quite. Mini-TES looks at heat to find minerals. Try matching it to the silica discovery. Want to try again?" |
| **Retry Behavior** | Cards return to start. No limit. Gentle highlight on correct target after 2 attempts. |
| **Accessibility Alternative** | **Audio-only mode:** Hear instrument name and discovery description; press 1/2/3 to match. **Switch control:** Auto-scan instruments, press to select, auto-scan targets, press to confirm. |
| **Complexity** | 2 (three pairs, distinct instruments) |
| **Reward (Memory Fragment)** | **Spirit's Silica Shard** — A glowing fragment showing a silica deposit at Home Plate. Caption: "Spirit found silica — proof of hot water underground. Mini-TES saw it from 20 meters away." |
| **Evidence It Teaches** | Child must associate Mini-TES → silica (remote mineral ID), MB Spectrometer → goethite (iron mineral ID), APXS → carbonates (chemistry). Each pair maps to a VERIFIED scientific result. Simulation label: "This is a simplified matching game. Spirit's real science took months of careful measurement." |

---

## 2. Opportunity (MER-B) — `opportunity-mer-b`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | Opportunity's Blueberry Hunt |
| **Dossier** | `opportunity-mer-b` |
| **Source-Backed Facts** | • Discovered hematite "blueberries" at Eagle Crater — conclusive evidence of past liquid water (SRC-OPP-001)<br>• Found sedimentary rock layers at Endurance Crater showing ancient aqueous deposition (SRC-OPP-001)<br>• Identified gypsum veins (Homestake) at Endeavour Crater rim — formed by water flowing through fractures (SRC-OPP-001)<br>• Detected clay minerals (smectite) at Matijevic Hill — neutral-pH water environment (SRC-OPP-001)<br>• Traveled 45.16 km — longest off-Earth roving distance at mission end (SRC-OPP-001) |
| **Learning Objective** | Recognize that hematite "blueberries" are round minerals that form in liquid water — key evidence Mars once had water. |
| **Player Instruction** | "Opportunity found round 'blueberries' in the rocks. Tap the tool that figured out what they're made of." |
| **Controls** | **Keyboard:** Tab to each tool icon, Enter to select. **Touch:** Tap tool icon. **Screen Reader:** "Tool 1: Microscopic Imager — takes close-up photos. Tool 2: APXS — measures chemical elements. Tool 3: Mössbauer Spectrometer — identifies iron minerals." |
| **Success Condition** | Select Mössbauer Spectrometer (MB) as the tool that identified hematite. |
| **Correct Feedback** | "Yes! The Mössbauer Spectrometer showed the blueberries are hematite — an iron mineral that forms in water. Opportunity also used its Microscopic Imager to photograph them up close. You found the water clue!" |
| **Incorrect Feedback** | "The Microscopic Imager took amazing photos, but the Mössbauer Spectrometer told us they're hematite. APXS checks chemistry too. Want to try the iron-mineral detector?" |
| **Retry Behavior** | Immediate retry. After 2 incorrect, the correct tool pulses gently. No penalty. |
| **Accessibility Alternative** | **Audio description:** "Three tools. One finds iron minerals. Which one?" **High contrast:** Tool icons outlined, labels enlarged. **Switch:** Auto-scan tools with audio, press to choose. |
| **Complexity** | 1 (single choice, one key concept) |
| **Reward (Memory Fragment)** | **Opportunity's Hematite Blueberry** — A tiny round fragment sparkling gray. Caption: "Tiny hematite spheres — 'blueberries' — proof Mars had liquid water. Mössbauer Spectrometer solved the mystery." |
| **Evidence It Teaches** | Child learns MB Spectrometer = iron mineral identification → hematite → forms in water. Directly supported by SRC-OPP-001. Simulation label: "Real identification took many sols of careful scanning. This game simplifies the process." |

---

## 3. Sojourner (Mars Pathfinder) — `sojourner-mpf`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | Build Sojourner: First Wheels on Mars |
| **Dossier** | `sojourner-mpf` |
| **Source-Backed Facts** | • First wheeled vehicle to operate on Mars (SRC-SOJ-001)<br>• Analyzed 16 rocks/soil targets with APXS (e.g., 'Barnacle Bill', 'Yogi', 'Scooby-Doo') (SRC-SOJ-001)<br>• Instruments: APXS, 2 front B&W cameras, 1 rear color camera, laser stripe hazard detection, wheel abrasion experiment (SRC-SOJ-001)<br>• Demonstrated autonomous hazard avoidance and waypoint navigation (SRC-SOJ-001)<br>• Operated 83 sols (planned 7 sols primary; 12× mission extension) (SRC-SOJ-001) |
| **Learning Objective** | Name the 5 key parts of Sojourner and what each does: solar panel (power), front cameras (see hazards), rear camera (see behind), APXS arm (touch rocks), wheels (move). |
| **Player Instruction** | "Sojourner was the first Mars rover. Drag each part to build it. Tap a part to hear its job." |
| **Controls** | **Keyboard:** Tab to part in palette, Enter to pick up, Tab to chassis slot, Enter to place. **Touch:** Drag part to outline on chassis. **Screen Reader:** "Part: Solar panel. Job: Makes electricity from sunlight." |
| **Success Condition** | All 5 parts placed in correct slots. |
| **Correct Feedback** | "Sojourner is complete! Solar panel → power. Front cameras → spot rocks ahead. Rear camera → see behind. APXS arm → touch rocks to learn what they're made of. Six wheels → drive on Mars. You built the first Mars rover!" |
| **Incorrect Feedback** | "Almost! The APXS arm goes on the front to reach rocks. The solar panel goes on top for sunlight. Want to try that part again?" |
| **Retry Behavior** | Misplaced part returns to palette. Slot highlights after 2 misses. Unlimited tries. |
| **Accessibility Alternative** | **Audio build mode:** Hear part name and job; press key to place on next empty slot. **One-switch:** Auto-scan parts, press to place. **High contrast:** Thick outlines, large hit zones. |
| **Complexity** | 1 (5 parts, direct part→function mapping) |
| **Reward (Memory Fragment)** | **Sojourner's First Wheel Track** — A tiny imprint in red dust. Caption: "First wheels on Mars. 83 sols. 16 rocks analyzed. Proved small rovers can explore big planets." |
| **Evidence It Teaches** | Each part maps to a VERIFIED instrument or subsystem from SRC-SOJ-001. Child learns form→function. Simulation label: "Building game. Real Sojourner was assembled on Earth, not Mars." |

---

## 4. Ingenuity — `ingenuity-mh`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | Ingenuity's Flight Path |
| **Dossier** | `ingenuity-mh` |
| **Source-Backed Facts** | • First powered, controlled flight on another planet (Flight 1: 2021-04-19, 39.1 sec, 3 m altitude) (SRC-ING-001)<br>• Completed 72 flights over 1,000+ sols (planned: 5 flights in 30 sols) (SRC-ING-001)<br>• Total flight time: >2 hours (128.8 minutes); total distance: ~17 km (SRC-ING-001)<br>• Maximum altitude: 24 m (Flight 61); max groundspeed: 10 m/s (Flight 62) (SRC-ING-001)<br>• Instruments: Navigation camera (downward), color camera, IMU, laser altimeter, inclinometer (SRC-ING-001)<br>• Served as aerial scout for Perseverance rover route planning (SRC-ING-001) |
| **Learning Objective** | Understand that Ingenuity's navigation camera looks DOWN to track ground features and stay steady in thin Martian air. |
| **Player Instruction** | "Ingenuity flies by watching the ground. Tap the arrows to guide it over 3 checkpoints. Keep it steady!" |
| **Controls** | **Keyboard:** Arrow keys (← → ↑ ↓) to nudge helicopter sprite. **Touch:** On-screen arrow buttons. **Screen Reader:** "Checkpoint 1 reached. Altitude 3 meters. Checkpoint 2: fly forward." |
| **Success Condition** | Guide sprite through 3 checkpoint gates in order without leaving the flight corridor. |
| **Correct Feedback** | "Smooth flying! Ingenuity's downward camera watches the ground 30 times per second to stay steady. That's how it flew 72 times — even in thin Mars air. You navigated like a Mars pilot!" |
| **Incorrect Feedback** | "Oops — off course. Ingenuity's camera watches the ground to correct its path. Try a smaller nudge. You've got this!" |
| **Retry Behavior** | Respawn at last checkpoint. Unlimited. Corridor widens slightly after 3 attempts. |
| **Accessibility Alternative** | **Auto-pilot mode:** Press space to advance to next checkpoint automatically (learning objective met via narration). **Reduced motion:** Sprite moves in discrete hops, no smooth animation. **High contrast:** Thick corridor lines, large checkpoint gates. |
| **Complexity** | 2 (spatial navigation, but only 3 waypoints) |
| **Reward (Memory Fragment)** | **Ingenuity's Rotor Blade** — A thin, curved fragment spinning slowly. Caption: "First flight on another world. 72 flights. Downward camera + fast brain = steady flight in 1% Earth air." |
| **Evidence It Teaches** | Gameplay demonstrates "camera watches ground → stability" loop. Narration states the 30 Hz fact from SRC-ING-001. Simulation label: "Simplified flight. Real Ingenuity flies autonomously; this game lets you steer." |

---

## 5. Surveyor 3 — `surveyor-3`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | Surveyor 3's Soil Sampler |
| **Dossier** | `surveyor-3` |
| **Source-Backed Facts** | • Surface sampler (12 cm × 5 cm scoop on 1.5 m pantograph arm) operated 18 hr 22 min, dug trenches up to 18 cm deep (SRC-SUR3-001)<br>• Measured lunar soil bearing strength, cohesion, and density (SRC-SUR3-001)<br>• Returned 6,326 television pictures (SRC-SUR3-001)<br>• Verified Apollo landing site suitability in Oceanus Procellarum (SRC-SUR3-001)<br>• Parts retrieved by Apollo 12 (1969) — camera on display at Smithsonian (SRC-SUR3-001) |
| **Learning Objective** | Learn that the surface sampler arm dug trenches to measure how strong lunar soil is — proving it could support Apollo landers. |
| **Player Instruction** | "Surveyor 3 dug trenches to test Moon soil. Drag the arm to dig 3 times. Watch the depth meter." |
| **Controls** | **Keyboard:** Tab to "Dig" button, Enter to activate. **Touch:** Tap "Dig" button. **Screen Reader:** "Dig 1: Trench 6 cm deep. Soil holds firm. Dig 2: 12 cm. Dig 3: 18 cm. Bearing strength confirmed." |
| **Success Condition** | Complete 3 dig cycles; depth meter reaches 18 cm. |
| **Correct Feedback** | "Perfect! The sampler arm dug 18 cm deep. The soil held firm — strong enough for Apollo landers. Surveyor 3 sent 6,326 pictures back to Earth. Apollo 12 astronauts later visited and brought the camera home!" |
| **Incorrect Feedback** | "Keep digging — the arm can go deeper. Each dig measures the soil. Try again?" |
| **Retry Behavior** | Dig button stays active. No failure state — just continues until 18 cm. |
| **Accessibility Alternative** | **Auto-dig:** Press space once to run all 3 digs with narration. **Switch:** Single press triggers next dig. **High contrast:** Large button, bold depth numbers. |
| **Complexity** | 1 (single repeated action, clear cause→effect) |
| **Reward (Memory Fragment)** | **Surveyor 3's Scoop Tip** — A small metal fragment with lunar dust. Caption: "Dug 18 cm into Moon soil. Proved the ground could hold Apollo landers. Apollo 12 brought the camera home." |
| **Evidence It Teaches** | Directly maps to SRC-SUR3-001: sampler arm specs, 18 cm depth, bearing strength measurement, Apollo site verification. Simulation label: "Simplified digging. Real arm moved slowly; operators on Earth guided each motion." |

---

## 6. Apollo 15 LRV (LRV-1) — `apollo15-lrv-1`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | LRV-1: The First Moon Car |
| **Dossier** | `apollo15-lrv-1` |
| **Source-Backed Facts** | • First LRV deployed on Moon (LRV-1) (SRC-A15-001)<br>• Traversed 27.8 km in 3 hr 2 min driving time over 3 EVAs (SRC-A15-001)<br>• Longest single traverse: 12.5 km (EVA 2, to Spur Crater) (SRC-A15-001)<br>• Collected 77.31 kg samples including 'Genesis Rock' (anorthosite) at Spur Crater (SRC-A15-001)<br>• Explored Hadley Rille, Apennine Front, mare basalt plains (SRC-A15-001)<br>• Navigation: directional gyro + odometer + Sun-shadow device (SRC-A15-001) |
| **Learning Objective** | Understand that the LRV let astronauts drive farther and carry more rocks — including the ancient "Genesis Rock." |
| **Player Instruction** | "Drive the LRV to 3 rock sites. Tap arrows to go. Pick up each rock. See how far you drove!" |
| **Controls** | **Keyboard:** Arrow keys to move LRV sprite on simple 2D map. **Touch:** On-screen arrows. **Screen Reader:** "Site 1: Elbow Crater. 3 km. Rock collected. Site 2: Spur Crater. 12 km. Genesis Rock found!" |
| **Success Condition** | Visit all 3 sites in order; distance counter shows total km. |
| **Correct Feedback** | "You drove 27.8 km — just like Apollo 15! The LRV carried astronauts to Hadley Rille and the Genesis Rock, a piece of the Moon's original crust. Without the rover, they'd only walk a few hundred meters." |
| **Incorrect Feedback** | "Keep exploring — Spur Crater is ahead. The Genesis Rock is waiting. You can do it!" |
| **Retry Behavior** | No failure. Sprite cannot leave map. Auto-advance to next site if stuck >30 sec. |
| **Accessibility Alternative** | **Auto-drive:** Press space to advance to each site with narration. **Reduced motion:** Discrete jumps between sites. **High contrast:** Thick route line, large site markers. |
| **Complexity** | 2 (sequential navigation, distance accumulation) |
| **Reward (Memory Fragment)** | **Genesis Rock Shard** — A white crystalline fragment glowing faintly. Caption: "Anorthosite — 'Genesis Rock' — 4.1 billion years old. LRV-1 carried astronauts to find it at Spur Crater." |
| **Evidence It Teaches** | Distance (27.8 km) and Genesis Rock at Spur Crater from SRC-A15-001. Navigation method (gyro + odometer + Sun-shadow) mentioned in narration. Simulation label: "Simplified drive. Real LRV had steering wheel, hand controller, and TV camera beaming to Earth." |

---

## 7. Apollo 16 LRV (LRV-2) — `apollo16-lrv-2`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | LRV-2: Highlands Explorer |
| **Dossier** | `apollo16-lrv-2` |
| **Source-Backed Facts** | • Second LRV deployed on Moon (LRV-2) (SRC-A16-001)<br>• Traversed 26.7 km in 3 hr 26 min over 3 EVAs (SRC-A16-001)<br>• Longest traverse: 11.6 km (EVA 2, to Stone Mountain / Cinco Craters) (SRC-A16-001)<br>• Collected 95.71 kg samples from 11 sites (SRC-A16-001)<br>• Explored Descartes Highlands (Cayley and Descartes formations), North Ray Crater (SRC-A16-001)<br>• Carried portable surface magnetometer (SRC-A16-001) |
| **Learning Objective** | Compare: Apollo 16 LRV went to the HIGHLANDS (mountains), not flat plains — different rocks, same rover design. |
| **Player Instruction** | "Apollo 16 drove to the mountains. Match each rock type to where the LRV found it." |
| **Controls** | **Keyboard:** Tab to rock card, Enter to pick up, Tab to site slot, Enter to drop. **Touch:** Drag rock card to site. **Screen Reader:** "Rock: Breccia. Site: North Ray Crater — impact-shattered rock." |
| **Success Condition** | Match 3 rock types to 3 sites correctly. |
| **Correct Feedback** | "Nailed it! Breccia at North Ray Crater — shattered by impact. Anorthosite at Stone Mountain — ancient crust. Basalt at Cayley Plains — lava flows. Same LRV design, totally different geology!" |
| **Incorrect Feedback** | "Close! Breccia is impact-shattered — look for the crater site. Anorthosite is old crust — check the mountain. Want to swap one?" |
| **Retry Behavior** | Cards reset. Site highlights after 2 misses. Unlimited. |
| **Accessibility Alternative** | **Audio match:** Hear rock description, press 1/2/3 for site. **Switch:** Auto-scan rocks, press to select, auto-scan sites, press to place. |
| **Complexity** | 2 (3 pairs, geological reasoning) |
| **Reward (Memory Fragment)** | **Descartes Breccia Chip** — A jagged fragment with mixed colors. Caption: "Impact breccia from North Ray Crater. LRV-2 explored mountains — not plains — and found shattered rock history." |
| **Evidence It Teaches** | Rock types and sites from SRC-A16-001. Emphasizes same LRV design (SRC-A16-002) but different destination. Simulation label: "Matching game. Real astronauts described rocks by voice; geologists on Earth guided sampling." |

---

## 8. Apollo 17 LRV (LRV-3) — `apollo17-lrv-3`

| Field | Specification |
|-------|---------------|
| **Challenge Name** | LRV-3: The Longest Moon Drive |
| **Dossier** | `apollo17-lrv-3` |
| **Source-Backed Facts** | • Third and final LRV deployed on Moon (LRV-3) (SRC-A17-001)<br>• Traversed 35.9 km in 4 hr 26 min over 3 EVAs — longest LRV traverse (SRC-A17-001)<br>• Longest single traverse: 20.1 km (EVA 2, to South Massif / Nansen Crater) (SRC-A17-001)<br>• Maximum range from LM: 7.6 km — farthest any human has driven from a spacecraft on another world (SRC-A17-001)<br>• Collected 110.52 kg samples — largest Apollo sample return (SRC-A17-001)<br>• Discovered orange soil (volcanic glass beads) at Shorty Crater (SRC-A17-001)<br>• Carried traverse gravimeter + seismic profiling packages (SRC-A17-001) |
| **Learning Objective** | Grasp the SCALE: Apollo 17 drove 35.9 km total, up to 7.6 km from the lander — farther than any human has driven from their ship on another world. |
| **Player Instruction** | "Drag the mission markers to the number line. How far did each LRV drive? Apollo 17 went farthest!" |
| **Controls** | **Keyboard:** Tab to marker, Enter to pick up, ←/→ to slide on number line, Enter to place. **Touch:** Drag marker along line. **Screen Reader:** "Marker: Apollo 15. Place at 28 km. Marker: Apollo 16. Place at 27 km. Marker: Apollo 17. Place at 36 km." |
| **Success Condition** | All 3 markers placed within ±3 km of correct values (28, 27, 36). |
| **Correct Feedback** | "Exactly! Apollo 15: 27.8 km. Apollo 16: 26.7 km. Apollo 17: 35.9 km — the longest drive ever on another world. They went 7.6 km from the lander and found orange soil — volcanic glass beads!" |
| **Incorrect Feedback** | "Close! Apollo 17 went past 35 km. Apollo 15 and 16 are near 27 km. Slide the markers and watch the numbers." |
| **Retry Behavior** | Markers snap to nearest 5 km tick on second try. Unlimited. |
| **Accessibility Alternative** | **Audio number line:** Hear "Apollo 15 at 28 km" — press to confirm or adjust. **Switch:** Auto-scan positions, press to lock. **High contrast:** Thick line, large ticks, bold numbers. |
| **Complexity** | 2 (magnitude comparison, number line) |
| **Reward (Memory Fragment)** | **Orange Soil Vial** — A tiny vial with orange glittering beads. Caption: "Orange soil at Shorty Crater — volcanic glass beads from a fire fountain 3.6 billion years ago. LRV-3 drove farthest to find it." |
| **Evidence It Teaches** | Directly uses traverse distances from SRC-A15-001, SRC-A16-001, SRC-A17-001. Orange soil discovery from SRC-A17-001. Simulation label: "Number line game. Real distances measured by LRV odometer and orbital imagery." |

---

## Cross-Cutting Accessibility Notes

- **Reduced Motion:** All animations CSS `prefers-reduced-motion: reduce` → instant transitions, no parallax.
- **High Contrast:** `prefers-contrast: more` → 4.5:1 minimum, 7:1 for text, thick focus rings (3px).
- **Keyboard:** All interactive elements reachable via Tab, operable via Enter/Space/Arrows. Visible focus always.
- **Touch Targets:** Minimum 44×44 px; 56×56 px preferred for primary actions.
- **Screen Readers:** ARIA labels on all controls; live regions for feedback; heading hierarchy (h1→h2→h3).
- **Language:** Plain English, short sentences. Technical terms defined inline (e.g., "Mössbauer Spectrometer — iron mineral detector").
- **Return to Station:** Persistent "Memory Station" button (top-left, keyboard accessible, aria-label="Return to Memory Station").

---

## Simulation Labeling Rule

Every challenge screen includes a subtle banner: **"Simulation — simplified for learning. Real mission data from NASA sources."** Links to `NASA_SOURCES.md` source IDs for that dossier.