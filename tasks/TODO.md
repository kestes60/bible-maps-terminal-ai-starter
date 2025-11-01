# TODO - Bible Maps Project

## Day 1 Completed ✅
- [x] Initialize Git repository and create baseline commit
- [x] Create three specialized agents (Session Closer, Research Guru, Brutal Critic)
- [x] Research Joshua 10 locations and document in sources.md
- [x] Expand sources.md with authoritative citations (10 locations fully documented)
- [x] Expand places.example.geojson with Joshua 10 cities
- [x] Validate data against schema using Brutal Critic

## Critical Fixes from Brutal Critic (Priority)
- [x] Add explicit CRS property to GeoJSON (2 min) - COMPLETE: RFC 7946 compliance (no CRS object)
- [x] Standardize coordinate precision to 4 decimals (3 min) - COMPLETE
- [x] Add uncertainty_radius_m property to all features (4 min) - COMPLETE
- [x] Set geometry to null for uncertain locations (Makkedah) (3 min) - COMPLETE
- [x] Add confidence score methodology to schema documentation (5 min) - COMPLETE

## AIBA Source Integration
- [x] Add AIBA to data/sources.md with full citation
- [x] Update CLAUDE.md with AIBA as default reference source
- [x] Update Research Guru agent guidelines to include AIBA
- [ ] Review AIBA content for Joshua 10 sites and extract citations/alternate hypotheses (60 min)

## Day 2: Interactive Map Prototype

### Phase 1: Map Library Selection (60 min)
- [ ] Research Leaflet vs MapLibre GL JS comparison (30 min)
  - Leaflet: Simpler, raster-focused, larger community
  - MapLibre GL JS: Vector tiles, modern, better performance
  - Decision criteria: ease of use, licensing, features needed
- [ ] Research tile providers and licensing (30 min)
  - OpenStreetMap (free, attribution required)
  - Mapbox (free tier available, modern styling)
  - Stamen (free, various styles)
  - Document licensing requirements in claude.md

### Phase 2: Basic Map Implementation (90 min)
- [ ] Add chosen map library to web/index.html via CDN (15 min)
- [ ] Initialize map in web/main.js centered on Joshua 10 region (30 min)
  - Center: ~35.0°E, 31.6°N (between Jerusalem and Hebron)
  - Zoom level: 9-10 to show all locations
- [ ] Load and render places.example.geojson on map (30 min)
- [ ] Test map renders all 10 locations (15 min)

### Phase 3: Interactive Features (90 min)
- [ ] Add popups to markers showing place details (45 min)
  - Display: label, scripture refs, confidence level
  - Show alternative hypotheses if they exist
  - Include source attribution
- [ ] Style markers by confidence level (30 min)
  - High confidence (>0.8): solid color
  - Medium confidence (0.5-0.8): semi-transparent
  - Low confidence (<0.5): dashed border or different icon
- [ ] Add click handlers for detailed information (15 min)

### Phase 4: UI Polish (60 min)
- [ ] Add map legend explaining confidence levels (20 min)
- [ ] Add layer toggle for cities/routes (routes placeholder) (20 min)
- [ ] Add proper attribution footer with source credits (10 min)
- [ ] Add disclaimer about scholarly uncertainty (10 min)

### Phase 5: Documentation (30 min)
- [ ] Use Session Closer agent to document Day 2 progress
- [ ] Update claude.md with decisions made
- [ ] Update SESSION_SUMMARY.md
- [ ] Create git commit for Day 2 work

## Future Enhancements (Backlog)
- [ ] Add route visualization (Joshua's campaign path)
- [ ] Add elevation/terrain layer
- [ ] Add timeline slider for different historical periods
- [ ] Add search/filter functionality
- [ ] Add mobile responsiveness improvements
- [ ] Add print/export functionality
- [ ] Expand to other Joshua chapters
- [ ] Add images/photos of archaeological sites
- [ ] Add bibliography/references page
- [ ] Convert to PWA with offline support

## Research Questions to Explore
- [ ] How to visualize Joshua's campaign route from Joshua 10:9-43?
- [ ] Should we show multiple time periods (Late Bronze vs Iron Age)?
- [ ] How to represent destroyed vs continuously occupied cities?
- [ ] Best practices for showing uncertainty in digital maps?
- [ ] How to handle disputed modern political boundaries?

## Technical Debt
- [ ] Add automated GeoJSON validation script
- [ ] Add linting for data files
- [ ] Set up CI/CD for automated testing
- [ ] Add TypeScript for web app (future consideration)
- [ ] Create data update workflow documentation

---

**Last Updated**: 2025-11-01
**Next Session Start**: Begin with Phase 1 (Map Library Selection)
