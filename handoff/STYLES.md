# Marker styles + mapping helper (canonical)

## CSS (badges for legend/UI — not required by Leaflet itself)
```css
/* Confidence marker badges used in legends/UI (not required by Leaflet itself).
   Colors aim for strong contrast on common basemaps (OSM, Carto). */
.marker-high,
.marker-medium {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.15rem 0.45rem;
  border: 2px solid transparent;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1;
}

/* High = green */
.marker-high {
  background: #137b3a;     /* dark green fill for readability */
  border-color: #0e5a2b;   /* darker edge for separation */
  color: #ffffff;          /* WCAG-friendly contrast */
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.15) inset;
}

/* Medium = amber */
.marker-medium {
  background: #b35c00;     /* dark amber */
  border-color: #8a4800;   /* darker edge */
  color: #ffffff;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.15) inset;
}

/* Legend swatches (for the floating legend UI) */
.legend-swatch { display:inline-block; width:12px; height:12px; margin-right:6px; border-radius:50%; }
.legend-high   { background:#137b3a; border:2px solid #0e5a2b; }
.legend-medium { background:#b35c00; border:2px solid #8a4800; }
.legend-low    { background:#6b7280; border:2px solid #4b5563; } /* gray for low/unknown */
```

## JavaScript mapping helper
```javascript
/**
 * Returns CSS color for Leaflet marker based on confidence score.
 * - High (≥0.8):   #137b3a (green)
 * - Medium (≥0.5): #b35c00 (amber)
 * - Low (<0.5):    #6b7280 (gray)
 */
function getConfidenceColor(confidence) {
  if (confidence >= 0.8) return '#137b3a';
  if (confidence >= 0.5) return '#b35c00';
  return '#6b7280';
}

/**
 * Returns CSS class name for marker styling.
 */
function getConfidenceClass(confidence) {
  if (confidence >= 0.8) return 'marker-high';
  if (confidence >= 0.5) return 'marker-medium';
  return 'marker-low';
}
```

## Usage notes
- **Map markers**: Use `getConfidenceColor()` to style Leaflet circle markers or divIcon backgrounds.
- **Legend/UI badges**: Use `.marker-high`, `.marker-medium` CSS classes for buttons, labels, legend items.
- **Thresholds**: High ≥0.8, Medium ≥0.5, Low <0.5
- **Color rationale**: Dark green/amber chosen for visibility on light OSM basemap; avoids blue (conflicts with water features).
