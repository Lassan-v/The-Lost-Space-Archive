# Fact-Check Report — The Lost Space Archive

**Project:** The Lost Space Archive (NASA Space Apps Challenge 2026)
**Challenge:** "Abandoned but Not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"
**Date:** 2026-11-14
**Prepared by:** NASA Researcher & Data Curator

---

## Not Verified Claims

The following claims could not be confirmed with primary NASA sources (NSSDCA or NASA Science/JPL primary pages) as of 2026-11-14. These are listed as **UNCERTAIN** in the DATA_CATALOG.md and should NOT be used in game content without further verification.

### Spirit (MER-A)
| Claim | Status | Notes |
|-------|--------|-------|
| Exact final rover coordinates after 2010 entrapment at "Troy" | UNCERTAIN | NSSDCA gives landing coordinates only; final position not directly imaged by orbiters |
| Exact sol of last contact (Sol 2210 vs 2208) | UNCERTAIN | Minor discrepancy between sources; NSSDCA states 22 March 2010 |

### Opportunity (MER-B)
| Claim | Status | Notes |
|-------|--------|-------|
| Precise final coordinates in Perseverance Valley | UNCERTAIN | NSSDCA gives landing coordinates only; final position not precisely determined |
| Exact root cause of mission end (dust storm power loss vs. clock fault) | UNCERTAIN | NASA concluded "insufficient power to survive winter" but multiple factors possible |

### Sojourner
| Claim | Status | Notes |
|-------|--------|-------|
| Exact final rover position relative to lander | UNCERTAIN | NSSDCA states rover remained within ~10-100 m; no precise final coordinates |
| Cause of communication loss (battery vs. electronics vs. thermal) | UNCERTAIN | NSSDCA states "unknown reasons" |

### Ingenuity
| Claim | Status | Notes |
|-------|--------|-------|
| Precise final coordinates (Valinor Hills / Airfield Chi) | UNCERTAIN | NSSDCA does not publish final coordinates; approximate from Perseverance traverse maps only |
| Total flight distance (~17 km) | UNCERTAIN | Derived from flight log summaries; not explicitly stated in NSSDCA record |
| Maximum altitude (24 m) and groundspeed (10 m/s) | UNCERTAIN | From NASA press releases; not in NSSDCA primary record |

### Surveyor 3
| Claim | Status | Notes |
|-------|--------|-------|
| Exact final orientation after 30 cm slide | UNCERTAIN | NSSDCA notes slide but not orientation |
| Current physical status of non-retrieved parts | UNCERTAIN | Camera at Smithsonian; other parts' disposition not fully documented in NSSDCA |

### Apollo 15 LRV (LRV-1)
| Claim | Status | Notes |
|-------|--------|-------|
| Exact LRV parking position (~100 m east of LM) | UNCERTAIN | Based on mission transcripts; not precisely surveyed |
| Current physical condition after 50+ years thermal cycling | UNCERTAIN | LROC images show LRV present; no direct inspection |

### Apollo 16 LRV (LRV-2)
| Claim | Status | Notes |
|-------|--------|-------|
| Exact LRV parking position relative to LM | UNCERTAIN | Not precisely documented in mission transcripts |

### Apollo 17 LRV (LRV-3)
| Claim | Status | Notes |
|-------|--------|-------|
| Exact LRV parking position (~150 m east of LM) | UNCERTAIN | Based on mission transcripts; not precisely surveyed |

---

## Verified Claims Summary

All **VERIFIED** and **CORROBORATED** claims in DATA_CATALOG.md are directly supported by NSSDCA Master Catalog records (primary source) and/or NASA Science/JPL primary mission pages. Key verified facts include:

- All launch dates, landing dates, deployment dates
- Landing coordinates (from NSSDCA, many LRO-refined)
- Instrument suites (Athena package, APXS, LRV specs)
- Mission end dates and last contact dates
- Traverse distances and driving times for all rovers/LRVs
- Mass, power, dimensional specifications
- Major scientific discoveries (hematite blueberries, Genesis Rock, orange soil, etc.)

---

## Source Conflicts Requiring Escalation

| Hardware | Conflict | Sources | Resolution |
|----------|----------|---------|------------|
| Opportunity NSSDCA ID | Search for "Opportunity" returns 2003-028A (error), but query returns 2003-032A | NSSDCA query vs direct ID | **RESOLVED**: Use 2003-032A (query result); 2003-028A appears to be a catalog error |
| Spirit landing coordinates | NSSDCA: "14.572 S, 175.478 E" vs landing ellipse "14.82 S, 175.15 E" | Same NSSDCA page | **RESOLVED**: Use actual landing coordinates (14.572°S, 175.478°E); ellipse is pre-landing target |
| Surveyor 3 coordinates | Original 1967 vs LRO-derived (3.0162°S, 336.582°E) | Same NSSDCA page | **RESOLVED**: Use LRO-derived coordinates (explicitly labeled as such in NSSDCA) |

---

## Questions for Project Director

### 1. Coordinate Precision for Child-Friendly Display
**Question:** The NSSDCA provides high-precision coordinates (e.g., 26.13239°N, 3.63330°E for Apollo 15). For ages 8-10, should we:
- A) Show rounded coordinates (e.g., "26.1°N, 3.6°E") with "approximate" label
- B) Show only general region names (e.g., "Hadley-Apennine, Mare Imbrium")
- C) Show both: region name + simplified coordinates

**Recommendation:** Option C — region name primary, simplified coordinates secondary, with explicit "approximate" label per nasa-source-of-truth skill rules.

### 2. "Current Status" Claims
**Question:** The skill rules state: "Do not claim current status without a dated authoritative source." NSSDCA records end at mission end (1971-1972 for LRVs, 2010/2018 for MERs, 2024 for Ingenuity). Should the game:
- A) State "Last contact: [date]" and "Mission ended: [date]" only (no current status)
- B) Add "Current status unknown — no contact since [date]" for all
- C) For LRVs only: reference LROC orbital imagery (2009-2026) showing hardware still present

**Recommendation:** Option A for all — strictly factual. Option C for LRVs only if we cite dated LROC image releases (requires additional source verification).

### 3. Ingenuity Final Location
**Question:** NSSDCA does not publish Ingenuity's final coordinates. JPL press releases reference "Valinor Hills" / "Airfield Chi" but no precise lat/lon. Should we:
- A) Omit coordinates entirely (use null)
- B) Use Perseverance's last known position as proxy (~18.4446°N, 77.4509°E)
- C) Label as "Near Perseverance rover, Jezero Crater — precise coordinates not published"

**Recommendation:** Option C — honest about the gap, consistent with "Never fabricate or guess values."

### 4. Surveyor 3 Physical Status
**Question:** Surveyor 3 is unique — parts were retrieved by Apollo 12. The camera is at the Smithsonian. Should the game dossier:
- A) Treat Surveyor 3 as "partially returned to Earth"
- B) Focus on the lander body remaining on Moon
- C) Create two records: "Surveyor 3 (lander on Moon)" and "Surveyor 3 Camera (Smithsonian)"

**Recommendation:** Option B for the hardware catalogue (lander remains on Moon); Option A for narrative dossier explaining the Apollo 12 visit and camera retrieval.

### 5. Simplified Explanations for Ages 8-10
**Question:** The DATA_CATALOG.md contains VERIFIED technical facts. The game will need SIMPLIFIED versions (e.g., "RAT" → "rock grinder," "APXS" → "rock composition scanner"). Should the NASA Researcher:
- A) Provide simplified glossary mappings in DATA_CATALOG.md
- B) Leave simplification to Game-Learning Designer (with fact-check review)
- C) Create separate SIMPLIFIED field in each record

**Recommendation:** Option B — maintain separation of concerns. NASA Researcher provides VERIFIED facts; Game-Learning Designer proposes simplifications; NASA Researcher reviews for scientific accuracy.

---

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `docs/NASA_SOURCES.md` | Created | Master source register with 17 primary sources across 8 hardware items |
| `docs/DATA_CATALOG.md` | Created | Structured records for all 8 hardware items per nasa-source-of-truth data model |
| `docs/FACT_CHECK_REPORT.md` | Created | This report — not verified claims, conflicts, questions for Project Director |

---

## Next Steps Recommended

1. **Project Director Review** — Approve coordinate display strategy (Q1) and current status policy (Q2)
2. **Game-Learning Designer** — Propose SIMPLIFIED labels for instruments/terms; NASA Researcher to review
3. **Visual Illustrator** — Reference image credits in NASA_SOURCES.md for NASA archival imagery; create original art for game (no NASA logos/patches)
4. **Frontend Developer** — Implement data structures matching DATA_CATALOG.md JSON schema
5. **QA/Accessibility** — Verify all factual claims in game content trace to SOURCE IDs in NASA_SOURCES.md

---

**End of Report**