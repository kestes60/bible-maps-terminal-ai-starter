# Bible Maps Web Prototype

Interactive map of Joshua 10 campaign locations using Leaflet.

## Quick Start

Open `index.html` in a web browser. No build step required!

**Option 1: Direct File Access**
```bash
# Open directly in browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

**Option 2: Local HTTP Server** (recommended to avoid CORS issues)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000

# Then visit: http://localhost:8000
```

## Features

✅ **Interactive Map**
- 9 Joshua 10 locations displayed (Makkedah excluded due to uncertainty)
- Color-coded markers by confidence level
- Click markers for detailed information

✅ **Confidence Visualization**
- **Blue (High ≥80%)**: Jerusalem, Lachish (100% confidence)
- **Orange (Medium 50-79%)**: Gibeon, Hebron, Jarmuth, Eglon, Debir, Libnah, Azekah (85-92%)
- **Red (Low <50%)**: Not rendered on map (hypotheses available in data)

✅ **Rich Popups**
- Place name and scripture references
- Confidence percentage
- Uncertainty radius (±meters)
- Scholarly hypotheses (when multiple exist)
- Source attributions

✅ **Map Legend**
- Bottom-right corner
- Explains confidence level colors

✅ **Source Attribution**
- OpenStreetMap tiles
- OpenBible.info, Pleiades, AIBA data sources

## Technology Stack

- **Leaflet 1.9.4** - Open-source interactive maps
- **OpenStreetMap** - Free map tiles
- **Vanilla JavaScript** - No frameworks, fast loading
- **RFC 7946 GeoJSON** - Standard geospatial data format

## Data

Map loads `../data/places.example.geojson`:
- 10 Joshua 10 locations
- WGS84 coordinates (EPSG:4326)
- Multiple scholarly hypotheses per site
- Confidence scores based on scholarly consensus
- Full source citations

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

See `../tasks/TODO.md` for roadmap:
- Route visualization (Joshua's campaign path)
- Terrain/elevation overlays
- Offline PWA caching
- Search/filter functionality
- Timeline slider (Bronze Age vs Iron Age)
