
# places.schema.md

**Goal:** A flexible schema for ancient places with multiple hypotheses, citations, and uncertainty.

## Fields
- `id` (string): stable identifier (e.g., 'heb-001')
- `label` (string): primary display name (e.g., 'Hebron')
- `alt_names` (string[]): known variants/transliterations
- `type` (enum): city | region | route | landmark | mountain | valley
- `coordinates` (Point | null): preferred coordinates (WGS84)
- `hypotheses` (array): list of alternative suggested locations
  - `coords` (Point): coordinates
  - `confidence` (0–1): subjective confidence
  - `source` (string): short citation key
  - `notes` (string): rationale/description
- `scripture_refs` (string[]): e.g., ['Josh 10:3–27']
- `sources` (string[]): citation keys appearing in `data/sources.md`
- `notes` (string): freeform notes
- `last_updated` (ISO8601)

## Example record
See `places.example.geojson` for a minimal example set.
