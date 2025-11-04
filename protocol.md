# Debt

- [ ] globalize tailwind styles in components
- [ ] use defaultStates in Forms and remove the useEffect
- [ ] Forms: Errorstates in Components
- [x] Remove Lab from Sidebar - show it in AppMenu without accelerator

- [ ] Missionstore => extract the foreign getStates to own state or use combine
  - [ ] CommunityMissions (!)

- [ ] File Selectors => default paths
- [ ] Error handling Backend -> Frontend
- [x] Refactor Settings Form, naming of labels and order of Files as also Paths
- [ ] Emptystates for all List Components

# Bugs / Subfeatures
- [x] Discoveries -> when check is successful - JOINS arent done correctly for Planetfilters 
- [x] Discoveries -> if new galaxy was discovered there should be a popup of sort so it was discovered
- [ ] Locations -> Edit: Screenshots should be editable
- [x] Community Research -> 39% means the process of the current Tier - not the whole Research
- [x] Supply Depots -> on "Grab" the list is not updated
- [x] Add "pirate" and "fav" filters for tags - make sure Tags are always lowercase

# Learning Refactor 1 - Backend
## Goal
Data from Savegame should be only parsed once - not for each kind (missions, positions, etc)
Only 1 API - parses all Data always from the Savefile and uses 1 Store for all Components which need Savedata

## Brainstorm
only 1 IPC for complete Data from Savefile - named GET_SAVEFILE, because we dont want to open and parse the Savefile multiple times 
Savefile should return following properties:

- missions
  - frigates
  - settlements

- PositionData
- (Future) Bases

## To Refactor/Solution
  1. Make new IPC Route "GET_SAVEFILE" and parse everything
  2. New Zustand State with Mission and Positiondata since they only can "get data" named useSaveStore
  3. Update all Components which use useMissionStore and usePositionStore
---

# Features/Ideas
## Show bases in Discoveries -> wait for Big Refactor 1
### Brainstorm
### Research (devSave)
BaseContext.PlayerStateData.NPCWorkers.PersistentPlayerbases => Array
Lots of data to parse for 1 Base - Check Performance  

```
Array[0].Name => Name of Base  
Array[0].BaseType.PersistentBaseTypes => HomePlanetBase as Value  
Array[0].Owner.USN => NICKNAME (Player)  
```
--
## Import/Export
### Brainstorm
---

## Glyph Roulette
### Brainstorm
---
## Weekendmission Widget
### Brainstorm
---

## Community Mission Tracker (prototype done)
### Research
https://community-mission.nmscd.com/?ref=AssistantNms
https://api.nmsassistant.com/index.html

### Features


### Bugs

---
## Galaxy Discoveries (prototype done)
### Features


### Bugs
--- 



