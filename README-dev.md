# Developer Workflow Guide (Claude + Cursor)

This document is for internal and development use only.  
It explains how to work on the **Bible Maps Project** using Claude Code, Cursor AI agents, and a local development setup (WSL + GitHub).

---

## 🧭 Purpose
This file documents:
- The Claude session workflow (Research Guru → Brutal Critic → Session Closer)
- Agent handoff coordination with ChatGPT and Grok
- File structure conventions (`handoff/`, `data/`, `tasks/`, `web/`)
- Session logging and summaries (`SESSION_SUMMARY.md`, `SESSION_APPEND_*.md`)
- Commit and tagging standards for multi-day builds

> 💡 Tip: Keep this file updated after each milestone to help future contributors understand the AI-assisted workflow.

---

## 🛠️ Development Environment

**Requirements:**
- Claude Pro account (Claude Code)
- Cursor editor connected to WSL2 (Ubuntu 22.04)
- Node.js ≥ 18, Git, and Python 3.10+
- SSH authentication configured for GitHub

**Primary folders:**
| Path | Description |
|------|--------------|
| `/data/` | GeoJSON data and sources |
| `/web/` | Leaflet + PWA front-end |
| `/handoff/` | Cross-agent handoff markdown files |
| `/tasks/` | TODO lists and roadmap phases |
| `/SESSION_*.md` | AI session transcripts and append logs |

---

## 🧩 Agent Overview

| Agent | Role | Description |
|-------|------|-------------|
| `Research Guru` | Data collector | Gathers biblical and geospatial references |
| `Brutal Critic` | Reviewer | Flags weak arguments and unclear data |
| `Session Closer` | Summarizer | Finalizes each session and updates `SESSION_SUMMARY.md` |
| `ChatGPT / Grok` | Collaborators | Generate modular handoff components (styles, popups, etc.) |
| `Claude (Sonnet)` | Orchestrator | Integrates all handoffs and finalizes commits |

---

## 🔁 Typical Daily Workflow

1. **Start a session** in Claude Code (e.g., “Day 4 – MapLibre Integration”).  
2. Use `Research Guru` or agents as needed to gather data.  
3. Generate handoff files (`handoff/STYLES.md`, `handoff/POPUPS.md`, etc.).  
4. Run `Session Closer` when Claude’s context approaches 90%.  
5. Commit and push results using versioned tags (`v0.3-day3`, etc.).  

---

## 🧱 Maintenance Notes

- `.claude/` folder should remain **gitignored**.
- Only session summaries and handoff deliverables should be committed.
- When Claude Code hits session limits, copy active context into `SESSION_APPEND_YYYY-MM-DD.md` before continuing.

---

**Maintained by:** Keith Estes  
**Project Repository:** [kestes60/bible-maps-terminal-ai-starter](https://github.com/kestes60/bible-maps-terminal-ai-starter)
