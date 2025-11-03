# Bible Maps — Joshua 10 (MVP)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-MVP-blue)
![PWA](https://img.shields.io/badge/PWA-ready-5a0)

Interactive map of Joshua 10 cities with citations and uncertainty visualization. Built with **Leaflet**, **GeoJSON**, and a **PWA** service worker for basic offline use.

## Demo
- **Local preview:** `python3 -m http.server 8080` then open http://localhost:8080/web/
- **Screenshot:**
  ![screenshot](docs/screenshot.png)

## Features
- Popups with scripture refs & confidence
- Legend w/ color coding (High/Medium/Low)
- PWA: manifest + service worker caching (tiles & GeoJSON)

## Data Sources
OpenBible.info, Pleiades Gazetteer, and AIBA (see `data/sources.md`).

## Quickstart
```bash
git clone https://github.com/kestes60/bible-maps-terminal-ai-starter
cd bible-maps-terminal-ai-starter
python3 -m http.server 8080
# visit http://localhost:8080/web/

---

### 🧭 See Also

For developers working with Claude, Cursor, or WSL:

➡️ [Developer Workflow Guide (README-dev.md)](./README-dev.md)
