
# places.schema.md

**Goal:** A flexible schema for ancient places with multiple hypotheses, citations, and uncertainty.

## Coordinate System

**All coordinates are WGS84 (EPSG:4326) in [longitude, latitude] order**, per RFC 7946 GeoJSON standard.
- Longitude (east/west): -180 to +180
- Latitude (north/south): -90 to +90
- Precision: 4 decimal places (~11 meter accuracy, appropriate for ancient settlement centers)

## Fields

- `id` (string): stable identifier (e.g., 'heb-001')
- `label` (string): primary display name (e.g., 'Hebron')
- `alt_names` (string[]): known variants/transliterations
- `type` (enum): city | region | route | landmark | mountain | valley
- `uncertainty_radius_m` (number): uncertainty radius in meters for the preferred geometry
- `hypotheses` (array): list of alternative suggested locations
  - `coords` (Point): coordinates [lon, lat]
  - `confidence` (0–1): subjective confidence score
  - `source` (string): short citation key
  - `notes` (string): rationale/description
  - `uncertainty_radius_m` (number, optional): uncertainty radius in meters for this hypothesis
- `scripture_refs` (string[]): e.g., ['Josh 10:3–27']
- `sources` (string[]): citation keys appearing in `data/sources.md`
- `notes` (string): freeform notes
- `last_updated` (ISO8601)

## Confidence Methodology

**Confidence Score** (`confidence`):
- Value range: 0.0 to 1.0 (subjective score based on scholarly consensus)
- **1.0**: Universal scholarly consensus (>99%), confirmed archaeology
- **0.9-0.95**: Strong majority consensus (>90%), clear archaeological evidence
- **0.8-0.89**: Scholarly consensus (>75%), good archaeological support
- **0.5-0.79**: Competing theories, plausible evidence
- **<0.5**: Speculative, weak evidence, multiple alternatives

**Uncertainty Radius** (`uncertainty_radius_m`):
- Spatial uncertainty in meters representing the area within which the ancient site likely existed
- Based on archaeological survey data, site extent, or scholarly disagreement range

**Geometry Selection**: The GeoJSON `geometry` field should be set to the coordinates of the highest-confidence hypothesis when confidence ≥0.5. For low-confidence locations (<0.5), set `geometry: null` and rely on the `hypotheses` array.

## Example record

See `places.example.geojson` for a minimal example set.
