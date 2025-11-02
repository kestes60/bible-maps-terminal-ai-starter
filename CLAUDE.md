# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bible Maps** is an interactive, research-grounded mapping application that links biblical passages to modern geography, archaeological sites, and scholarly references. The project starts with Joshua 10 (campaign map) and will grow into a PWA atlas.

**Core Philosophy:**
- Source citations are mandatory (`data/sources.md`)
- Track uncertainty through multiple hypotheses
- Small, verifiable steps; always runnable after fresh clone
- Prefer writing to files over long chat threads
- Keep `claude.md` current with decisions, next 3 tasks, and open questions

## Key Commands

### Development Workflow
```bash
# Test the web prototype (static HTML)
# Option 1: Direct file open (may have CORS issues)
open web/index.html  # macOS
xdg-open web/index.html  # Linux
start web/index.html  # Windows

# Option 2: Local HTTP server (recommended)
cd web
python3 -m http.server 8000
# Visit: http://localhost:8000

# Expected: 9 markers on map, color-coded by confidence
# Click markers for popups with scripture refs and sources
```

### Git Workflow
```bash
# Session closer agent recommends this format:
git commit -m "chore(session): summary + decisions + next-steps (YYYY-MM-DD)"

# Always commit incrementally with meaningful messages
```

### Working with Agents
The project uses three specialized agents (define via `/agents` in Claude Code):

1. **Session Closer** (`agents/session_closer.md`) - End-of-session concierge
   - Updates `SESSION_SUMMARY.md` with date, changes, decisions, next 3 tasks, open questions
   - Updates `claude.md` Vision/Working Rules/Questions as needed
   - Stages (but doesn't commit) a git commit message

2. **Research Guru** (`agents/research_guru.md`) - Source-hunting specialist
   - Finds primary/authoritative sources for ancient geography
   - Writes citations to `data/sources.md` with full metadata
   - Records multiple location hypotheses with confidence levels

3. **Brutal Critic** (`agents/brutal_critic.md`) - Editorial reviewer
   - Scores work on Clarity, Evidence, Map Readiness (1-10)
   - Identifies top 5 blocking issues with concrete fixes
   - Suggests quick wins (≤5 min each)

## Architecture

### Data Layer (`data/`)

**GeoJSON Schema** (`places.schema.md`):
- Each feature has: `id`, `label`, `alt_names`, `type` (city/region/route/landmark/mountain/valley)
- **Uncertainty handling**: `hypotheses` array with alternative locations, each containing:
  - `coords` - WGS84 coordinates
  - `confidence` - 0-1 subjective score
  - `source` - citation key
  - `notes` - rationale
- Scripture references: `scripture_refs` array (e.g. `["Josh 10:3-27"]`)
- Sources: `sources` array referencing `data/sources.md` entries
- All coordinates are WGS84

**Example workflow:**
```javascript
// places.example.geojson structure
{
  "type": "FeatureCollection",
  "features": [{
    "id": "gib-001",
    "properties": {
      "label": "Gibeon",
      "hypotheses": [
        {"coords": [35.168, 31.857], "confidence": 0.8, "source": "OpenBible"},
        {"coords": [35.160, 31.865], "confidence": 0.4, "source": "AltScholarly"}
      ],
      // ... other fields
    },
    "geometry": {"type": "Point", "coordinates": [35.168, 31.857]}
  }]
}
```

### Web Layer (`web/`)

Functional Leaflet-based interactive map prototype:
- `index.html` (186 lines) - Full HTML5 shell with Leaflet CDN integration, responsive styling, confidence legend
- `main.js` (235 lines) - Complete map implementation with GeoJSON loading, confidence-based markers, interactive popups
- `README.md` - Quick start guide for testing the prototype

**Map Features**:
- OpenStreetMap tile provider with proper attribution
- Color-coded confidence markers (blue/orange/red)
- Rich popups with scripture refs, uncertainty radius, scholarly hypotheses
- Auto-zoom to fit all displayed locations
- No build step required - static HTML prototype

### Task Management (`tasks/`)

- `TODO.md` - Backlog of tasks, triage in Plan mode
- Keep tasks small and verifiable (≤30 min each)

### Documentation

- `claude.md` - Living context file (loaded automatically in this folder)
- `SESSION_SUMMARY.md` - Rolling session log (maintained by Session Closer agent)
- `README.md` - Project overview and quick start guide
- `prompts/kickoff_prompt.txt` - Example prompt for new Claude Code sessions

## Critical Patterns

### Uncertainty Representation
Never represent a single coordinate without considering scholarly debate. Use the `hypotheses` array to capture:
- Multiple proposed locations
- Confidence levels (0-1 scale)
- Source attribution
- Rationale/notes

### Source Attribution
Every data point must trace to `data/sources.md` with:
- Title, author, year
- URL/DOI
- License information
- Date accessed (for web sources)

**Default Reference Sources** (consult these first):
- OpenBible.info (biblical geography with confidence ratings)
- Pleiades Gazetteer (peer-reviewed ancient world locations)
- Armstrong Institute of Biblical Archaeology / AIBA (Jerusalem, southern kingdom excavations)
- BibleWalks, Biblical Archaeology Society (supplementary context)

### File-First Workflow
Prefer these patterns:
- ✅ Write research findings to `data/sources.md`
- ✅ Update `claude.md` with decisions
- ✅ Use agents to maintain `SESSION_SUMMARY.md`
- ❌ Long chat threads without file artifacts
- ❌ Data without source citations

### Guardrails
- Keep irreversible actions behind confirmation prompts
- Review file writes/commands with permissions ON
- Commit early and often with meaningful messages
- Never point tools at directories outside this project
- **Coordinates are WGS84 (EPSG:4326) in [longitude, latitude] order per RFC 7946**

## Key Decisions Made

### Day 2 (2025-11-01) - Leaflet MVP Implementation
1. **Map Library Selection**: Leaflet chosen over MapLibre GL JS for MVP
   - Decision criteria: Speed to prototype (15-30 min), simpler learning curve, better PWA caching, lower mobile battery drain
   - Migration path: GeoJSON data format remains portable for future scaling
2. **Tile Provider**: OpenStreetMap with proper attribution and licensing compliance
3. **Confidence Visualization**: Color-coded marker system (blue=high ≥80%, orange=medium 50-79%, red=low <50%)
4. **UI/UX Standards**:
   - Rich popups showing scripture references, uncertainty radius, multiple hypotheses, source citations
   - Confidence legend with visual indicators
   - Attribution footer with all data source credits
5. **Performance Optimization**: Static HTML prototype with no build step required, instant loading

### Day 1 (2025-11-01) - Foundation
1. **Source Strategy**: OpenBible.info + Pleiades Gazetteer as primary authoritative sources
2. **Uncertainty Handling**: Multi-hypothesis approach with confidence scoring (0.2-1.0 scale)
3. **Coordinate Standards**: WGS84 format, 4 decimal precision (~11m accuracy)
4. **Quality Standards**:
   - GeoJSON must include explicit CRS property
   - Geometry set to null for low-confidence locations
   - Confidence methodology documented in schema
5. **Agent Workflow**: Created three specialized agents (Session Closer, Research Guru, Brutal Critic)

## Session Workflow

### Daily Ritual
1. Work in small loops (≤30 min tasks)
2. Ask Claude to update `claude.md` with:
   - Decisions made
   - Next 3 tasks
   - Open questions
3. End session with **Session Closer** agent

### Starting a New Session
1. Review `claude.md` for current state
2. Check `SESSION_SUMMARY.md` for recent progress
3. Review `tasks/TODO.md` for backlog
4. Use starter prompts from `prompts/` if needed

## Next 3 Tasks (Day 3 Priorities)

1. **Cross-browser Testing** (15 min)
   - Test in Chrome, Firefox, Safari, mobile browsers
   - Verify marker display, popup functionality, responsiveness
   - Document any browser-specific issues

2. **Data Validation** (10 min)
   - Verify all 9 displayed locations have correct coordinates
   - Confirm confidence levels match scholarly sources
   - Test all popup content displays correctly

3. **Offline PWA Strategy** (30 min)
   - Implement service worker for tile caching
   - Enable offline map functionality
   - Test offline experience

## Open Questions (Current)

### Map Implementation ~~(Priority for Day 2)~~ ✅ RESOLVED
- ~~Map library: Leaflet vs MapLibre GL JS~~ → **Leaflet selected for MVP**
- ~~Tile provider: OpenStreetMap vs Mapbox vs Stamen~~ → **OpenStreetMap selected**
- ~~Uncertainty visualization~~ → **Color-coded markers with confidence legend implemented**
- ~~Confidence levels~~ → **Visual representation complete**

### Progressive Enhancement (Priority for Day 3+)
- **PWA Offline Strategy**: Service worker implementation for tile caching
- **Route Visualization**: How to visualize Joshua's campaign route from Josh 10:9-43?
- **Performance Scaling**: When to migrate to MapLibre GL JS (threshold: 100+ locations)?
- **3D Terrain**: Should we add elevation data and hillshading for landscape context?

### Data Expansion
- Primary open datasets for additional ancient Near East geography?
- How to visualize temporal changes (Late Bronze vs Iron Age)?
- Route accuracy: Symbolic paths vs attempted historical reconstruction?
