# Character Visual Briefs — The Lost Space Archive

> **Legacy planning document — superseded for current character design.** Use [CHARACTER_BIBLE.md](CHARACTER_BIBLE.md) as the approved Stage 1B reference for the six mission characters and Archive Keeper Spark. Several early visual ideas below (including a Spirit wheel boot, an Opportunity dish/blueberry body, a Sojourner APXS tail, and a wheeled/hat-like Ingenuity concept) were rejected because they misstate hardware. Apollo 15 and Apollo 16 remain scientific catalog records, but they are outside the current playable character scope. Keep this file only as project history; do not use its superseded visual proposals to create assets.

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)  
**Audience:** Children aged 8–10  
**Scope:** Visual briefs, proportions, silhouettes, expression rules, hardware mapping, poses, and animation states for the 8 hardware characters + Archive Keeper.

---

## 1. Design Principles for Hardware Characters

1. **Child-Friendly Anthropomorphism:** Each hardware device is given an expressive, friendly face (large expressive eyes, gentle glowing visor/screen expressions) while retaining 100% accurate physical proportions of its wheels, solar panels, antennae, and instruments.
2. **Strict Hardware Fidelity:** Real instruments (e.g., Pancam masts on MER rovers, high-gain antennas on Apollo LRVs, rotor blades on Ingenuity, camera and scoop on Surveyor 3) are accurately represented as character features (backpacks, hats, handheld tools, sensors).
3. **Fictional vs. Historical Separation:** Fictional personality, dialogue, and smiling face visors are clearly separated from verifiable mission facts, landing dates, coordinates, and instruments documented in `docs/DATA_CATALOG.md`.

---

## 2. Character Registry

### 1. Archive Keeper (Spark)
- **Role:** Friendly fictional guide and host of the Memory Station; never presented as a NASA artifact.
- **Silhouette:** Small physical robot with a compact wheeled base, rounded lavender body, expressive eyes, short arms, and a projector integrated into its head. No human avatar or floating halo.
- **Color Palette:** Deep space navy (`#111D38`), archive blue (`#273C67`), purple (`#9270D9`), lavender (`#C7A8EE`), golden orange (`#F7AE32`), and warm yellow (`#F7D779`).
- **Runtime vector asset:** `public/images/spark-poses.svg` contains eight transparent symbols: welcoming, idle, speaking, explaining, projecting, discovering, surprise, and celebration. `SparkIllustration` selects each pose through a typed React prop. All poses share one body, wheel pair, integrated projector, facial plate, and line weight.
- **Implemented Stage 1 poses:** Welcome uses welcoming; Memory Station uses projecting. The idle vector has a subtle vertical drift, disabled by the app's reduced-motion setting and the OS preference. The authored SVG is not AI-generated and does not carry an AI-art badge.
- **Legacy concept:** `public/images/spark-expression-sheet.png` is generated concept art retained for provenance/review only. It is not displayed in the application. Its generation record is in `docs/AI_DISCLOSURE.md`; label it visibly if it is previewed or distributed later.
- **Story rule:** Spark's conversational lines are fictional, localized prompts. Scientific claims remain in separate dossier/activity source-backed content; Spark does not replace or speak the fact cards automatically.
- **Hardware Mapping:** Original fictional guide character, not based on a real spacecraft.

---

### 2. Spirit (MER-A)
- **Role:** Mars Rover character (Spirit).
- **Silhouette:** Robust six-wheeled rover with a prominent Pancam mast head and solar array "wings".
- **Proportions:** Low-slung chassis, wide wheel base, tall camera mast (head).
- **Color Palette:** Martian terracotta orange body (`#E85D04`), brass/gold solar panels (`#F5A623`), navy joints (`#0B1426`).
- **Real Hardware Details Mapped:**
  - *Pancam Mast:* Articulated neck with twin camera "eyes".
  - *Right Front Wheel:* Stalled wheel represented as wearing a small friendly "boot" or having a determined bandaged gear look (historically accurate to its 2006 wheel stall).
  - *RAT (Rock Abrasion Tool):* Tool arm on side, posed like a friendly mechanical hand.
- **Expression Rules & Poses:**
  - *Idle:* Gentle rocking motion, scanning horizon with Pancam mast.
  - *Talking:* Visor screen lights up with data blips.
  - *Explaining:* Points robotic arm toward rock samples.
  - *Celebrating:* Wheels lifted slightly in joyous bounce, solar wings flutter.
  - *Concerned:* Mast droops slightly, looking down at sand trap ("Troy").

---

### 3. Opportunity (MER-B)
- **Role:** Mars Rover character (Opportunity).
- **Silhouette:** Twin sister to Spirit, sleek chassis with circular high-gain antenna dish on rear deck and Pancam mast.
- **Proportions:** Identical physical chassis to Spirit, distinguished by color accents and facial expression styling.
- **Color Palette:** Dusty red-gold body (`#D97706`), deep titanium gray chassis (`#1E3A5F`), sky-blue optical visors (`#38BDF8`).
- **Real Hardware Details Mapped:**
  - *Mini-TES:* Spectrometer box on mast base.
  - *Microscopic Imager & APXS:* Mounted on robotic arm (deployment shoulder).
  - *Blueberries (Hematite spherules):* Patterned texture on base chassis armor.
- **Expression Rules & Poses:**
  - *Idle:* Cheerful steady gaze forward, gentle solar panel hum.
  - *Talking:* Expressive digital blink on main optical lens.
  - *Explaining:* Inspects a rock sample with magnifying glass arm.
  - *Celebrating:* Spins panoramic camera 360 degrees happily.
  - *Concerned:* Low-power warning indicator pulse near battery hatch.

---

### 4. Sojourner
- **Role:** Mars Microrover character (Pathfinder).
- **Silhouette:** Compact, low-profile six-wheeled rectangular chassis with rear solar panel deck.
- **Proportions:** Smallest rover, squat body, wide wheels with distinctive chevron cleats.
- **Color Palette:** Warm golden yellow body (`#F5A623`), dark slate grey wheels (`#14213D`), copper wiring accents (`#D97706`).
- **Real Hardware Details Mapped:**
  - *Chevron Wheels:* Distinctive track cleats rendered with friendly rounded tread pattern.
  - *Rear APXS sensor block:* Towed tail-sensor box trailing behind like a friendly puppy leash.
  - *Pathfinder Lander tether connector:* Front mounting bracket.
- **Expression Rules & Poses:**
  - *Idle:* Eager posture, bouncing slightly on active rocker-bogie suspension.
  - *Talking:* Quick cheerful chirps represented by floating musical/binary note icons.
  - *Explaining:* Measuring a rock ("Barnacle Bill") with rear APXS tail sensor.
  - *Celebrating:* Zooming in a short playful circle around Sagan Memorial Station.
  - *Concerned:* Paused, looking back toward lander horizon.

---

### 5. Ingenuity
- **Role:** Mars Helicopter character.
- **Silhouette:** Tiny cube fuselage with dual counter-rotating carbon-fiber rotor blades on top and slender landing legs.
- **Proportions:** Smallest of all, tall propeller mast, compact body.
- **Color Palette:** Carbon black fuselage (`#0B1426`), golden solar panel top (`#F5A623`), white landing legs (`#F1F5F9`), glowing teal indicator light (`#06B6D4`).
- **Real Hardware Details Mapped:**
  - *Counter-Rotating Blades:* Twin 1.2m rotor blades rendered as friendly spinning propeller beanie hat.
  - *Solar Panel:* Top-mounted photovoltaic cells charging station.
  - *Downward Camera:* Eye-lens on belly.
- **Expression Rules & Poses:**
  - *Idle:* Hovering gently in place with smooth vertical bobbing motion.
  - *Talking:* Rotor blades humming in rhythmic musical pitches.
  - *Explaining:* Tilting forward to scout a route map from above.
  - *Celebrating:* Performing a joyful aerial loop-de-loop.
  - *Concerned:* Settling gently onto landing legs with dimmed rotor glow (reflecting final flight status).

---

### 6. Surveyor 3
- **Role:** Lunar Lander character.
- **Silhouette:** Tripod landing legs with central cylindrical housing and long extendable robotic scoop arm.
- **Proportions:** Tall central body supported by three wide-splayed tubular landing legs with footpads.
- **Color Palette:** Polished metallic silver-grey (`#94A3B8`), gold-foil thermal blanket patches (`#F5A623`), black TV camera housing (`#0B1426`).
- **Real Hardware Details Mapped:**
  - *Survey TV Camera:* Articulated optical head with extended sun glare hood (worn like a little sun visor cap).
  - *Surface Sampler Scoop:* 1.5m pantograph arm with 12x5cm scoop, posed like a helpful mechanical shovel hand.
  - *Crater Sloped Stance:* Always posed at a gentle 14-degree tilt on a regolith mound (historically accurate to its landing on a crater slope).
- **Expression Rules & Poses:**
  - *Idle:* Calmly panning television camera from side to side.
  - *Talking:* Camera lens blinking pleasantly.
  - *Explaining:* Scooping lunar regolith to demonstrate soil mechanics.
  - *Celebrating:* Raising scoop arm triumphantly in the air.
  - *Concerned:* Looking across at the nearby Apollo 12 lunar module landing site.

---

### 7. Apollo 15 Lunar Roving Vehicle (LRV-1)
- **Role:** Lunar Roving Vehicle character (Apollo 15).
- **Silhouette:** Open-frame tubular chassis with two astronaut seats, high-gain umbrella antenna on front, wire-mesh wheels.
- **Proportions:** Long, low four-wheeled buggy with high steering console and prominent front antenna dish.
- **Color Palette:** Titanium silver frame (`#CBD5E1`), gold-orange dashboard panels (`#F5A623`), black mesh wheels (`#14213D`), red mission stripe (`#EF4444`).
- **Real Hardware Details Mapped:**
  - *Wire-Mesh Wheels:* Piano-wire woven treads rendered with neat circular spokes.
  - *High-Gain S-band Antenna:* Umbrella-like dish on front chassis.
  - *Control T-handle:* Central steering stick between empty seat positions.
- **Expression Rules & Poses:**
  - *Idle:* Parked with wheels angled proudly, antenna dish rotating slowly.
  - *Talking:* Dashboard instrument lights flashing in sequence.
  - *Explaining:* Projecting a holographic map of Hadley Rille from its console.
  - *Celebrating:* Bouncing lightly on its titanium suspension springs.
  - *Concerned:* Battery level meter glowing soft amber.

---

### 8. Apollo 16 Lunar Roving Vehicle (LRV-2)
- **Role:** Lunar Roving Vehicle character (Apollo 16).
- **Silhouette:** Identical chassis structure to LRV-1, distinguished by blue mission stripe and Descartes Highlands tool rack.
- **Proportions:** Long four-wheeled buggy with geological sample carrier mounted on front.
- **Color Palette:** Titanium silver frame (`#CBD5E1`), golden dashboard (`#F5A623`), blue mission accent stripe (`#3B82F6`).
- **Real Hardware Details Mapped:**
  - *Geological Tool Rack:* Front-mounted tongs, hammers, and sample bag racks.
  - *Foresight Navigation Camera:* Mounted on rear mast.
- **Expression Rules & Poses:**
  - *Idle:* Patiently waiting near Descartes Highlands landing marker.
  - *Talking:* Beeping cheerfully as sample collection inventory updates.
  - *Explaining:* Opening sample carrier to display lunar anorthosite rocks.
  - *Celebrating:* Spinning front wheels in place with playful dust puffs.
  - *Concerned:* Checking navigation gyro heading indicator.

---

### 9. Apollo 17 Lunar Roving Vehicle (LRV-3)
- **Role:** Lunar Roving Vehicle character (Apollo 17 — final Moon rover).
- **Silhouette:** Identical chassis structure to LRV-1/2, distinguished by orange mission stripe and Traverse Gravimeter experiment package.
- **Proportions:** Long four-wheeled buggy with orange mission badge and orange soil sample containers.
- **Color Palette:** Titanium silver frame (`#CBD5E1`), golden dashboard (`#F5A623`), orange mission stripe (`#E85D04`).
- **Real Hardware Details Mapped:**
  - *Traverse Gravimeter Experiment (TGE):* Box mounted on floor pan.
  - *Fender Extension:* Improvised map-and-tape rear fender patch (historically accurate to Harrison Schmitt / Eugene Cernan's famous duct-tape fender repair during EVA 2).
- **Expression Rules & Poses:**
  - *Idle:* Proud posture, orange fender patch visible, scanning Taurus-Littrow valley.
  - *Talking:* Displaying record-breaking distance odometer numbers on digital dash.
  - *Explaining:* Pointing toward Shorty Crater orange soil sample vials.
  - *Celebrating:* Flashing all dashboard lights in a brilliant holiday display.
  - *Concerned:* Soft amber glow on final mission odometer milestone.

---

## 3. Animation & Transition Specifications

- **Idle Breathing:** All characters feature a subtle vertical translation (`translateY(0px)` to `translateY(-4px)` over 2 seconds, ease-in-out) and slight scale pulse (`scale(1)` to `scale(1.02)`).
- **Entrance Animation:** Spring scale-in (`scale(0.8)` to `scale(1.0)`, duration 400ms, cubic-bezier spring).
- **Exit Animation:** Quick fade out and shrink (`scale(1)` to `scale(0.9)`, opacity 1 to 0, duration 200ms).
- **Reduced Motion Behavior:** All bobbing and scaling disabled when `prefers-reduced-motion: reduce` is active. Characters remain statically positioned with zero translation or scaling loops.
