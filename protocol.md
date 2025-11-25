# Debt

- [ ] globalize tailwind styles in components
- [ ] use defaultStates in Forms and remove the useEffect
- [ ] Forms: Errorstates in Components
- [ ] Emptystates for all List Components
- [x] Options from outside (like database) in Backend
- [x] Remove SettingsStore and check code - we use direct IPC since we need to restart anyway
- [x] Remove RAW from Positiontype, not needed anymore (was debug)
- [x] "Base Import" in Supply 
- [x] fix importbutton FOUC in Supply
- [x] Empty Caches in Settings

# Bugs / Subfeatures
- [ ] Locations -> Edit: Screenshots should be editable
- [ ] Settings -> File Selectors => default paths
- [ ] Open Reddit Post Site => https://www.reddit.com/r/NMSCoordinateExchange/submit/?type=IMAGE

## Backend Refactor 2 
### Tasks
- [ ] All IPC Methods should use try fetch and return an error object when error occurs with errormessage
- [ ] All Zustand stores should check for the errorobject
- [ ] On Error reroute to /settings and open an Dialogwindow with the Errormessage Info Dialog
- [ ] Database Migration: UpdateDate in location table (needed for Import/Export)
- [ ] Fix Devsave in Developer Page (and rename it)
--

## Import/Export
### Brainstorm
---
## Glyph Roulette
### Brainstorm
---
## Flight Log
### Brainstorm
Should log glyphs and galaxies all 2 minutes and write into a database
maybe we could use glyphs and galaxy as uniqueID so they doesnt get logged twice

should have a glyph add feature 
should be clearable

### Structure
ID -> GalaxyIndex:PortalCode UNIQUE TEXT
Summary
GalaxyIndex
PortalCode

## Iteration Ideas
- Duration (add edittimer add 1 when edited)
- add => create
---



routes = hideOnMultiplayer




