# Bible Maps — Joshua 10 (MVP)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-MVP-blue)
![PWA](https://img.shields.io/badge/PWA-ready-5a0)

Interactive map of Joshua 10 cities with citations and uncertainty visualization. Built with **Leaflet**, **GeoJSON**, and a **PWA** service worker for basic offline use.

<p align="center">
  <img src="web/icons/icon-192.png" width="96" alt="Bible Maps Icon"/>
</p>

<h1 align="center">Bible Maps – Joshua 10 Campaign</h1>
<p align="center">
  <em>Interactive Leaflet + PWA prototype built with Claude Code and Cursor</em>
</p>

<p align="center">
  <a href="https://github.com/kestes60/bible-maps-terminal-ai-starter/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/kestes60/bible-maps-terminal-ai-starter/deploy.yml?label=Build&logo=github&style=flat-square" alt="Build Status"/>
  </a>
  <a href="https://github.com/kestes60/bible-maps-terminal-ai-starter/releases">
    <img src="https://img.shields.io/github/v/release/kestes60/bible-maps-terminal-ai-starter?label=Version&logo=semantic-release&style=flat-square" alt="Release Version"/>
  </a>
  <a href="https://bible-maps-terminal-ai-starter.netlify.app/">
    <img src="https://img.shields.io/badge/PWA-Ready-success?style=flat-square&logo=pwa" alt="PWA Ready"/>
  </a>
  <a href="https://github.com/kestes60/bible-maps-terminal-ai-starter/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kestes60/bible-maps-terminal-ai-starter?style=flat-square" alt="License"/>
  </a>
</p>

---

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
