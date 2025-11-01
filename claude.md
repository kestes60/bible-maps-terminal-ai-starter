
# Project: Bible Maps (Joshua 10 → Atlas)

## Vision
Create an interactive, research-grounded **Bible Maps** experience that links **biblical passages** to **modern geography**, **archaeological sites**, and **scholarly references**, starting with *Joshua 10* (campaign map) and growing into a PWA.

## First Milestones
1. **Data model & sources**: Identify canonical places, variant names, coordinates, confidence levels, scripture refs, and source citations.
2. **Prototype map** (web folder later): Render Joshua 10 campaign with toggles (cities, routes, terrain, annotations).
3. **Research pipeline**: Reproducible notes → `data/` (GeoJSON/CSV) with citations and version control.

## Guardrails
- Cite sources in `data/sources.md` and within data files where practical.
- Track uncertainty (multiple proposed locations, disputed identifications).
- Keep irreversible actions behind confirmation.

## Working Rules
- Keep this file current. Summarize **decisions**, **next 3 tasks**, **open questions**.
- Prefer writing to files over long chat threads.
- Small, verifiable steps; always runnable after fresh clone.

## Open Questions (seed)
- Primary open datasets for ancient Near East geography (GeoJSON/CSV)?
- Best approach to route reconstruction vs. symbolic paths?
- How to encode multiple scholarly opinions per site?
