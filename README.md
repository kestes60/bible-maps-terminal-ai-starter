
# Bible Maps — Terminal AI Starter

This scaffold sets up a **Claude Code–first** workflow (Gemini CLI optional) for a real project: an interactive Bible Maps experience (PWA later), starting with Joshua 10 and expanding to a broader atlas.

## Quick Start
1. **Unzip** and `cd` into this folder in your terminal.
2. **Initialize Git (optional but recommended):**
   ```bash
   git init && git add . && git commit -m "init: bible maps terminal-ai starter"
   ```
3. **Launch Claude Code in this folder:**
   ```bash
   claude
   ```
4. In Claude Code, run:
   - `/init` (seeds `claude.md` from this repo)
   - `Shift+Tab` → **Plan** → approve → execute
   - `/agents` → **Create** agents from files in `agents/` (open each file and paste contents when prompted)
5. **Daily ritual**
   - Work in small loops.
   - Ask Claude to update `claude.md` with **Decisions**, **Next 3 tasks**, **Open Questions**.
   - End day with **Session Closer** agent (it updates `SESSION_SUMMARY.md` and `claude.md`).

## Folder Map
- `claude.md` — living context file (Claude auto-loads this in the folder).
- `SESSION_SUMMARY.md` — rolling session log (high level).
- `agents/` — copy/paste agent definitions into Claude Code's `/agents` creator.
- `prompts/` — starter prompts you can paste to kick initiatives.
- `data/` — raw assets (geojson, csv, notes, citations).
- `tasks/TODO.md` — backlog you can triage in Plan mode.

## Gemini CLI (optional, free)
If you want a second engine for web-heavy work:
```bash
npm install -g @google/gemini-cli
gemini
/init
```
Use it to write files like: “Research biblical geospatial data sources; write to `data/sources.md` and update `gemini.md` with citations.”

## Safety
- **Keep permissions ON** (review file writes/commands). Only use dangerous skip in a throwaway sandbox.
- Keep this project within a dedicated folder (don’t point tools at your entire home directory).
- Commit early/often with meaningful messages.
