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
# View the web prototype (static HTML)
# Open web/index.html in a browser - no build step required yet

# (Future) When dependencies are added, install with:
# npm install

# (Future) When build system added, use:
# npm run build
# npm run dev
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

Currently a static prototype with:
- `index.html` - HTML5 shell with placeholder map container
- `main.js` - Boot script (no map library loaded yet)

**Next step**: Choose and integrate a map library (Leaflet, MapLibre GL JS, or similar) with appropriate tile provider license.

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

## Open Questions (Current)

- Primary open datasets for ancient Near East geography (GeoJSON/CSV)?
- Best approach to route reconstruction vs. symbolic paths?
- How to encode multiple scholarly opinions per site?
- Tile provider selection and licensing considerations?
