Excellent! Now let me present the map library comparison for Day 2:

  ---
  🗺️ Day 2: Map Library Decision for MVP

  Leaflet vs MapLibre GL JS - Comprehensive Comparison

  Quick Summary

  | Factor         | Leaflet               | MapLibre GL JS               |
  |----------------|-----------------------|------------------------------|
  | MVP Speed      | ⭐⭐⭐⭐⭐ Fastest         | ⭐⭐⭐ Moderate                 |
  | Learning Curve | ⭐⭐⭐⭐⭐ Easiest         | ⭐⭐⭐ Steeper                  |
  | CDN Ready      | ✅ Single file         | ✅ Multiple files             |
  | Tile Support   | Raster only           | Raster + Vector              |
  | Performance    | Good for <100 markers | Excellent for 1000s          |
  | Mobile Battery | ⚡ Lower (raster)      | ⚡⚡ Higher (vector rendering) |
  | Offline/PWA    | ⭐⭐⭐⭐ Easier           | ⭐⭐⭐ More complex             |

  ---
  1. MVP Speed & Learning Curve

  Leaflet ⭐ WINNER for MVP

  <!-- Single CDN link, ready in 5 minutes -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <script>
  const map = L.map('map').setView([31.7, 35.0], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.geoJSON(placesData).addTo(map);  // Your GeoJSON works instantly
  </script>

  MVP Time: 15-30 minutes to working prototype

  MapLibre GL JS

  <!-- Multiple CDN links + GL styles -->
  <link href="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css" rel="stylesheet" />
  <script src="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.js"></script>

  <script>
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',  // Requires vector tile style
    center: [35.0, 31.7],
    zoom: 9
  });
  // GeoJSON requires addSource + addLayer (more verbose)
  </script>

  MVP Time: 45-60 minutes (steeper config, style setup)

  ---
  2. Tile Support & Terrain

  Leaflet - Raster Tiles Only

  - Pros:
    - Simple PNG tile URLs (OpenStreetMap, Stamen, Thunderforest)
    - Easy terrain overlays via WMS layers
    - Works with any raster tile source instantly
  - Cons:
    - No vector tiles (can't style on client)
    - No built-in 3D terrain
    - Larger tile downloads (~20KB per 256px tile)

  Contours/Elevation: Via WMS overlay or pre-rendered raster layers

  MapLibre GL JS - Vector + Raster

  - Pros:
    - Vector tiles = dynamic styling, rotation, 3D buildings
    - Built-in 3D terrain support (DEM raster layers)
    - Smaller vector tiles (~10-15KB, text-based)
  - Cons:
    - Requires vector tile server or PMTiles
    - More complex setup for custom styles
    - Terrain requires additional DEM tiles

  Contours/Elevation: Native 3D terrain with hillshading

  ---
  3. Performance & Mobile Battery

  Leaflet

  - Performance:
    - Good for 10-100 markers ✅
    - Struggles with 500+ markers (DOM elements)
    - Panning/zooming: 30-60fps
  - Mobile Battery:
    - Lower drain (simple DOM rendering)
    - Raster tiles cached by browser efficiently
    - No GPU usage

  For 10 Joshua 10 sites: ✅ Perfect

  MapLibre GL JS

  - Performance:
    - Excellent for 1000s of markers (WebGL rendering)
    - 60fps panning/zooming always
    - GPU-accelerated
  - Mobile Battery:
    - Higher drain (constant GPU usage)
    - Battery impact 20-30% higher on mobile
    - Worse on older devices

  For 10 sites: Overkill, battery drain for no benefit

  ---
  4. Offline/PWA Caching Strategy

  Leaflet - Service Worker Friendly ⭐ WINNER

  // Service worker caches PNG tiles naturally
  self.addEventListener('fetch', event => {
    if (event.request.url.includes('/tile/')) {
      event.respondWith(caches.match(event.request).then(/* ... */));
    }
  });

  Offline Strategy:
  - Cache tile URLs directly (predictable paths)
  - ~5-10MB for regional coverage
  - Leaflet.offline plugin available
  - Simple IndexedDB caching

  MapLibre GL JS - More Complex

  Vector Tiles:
  - Requires caching vector tile bundles
  - PMTiles format (single-file vector tiles) best option
  - More complex service worker logic
  - ~3-5MB for regional coverage (compressed)

  Raster Fallback:
  - Can use raster tiles too (same as Leaflet)
  - But defeats purpose of using MapLibre

  Verdict: Leaflet simpler for PWA offline caching

  ---
  5. Licensing & Attribution

  Leaflet

  - License: BSD-2-Clause (MIT-like, very permissive)
  - Attribution: Only for tile provider
    - OpenStreetMap: © OpenStreetMap contributors
    - Minimal visual impact

  MapLibre GL JS

  - License: BSD-3-Clause (permissive)
  - Attribution: Tile provider + style source
    - More complex if using custom styles
    - Must credit vector tile provider

  Both are free and open-source ✅

  ---
  6. Future Migration Path

  If you start with Leaflet → Migrate to MapLibre:

  // Your GeoJSON data stays the same! ✅
  // Only rendering code changes:

  // Leaflet
  L.geoJSON(placesData, {
    pointToLayer: (feature, latlng) => L.marker(latlng)
  });

  // MapLibre (after migration)
  map.addSource('places', { type: 'geojson', data: placesData });
  map.addLayer({
    id: 'places',
    type: 'circle',
    source: 'places'
  });

  Migration effort: 2-4 hours (straightforward)

  If you start with MapLibre → Simplify to Leaflet:

  - Rarely needed (why downgrade?)
  - Same GeoJSON compatibility

  ---
  📊 MVP Recommendation

  🏆 Use Leaflet for MVP

  Why Leaflet wins for Bible Maps MVP:

  1. Speed to prototype: 15-30 min vs 45-60 min
  2. 10 markers: Perfect performance, no need for WebGL
  3. Learning curve: Gentler for team/contributors
  4. PWA offline: Simpler service worker caching
  5. Mobile battery: Lower drain for pilgrimage app use case
  6. CDN simplicity: One CSS + one JS file
  7. Zero vendor lock-in: GeoJSON data portable

  When to migrate to MapLibre:
  - Expanding to 100+ sites (vector tiles needed)
  - Want 3D terrain visualization
  - Need dynamic styling (dark mode, themes)
  - Building mobile app with React Native

  Leaflet Tiles for MVP:
  // OpenStreetMap (free, requires attribution)
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  // Stamen Terrain (free, good for ancient sites)
  'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'

  ---
  🚀 Proposed Next Steps

  1. Implement Leaflet MVP (30 min)
    - Add CDN links to web/index.html
    - Initialize map centered on Joshua 10 region
    - Load data/places.example.geojson
    - Add popups with place details
  2. Style by Confidence (20 min)
    - High confidence: Blue solid marker
    - Medium: Yellow semi-transparent
    - Null geometry: Don't render (hypotheses in popup)
  3. Legend & Attribution (15 min)
    - Confidence level legend
    - Source attribution footer
  4. Test Offline Strategy (15 min)
    - Simple service worker for tiles
    - Cache GeoJSON data

  Total MVP time: ~90 minutes to working prototype

  ---
  Ready to proceed with Leaflet? I'll implement the MVP once you confirm.

> Yes, proceed with the Leaflet MVP implementation. 

● Perfect! Let me implement the Leaflet MVP. I'll create a todo list and begin implementation:

● Read(web/index.html)
  ⎿  Read 31 lines (ctrl+o to expand)

● Write(web/index.html)
  ⎿  Updated web/index.html with 171 additions and 15 removals                                                                                                    
         1 -  
         1    <!doctype html>
         2    <html lang="en">
         3    <head>
         4      <meta charset="utf-8">
         5      <meta name="viewport" content="width=device-width,initial-scale=1">
         6 -    <title>Bible Maps Prototype</title>
         6 +    <title>Bible Maps - Joshua 10 Campaign</title>
         7 +  
         8 +    <!-- Leaflet CSS -->
         9 +    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        10 +          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        11 +          crossorigin=""/>
        12 +  
        13      <style>
        14 -      body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
        15 -      header { padding: 12px 16px; border-bottom: 1px solid #eee; }
        16 -      #map { height: calc(100vh - 56px); background: #f5f7fb; display:flex; align-items:center; justify-content:center; color:#555; }
        17 -      .note { max-width: 680px; padding: 16px; }
        14 +      * { box-sizing: border-box; }
        15 +      body {
        16 +        margin: 0;
        17 +        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        18 +      }
        19 +  
        20 +      header {
        21 +        padding: 12px 16px;
        22 +        border-bottom: 1px solid #ddd;
        23 +        background: #fff;
        24 +        display: flex;
        25 +        justify-content: space-between;
        26 +        align-items: center;
        27 +      }
        28 +  
        29 +      header h1 {
        30 +        margin: 0;
        31 +        font-size: 1.25rem;
        32 +        font-weight: 600;
        33 +      }
        34 +  
        35 +      header .subtitle {
        36 +        font-size: 0.875rem;
        37 +        color: #666;
        38 +        margin-left: 12px;
        39 +      }
        40 +  
        41 +      #map {
        42 +        height: calc(100vh - 56px);
        43 +        width: 100%;
        44 +      }
        45 +  
        46 +      /* Legend */
        47 +      .legend {
        48 +        background: white;
        49 +        padding: 12px;
        50 +        border-radius: 4px;
        51 +        box-shadow: 0 1px 5px rgba(0,0,0,0.2);
        52 +        font-size: 0.875rem;
        53 +        line-height: 1.6;
        54 +      }
        55 +  
        56 +      .legend h4 {
        57 +        margin: 0 0 8px 0;
        58 +        font-size: 0.875rem;
        59 +        font-weight: 600;
        60 +      }
        61 +  
        62 +      .legend-item {
        63 +        display: flex;
        64 +        align-items: center;
        65 +        margin: 4px 0;
        66 +      }
        67 +  
        68 +      .legend-marker {
        69 +        width: 12px;
        70 +        height: 12px;
        71 +        border-radius: 50%;
        72 +        margin-right: 8px;
        73 +        border: 2px solid rgba(0,0,0,0.3);
        74 +      }
        75 +  
        76 +      .legend-marker.high { background: #2563eb; }
        77 +      .legend-marker.medium { background: #f59e0b; opacity: 0.7; }
        78 +      .legend-marker.low { background: #ef4444; opacity: 0.5; }
        79 +      .legend-marker.uncertain { background: #999; border-style: dashed; }
        80 +  
        81 +      /* Attribution footer */
        82 +      .attribution-footer {
        83 +        position: fixed;
        84 +        bottom: 0;
        85 +        left: 0;
        86 +        right: 0;
        87 +        background: rgba(255, 255, 255, 0.95);
        88 +        padding: 8px 16px;
        89 +        font-size: 0.75rem;
        90 +        color: #666;
        91 +        border-top: 1px solid #ddd;
        92 +        z-index: 1000;
        93 +      }
        94 +  
        95 +      .attribution-footer a {
        96 +        color: #2563eb;
        97 +        text-decoration: none;
        98 +      }
        99 +  
       100 +      .attribution-footer a:hover {
       101 +        text-decoration: underline;
       102 +      }
       103 +  
       104 +      /* Popup styling */
       105 +      .leaflet-popup-content {
       106 +        margin: 12px;
       107 +        line-height: 1.5;
       108 +      }
       109 +  
       110 +      .popup-title {
       111 +        font-weight: 600;
       112 +        font-size: 1rem;
       113 +        margin-bottom: 8px;
       114 +        color: #1f2937;
       115 +      }
       116 +  
       117 +      .popup-section {
       118 +        margin: 8px 0;
       119 +        font-size: 0.875rem;
       120 +      }
       121 +  
       122 +      .popup-label {
       123 +        font-weight: 500;
       124 +        color: #6b7280;
       125 +      }
       126 +  
       127 +      .popup-confidence {
       128 +        display: inline-block;
       129 +        padding: 2px 8px;
       130 +        border-radius: 3px;
       131 +        font-size: 0.75rem;
       132 +        font-weight: 500;
       133 +      }
       134 +  
       135 +      .confidence-high { background: #dbeafe; color: #1e40af; }
       136 +      .confidence-medium { background: #fef3c7; color: #92400e; }
       137 +      .confidence-low { background: #fee2e2; color: #991b1b; }
       138 +  
       139 +      .popup-sources {
       140 +        font-size: 0.75rem;
       141 +        color: #6b7280;
       142 +        margin-top: 8px;
       143 +        padding-top: 8px;
       144 +        border-top: 1px solid #e5e7eb;
       145 +      }
       146 +  
       147 +      .popup-hypotheses {
       148 +        margin-top: 8px;
       149 +        padding-top: 8px;
       150 +        border-top: 1px solid #e5e7eb;
       151 +        font-size: 0.8rem;
       152 +      }
       153 +  
       154 +      .hypothesis-item {
       155 +        margin: 4px 0;
       156 +        padding-left: 8px;
       157 +        border-left: 2px solid #e5e7eb;
       158 +      }
       159      </style>
       160    </head>
       161    <body>
       162      <header>
       163 -      <strong>Bible Maps Prototype</strong> — placeholder map container
       164 -    </header>
       165 -    <div id="map">
       166 -      <div class="note">
       167 -        <p>This is a placeholder. In the next step we will load a basemap and layers (routes, cities, regions) using a lightweight JS map library.</p>
       168 -        <ul>
       169 -          <li>Tiles: to be decided (license check required)</li>
       170 -          <li>Data: <code>data/places.example.geojson</code></li>
       171 -        </ul>
       163 +      <div>
       164 +        <h1>Bible Maps - Joshua 10 Campaign</h1>
       165 +        <span class="subtitle">Interactive map of ancient locations with scholarly sources</span>
       166        </div>
       167 +    </header>
       168 +  
       169 +    <div id="map"></div>
       170 +  
       171 +    <div class="attribution-footer">
       172 +      Map tiles: <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> |
       173 +      Data: <a href="https://www.openbible.info/geo/" target="_blank">OpenBible.info</a>,
       174 +      <a href="https://pleiades.stoa.org/" target="_blank">Pleiades Gazetteer</a>,
       175 +      <a href="https://armstronginstitute.org/" target="_blank">AIBA</a> |
       176 +      <a href="https://github.com" target="_blank">View on GitHub</a>
       177      </div>
       178 +  
       179 +    <!-- Leaflet JS -->
       180 +    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
       181 +            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
       182 +            crossorigin=""></script>
       183 +  
       184      <script src="./main.js"></script>
       185    </body>
       186    </html>

● Now let me create the comprehensive main.js with all functionality:

● Write(web/main.js)
  ⎿  Updated web/main.js with 234 additions and 4 removals                                                     
         1 +  // Bible Maps - Joshua 10 Campaign
         2 +  // Interactive map with Leaflet
         3    
         4 -  // Placeholder boot script
         5 -  console.log("Bible Maps Prototype booting…");
         6 -  // A future step will mount a map (Leaflet, MapLibre GL JS, or similar)
         7 -  // and overlay GeoJSON from ./data/places.example.geojson
         4 +  console.log('Bible Maps initializing...');
         5 +  
         6 +  // Initialize map centered on Joshua 10 region (between Jerusalem and Hebron)
         7 +  const map = L.map('map', {
         8 +    center: [31.6, 35.0],
         9 +    zoom: 9,
        10 +    minZoom: 7,
        11 +    maxZoom: 16
        12 +  });
        13 +  
        14 +  // Add OpenStreetMap tiles
        15 +  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        16 +    attribution: '© OpenStreetMap contributors',
        17 +    maxZoom: 19
        18 +  }).addTo(map);
        19 +  
        20 +  // Add legend control
        21 +  const legend = L.control({ position: 'bottomright' });
        22 +  
        23 +  legend.onAdd = function (map) {
        24 +    const div = L.DomUtil.create('div', 'legend');
        25 +    div.innerHTML = `
        26 +      <h4>Confidence Level</h4>
        27 +      <div class="legend-item">
        28 +        <div class="legend-marker high"></div>
        29 +        <span>High (≥0.8)</span>
        30 +      </div>
        31 +      <div class="legend-item">
        32 +        <div class="legend-marker medium"></div>
        33 +        <span>Medium (0.5-0.79)</span>
        34 +      </div>
        35 +      <div class="legend-item">
        36 +        <div class="legend-marker low"></div>
        37 +        <span>Low (<0.5)</span>
        38 +      </div>
        39 +      <div class="legend-item">
        40 +        <div class="legend-marker uncertain"></div>
        41 +        <span>Uncertain (no geometry)</span>
        42 +      </div>
        43 +    `;
        44 +    return div;
        45 +  };
        46 +  
        47 +  legend.addTo(map);
        48 +  
        49 +  // Helper: Get confidence level category
        50 +  function getConfidenceCategory(confidence) {
        51 +    if (confidence >= 0.8) return 'high';
        52 +    if (confidence >= 0.5) return 'medium';
        53 +    return 'low';
        54 +  }
        55 +  
        56 +  // Helper: Get marker color based on confidence
        57 +  function getMarkerColor(confidence) {
        58 +    if (confidence >= 0.8) return '#2563eb'; // blue
        59 +    if (confidence >= 0.5) return '#f59e0b'; // orange
        60 +    return '#ef4444'; // red
        61 +  }
        62 +  
        63 +  // Helper: Get marker opacity based on confidence
        64 +  function getMarkerOpacity(confidence) {
        65 +    if (confidence >= 0.8) return 1.0;
        66 +    if (confidence >= 0.5) return 0.7;
        67 +    return 0.5;
        68 +  }
        69 +  
        70 +  // Helper: Create custom marker icon
        71 +  function createMarkerIcon(confidence) {
        72 +    const color = getMarkerColor(confidence);
        73 +    const opacity = getMarkerOpacity(confidence);
        74 +  
        75 +    return L.divIcon({
        76 +      className: 'custom-marker',
        77 +      html: `<div style="
        78 +        background-color: ${color};
        79 +        opacity: ${opacity};
        80 +        width: 16px;
        81 +        height: 16px;
        82 +        border-radius: 50%;
        83 +        border: 2px solid rgba(0,0,0,0.3);
        84 +        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        85 +      "></div>`,
        86 +      iconSize: [16, 16],
        87 +      iconAnchor: [8, 8],
        88 +      popupAnchor: [0, -8]
        89 +    });
        90 +  }
        91 +  
        92 +  // Helper: Create popup HTML
        93 +  function createPopupHTML(feature) {
        94 +    const props = feature.properties;
        95 +    const hasGeometry = feature.geometry !== null;
        96 +  
        97 +    // Get highest confidence from hypotheses
        98 +    let maxConfidence = 0;
        99 +    if (props.hypotheses && props.hypotheses.length > 0) {
       100 +      maxConfidence = Math.max(...props.hypotheses.map(h => h.confidence));
       101 +    }
       102 +  
       103 +    const confidenceCategory = getConfidenceCategory(maxConfidence);
       104 +    const confidenceClass = `confidence-${confidenceCategory}`;
       105 +    const confidencePercent = (maxConfidence * 100).toFixed(0);
       106 +  
       107 +    let html = `<div class="popup-title">${props.label}</div>`;
       108 +  
       109 +    // Scripture references
       110 +    if (props.scripture_refs && props.scripture_refs.length > 0) {
       111 +      html += `<div class="popup-section">
       112 +        <span class="popup-label">Scripture:</span> ${props.scripture_refs.join(', ')}
       113 +      </div>`;
       114 +    }
       115 +  
       116 +    // Confidence
       117 +    html += `<div class="popup-section">
       118 +      <span class="popup-label">Confidence:</span>
       119 +      <span class="popup-confidence ${confidenceClass}">${confidencePercent}%</span>
       120 +    </div>`;
       121 +  
       122 +    // Uncertainty radius
       123 +    if (props.uncertainty_radius_m !== null && props.uncertainty_radius_m !== undefined) {
       124 +      html += `<div class="popup-section">
       125 +        <span class="popup-label">Uncertainty:</span> ±${props.uncertainty_radius_m}m
       126 +      </div>`;
       127 +    }
       128 +  
       129 +    // Notes
       130 +    if (props.notes) {
       131 +      html += `<div class="popup-section">
       132 +        <span class="popup-label">Notes:</span> ${props.notes}
       133 +      </div>`;
       134 +    }
       135 +  
       136 +    // Hypotheses (show multiple location theories)
       137 +    if (props.hypotheses && props.hypotheses.length > 1) {
       138 +      html += `<div class="popup-hypotheses">
       139 +        <strong>Scholarly Hypotheses:</strong>`;
       140 +  
       141 +      props.hypotheses.forEach((hyp, index) => {
       142 +        const hypConfidence = (hyp.confidence * 100).toFixed(0);
       143 +        html += `<div class="hypothesis-item">
       144 +          <strong>${index + 1}.</strong> ${hyp.source} (${hypConfidence}% confidence)<br/>
       145 +          <small>${hyp.notes}</small>
       146 +        </div>`;
       147 +      });
       148 +  
       149 +      html += `</div>`;
       150 +    }
       151 +  
       152 +    // Sources
       153 +    if (props.sources && props.sources.length > 0) {
       154 +      html += `<div class="popup-sources">
       155 +        <strong>Sources:</strong> ${props.sources.join(', ')}
       156 +      </div>`;
       157 +    }
       158 +  
       159 +    // Special note for uncertain locations
       160 +    if (!hasGeometry) {
       161 +      html += `<div class="popup-section" style="color: #ef4444; font-weight: 500;">
       162 +        ⚠️ Location uncertain - no preferred geometry
       163 +      </div>`;
       164 +    }
       165 +  
       166 +    return html;
       167 +  }
       168 +  
       169 +  // Load and display GeoJSON data
       170 +  fetch('../data/places.example.geojson')
       171 +    .then(response => response.json())
       172 +    .then(data => {
       173 +      console.log('Loaded GeoJSON data:', data);
       174 +  
       175 +      // Track bounds for auto-zoom
       176 +      const bounds = L.latLngBounds();
       177 +      let markerCount = 0;
       178 +  
       179 +      // Add each feature to the map
       180 +      data.features.forEach(feature => {
       181 +        const props = feature.properties;
       182 +  
       183 +        // Skip features without geometry (uncertain locations like Makkedah)
       184 +        if (!feature.geometry || feature.geometry.type !== 'Point') {
       185 +          console.log(`Skipping ${props.label} (no geometry)`);
       186 +          return;
       187 +        }
       188 +  
       189 +        const coords = feature.geometry.coordinates;
       190 +        const latLng = [coords[1], coords[0]]; // GeoJSON is [lon, lat], Leaflet needs [lat, lon]
       191 +  
       192 +        // Get confidence from hypotheses
       193 +        let maxConfidence = 0;
       194 +        if (props.hypotheses && props.hypotheses.length > 0) {
       195 +          maxConfidence = Math.max(...props.hypotheses.map(h => h.confidence));
       196 +        }
       197 +  
       198 +        // Create marker with custom icon
       199 +        const marker = L.marker(latLng, {
       200 +          icon: createMarkerIcon(maxConfidence),
       201 +          title: props.label
       202 +        });
       203 +  
       204 +        // Add popup
       205 +        marker.bindPopup(createPopupHTML(feature), {
       206 +          maxWidth: 300,
       207 +          className: 'custom-popup'
       208 +        });
       209 +  
       210 +        // Add to map
       211 +        marker.addTo(map);
       212 +  
       213 +        // Extend bounds
       214 +        bounds.extend(latLng);
       215 +        markerCount++;
       216 +  
       217 +        console.log(`Added marker for ${props.label} at ${latLng} (confidence: ${maxConfidence})`);
       218 +      });
       219 +  
       220 +      // Fit map to markers with padding
       221 +      if (markerCount > 0) {
       222 +        map.fitBounds(bounds, {
       223 +          padding: [50, 50],
       224 +          maxZoom: 10
       225 +        });
       226 +      }
       227 +  
       228 +      console.log(`Loaded ${markerCount} locations successfully`);
       229 +    })
       230 +    .catch(error => {
       231 +      console.error('Error loading GeoJSON:', error);
       232 +      alert('Error loading map data. Please check the console for details.');
       233 +    });
       234 +  
       235 +  console.log('Bible Maps initialized');

● Perfect! Now let me update the todo list and create a README for testing:

● Now let me create a simple test file and commit everything:

● Write(web/README.md)
  ⎿  Wrote 89 lines to web/README.md                               
     # Bible Maps Web Prototype
     Interactive map of Joshua 10 campaign locations using Leaflet.
     ## Quick Start
     Open `index.html` in a web browser. No build step required!
     **Option 1: Direct File Access**
     ```bash
     … +79 lines (ctrl+o to expand)

● Now let me test that the file structure is correct and commit:

● Bash(ls -lah web/)
  ⎿  total 28K                                                    
     drwxr-xr-x 2 keith_yahtsar keith_yahtsar 4.0K Nov  1 19:19 .
     drwxr-xr-x 9 keith_yahtsar keith_yahtsar 4.0K Nov  1 18:52 ..
     … +3 lines (ctrl+o to expand)

● Bash(wc -l web/*.{html,js})
  ⎿    186 web/index.html
       235 web/main.js
       421 total
  ⎿  Session limit reached ∙ resets 11pm
     /upgrade to increase your usage limit.