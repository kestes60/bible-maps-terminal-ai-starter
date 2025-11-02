## Tiny floating legend for Leaflet (bottom-right, mobile-safe)

Use this HTML + CSS to render a small legend overlay. The optional note is hidden by default; add the class `legend--show-note` to the container to display it.

### HTML
```html
<!-- Floating Legend: place in your HTML (e.g., near the end of <body>) -->
<div class="leaflet-legend" id="map-legend" role="note" aria-label="Map legend">
	<div class="legend-row">
		<span class="legend-swatch" style="--swatch:#137b3a"></span>
		<span class="legend-label">High (≥0.8)</span>
	</div>
	<div class="legend-row">
		<span class="legend-swatch" style="--swatch:#b35c00"></span>
		<span class="legend-label">Medium (≥0.5)</span>
	</div>
	<div class="legend-row">
		<span class="legend-swatch" style="--swatch:#6b7280"></span>
		<span class="legend-label">Low/Unknown</span>
	</div>
	<!-- Optional: show this note by adding class 'legend--show-note' to .leaflet-legend -->
	<div class="legend-note" aria-hidden="true">Not plotted (uncertain)</div>
</div>
```

### CSS
```css
/*
	Leaflet Floating Legend styles
	- Positions in the bottom-right with safe-area awareness
	- Compact sizing and legible on mobile
	- Show optional note by toggling class 'legend--show-note'
*/
.leaflet-legend {
	position: fixed;
	right: max(12px, env(safe-area-inset-right));
	bottom: max(12px, env(safe-area-inset-bottom));
	z-index: 1000; /* above map tiles and controls */

	background: rgba(255, 255, 255, 0.96);
	backdrop-filter: blur(6px);
	border: 1px solid rgba(0, 0, 0, 0.08);
	border-radius: 8px;
	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
	padding: 8px 10px;

	font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
	font-size: 12px;
	line-height: 1.2;
	color: #222;
	max-width: 90vw; /* prevent overflow on small screens */
	user-select: none;
	touch-action: manipulation;
}

.leaflet-legend .legend-row {
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 4px 0;
}

.leaflet-legend .legend-swatch {
	width: 12px;
	height: 12px;
	border-radius: 2px;
	background: var(--swatch, #999);
	border: 1px solid rgba(0, 0, 0, 0.2);
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.leaflet-legend .legend-label {
	white-space: nowrap;
}

/* Optional note: hidden by default, shown when container has .legend--show-note */
.leaflet-legend .legend-note {
	margin-top: 6px;
	font-size: 11px;
	color: #555;
	display: none;
}

.leaflet-legend.legend--show-note .legend-note {
	display: block;
}

/* Mobile tweaks */
@media (max-width: 480px) {
	.leaflet-legend {
		font-size: 13px;
		padding: 10px 12px;
	}
	.leaflet-legend .legend-swatch {
		width: 14px;
		height: 14px;
	}
}
```

### One-line JS injection for index.html
Place this near the end of `index.html` (before `</body>`). It inserts the legend HTML. To show the optional note, add `legend--show-note` to the inserted div’s `class` string.

```html
<script>document.body.insertAdjacentHTML('beforeend','<div class="leaflet-legend" id="map-legend" role="note" aria-label="Map legend"><div class="legend-row"><span class="legend-swatch" style="--swatch:#137b3a"></span><span class="legend-label">High (≥0.8)</span></div><div class="legend-row"><span class="legend-swatch" style="--swatch:#b35c00"></span><span class="legend-label">Medium (≥0.5)</span></div><div class="legend-row"><span class="legend-swatch" style="--swatch:#6b7280"></span><span class="legend-label">Low/Unknown</span></div><div class="legend-note">Not plotted (uncertain)</div></div>');</script>
```

Notes:
- Adjust swatch colors as needed to match your data visualization.
- Paste the CSS into your global stylesheet or a `<style>` tag in `index.html`’s `<head>`.
- If you want the note visible by default, either add the `legend--show-note` class in HTML/JS or remove the `display: none` rule for `.legend-note`.

