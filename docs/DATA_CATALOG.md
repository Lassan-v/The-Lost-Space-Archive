# NASA Hardware Data Catalogue — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)
**Challenge:** "Abandoned but Not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"
**Data Model:** nasa-source-of-truth skill (one record per physical device)
**Last Updated:** 2026-11-14
**Maintained by:** NASA Researcher & Data Curator

---

## Claim Labels

- **VERIFIED**: Directly supported by a reviewed authoritative source (NSSDCA or NASA primary page)
- **CORROBORATED**: Supported by multiple authoritative sources
- **UNCERTAIN**: Ambiguous, conflicting, or incomplete — preserved as-is
- **FICTIONAL**: Character voice, personality, dialogue, or story framing (NOT in this catalogue)
- **SIMPLIFIED**: Child-friendly explanation preserving scientific meaning (marked where used in game content)

---

## Hardware Records

### 1. Spirit (MER-A / Mars Exploration Rover-A)

```json
{
  "id": "spirit-mer-a",
  "canonicalName": "Spirit",
  "destination": "Mars",
  "objectType": "Mars rover",
  "mission": "Mars Exploration Rover (MER-A)",
  "launchDate": "2003-06-10T17:58:46.773Z",
  "landingDate": "2004-01-04T04:35:00Z",
  "deploymentDate": "2004-01-15T00:00:00Z",
  "objective": "Search for and characterize rocks and soils that hold clues to past water activity; determine distribution and composition of minerals, rocks, and soils; determine geologic processes that shaped local terrain; perform ground truth of orbital observations; search for iron-bearing minerals; characterize mineralogy and textures; search for geological clues to environmental conditions when liquid water was present and assess habitability.",
  "instruments": [
    "Pancam (Panoramic Camera)",
    "Navigation Cameras (Navcam)",
    "Mini-TES (Miniature Thermal Emission Spectrometer)",
    "APXS (Alpha Particle X-Ray Spectrometer)",
    "MB (Mössbauer Spectrometer)",
    "MI (Microscopic Imager)",
    "RAT (Rock Abrasion Tool)",
    "Magnet Array",
    "Hazard Avoidance Cameras (Hazcam) — 2 front, 2 rear"
  ],
  "scientificResults": [
    "Discovered evidence of past hydrothermal activity at Home Plate (silica-rich deposits)",
    "Found goethite, a mineral that forms in water, at Husband Hill",
    "Identified carbonate-rich rocks (Comanche outcrop) indicating neutral-pH water",
    "Documented dust devil activity and atmospheric dynamics",
    "Measured basaltic plains and impact ejecta in Gusev Crater",
    "Traveled 7.73 km over 6 years, 2 months"
  ],
  "operationalTimeline": [
    { "date": "2003-06-10", "event": "Launch from Cape Canaveral on Delta II 7925", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2004-01-04", "event": "Landing in Gusev Crater at 14.572°S, 175.478°E (IAU 2000)", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2004-01-15", "event": "Egress from lander onto Martian surface (Sol 12)", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2004-03-05", "event": "Completed 90-sol prime mission", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2005-08-21", "event": "Reached summit of Husband Hill (Sol 582)", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2006-03-13", "event": "Right front wheel stalled; drove backwards thereafter", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2009-04-23", "event": "Broke through crust into soft sand at 'Troy'; became immobile", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2010-03-22", "event": "Last communication received (Sol 2210)", "label": "VERIFIED", "source": "SRC-SPIRIT-001" },
    { "date": "2011-05-25", "event": "Mission officially declared ended by NASA after >1,300 recovery commands sent", "label": "VERIFIED", "source": "SRC-SPIRIT-001" }
  ],
  "missionEnd": "2011-05-25",
  "lastContact": "2010-03-22",
  "location": "Gusev Crater, Mars — 'Troy' sand trap near Home Plate",
  "coordinates": {
    "lat": -14.572,
    "lon": 175.478,
    "frame": "IAU 2000 body-centered",
    "note": "Approximate final resting position; lander coordinates from NSSDCA"
  },
  "uncertainties": [
    "Final rover position after 2010 not directly imaged; last known location at 'Troy' sand trap",
    "Exact sol of last contact varies slightly between sources (Sol 2210 vs 2208); NSSDCA states 22 March 2010"
  ],
  "sources": ["SRC-SPIRIT-001", "SRC-SPIRIT-002"],
  "imageCredits": "NASA/JPL (NSSDCA: http://nssdc.gsfc.nasa.gov/planetary/image/merb_pan03_med.jpg)"
}
```

---

### 2. Opportunity (MER-B / Mars Exploration Rover-B)

```json
{
  "id": "opportunity-mer-b",
  "canonicalName": "Opportunity",
  "destination": "Mars",
  "objectType": "Mars rover",
  "mission": "Mars Exploration Rover (MER-B)",
  "launchDate": "2003-07-08T03:18:15Z",
  "landingDate": "2004-01-25T04:54:22.7Z",
  "deploymentDate": "2004-01-31T00:00:00Z",
  "objective": "Search for and characterize rocks and soils that hold clues to past water activity; determine distribution and composition of minerals, rocks, and soils; determine geologic processes that shaped local terrain; perform ground truth of orbital observations; search for iron-bearing minerals; characterize mineralogy and textures; search for geological clues to environmental conditions when liquid water was present and assess habitability.",
  "instruments": [
    "Pancam (Panoramic Camera)",
    "Navigation Cameras (Navcam)",
    "Mini-TES (Miniature Thermal Emission Spectrometer)",
    "APXS (Alpha Particle X-Ray Spectrometer)",
    "MB (Mössbauer Spectrometer)",
    "MI (Microscopic Imager)",
    "RAT (Rock Abrasion Tool)",
    "Magnet Array",
    "Hazard Avoidance Cameras (Hazcam) — 2 front, 2 rear"
  ],
  "scientificResults": [
    "Discovered hematite 'blueberries' at Eagle Crater — conclusive evidence of past liquid water",
    "Found sedimentary rock layers at Endurance Crater showing ancient aqueous deposition",
    "Identified gypsum veins (Homestake) at Endeavour Crater rim — formed by water flowing through fractures",
    "Detected clay minerals (smectite) at Matijevic Hill — neutral-pH water environment",
    "Characterized Victoria Crater stratigraphy and Meridiani Planum sedimentary sequence",
    "Traveled 45.16 km (28.06 mi) — longest off-Earth roving distance at mission end",
    "Operated 5,352 sols (14+ years) — longest surface mission on Mars"
  ],
  "operationalTimeline": [
    { "date": "2003-07-08", "event": "Launch from Cape Canaveral on Delta II 7925H", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2004-01-25", "event": "Landing in Eagle Crater, Meridiani Planum at 1.946°S, 354.473°E (IAU 2000)", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2004-01-31", "event": "Egress from lander onto Martian surface (Sol 7)", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2004-04-26", "event": "Completed 90-sol prime mission", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2006-09-26", "event": "Arrived at Victoria Crater (Sol 951)", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2011-08-09", "event": "Arrived at Endeavour Crater (Sol 2681)", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2018-06-10", "event": "Last communication received (Sol 5111) during planet-encircling dust storm", "label": "VERIFIED", "source": "SRC-OPP-001" },
    { "date": "2019-02-13", "event": "Mission officially declared ended by NASA after >1,000 recovery commands sent", "label": "VERIFIED", "source": "SRC-OPP-001" }
  ],
  "missionEnd": "2019-02-13",
  "lastContact": "2018-06-10",
  "location": "Meridiani Planum, Mars — Perseverance Valley, western rim of Endeavour Crater",
  "coordinates": {
    "lat": -1.946,
    "lon": 354.473,
    "frame": "IAU 2000 body-centered",
    "note": "Approximate landing site coordinates; final position in Perseverance Valley not precisely determined"
  },
  "uncertainties": [
    "Final rover position in Perseverance Valley not precisely determined; last known area west of Endeavour Crater rim",
    "Exact cause of mission end: dust storm induced power loss vs. clock fault — NASA concluded insufficient power to survive winter"
  ],
  "sources": ["SRC-OPP-001", "SRC-OPP-002"],
  "imageCredits": "NASA/JPL (NSSDCA: http://nssdc.gsfc.nasa.gov/planetary/image/merb_pan03_med.jpg)"
}
```

---

### 3. Sojourner (Mars Pathfinder Rover)

```json
{
  "id": "sojourner-mpf",
  "canonicalName": "Sojourner",
  "destination": "Mars",
  "objectType": "Mars microrover",
  "mission": "Mars Pathfinder",
  "launchDate": "1996-12-04T00:00:00Z",
  "landingDate": "1997-07-04T16:56:55Z",
  "deploymentDate": "1997-07-06T05:40:00Z",
  "objective": "Demonstrate feasibility of low-cost landings on and exploration of the Martian surface; test communications between rover and lander, lander and Earth; test imaging devices and sensors; test maneuverability and systems of the rover on the surface; scientific objectives: atmospheric entry science, long-range and close-up surface imaging, rock and soil composition and material properties experiments, meteorology.",
  "instruments": [
    "APXS (Alpha Proton X-Ray Spectrometer)",
    "Black-and-white cameras (2 front, 1 rear)",
    "Color camera (1 rear)",
    "Laser stripe hazard detection system",
    "Wheel abrasion experiment (wheel track imaging)"
  ],
  "scientificResults": [
    "First wheeled vehicle to operate on Mars",
    "Analyzed 16 rocks and soil targets with APXS (e.g., 'Barnacle Bill', 'Yogi', 'Scooby-Doo')",
    "Found basaltic and andesitic rock compositions",
    "Measured soil mechanics via wheel tracks and sinkage tests",
    "Returned 550+ images from rover cameras",
    "Demonstrated autonomous hazard avoidance and waypoint navigation",
    "Operated 83 sols (planned 7 sols primary; 12x mission extension)"
  ],
  "operationalTimeline": [
    { "date": "1996-12-04", "event": "Launch from Cape Canaveral on Delta II", "label": "VERIFIED", "source": "SRC-SOJ-001" },
    { "date": "1997-07-04", "event": "Landing in Ares Vallis at 19.33°N, 33.55°W (Sagan Memorial Station)", "label": "VERIFIED", "source": "SRC-SOJ-001" },
    { "date": "1997-07-06", "event": "Rover deployed from lander at ~05:40 UT (Sol 2)", "label": "VERIFIED", "source": "SRC-SOJ-001" },
    { "date": "1997-07-10", "event": "Completed 7-sol primary mission", "label": "VERIFIED", "source": "SRC-SOJ-001" },
    { "date": "1997-09-27", "event": "Last communication received (Sol 83)", "label": "VERIFIED", "source": "SRC-SOJ-001" },
    { "date": "1997-10-07", "event": "Mission officially ended after repeated attempts to re-establish contact failed", "label": "VERIFIED", "source": "SRC-SOJ-001" }
  ],
  "missionEnd": "1997-10-07",
  "lastContact": "1997-09-27",
  "location": "Ares Vallis, Mars — near Sagan Memorial Station (Pathfinder lander)",
  "coordinates": {
    "lat": 19.33,
    "lon": -33.55,
    "frame": "IAU 2000 body-centered",
    "note": "Lander coordinates from NSSDCA; rover remained within ~10-100 m of lander"
  },
  "uncertainties": [
    "Exact final rover position relative to lander not precisely documented",
    "Cause of communication loss unknown (battery failure, electronics degradation, or thermal cycling suspected)"
  ],
  "sources": ["SRC-SOJ-001", "SRC-SOJ-002"],
  "imageCredits": "NASA/JPL (NSSDCA: https://nssdc.gsfc.nasa.gov/image/spacecraft/sojourner.jpg)"
}
```

---

### 4. Ingenuity (Mars Helicopter Technology Demonstrator)

```json
{
  "id": "ingenuity-mh",
  "canonicalName": "Ingenuity",
  "destination": "Mars",
  "objectType": "Mars helicopter (technology demonstrator)",
  "mission": "Mars 2020 (Perseverance rover mission)",
  "launchDate": "2020-07-30T11:50:00Z",
  "landingDate": "2021-02-18T20:55:00Z",
  "deploymentDate": "2021-04-03T00:00:00Z",
  "objective": "Demonstrate that autonomous, controlled flight can be achieved in the tenuous Martian atmosphere (technology demonstration — no science instruments).",
  "instruments": [
    "Navigation camera (downward-facing, 640x480)",
    "Color camera (RTE, 4208x3120)",
    "Inertial Measurement Unit (IMU)",
    "Laser altimeter",
    "Inclinometer",
    "Solar panel (above rotors) + Li-ion batteries (6 cells, ~35-40 Wh)",
    "Heater for night-time survival",
    "Communications: relay via Perseverance rover (UHF, 400 MHz)"
  ],
  "scientificResults": [
    "Achieved first powered, controlled flight on another planet (Flight 1: 2021-04-19, 39.1 sec, 3 m altitude)",
    "Completed 72 flights over 1,000+ sols (planned: 5 flights in 30 sols)",
    "Total flight time: >2 hours (128.8 minutes)",
    "Total distance flown: ~17 km",
    "Maximum altitude: 24 m (Flight 61)",
    "Maximum groundspeed: 10 m/s (Flight 62)",
    "Served as aerial scout for Perseverance rover route planning",
    "Demonstrated survival through Martian winter and dust storms"
  ],
  "operationalTimeline": [
    { "date": "2020-07-30", "event": "Launch with Perseverance on Atlas V-541 from Cape Canaveral", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2021-02-18", "event": "Landing in Jezero Crater attached to Perseverance belly", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2021-04-03", "event": "Deployed from Perseverance to surface (Sol 43)", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2021-04-19", "event": "Flight 1 — first powered controlled flight on Mars (39.1 sec, 3 m hover)", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2021-05-07", "event": "Flight 5 — transitioned to operations demonstration phase", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2022-09-24", "event": "Flight 33 — first flight after surviving first Martian winter", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2024-01-18", "event": "Flight 72 — contact lost before landing; rotor damage confirmed", "label": "VERIFIED", "source": "SRC-ING-001" },
    { "date": "2024-01-25", "event": "Mission officially ended; helicopter upright but no longer flight-capable", "label": "VERIFIED", "source": "SRC-ING-001" }
  ],
  "missionEnd": "2024-01-25",
  "lastContact": "2024-01-18",
  "location": "Jezero Crater, Mars — 'Valinor Hills' / 'Airfield Chi' region",
  "coordinates": {
    "lat": 18.4446,
    "lon": 77.4509,
    "frame": "IAU 2000 body-centered",
    "note": "Approximate final location near Perseverance's 'Three Forks' area; precise final coordinates not published as of 2026-11-14"
  },
  "uncertainties": [
    "Exact final coordinates of Ingenuity not published in NSSDCA record; approximate location derived from Perseverance traverse maps",
    "NSSDCA record lists mass as ~1.8 kg; JPL fact sheets cite 1.8 kg (4.0 lb) — consistent",
    "Total flight count confirmed as 72 by NASA; some sources reference 72nd flight as 'final flight' on Jan 18 2024"
  ],
  "sources": ["SRC-ING-001", "SRC-ING-002"],
  "imageCredits": "NASA/JPL-Caltech (NSSDCA / NASA Science: PIA24584 Ingenuity First Flight image)"
}
```

---

### 5. Surveyor 3

```json
{
  "id": "surveyor-3",
  "canonicalName": "Surveyor 3",
  "destination": "Moon",
  "objectType": "Lunar lander",
  "mission": "Surveyor Program",
  "launchDate": "1967-04-17T07:05:01Z",
  "landingDate": "1967-04-20T00:04:17Z",
  "deploymentDate": null,
  "objective": "Perform soft landing on the Moon within the Apollo zone; obtain post-landing television pictures; obtain information on lunar-surface bearing strength, radar reflectivity, and thermal properties; use surface sampler to manipulate lunar surface and observe effects with television camera.",
  "instruments": [
    "Survey Television Camera (with extended glare hood)",
    "Surface Sampler (12 cm x 5 cm scoop on 1.5 m pantograph arm)",
    "Soil Mechanics Experiments (strain gauges, temperature sensors)",
    "Radar Reflectivity Experiment",
    "Thermal Properties Experiment",
    "Two auxiliary mirrors (view beneath engines and one footpad)"
  ],
  "scientificResults": [
    "Second successful soft landing in Surveyor program",
    "Returned 6,326 television pictures",
    "Surface sampler operated 18 hours 22 minutes, dug trenches up to 18 cm deep",
    "Measured lunar soil bearing strength, cohesion, and density",
    "Observed solar eclipse by Earth and recorded thermal response",
    "Verified Apollo landing site suitability in Oceanus Procellarum",
    "Parts retrieved by Apollo 12 (1969) — camera on display at Smithsonian"
  ],
  "operationalTimeline": [
    { "date": "1967-04-17", "event": "Launch on Atlas-Centaur from Kennedy Space Center LC-36B", "label": "VERIFIED", "source": "SRC-SUR3-001" },
    { "date": "1967-04-20", "event": "Initial touchdown at 00:04:17 UT; 3 touchdowns total (final at 00:04:53 UT) at 3.0162°S, 336.582°E (LRO-derived)", "label": "VERIFIED", "source": "SRC-SUR3-001" },
    { "date": "1967-04-22", "event": "Surface sampler first deployed", "label": "VERIFIED", "source": "SRC-SUR3-001" },
    { "date": "1967-05-03", "event": "Operations continued until local sunset", "label": "VERIFIED", "source": "SRC-SUR3-001" },
    { "date": "1967-05-04", "event": "Last data returned at 00:04 UT; failed to reawaken after lunar night", "label": "VERIFIED", "source": "SRC-SUR3-001" },
    { "date": "1969-11-19", "event": "Apollo 12 LM landed ~180 m away", "label": "VERIFIED", "source": "SRC-SUR3-001" },
    { "date": "1969-11-20", "event": "Apollo 12 astronauts Conrad and Bean visited, retrieved ~10 kg of parts including TV camera", "label": "VERIFIED", "source": "SRC-SUR3-001" }
  ],
  "missionEnd": "1967-05-04",
  "lastContact": "1967-05-04T00:04:00Z",
  "location": "Oceanus Procellarum, Moon — inside 200 m crater on 14° slope",
  "coordinates": {
    "lat": -3.0162,
    "lon": 336.582,
    "frame": "LRO-derived (DE 421 mean Earth/polar rotation axis)",
    "note": "Coordinates determined from Lunar Reconnaissance Orbiter images; NSSDCA lists as verified"
  },
  "uncertainties": [
    "Original 1967 landing coordinates less precise; LRO-derived coordinates used here",
    "Spacecraft slid ~30 cm after final touchdown; exact final orientation not specified",
    "Camera and other retrieved parts no longer on lunar surface — current physical status: camera at Smithsonian, other parts at NASA/JPL or destroyed in analysis"
  ],
  "sources": ["SRC-SUR3-001", "SRC-SUR3-002"],
  "imageCredits": "NASA (NSSDCA: Apollo 12 astronaut Pete Conrad next to Surveyor 3)"
}
```

---

### 6. Apollo 15 Lunar Roving Vehicle (LRV-1)

```json
{
  "id": "apollo15-lrv-1",
  "canonicalName": "Apollo 15 Lunar Roving Vehicle",
  "destination": "Moon",
  "objectType": "Lunar Roving Vehicle (LRV)",
  "mission": "Apollo 15",
  "launchDate": "1971-07-26T13:34:00Z",
  "landingDate": "1971-07-30T22:16:29Z",
  "deploymentDate": "1971-07-31T13:13:10Z",
  "objective": "Extend range of crewed lunar surface exploration; transport astronauts, tools, samples, and experiments; enable geologic traverses to Hadley Rille and Apennine Mountains.",
  "instruments": [
    "Color TV camera (ground-commanded, on LRV)",
    "Navigation: directional gyro + odometer + Sun-shadow device",
    "Communications: high-gain S-band antenna (relay via LM)",
    "Tool carrier and sample bags",
    "Lunar Communications Relay Unit (LCRU)"
  ],
  "scientificResults": [
    "First LRV deployed on Moon (LRV-1)",
    "Traversed 27.8 km in 3 hours 2 minutes driving time over 3 EVAs",
    "Longest single traverse: 12.5 km (EVA 2, to Spur Crater)",
    "Maximum range from LM: 5.0 km",
    "Collected 77.31 kg of samples including 'Genesis Rock' (anorthosite) at Spur Crater",
    "Explored Hadley Rille, Apennine Front, and mare basalt plains",
    "Demonstrated LRV reliability: no major anomalies"
  ],
  "operationalTimeline": [
    { "date": "1971-07-26", "event": "Apollo 15 launch on Saturn V from KSC LC-39A", "label": "VERIFIED", "source": "SRC-A15-001" },
    { "date": "1971-07-30", "event": "LM 'Falcon' landing at 26.13239°N, 3.63330°E (Mare Imbrium / Hadley-Apennine)", "label": "VERIFIED", "source": "SRC-A15-001" },
    { "date": "1971-07-31", "event": "EVA 1: LRV deployed, driven 10.3 km to Elbow Crater / Hadley Rille", "label": "VERIFIED", "source": "SRC-A15-001" },
    { "date": "1971-08-01", "event": "EVA 2: LRV driven 12.5 km along Apennine Front to Spur Crater (Genesis Rock)", "label": "VERIFIED", "source": "SRC-A15-001" },
    { "date": "1971-08-02", "event": "EVA 3: LRV driven 5.1 km to Scarp Crater / Hadley Rille edge", "label": "VERIFIED", "source": "SRC-A15-001" },
    { "date": "1971-08-02", "event": "LRV parked ~100 m east of LM; final TV camera pan filmed LM ascent", "label": "VERIFIED", "source": "SRC-A15-001" },
    { "date": "1971-08-02", "event": "LM ascent at 17:11:22 UT; LRV left on Moon", "label": "VERIFIED", "source": "SRC-A15-001" }
  ],
  "missionEnd": "1971-08-02",
  "lastContact": "1971-08-02T17:11:22Z",
  "location": "Hadley-Apennine, Mare Imbrium, Moon — parked ~100 m east of LM 'Falcon' descent stage",
  "coordinates": {
    "lat": 26.13239,
    "lon": 3.63330,
    "frame": "LRO-derived (DE 421 mean Earth/polar rotation axis)",
    "note": "LM coordinates from NSSDCA/LRO; LRV parked ~100 m east — approximate"
  },
  "uncertainties": [
    "Exact LRV parking position relative to LM not precisely documented; '~100 m east' from mission transcripts",
    "LRV specifications (mass 210 kg, dimensions, motors, batteries) from general LRV page (SRC-A15-002) — all three LRVs identical design",
    "Current physical status: battery depleted, thermal cycling for 50+ years; no contact since 1971"
  ],
  "sources": ["SRC-A15-001", "SRC-A15-002", "SRC-A15-003"],
  "imageCredits": "NASA (NSSDCA: AS15-88-11901 Apollo 15 LRV deployed)"
}
```

---

### 7. Apollo 16 Lunar Roving Vehicle (LRV-2)

```json
{
  "id": "apollo16-lrv-2",
  "canonicalName": "Apollo 16 Lunar Roving Vehicle",
  "destination": "Moon",
  "objectType": "Lunar Roving Vehicle (LRV)",
  "mission": "Apollo 16",
  "launchDate": "1972-04-16T17:54:00Z",
  "landingDate": "1972-04-21T02:23:35Z",
  "deploymentDate": "1972-04-21T16:47:38Z",
  "objective": "Extend range of crewed lunar surface exploration; transport astronauts, tools, samples, and experiments; enable geologic traverses to Descartes Highlands, Stone Mountain, and North Ray Crater.",
  "instruments": [
    "Color TV camera (ground-commanded, on LRV)",
    "Navigation: directional gyro + odometer + Sun-shadow device",
    "Communications: high-gain S-band antenna (relay via LM)",
    "Tool carrier and sample bags",
    "Lunar Communications Relay Unit (LCRU)",
    "Portable surface magnetometer (transported on LRV)"
  ],
  "scientificResults": [
    "Second LRV deployed on Moon (LRV-2)",
    "Traversed 26.7 km in 3 hours 26 minutes driving time over 3 EVAs",
    "Longest single traverse: 11.6 km (EVA 2, to Stone Mountain / Cinco Craters)",
    "Maximum range from LM: 4.5 km",
    "Collected 95.71 kg of samples from 11 sites",
    "Explored Descartes Highlands (Cayley and Descartes formations), North Ray Crater",
    "Heat flow experiment cable broken during ALSEP deployment (unrelated to LRV)"
  ],
  "operationalTimeline": [
    { "date": "1972-04-16", "event": "Apollo 16 launch on Saturn V from KSC LC-39A", "label": "VERIFIED", "source": "SRC-A16-001" },
    { "date": "1972-04-21", "event": "LM 'Orion' landing at 8.9730°S, 15.5002°E (Descartes Highlands)", "label": "VERIFIED", "source": "SRC-A16-001" },
    { "date": "1972-04-21", "event": "EVA 1: LRV deployed, ALSEP set up, 4.2 km traverse", "label": "VERIFIED", "source": "SRC-A16-001" },
    { "date": "1972-04-22", "event": "EVA 2: LRV driven 11.1 km to Stone Mountain / Cinco Craters", "label": "VERIFIED", "source": "SRC-A16-001" },
    { "date": "1972-04-23", "event": "EVA 3: LRV driven 11.4 km to North Ray Crater", "label": "VERIFIED", "source": "SRC-A16-001" },
    { "date": "1972-04-23", "event": "LRV parked near LM; TV camera filmed LM ascent", "label": "VERIFIED", "source": "SRC-A16-001" },
    { "date": "1972-04-24", "event": "LM ascent at 01:25:48 UT; LRV left on Moon", "label": "VERIFIED", "source": "SRC-A16-001" }
  ],
  "missionEnd": "1972-04-24",
  "lastContact": "1972-04-24T01:25:48Z",
  "location": "Descartes Highlands, Moon — parked near LM 'Orion' descent stage",
  "coordinates": {
    "lat": -8.9730,
    "lon": 15.5002,
    "frame": "IAU Mean Earth Polar Axis (LRO-derived)",
    "note": "LM coordinates from NSSDCA/LRO; LRV parked nearby — approximate"
  },
  "uncertainties": [
    "Exact LRV parking position relative to LM not precisely documented",
    "LRV specifications identical to LRV-1 (shared design per SRC-A16-002)",
    "LM 'Orion' ascent stage lost attitude control, left in lunar orbit (not impacted as planned) — descent stage and LRV remain at landing site"
  ],
  "sources": ["SRC-A16-001", "SRC-A16-002"],
  "imageCredits": "NASA (NSSDCA: Apollo 16 LRV on lunar surface)"
}
```

---

### 8. Apollo 17 Lunar Roving Vehicle (LRV-3)

```json
{
  "id": "apollo17-lrv-3",
  "canonicalName": "Apollo 17 Lunar Roving Vehicle",
  "destination": "Moon",
  "objectType": "Lunar Roving Vehicle (LRV)",
  "mission": "Apollo 17",
  "launchDate": "1972-12-07T05:33:00Z",
  "landingDate": "1972-12-11T19:54:57Z",
  "deploymentDate": "1972-12-11T23:54:49Z",
  "objective": "Extend range of crewed lunar surface exploration; transport astronauts, tools, samples, and experiments; enable geologic traverses to Taurus-Littrow Valley, South Massif, North Massif, and Sculptured Hills; support first scientist-astronaut (Harrison Schmitt).",
  "instruments": [
    "Color TV camera (ground-commanded, on LRV)",
    "Navigation: directional gyro + odometer + Sun-shadow device",
    "Communications: high-gain S-band antenna (relay via LM)",
    "Tool carrier and sample bags",
    "Lunar Communications Relay Unit (LCRU)",
    "Traverse Gravimeter (transported on LRV)",
    "Lunar Seismic Profiling Experiment explosive packages (transported on LRV)"
  ],
  "scientificResults": [
    "Third and final LRV deployed on Moon (LRV-3)",
    "Traversed 35.9 km in 4 hours 26 minutes driving time over 3 EVAs — longest LRV traverse",
    "Longest single traverse: 20.1 km (EVA 2, to South Massif / Nansen Crater)",
    "Maximum range from LM: 7.6 km — farthest any human has driven from a spacecraft on another world",
    "Collected 110.52 kg of samples — largest Apollo sample return",
    "Discovered orange soil (volcanic glass beads) at Shorty Crater",
    "Explored Taurus-Littrow Valley, South/North Massifs, Sculptured Hills, Van Serg Crater",
    "Final human-driven vehicle on the Moon (as of 2026)"
  ],
  "operationalTimeline": [
    { "date": "1972-12-07", "event": "Apollo 17 launch on Saturn V from KSC LC-39A", "label": "VERIFIED", "source": "SRC-A17-001" },
    { "date": "1972-12-11", "event": "LM 'Challenger' landing at 20.1911°N, 30.7723°E (Taurus-Littrow Valley)", "label": "VERIFIED", "source": "SRC-A17-001" },
    { "date": "1972-12-11", "event": "EVA 1: LRV deployed, ALSEP set up, traverse to Steno Crater", "label": "VERIFIED", "source": "SRC-A17-001" },
    { "date": "1972-12-12", "event": "EVA 2: LRV driven 20.1 km to South Massif / Nansen Crater — orange soil discovery", "label": "VERIFIED", "source": "SRC-A17-001" },
    { "date": "1972-12-13", "event": "EVA 3: LRV driven to North Massif / Sculptured Hills / Van Serg Crater", "label": "VERIFIED", "source": "SRC-A17-001" },
    { "date": "1972-12-13", "event": "LRV parked ~150 m east of LM; final TV camera pan filmed LM ascent and plaque reading", "label": "VERIFIED", "source": "SRC-A17-001" },
    { "date": "1972-12-14", "event": "LM ascent at 22:54:37 UT; LRV left on Moon", "label": "VERIFIED", "source": "SRC-A17-001" }
  ],
  "missionEnd": "1972-12-14",
  "lastContact": "1972-12-14T22:54:37Z",
  "location": "Taurus-Littrow Valley, Moon — parked ~150 m east of LM 'Challenger' descent stage",
  "coordinates": {
    "lat": 20.1911,
    "lon": 30.7723,
    "frame": "LRO-derived (DE 421 mean Earth/polar rotation axis)",
    "note": "LM coordinates from NSSDCA/LRO; LRV parked ~150 m east — approximate"
  },
  "uncertainties": [
    "Exact LRV parking position relative to LM not precisely documented; '~150 m east' from mission transcripts",
    "LRV specifications identical to LRV-1/2 (shared design per SRC-A17-002)",
    "Current physical status: battery depleted, thermal cycling for 50+ years; LROC images (2009+) show LRV at landing site — no contact since 1972"
  ],
  "sources": ["SRC-A17-001", "SRC-A17-002"],
  "imageCredits": "NASA (NSSDCA: AS17-146-22367 Apollo 17 LRV deployed)"
}
```

---

## Cross-Reference: Separate Records Enforced

| Hardware | Separate Record? | Note |
|----------|------------------|------|
| Spirit | ✅ Yes | `spirit-mer-a` — distinct from Opportunity |
| Opportunity | ✅ Yes | `opportunity-mer-b` — distinct from Spirit |
| Sojourner | ✅ Yes | `sojourner-mpf` — distinct mission |
| Ingenuity | ✅ Yes | `ingenuity-mh` — distinct from Perseverance |
| Surveyor 3 | ✅ Yes | `surveyor-3` — standalone lander |
| Apollo 15 LRV | ✅ Yes | `apollo15-lrv-1` — distinct from Apollo 16/17 |
| Apollo 16 LRV | ✅ Yes | `apollo16-lrv-2` — distinct from Apollo 15/17 |
| Apollo 17 LRV | ✅ Yes | `apollo17-lrv-3` — distinct from Apollo 15/16 |

**Rule Compliance**: All Spirit/Opportunity and Apollo 15/16/17 LRV records are physically separate. Collective narrative grouping permitted only at presentation layer (UI), never in data records.