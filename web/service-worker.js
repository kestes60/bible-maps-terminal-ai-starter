// Bible Maps Service Worker v1
// Implements PWA caching strategies per SERVICE_WORKER_PLAN.md

const CACHE_VERSION = 'v1';
const GEOJSON_CACHE = `geojson-${CACHE_VERSION}`;
const TILES_CACHE = `tiles-${CACHE_VERSION}`;
const MAX_TILE_ENTRIES = 200;

// Install event: pre-cache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting(); // Activate immediately
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('geojson-') || name.startsWith('tiles-'))
          .filter((name) => name !== GEOJSON_CACHE && name !== TILES_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  return self.clients.claim(); // Take control immediately
});

// Fetch event: implement caching strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Strategy 1: Cache-first for GeoJSON data
  if (url.pathname.endsWith('.geojson')) {
    event.respondWith(
      caches.open(GEOJSON_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] GeoJSON from cache:', url.pathname);
            return cachedResponse;
          }

          // Not in cache, fetch and cache
          return fetch(event.request).then((response) => {
            if (response.ok) {
              cache.put(event.request, response.clone());
              console.log('[SW] GeoJSON cached:', url.pathname);
            }
            return response;
          });
        });
      }).catch(() => {
        // Offline fallback for GeoJSON
        return new Response(
          JSON.stringify({ error: 'Offline - GeoJSON data unavailable' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Strategy 2: Stale-while-revalidate for map tiles (with LRU cap)
  if (url.pathname.match(/\/tile.*\.(png|jpg|jpeg)$/i)) {
    event.respondWith(
      caches.open(TILES_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Return cached tile immediately if available
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              // Cache the new tile and enforce LRU limit
              cache.put(event.request, networkResponse.clone()).then(() => {
                enforceTileCacheLimit(cache);
              });
            }
            return networkResponse;
          }).catch(() => {
            // Network failed, return cached version if available
            return cachedResponse;
          });

          // Return cached immediately, update in background
          return cachedResponse || fetchPromise;
        });
      }).catch(() => {
        // Offline fallback for tiles
        return fetch(event.request);
      })
    );
    return;
  }

  // Strategy 3: Network-first for everything else (HTML, JS, CSS)
  event.respondWith(
    fetch(event.request).catch(() => {
      // Offline fallback message
      if (event.request.mode === 'navigate') {
        return new Response(
          `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>Offline - Bible Maps</title>
            <style>
              body { 
                margin: 0; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                font-family: system-ui, sans-serif;
                background: #f5f5f5;
              }
              .message { 
                text-align: center; 
                padding: 2rem; 
                background: white; 
                border-radius: 8px; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              h1 { color: #137b3a; margin: 0 0 1rem 0; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <div class="message">
              <h1>You're Offline</h1>
              <p>Bible Maps requires an internet connection to load.</p>
              <p>Please check your connection and try again.</p>
            </div>
          </body>
          </html>`,
          {
            headers: { 'Content-Type': 'text/html' }
          }
        );
      }
    })
  );
});

// Helper: Enforce LRU cache limit for tiles (~200 entries)
async function enforceTileCacheLimit(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_TILE_ENTRIES) {
    // Delete oldest entries (first in keys array)
    const deleteCount = keys.length - MAX_TILE_ENTRIES;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
    console.log(`[SW] Enforced tile cache limit: deleted ${deleteCount} old tiles`);
  }
}
