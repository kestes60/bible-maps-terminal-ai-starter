// Bible Maps - Joshua 10 Campaign
// Interactive map with Leaflet

console.log('Bible Maps initializing...');

// Initialize map centered on Joshua 10 region (between Jerusalem and Hebron)
const map = L.map('map', {
  center: [31.6, 35.0],
  zoom: 9,
  minZoom: 7,
  maxZoom: 16
});

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// Add legend control
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'legend');
  div.innerHTML = `
    <h4>Confidence Level</h4>
    <div class="legend-item">
      <div class="legend-marker high"></div>
      <span>High (≥0.8)</span>
    </div>
    <div class="legend-item">
      <div class="legend-marker medium"></div>
      <span>Medium (0.5-0.79)</span>
    </div>
    <div class="legend-item">
      <div class="legend-marker low"></div>
      <span>Low (<0.5)</span>
    </div>
    <div class="legend-item">
      <div class="legend-marker uncertain"></div>
      <span>Uncertain (no geometry)</span>
    </div>
  `;
  return div;
};

legend.addTo(map);

// Helper: Get confidence level category
function getConfidenceCategory(confidence) {
  if (confidence >= 0.8) return 'high';
  if (confidence >= 0.5) return 'medium';
  return 'low';
}

// Helper: Get marker color based on confidence
function getMarkerColor(confidence) {
  if (confidence >= 0.8) return '#2563eb'; // blue
  if (confidence >= 0.5) return '#f59e0b'; // orange
  return '#ef4444'; // red
}

// Helper: Get marker opacity based on confidence
function getMarkerOpacity(confidence) {
  if (confidence >= 0.8) return 1.0;
  if (confidence >= 0.5) return 0.7;
  return 0.5;
}

// Helper: Create custom marker icon
function createMarkerIcon(confidence) {
  const color = getMarkerColor(confidence);
  const opacity = getMarkerOpacity(confidence);

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      opacity: ${opacity};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid rgba(0,0,0,0.3);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
  });
}

// Helper: Create popup HTML
function createPopupHTML(feature) {
  const props = feature.properties;
  const hasGeometry = feature.geometry !== null;

  // Get highest confidence from hypotheses
  let maxConfidence = 0;
  if (props.hypotheses && props.hypotheses.length > 0) {
    maxConfidence = Math.max(...props.hypotheses.map(h => h.confidence));
  }

  const confidenceCategory = getConfidenceCategory(maxConfidence);
  const confidenceClass = `confidence-${confidenceCategory}`;
  const confidencePercent = (maxConfidence * 100).toFixed(0);

  let html = `<div class="popup-title">${props.label}</div>`;

  // Scripture references
  if (props.scripture_refs && props.scripture_refs.length > 0) {
    html += `<div class="popup-section">
      <span class="popup-label">Scripture:</span> ${props.scripture_refs.join(', ')}
    </div>`;
  }

  // Confidence
  html += `<div class="popup-section">
    <span class="popup-label">Confidence:</span>
    <span class="popup-confidence ${confidenceClass}">${confidencePercent}%</span>
  </div>`;

  // Uncertainty radius
  if (props.uncertainty_radius_m !== null && props.uncertainty_radius_m !== undefined) {
    html += `<div class="popup-section">
      <span class="popup-label">Uncertainty:</span> ±${props.uncertainty_radius_m}m
    </div>`;
  }

  // Notes
  if (props.notes) {
    html += `<div class="popup-section">
      <span class="popup-label">Notes:</span> ${props.notes}
    </div>`;
  }

  // Hypotheses (show multiple location theories)
  if (props.hypotheses && props.hypotheses.length > 1) {
    html += `<div class="popup-hypotheses">
      <strong>Scholarly Hypotheses:</strong>`;

    props.hypotheses.forEach((hyp, index) => {
      const hypConfidence = (hyp.confidence * 100).toFixed(0);
      html += `<div class="hypothesis-item">
        <strong>${index + 1}.</strong> ${hyp.source} (${hypConfidence}% confidence)<br/>
        <small>${hyp.notes}</small>
      </div>`;
    });

    html += `</div>`;
  }

  // Sources
  if (props.sources && props.sources.length > 0) {
    html += `<div class="popup-sources">
      <strong>Sources:</strong> ${props.sources.join(', ')}
    </div>`;
  }

  // Special note for uncertain locations
  if (!hasGeometry) {
    html += `<div class="popup-section" style="color: #ef4444; font-weight: 500;">
      ⚠️ Location uncertain - no preferred geometry
    </div>`;
  }

  return html;
}

// Load and display GeoJSON data
fetch('../data/places.example.geojson')
  .then(response => response.json())
  .then(data => {
    console.log('Loaded GeoJSON data:', data);

    // Track bounds for auto-zoom
    const bounds = L.latLngBounds();
    let markerCount = 0;

    // Add each feature to the map
    data.features.forEach(feature => {
      const props = feature.properties;

      // Skip features without geometry (uncertain locations like Makkedah)
      if (!feature.geometry || feature.geometry.type !== 'Point') {
        console.log(`Skipping ${props.label} (no geometry)`);
        return;
      }

      const coords = feature.geometry.coordinates;
      const latLng = [coords[1], coords[0]]; // GeoJSON is [lon, lat], Leaflet needs [lat, lon]

      // Get confidence from hypotheses
      let maxConfidence = 0;
      if (props.hypotheses && props.hypotheses.length > 0) {
        maxConfidence = Math.max(...props.hypotheses.map(h => h.confidence));
      }

      // Create marker with custom icon
      const marker = L.marker(latLng, {
        icon: createMarkerIcon(maxConfidence),
        title: props.label
      });

      // Add popup
      marker.bindPopup(createPopupHTML(feature), {
        maxWidth: 300,
        className: 'custom-popup'
      });

      // Add to map
      marker.addTo(map);

      // Extend bounds
      bounds.extend(latLng);
      markerCount++;

      console.log(`Added marker for ${props.label} at ${latLng} (confidence: ${maxConfidence})`);
    });

    // Fit map to markers with padding
    if (markerCount > 0) {
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 10
      });
    }

    console.log(`Loaded ${markerCount} locations successfully`);
  })
  .catch(error => {
    console.error('Error loading GeoJSON:', error);
    alert('Error loading map data. Please check the console for details.');
  });

console.log('Bible Maps initialized');
