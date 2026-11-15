# NASA Data Notes — The Lost Space Archive

**Version:** 0.1.0  
**Prepared:** 2026-11-14  
**Status:** MVP integration notes. Displayed facts are source-linked; unshown catalog fields remain subject to verification.

## Purpose

This document explains how to review, maintain and integrate the project's NASA data catalog. The workbook contains two main sheets (`NASA_Data_Catalog` and `Source_Register`) plus a data dictionary. `NASA_Data.json` is the structured starter dataset for the frontend.

## Scope: eight scientific records and five playable narrative dossiers

The catalog retains all eight physical-object records. The MVP playable scope is six objects in five narrative dossiers; Apollo 15 and Apollo 16 LRV records remain catalog-only. All five playable dossiers and four additional activities use source-linked, translated facts; the existing Sojourner builder is preserved.

| Destination | Object records | Narrative grouping |
|---|---|---|
| Mars | Spirit; Opportunity | One paired Mars Exploration Rover dossier, but two separate factual records |
| Mars | Sojourner | One dossier |
| Mars | Ingenuity | One dossier |
| Moon | Surveyor 3 | One dossier |
| Moon | Apollo 17 LRV | Playable MVP dossier; separate vehicle record |
| Moon | Apollo 15 LRV; Apollo 16 LRV | Catalog and source documentation only; not playable in this MVP |

Do not collapse Spirit and Opportunity into one data record. Do not collapse the three Apollo LRVs into one physical-object record.

## Verification status

Verification is tracked per source and fact. Most catalog fields remain **preliminary**; the Sojourner facts listed in `NSSDCA_Integration_Log.md` were checked against NSSDCA. The team should:
1. Open each source URL in `Source_Register`.
2. Confirm the source supports the specific value being used.
3. Record any replacement URL, page title, access date and exact section/table.
4. Update the relevant `verification_status` and `open_questions` fields.
5. Keep source-specific values separate when sources disagree; do not silently average or combine them.
6. Only mark a value approved when the team has verified it against a suitable primary NASA/NSSDCA source.

Suggested status labels:
- `Pending` — not checked yet.
- `Verified` — checked against the source and claim.
- `Needs reconciliation` — sources conflict or a value is ambiguous.
- `Not applicable` — field does not apply to this hardware.
- `Not found` — not located in reviewed sources; do not infer.

## Important science and data cautions

### Spirit and Opportunity
- These are twin rovers but separate spacecraft and separate records.
- Their landing dates differ: Spirit landed 2004-01-03; Opportunity landed 2004-01-24.
- Distinguish Opportunity's last communication (2018-06-10) from NASA's formal end-of-mission declaration (2019-02-13).
- Spirit's mission end (2011-05-25) is distinct from its last successful communication; the exact last-contact date is left for verification.
- NASA's current Opportunity profile reports 45.16 km driven. Use the source's stated precision and note that rounded versions also appear.

### Sojourner
- Sojourner was the rover delivered by the Mars Pathfinder mission.
- Distinguish the Mars Pathfinder lander's arrival on 1997-07-04 from Sojourner rolling onto the surface on 1997-07-06 (NSSDCA `SRC-017`).
- The dossier's NSSDCA-derived timeline, control, communications-delay and initial exploration facts are connected to the structured catalog and source links. The existing rover-building challenge remains playable. See `NSSDCA_Integration_Log.md`.
- Keep rover instruments (APXS and rover imaging cameras) separate from Pathfinder lander instruments (for example, the lander camera and meteorology package).
- The JPL profile reports 83 days of operation against a planned seven-day mission.
- Exact rover deployment, last communication, mission closeout and total distance remain open verification items in this starter package.

### Ingenuity
- Ingenuity was a technology-demonstration rotorcraft carried to Mars beneath Perseverance; it was not a rover.
- Distinguish Mars arrival (2021-02-18), deployment (2021-04-04), first flight (2021-04-19), final flight (2024-01-18) and NASA's mission-end announcement (2024-01-25).
- It completed 72 flights. NASA reported rotor-blade damage after the final flight, making further flight impossible.
- It did not carry a dedicated science instrument suite. It had a color terrain camera and a black-and-white navigation camera.
- Verify the cumulative flight distance before using it in an on-screen comparison.

### Surveyor 3
- NASA's mission profile gives launch 1967-04-17, landing 1967-04-20 and last contact 1967-05-04.
- Its listed instruments are a TV camera and surface sampler.
- The NASA Science page contains two slightly different UT landing-time values in separate sections. Keep the landing date but do not publish an exact time until reconciled.
- Apollo 12 astronauts visited Surveyor 3 in November 1969. Verify the exact list of returned parts before naming components in the story.

### Apollo Lunar Roving Vehicles
- There were three separate LRVs, used on Apollo 15, Apollo 16 and Apollo 17.
- The NSSDCA LRV page reports total driving distances of 27.8 km, 26.7 km and 35.9 km respectively, plus drive times, longest traverses and maximum range from the lunar module.
- Other NASA historical material may show slightly different totals (for example, 27.9 km for Apollo 15 and 26.9 km for Apollo 16). Preserve the source and do not combine values from different tables without a note.
- The LRVs were crewed battery-powered electric vehicles. Avoid presenting them as autonomous rovers or implying they had the same kind of scientific instrument suite as Spirit or Opportunity.

## NSSDCA integration — challenge requirement

The NSSDCA Master Catalog is included as `SRC-001`; the specific Mars Pathfinder NSSDCA mission page is `SRC-017`. Sojourner facts from `SRC-017` and Apollo 17 LRV data from `SRC-010` are connected to the interface. Spirit, Opportunity, Ingenuity, and Surveyor 3 use selected NASA Science mission pages in the source register. Other catalog fields and source questions remain open as marked per record.

Remaining integration work:
1. Select the relevant NSSDCA mission record(s) or data-set record(s) for the hardware in scope.
2. Record the exact record title, stable URL or identifier, access date and fields used in a new `NSSDCA_Integration_Log`.
3. Map at least one NSSDCA-derived field into an actual experience feature, such as the dossier timeline, mission metadata, object comparison or instrument detail.
4. Keep a traceable mapping: `NSSDCA field → JSON property → UI component / gameplay interaction`.
5. Capture evidence for the submission: screenshot or short demo showing the data powering the feature.

Do not claim NSSDCA integration is complete until the selected record/data is actually incorporated and can be demonstrated.

## Recommended integration map

| Data field | Possible in-game use |
|---|---|
| Launch / landing / last-contact / mission-end dates | Interactive mission timeline |
| Landing site / coordinates | Exploration map or location marker |
| Instruments | Instrument matching mini-game |
| Distance / traverse / flight count | Comparison challenge and progress visualization |
| Mission objective / key findings | Story dossier and educational feedback |

## Fiction vs. fact

Character dialogue, emotions, humour, names for fictional archive systems and first-person narration may be creative personification. They must not alter the actual mission chronology, hardware capabilities, scientific findings or mission outcome. Keep a clear distinction between:
- **Verified fact** — supported by a cited source.
- **Simplification** — child-friendly wording that preserves the meaning.
- **Interpretation** — an explanatory inference.
- **Fictional layer** — dialogue, personality and narrative framing.
- **Unknown / disputed** — not yet resolved; do not present as fact.

## Data quality and child-facing wording

- Prefer short sentences and explain technical terms.
- Use metric units consistently in the game; optionally show imperial units in source notes.
- Keep exact values in the data layer and use rounded values only in UI presentation.
- Never imply that the hardware is still active if its mission ended.
- Never describe a technology demonstration as a scientific discovery mission unless the source supports that description.
- Keep coordinates and timestamps in explicit units/conventions (decimal degrees; UTC where applicable).

## Image and attribution notes

Use official NASA/JPL imagery only with the exact credit line provided by the asset source. Generated illustrations should not include NASA logos, insignia, mission patches or imply NASA endorsement. Follow the hackathon's current AI disclosure and watermark rules for generated visual assets.

## Handoff checklist

- [ ] All eight object records reviewed.
- [ ] All source URLs opened and exact claims checked.
- [ ] Conflicting values logged with source-specific provenance.
- [ ] NSSDCA record/data product selected and meaningfully integrated.
- [ ] JSON validated and consumed by the app.
- [ ] Byron receives verified facts plus fiction/fact boundaries.
- [ ] Yineth receives the data fields needed per screen.
- [ ] Dani and Yamil receive stable IDs, field names and source references.
- [ ] Final submission description explains exactly how NASA data is used.
