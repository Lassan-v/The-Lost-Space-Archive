# NSSDCA Integration Log

Updated: 2026-11-14

## Integrated record

- **Source ID:** `SRC-017`
- **Title:** Mars Pathfinder Project Information
- **Institution:** NASA Space Science Data Coordinated Archive (NSSDCA)
- **URL:** <https://nssdc.gsfc.nasa.gov/planetary/mesur.html>
- **Accessed:** 2026-11-14
- **Scope:** Primary mission timeline and rover-operation facts used by the Sojourner dossier and its source list.

## Field-to-experience mapping

| NSSDCA page content | Catalog field | Experience use |
|---|---|---|
| Pathfinder launch and lander arrival dates | `objects[mars_sojourner].launch_date`; `verified_nssdca_facts[sojourner-pathfinder-timeline]` | Sojourner dossier clarifies that Pathfinder's lander arrived July 4, 1997, while the rover rolled onto the surface July 6. |
| Rover rolled onto the surface July 6 | `landing_or_arrival_date`, `deployment_date`, `first_operation_date`; `verified_nssdca_facts[sojourner-pathfinder-timeline]` | Dossier timeline. This corrects the old UI statement that Sojourner itself landed July 4. |
| Six-wheel rover, Earth-based operator, images from rover and lander | `verified_nssdca_facts[sojourner-control]` | Dossier fact card and educational context for the existing rover-building challenge. |
| About 10-minute communications delay and need for some autonomous control | `verified_nssdca_facts[sojourner-signal-delay]` | Dossier fact card explaining why the rover needed limited independent behavior. |
| Initial goals in first seven sols, about 10 meters from lander | `verified_nssdca_facts[sojourner-planned-exploration]` | Dossier fact card distinguishes planned objectives from later extended activity. |

All four child-facing statements are stored in `src/data/nasa/NASA_Data.json` with `source_id: SRC-017`. `src/data/nasa/index.ts` resolves the facts and source URLs from the catalog. `DossierScreen` renders those records, and `SimulationBanner` links source IDs to their registered URLs.

## Additional MVP facts used in dossiers and activities

The following reviewed primary pages now power translated fact cards and educational interactions. Original NASA source IDs in `NASA_Data.json` resolve to URLs in its source register.

| Object / source | Catalog fact IDs and claims used | Experience mapping |
|---|---|---|
| Spirit / `SRC-002` NASA Science mission profile | `spirit-site`, `spirit-silica`, `spirit-objective`, `spirit-timeline`, `spirit-tools`, `spirit-legacy` | Twin dossier; silica evidence matching; launch/landing and mission capabilities. |
| Opportunity / `SRC-003` NASA Science mission profile | `opportunity-site`, `opportunity-water`, `opportunity-distance`, `opportunity-objective`, `opportunity-tools`, `opportunity-timeline`, `opportunity-legacy` | Separate twin record; hematite evidence matching; last communication distinct from formal mission end. |
| Ingenuity / `SRC-006` NASA Science mission profile | `ingenuity-first-flight`, `ingenuity-flights`, `ingenuity-objective`, `ingenuity-capabilities`, `ingenuity-timeline`, `ingenuity-legacy` | Helicopter dossier and simplified flight checkpoint activity. |
| Surveyor 3 / `SRC-009` NASA Science mission profile | `surveyor-sampler`, `surveyor-apollo12`, `surveyor-objective`, `surveyor-tools`, `surveyor-timeline`, `surveyor-legacy` | Sampler dossier/activity; sampler tests; Apollo 12 revisit and returned hardware. |
| Apollo 17 LRV / `SRC-010` NSSDCA Lunar Roving Vehicle record | `apollo17-traverses`, `apollo17-longest-traverse`, `apollo17-objective`, `apollo17-capabilities`, `apollo17-timeline`, `apollo17-legacy` | Playable dossier and simplified route choice constrained by the documented 7.6 km maximum range. |
| Sojourner / `SRC-005` JPL profile plus `SRC-017` NSSDCA project page | `sojourner-objective`, `sojourner-tools`, `sojourner-legacy`, and four `sojourner-*` NSSDCA facts | Existing builder and dossier; Pathfinder lander arrival is distinguished from Sojourner surface deployment. |

English and Spanish display strings use stable `science.<fact_id>` dictionary keys. Source IDs and URLs remain attached to each structured fact. Apollo 15 and Apollo 16 stay in the catalog but are absent from mission maps, challenge configuration, and playable fragment totals.

## Verification boundary

The linked primary pages were reviewed for the listed claims. This does not validate every field in the eight-object catalog. Sojourner's 83-day operating duration remains attributed to its separate JPL source. Exact Sojourner final location and coordinates remain unverified. Other unresolved values remain preliminary and are not shown as game facts.
