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
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

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

// Helper: Get marker opacity based on confidence
function getMarkerOpacity(confidence) {
  if (confidence >= 0.8) return 1.0;
  if (confidence >= 0.5) return 0.8;
  return 0.6;
}

// Helper: Create custom marker icon
function createMarkerIcon(confidence) {
  const color = getConfidenceColor(confidence);
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

// Helper: Create popup HTML using POPUPS.md template
function createPopupHTML(feature) {
  const props = feature.properties;

  // Get highest confidence from hypotheses
  let maxConfidence = 0;
  if (props.hypotheses && props.hypotheses.length > 0) {
    maxConfidence = Math.max(...props.hypotheses.map(h => h.confidence));
  }

  const confidencePercent = (maxConfidence * 100).toFixed(0);
  const confidenceDecimal = maxConfidence.toFixed(2);

  // Build popup HTML using template from POPUPS.md
  let html = `<div class="place-popup" role="group" aria-label="Place details" data-confidence="${confidenceDecimal}">
    <header class="popup-header">
      <h2 class="place-title">${props.label}</h2>
      <span class="confidence-badge" title="Model confidence">${confidencePercent}%</span>
    </header>`;

  // Scripture references
  if (props.scripture_refs && props.scripture_refs.length > 0) {
    html += `
    <section class="scripture-refs">
      <h3 class="sr-only">Scripture references</h3>
      <ul class="refs-list">`;

    props.scripture_refs.forEach(ref => {
      html += `<li>${ref}</li>`;
    });

    html += `</ul>
    </section>`;
  }

  // Alternative hypotheses (if more than one exists)
  if (props.hypotheses && props.hypotheses.length > 1) {
    html += `
    <details class="alt-hypotheses">
      <summary>Alternative hypotheses</summary>
      <ul class="hypothesis-list">`;

    props.hypotheses.forEach(hyp => {
      const hypConfidence = (hyp.confidence * 100).toFixed(0);
      html += `<li>
        <span class="name">${hyp.source}</span> •
        <span class="confidence">${hypConfidence}%</span>
        ${hyp.notes ? `<br/><small>${hyp.notes}</small>` : ''}
      </li>`;
    });

    html += `</ul>
    </details>`;
  }

  html += `</div>`;

  return html;
}

// Load and display GeoJSON data using L.geoJSON
fetch('../data/places.example.geojson')
  .then(response => response.json())
  .then(data => {
    console.log('Loaded GeoJSON data:', data);

    // Use L.geoJSON with pointToLayer for cleaner implementation
    const geojsonLayer = L.geoJSON(data, {
      // Only render features with geometry (confidence >= 0.5)
      filter: function(feature) {
        return feature.geometry !== null && feature.geometry.type === 'Point';
      },

      // Convert each point to a marker with custom icon
      pointToLayer: function(feature, latlng) {
        const props = feature.properties;

        // Get confidence from hypotheses
        let maxConfidence = 0;
        if (props.hypotheses && props.hypotheses.length > 0) {
          maxConfidence = Math.max(...props.hypotheses.map(h => h.confidence));
        }

        // Create marker with custom icon
        const marker = L.marker(latlng, {
          icon: createMarkerIcon(maxConfidence),
          title: props.label
        });

        // Add popup
        marker.bindPopup(createPopupHTML(feature), {
          maxWidth: 300,
          className: 'custom-popup'
        });

        console.log(`Added marker for ${props.label} at [${latlng.lat}, ${latlng.lng}] (confidence: ${maxConfidence})`);

        return marker;
      }
    });

    // Add layer to map
    geojsonLayer.addTo(map);

    // Fit map to markers with padding
    if (geojsonLayer.getBounds().isValid()) {
      map.fitBounds(geojsonLayer.getBounds(), {
        padding: [50, 50],
        maxZoom: 10
      });
    }

    console.log(`Loaded ${Object.keys(geojsonLayer._layers).length} locations successfully`);
  })
  .catch(error => {
    console.error('Error loading GeoJSON:', error);
    alert('Error loading map data. Please check the console for details.');
  });

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

console.log('Bible Maps initialized');
