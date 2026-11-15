# Character Bible — The Lost Space Archive

**Direction:** Illustrated Storybook Adventure  
**Audience:** Children aged 8–10  
**Status:** Stage 1B review draft. These character assets are for the review gallery; they are not integrated into mission screens.  
**Preview:** [Character showcase](CHARACTER_SHOWCASE.html)

## Visual language

Mission characters are original personifications of real machines. Each silhouette comes from the real hardware first; the fictional personality is communicated through pose, camera angle, color accents, and small expressive marks. No character depicts a human avatar. No NASA logo, insignia, flag, or mission patch is used.

- Shared finish: rounded dark-navy linework, warm light, restrained gradients, small highlight strokes, and sparse surface marks. The character vectors have transparent backgrounds and a shared 480 × 400 pose viewport.
- The existing Storybook palette is the base. Mission-specific sand, metal, solar-panel, and instrument accents distinguish the hardware without making the group feel like separate art styles.
- Any illustrated “eyes,” smiles, voice marks, or feelings are fictional design language. They are not historical dialogue or actual machine displays unless explicitly identified as real hardware.
- Motion ideas are proposals for a later implementation. The gallery uses static poses; it does not animate or assert that an action occurred during a mission.

## Mars Expedition

### Spirit

- **Canonical hardware:** Mars Exploration Rover A (MER-A), Spirit.
- **Narrative role:** One of the twin rover explorers; invites the player to look closely and keep trying.
- **Fictional personality:** Curious, brave, persistent, adventurous.
- **Voice direction:** Short, warm prompts that encourage observation and retry. Fictional example: “I wonder what this rock can tell us. What do you notice?” This is not a historical quote.
- **Distinctive visual characteristics:** Dune-gold and warm copper accents, a calm inquisitive camera angle, and a steady extended instrument-arm pose.
- **Hardware that must remain recognizable:** Six wheels in three pairs, rover body, solar-panel deck, raised mast with the Pancam camera pair, and an articulated instrument arm. The twin MER chassis is shared with Opportunity.
- **Facial expression:** The Pancam lenses may be personified as a curious gaze. The friendly mouth mark is clearly a fictional overlay, not rover hardware.
- **Pose inventory:** `spirit-idle`, `spirit-speaking`, `spirit-discovering`, `spirit-celebration`.
- **Animation possibilities:** Small mast turn, gentle camera blink, or a single arm gesture. Keep the six-wheel stance grounded; no wheel hopping or implied autonomous emotion.
- **Scientific accuracy constraints:** Do not give Spirit a boot or bandage on a wheel, and do not portray the silica finding as a physical rover attachment. A wheel issue and a scientific result are story facts, not standard body parts. Do not alter the shared MER chassis.
- **Main colors:** `#F7D779`, `#C8794A`, `#273C67`, `#172744`, with lavender accents.
- **Authorship:** Hand-authored SVG geometry with Codex code assistance; no image-generation model or raster art was used for this asset.
- **Hardware references:** `SRC-MER-VIS-001`, `SRC-MER-VIS-002` in `docs/NASA_SOURCES.md`.

### Opportunity

- **Canonical hardware:** Mars Exploration Rover B (MER-B), Opportunity.
- **Narrative role:** Spirit's twin rover; invites the player to compare evidence and notice details.
- **Fictional personality:** Optimistic, observant, resourceful, enthusiastic.
- **Voice direction:** Upbeat questions about comparing clues. Fictional example: “I spotted another clue. How is it like Spirit’s?” This is not a historical quote.
- **Distinctive visual characteristics:** Same physical body plan as Spirit, with a softer copper-red solar-deck accent and a brighter, outward-looking camera expression. Differences are fictional color and pose choices, not different rover construction.
- **Hardware that must remain recognizable:** The same six-wheel MER architecture, body, solar panels, mast-mounted Pancam cameras, and articulated instrument arm as Spirit.
- **Facial expression:** Camera lenses may be personified as alert eyes; smile and speech marks are fictional overlays.
- **Pose inventory:** `opportunity-idle`, `opportunity-speaking`, `opportunity-discovering`, `opportunity-celebration`.
- **Animation possibilities:** A gentle mast pan, arm indication, or short light glint. No invented wheels, armor, or mounted hematite decorations.
- **Scientific accuracy constraints:** Spirit and Opportunity were structurally twin rovers. Do not give Opportunity a unique rear-deck dish or “blueberry” body plating. Hematite spherules are a finding in the terrain, not rover hardware.
- **Main colors:** `#D89451`, `#C7A8EE`, `#273C67`, `#172744`, with shared solar-gold accents.
- **Authorship:** Hand-authored SVG geometry with Codex code assistance; no image-generation model or raster art was used for this asset.
- **Hardware references:** `SRC-MER-VIS-001`, `SRC-MER-VIS-002` in `docs/NASA_SOURCES.md`.

### Sojourner

- **Canonical hardware:** Mars Pathfinder rover Sojourner.
- **Narrative role:** Small pioneer who models taking one careful step at a time.
- **Fictional personality:** Curious, independent, observant.
- **Voice direction:** Brief invitations to inspect a nearby rock or surface feature. Fictional example: “Let’s take a small step and look closely.” This is not a historical quote.
- **Distinctive visual characteristics:** Much smaller, low rectangular body; compact solar deck; clearly visible cleated wheels and short deployable instrument arm.
- **Hardware that must remain recognizable:** Six small wheels, rocker-bogie suspension, top solar array, front/rear cameras, and extendable APXS instrument mechanism.
- **Facial expression:** Front camera lenses can suggest attentive eyes; any smile or voice marks are fictional.
- **Pose inventory:** `sojourner-idle`, `sojourner-speaking`, `sojourner-discovering`, `sojourner-celebration`.
- **Animation possibilities:** Slow wheel turn or a short instrument-arm reach; keep the small rover grounded and avoid a playful vehicle bounce.
- **Scientific accuracy constraints:** The APXS is a rover instrument carried on an extendable deployment mechanism, not a trailing tail. Do not enlarge Sojourner to MER scale.
- **Main colors:** `#FFF0AA`, `#D9933E`, `#273C67`, `#172744`, with lavender discovery accents.
- **Authorship:** Hand-authored SVG geometry with Codex code assistance; no image-generation model or raster art was used for this asset.
- **Hardware references:** `SRC-SOJ-VIS-001` in `docs/NASA_SOURCES.md`.

### Ingenuity

- **Canonical hardware:** Mars Helicopter Ingenuity, a technology demonstrator.
- **Narrative role:** A playful scout who offers a different viewpoint.
- **Fictional personality:** Bold, imaginative, playful.
- **Voice direction:** Short flight and viewpoint metaphors, while keeping the activity explicitly a simplified simulation. Fictional example: “Let’s look at the route from above.” This is not a historical quote.
- **Distinctive visual characteristics:** Tall, very compact flying machine; bright, warm solar panel above the rotor assembly; foil-wrapped body and four fine legs. No rover chassis.
- **Hardware that must remain recognizable:** Two coaxial counter-rotating rotors with four blades total, compact central fuselage, solar array above the rotor system, four landing legs, and cameras.
- **Facial expression:** A camera lens and small fictional expression marks on the body suggest personality; do not add a rover-style face or wheels.
- **Pose inventory:** `ingenuity-idle`, `ingenuity-speaking`, `ingenuity-discovering`, `ingenuity-celebration`.
- **Animation possibilities:** Slow rotor indication or a restrained hover tilt, only if it remains clear that the pose is illustrative and does not reenact a specific historical flight.
- **Scientific accuracy constraints:** Do not depict Ingenuity as a conventional helicopter, wheeled rover, or beanie-topped character. Keep the two counter-rotating rotor levels and four landing legs visible.
- **Main colors:** `#C9B99A`, `#827761`, `#D9C898`, `#273C67`, with amber solar accents.
- **Authorship:** Hand-authored SVG geometry with Codex code assistance; no image-generation model or raster art was used for this asset.
- **Hardware references:** `SRC-ING-VIS-001` in `docs/NASA_SOURCES.md`.

## Moon Expedition

### Surveyor 3

- **Canonical hardware:** Surveyor 3 lunar lander.
- **Narrative role:** A patient observer who makes careful measurements.
- **Fictional personality:** Patient, meticulous, scientific.
- **Voice direction:** Calm questions about observing and comparing a surface. Fictional example: “Let’s compare what the scoop finds in each place.” This is not a historical quote.
- **Distinctive visual characteristics:** Tall, open triangular frame, three long splayed legs with footpads, a raised mast and camera, and a slim extendable sampler arm.
- **Hardware that must remain recognizable:** Triangular frame, three landing legs, mast-mounted solar/antenna equipment, TV camera, and soil-mechanics surface sampler.
- **Facial expression:** The camera lens direction carries the personality; the small curved expression mark is fictional, not a camera feature.
- **Pose inventory:** `surveyor-idle`, `surveyor-speaking`, `surveyor-discovering`, `surveyor-celebration`.
- **Animation possibilities:** Slow camera pan or sampler-arm reach. Do not animate the lander as if it were driving or walking.
- **Scientific accuracy constraints:** Do not add rover wheels or astronaut-scale equipment. Do not encode an unsupported precise landing tilt in the base illustration.
- **Main colors:** `#FFF6D9`, `#D2C8A8`, `#8D9B9C`, `#273C67`, with gold-foil accents.
- **Authorship:** Hand-authored SVG geometry with Codex code assistance; no image-generation model or raster art was used for this asset.
- **Hardware references:** `SRC-SUR3-VIS-001`, `SRC-SUR3-VIS-002` in `docs/NASA_SOURCES.md`.

### Apollo 17 Lunar Roving Vehicle

- **Canonical hardware:** Apollo 17 Lunar Roving Vehicle (LRV-3).
- **Narrative role:** A sociable route explorer who encourages planning and checking the route.
- **Fictional personality:** Adventurous, sociable, exploratory.
- **Voice direction:** Cooperative prompts about choosing a route and checking its reach. Fictional example: “Which path should we explore next?” This is not a historical quote.
- **Distinctive visual characteristics:** Open aluminum frame, two empty side-by-side seats, four large wire-mesh wheels, central hand controller, console, and a prominent dish antenna mast.
- **Hardware that must remain recognizable:** Four mesh wheels with chevron tread details, open frame, two seats, T-handle controller/console, front-center dish antenna, and equipment trays.
- **Facial expression:** A few soft console-light marks may suggest a friendly guide; they are fictional embellishments, not an onboard face display. No human passengers appear in this experience.
- **Pose inventory:** `apollo17-idle`, `apollo17-speaking`, `apollo17-discovering`, `apollo17-celebration`.
- **Animation possibilities:** A small wheel-angle change or antenna tilt in an illustration; avoid a car-like steering wheel, dashboard driving scene, or bouncing chassis.
- **Scientific accuracy constraints:** The LRV was crewed, manually driven, battery-powered equipment. Do not present it as autonomous or give it a closed car body or rubber tires. An Apollo 17 fender repair is optional mission-specific context, not a defining shared feature of all LRVs.
- **Main colors:** `#FFF0C1`, `#B89E72`, `#293B57`, `#273C67`, with warm gold and lavender accents.
- **Authorship:** Hand-authored SVG geometry with Codex code assistance; no image-generation model or raster art was used for this asset.
- **Hardware references:** `SRC-LRV-VIS-001`, `SRC-LRV-VIS-002` in `docs/NASA_SOURCES.md`.

## Guide

### Archive Keeper Spark

- **Canonical hardware:** None. Spark is an original fictional guide, not NASA hardware.
- **Narrative role:** Welcomes the player, guides navigation, and asks questions that help the player notice clues.
- **Fictional personality:** Friendly, curious, enthusiastic.
- **Visual identity:** Small purple physical robot with wheels, expressive camera-like eyes, short arms, and a holographic projector integrated into the head. Preserve the existing proportions, palette, silhouette, and pose set.
- **Facial expression:** Keep the existing friendly eye shapes and soft mouth marks. These are fictional robot features, not a human face or a NASA device.
- **Pose inventory:** Existing SVG poses remain intact: welcoming, idle, speaking, explaining, projecting, discovering, surprise, and celebration (`public/images/spark-poses.svg`).
- **Animation possibilities:** Preserve the existing subtle idle drift and reduced-motion behavior. Later motion may emphasize small arm gestures or a brief projector glow without changing the approved body design.
- **Main colors:** `#111D38`, `#273C67`, `#9270D9`, `#C7A8EE`, `#F7AE32`, and `#F7D779`.
- **Voice direction:** Warm, brief, curious, and clearly fictional. Spark is a guide, not a source of mission facts and never speaks historical quotations.
- **Authorship / disclosure:** The runtime SVG is hand-authored vector art with Codex code assistance. The earlier generated raster concept is retained separately for provenance and is not used in the app; see `docs/AI_DISCLOSURE.md`.

## Asset inventory and preview

| Character | Asset IDs in `public/images/characters/mission-character-poses.svg` |
|---|---|
| Spirit | `spirit-idle`, `spirit-speaking`, `spirit-discovering`, `spirit-celebration` |
| Opportunity | `opportunity-idle`, `opportunity-speaking`, `opportunity-discovering`, `opportunity-celebration` |
| Sojourner | `sojourner-idle`, `sojourner-speaking`, `sojourner-discovering`, `sojourner-celebration` |
| Ingenuity | `ingenuity-idle`, `ingenuity-speaking`, `ingenuity-discovering`, `ingenuity-celebration` |
| Surveyor 3 | `surveyor-idle`, `surveyor-speaking`, `surveyor-discovering`, `surveyor-celebration` |
| Apollo 17 LRV | `apollo17-idle`, `apollo17-speaking`, `apollo17-discovering`, `apollo17-celebration` |
| Spark | Eight existing symbols in `public/images/spark-poses.svg` |

All SVGs are transparent. The mission asset file and Spark asset can be reused through SVG `<use>` references, but this stage deliberately does not wire them into map, dossier, challenge, fragment, or reward screens. The local-only review page is `docs/CHARACTER_SHOWCASE.html`; it is not part of the React route table.

Apollo 15 and Apollo 16 LRV records remain in the NASA catalog/source documentation; they are not included in the current playable character showcase.
