export interface NMSSave {
  Version?: number;
  Platform?: string;
  ActiveContext?: string;
  CommonStateData?: CommonStateData;
  BaseContext?: BaseContext;
  DiscoveryManagerData?: DiscoveryManagerData;
}

export interface CommonStateData {
  SaveName: string;
  TotalPlayTime: number;
  UsesThirdPersonCharacterCam: boolean;
  UsesThirdPersonVehicleCam: boolean;
  UsesThirdPersonShipCam: boolean;
  PhotoModeSettings: PhotoModeSettings;
  ByteBeatLibrary: ByteBeatLibrary;
  SeasonData: SeasonData;
  SeasonState: SeasonState;
  SeasonTransferInventoryData: SeasonTransferInventoryData;
  EarnedSeasonSpecialRewards: any[];
  SaveUniversalId: string;
  UsedPlatforms: string[];
  UsedDiscoveryOwnersV2: UsedDiscoveryOwnersV2[];
}

export interface PhotoModeSettings {
  Fog: number;
  CloudAmount: number;
  SunDir: number[];
  FoV: number;
  DepthOfFieldSetting: string;
  DepthOfFieldDistance: number;
  DepthOfFieldDistanceSpace: number;
  HalfFocalPlaneDepth: number;
  HalfFocalPlaneDepthSpace: number;
  DepthOfFieldPhysConvergence: number;
  DepthOfFieldPhysAperture: number;
  Vignette: number;
  Filter: number;
  Bloom: number;
}

export interface ByteBeatLibrary {
  MySongs: MySong[];
  Playlist: string[];
  Shuffle: boolean;
  AutoplayOnFoot: boolean;
  AutoplayInShip: boolean;
  AutoplayInVehicle: boolean;
}

export interface MySong {
  Id: string;
  RequiredSpecialId: string;
  Name: string;
  LocID: string;
  AuthorOnlineID: string;
  AuthorUsername: string;
  AuthorPlatform: string;
  Data: string[];
}

export interface SeasonData {
  SeasonId: number;
  StartTimeUTC: number;
  EndTimeUTC: number;
  Hash: number;
  Title: string;
  Subtitle: string;
  Description: string;
  Summary: string;
  FinalStageTitle: string;
  MilestoneWithStageLocId: string;
  SeasonStartMusicOverride: SeasonStartMusicOverride;
  PlayStartMusicInIntro: boolean;
  BlockFirstSpaceMusic: boolean;
  GameMode: GameMode;
  DifficultySettingPreset: DifficultySettingPreset;
  DifficultyMinimums: DifficultyMinimums;
  CreateContextSaveDataMask: string;
  SwitchContextSaveDataMask: string;
  SeasonalUAOverride: string;
  UAOverrideValue: number;
  FinalReward: string;
  FinalRewardSwitchAlt: string;
  FinalCantRewardMessage: string;
  FinalRewardDescription: string;
  MainIcon: MainIcon;
  SeasonNumber: number;
  RemixNumber: number;
  DisplayNumber: number;
  SeasonName: string;
  SeasonNameUpper: string;
  MainMissionTitle: string;
  MainMissionMessage: string;
  DoCommunityMissionTextSubstitutions: boolean;
  CommunityProgressTitle: string;
  CommunityTierLabel: string;
  CommunityTierProgressLabel: string;
  CommunityTierCompleteLabel: string;
  DefaultToPvPOff: boolean;
  MustCraftInBases: boolean;
  AdditionalTradeProducts: any[];
  NeverTradeProducts: any[];
  InitialJoaoBox: InitialJoaoBox;
  InitialJoaoBoxNoMainSave: InitialJoaoBoxNoMainSave;
  StartingSuitSlots: number;
  StartingSuitTechSlots: number;
  StartingSuitCargoSlots: number;
  WeaponSeed: [boolean, string];
  ShipSeed: [boolean, string];
  ShipType: ShipType;
  OverrideMTFilename: string;
  StartWithFreighter: boolean;
  FreighterBaseOverrideFilename: string;
  FreighterRace: FreighterRace;
  StartAboardFreighter: boolean;
  ForceStartSystemTernary: boolean;
  ForceStartSystemAbandoned: boolean;
  ForceAllSystemsAbandoned: boolean;
  IntroSequencePOI: string;
  CarnageMode: boolean;
  ValidSpawnBuildings: any[];
  WeaponInventoryLayout: WeaponInventoryLayout;
  ShipInventoryLayout: ShipInventoryLayout;
  ShipTechInventoryLayout: ShipTechInventoryLayout;
  UseDefaultAppearance: boolean;
  Inventory: Inventory;
  Inventory_TechOnly: InventoryTechOnly;
  Inventory_Cargo: InventoryCargo;
  ShipInventory: ShipInventory;
  WeaponInventory: WeaponInventory;
  SeasonTransferInventoryConfig: SeasonTransferInventoryConfig;
  UseRandomPet: boolean;
  RandomPetConstraints: any[];
  SpecificPets: SpecificPet[];
  StartingPetSlots: number;
  SandwormOverrides: any[];
  SandwormGlobalOverride: boolean;
  SandwormGlobalOverrideTimer: number;
  SandwormGlobalOverrideSpawnChance: number;
  StartNextToShip: boolean;
  ShipIsAtDifferentBuildingToPlayer: boolean;
  DistanceFromShipAtStartOfGame: number;
  BuildingRadiusShipOffsetMultiplier: number;
  ShipStartsDamaged: boolean;
  BlockStormsAtStart: boolean;
  AlwaysStormy: boolean;
  BlockAggressiveSentinelsInStartSystem: boolean;
  BlockExtremeWeatherInStartSystem: boolean;
  AllowMissionDetailMessages: boolean;
  UseStartPlanetObjectListOverrides: boolean;
  StartPlanetRareSubstanceOverride: string;
  TrashInventoryOnGalaxyTravel: boolean;
  FreighterBattleEarlyWarpsOverride: number;
  ForceDeepSpaceAmbientFrigatesOnInfested: boolean;
  TechCostMultiplier: number;
  NeverLearnableTech: any[];
  ForgottenProducts: any[];
  IncreaseXClassTechOddsWithCommTier: boolean;
  AbandonedFreighterHazardProtectionMul: number;
  FarmPlantsTimerMul: number;
  HazardProtectionDrainMultiplier: number;
  EnergyDrainMultiplier: number;
  QuestSubstanceReducer: number;
  Stages: any[];
  ScanEventTable: ScanEventTable;
  ResetSaveOnDeath: boolean;
  StatsToPersistOnReset: any[];
  CompatibleWithState: boolean;
  HasBeenConverted: boolean;
  TechnologyTable: any[];
  ProductTable: any[];
  SubstanceTable: any[];
  SeasonalUAStationTradeData: SeasonalUastationTradeData;
  UseSeasonalUAStationTradeData: boolean;
  AlwaysUseSeasonalStationTradeData: boolean;
  UseSpookHazardOnly: boolean;
  PurpleSystemsUnlocked: boolean;
}

export interface SeasonStartMusicOverride {
  AkEvent: string;
}

export interface GameMode {
  PresetGameMode: string;
}

export interface DifficultySettingPreset {
  DifficultyPresetType: string;
}

export interface DifficultyMinimums {
  SettingsLocked: boolean;
  InventoriesAlwaysInRange: boolean;
  AllSlotsUnlocked: boolean;
  WarpDriveRequirements: boolean;
  CraftingIsFree: boolean;
  TutorialEnabled: boolean;
  StartWithAllItemsKnown: boolean;
  BaseAutoPower: boolean;
  DeathConsequences: DeathConsequences;
  DamageReceived: DamageReceived;
  DamageGiven: DamageGiven;
  ActiveSurvivalBars: ActiveSurvivalBars;
  HazardDrain: HazardDrain;
  EnergyDrain: EnergyDrain;
  SubstanceCollection: SubstanceCollection;
  InventoryStackLimits: InventoryStackLimits;
  ChargingRequirements: ChargingRequirements;
  FuelUse: FuelUse;
  LaunchFuelCost: LaunchFuelCost;
  CurrencyCost: CurrencyCost;
  ItemShopAvailability: ItemShopAvailability;
  ScannerRecharge: ScannerRecharge;
  ReputationGain: ReputationGain;
  CreatureHostility: CreatureHostility;
  SpaceCombatTimers: SpaceCombatTimers;
  GroundCombatTimers: GroundCombatTimers;
  SprintingCost: SprintingCost;
  BreakTechOnDamage: BreakTechOnDamage;
  Fishing: Fishing;
  NPCPopulation: Npcpopulation;
}

export interface DeathConsequences {
  DeathConsequencesDifficulty: string;
}

export interface DamageReceived {
  DamageReceivedDifficulty: string;
}

export interface DamageGiven {
  DamageGivenDifficulty: string;
}

export interface ActiveSurvivalBars {
  ActiveSurvivalBarsDifficulty: string;
}

export interface HazardDrain {
  HazardDrainDifficulty: string;
}

export interface EnergyDrain {
  EnergyDrainDifficulty: string;
}

export interface SubstanceCollection {
  SubstanceCollectionDifficulty: string;
}

export interface InventoryStackLimits {
  InventoryStackLimitsDifficulty: string;
}

export interface ChargingRequirements {
  ChargingRequirementsDifficulty: string;
}

export interface FuelUse {
  FuelUseDifficulty: string;
}

export interface LaunchFuelCost {
  LaunchFuelCostDifficulty: string;
}

export interface CurrencyCost {
  CurrencyCostDifficulty: string;
}

export interface ItemShopAvailability {
  ItemShopAvailabilityDifficulty: string;
}

export interface ScannerRecharge {
  ScannerRechargeDifficulty: string;
}

export interface ReputationGain {
  ReputationGainDifficulty: string;
}

export interface CreatureHostility {
  CreatureHostilityDifficulty: string;
}

export interface SpaceCombatTimers {
  CombatTimerDifficultyOption: string;
}

export interface GroundCombatTimers {
  CombatTimerDifficultyOption: string;
}

export interface SprintingCost {
  SprintingCostDifficulty: string;
}

export interface BreakTechOnDamage {
  BreakTechOnDamageProbability: string;
}

export interface Fishing {
  FishingDifficulty: string;
}

export interface Npcpopulation {
  NPCPopulationDifficulty: string;
}

export interface MainIcon {
  Filename: string;
}

export interface InitialJoaoBox {
  Title: string;
  Description: string;
  Image: string;
  TakeImageFromItemIcon: string;
  AudioEvent: AudioEvent;
  Points: any[];
  TakeDataFromSeason: boolean;
  DebugText: string;
}

export interface AudioEvent {
  AkEvent: string;
}

export interface InitialJoaoBoxNoMainSave {
  Title: string;
  Description: string;
  Image: string;
  TakeImageFromItemIcon: string;
  AudioEvent: AudioEvent2;
  Points: any[];
  TakeDataFromSeason: boolean;
  DebugText: string;
}

export interface AudioEvent2 {
  AkEvent: string;
}

export interface ShipType {
  ShipClass: string;
}

export interface FreighterRace {
  AlienRace: string;
}

export interface WeaponInventoryLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface ShipInventoryLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface ShipTechInventoryLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Inventory {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class;
  StackSizeGroup: StackSizeGroup;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class {
  InventoryClass: string;
}

export interface StackSizeGroup {
  InventoryStackSizeGroup: string;
}

export interface InventoryTechOnly {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class2;
  StackSizeGroup: StackSizeGroup2;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class2 {
  InventoryClass: string;
}

export interface StackSizeGroup2 {
  InventoryStackSizeGroup: string;
}

export interface InventoryCargo {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class3;
  StackSizeGroup: StackSizeGroup3;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class3 {
  InventoryClass: string;
}

export interface StackSizeGroup3 {
  InventoryStackSizeGroup: string;
}

export interface ShipInventory {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class4;
  StackSizeGroup: StackSizeGroup4;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class4 {
  InventoryClass: string;
}

export interface StackSizeGroup4 {
  InventoryStackSizeGroup: string;
}

export interface WeaponInventory {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class5;
  StackSizeGroup: StackSizeGroup5;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class5 {
  InventoryClass: string;
}

export interface StackSizeGroup5 {
  InventoryStackSizeGroup: string;
}

export interface SeasonTransferInventoryConfig {
  Width: number;
  Layout: Layout;
  SlotItemFilterIDs: any[];
}

export interface Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface SpecificPet {
  Scale: number;
  CreatureID: string;
  Descriptors: any[];
  CreatureSeed: [boolean, string];
  CreatureSecondarySeed: [boolean, string];
  SpeciesSeed: number;
  GenusSeed: number;
  CustomSpeciesName: string;
  Predator: boolean;
  UA: number;
  AllowUnmodifiedReroll: boolean;
  ColourBaseSeed: [boolean, string];
  BoneScaleSeed: [boolean, string];
  HasFur: boolean;
  Biome: Biome;
  CreatureType: CreatureType;
  BirthTime: number;
  LastEggTime: number;
  LastTrustIncreaseTime: number;
  LastTrustDecreaseTime: number;
  EggModified: boolean;
  HasBeenSummoned: boolean;
  CustomName: string;
  Trust: number;
  SenderData: SenderData;
  Traits: number[];
  Moods: number[];
}

export interface Biome {
  Biome: string;
}

export interface CreatureType {
  CreatureType: string;
}

export interface SenderData {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface ScanEventTable {
  Events: any[];
}

export interface SeasonalUastationTradeData {
  AlwaysPresentProducts: any[];
  AlwaysPresentSubstances: any[];
  OptionalProducts: any[];
  OptionalSubstances: any[];
  Eb1: any[];
  nUe: NUe;
  nEA: number;
  '?WG': number;
  MinItemsForSale: number;
  MaxItemsForSale: number;
  PercentageOfItemsAreProducts: number;
  BuyPriceIncreaseRedThreshold: number;
  BuyPriceDecreaseGreenThreshold: number;
  SellPriceIncreaseGreenThreshold: number;
  SellPriceDecreaseRedThreshold: number;
  ShowSeasonRewards: boolean;
  duE: boolean;
  MinAmountOfProductAvailable: number[];
  MaxAmountOfProductAvailable: number[];
  MinAmountOfSubstanceAvailable: number[];
  MaxAmountOfSubstanceAvailable: number[];
  MinExtraSystemProducts: number[];
  MaxExtraSystemProducts: number[];
  TradeProductsPriceImprovements: number[];
}

export interface NUe {
  '@=A': string;
}

export interface SeasonState {
  MilestoneValues: any[];
  RewardCollected: any[];
  PinnedStage: number;
  PinnedMilestone: number;
  RendezvousUAs: any[];
  yV7: any[];
  HasCollectedFinalReward: boolean;
  ProtectedEvents: any[];
  StateOnDeath: StateOnDeath;
  SeasonTransferInventory: SeasonTransferInventory;
  EndRewardsRedemptionState: EndRewardsRedemptionState;
}

export interface StateOnDeath {
  SeasonSaveStateOnDeath: string;
}

export interface SeasonTransferInventory {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class6;
  StackSizeGroup: StackSizeGroup6;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class6 {
  InventoryClass: string;
}

export interface StackSizeGroup6 {
  InventoryStackSizeGroup: string;
}

export interface EndRewardsRedemptionState {
  SeasonEndRewardsRedemptionState: string;
}

export interface SeasonTransferInventoryData {
  SeasonId: number;
  Layout: Layout2;
  Inventory: Inventory2;
}

export interface Layout2 {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Inventory2 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class7;
  StackSizeGroup: StackSizeGroup7;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class7 {
  InventoryClass: string;
}

export interface StackSizeGroup7 {
  InventoryStackSizeGroup: string;
}

export interface UsedDiscoveryOwnersV2 {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface BaseContext {
  GameMode: number;
  PlayerStateData: PlayerStateData;
  SpawnStateData: SpawnStateData;
}

export interface PlayerStateData {
  UniverseAddress: UniverseAddress;
  PreviousUniverseAddress: PreviousUniverseAddress;
  HomeRealityIteration: number;
  SaveSummary: string;
  DifficultyState: DifficultyState;
  TimeStamp: number;
  Inventory: Inventory3;
  Inventory_TechOnly: InventoryTechOnly2;
  Inventory_Cargo: InventoryCargo2;
  ShipInventory: ShipInventory2;
  WeaponInventory: WeaponInventory2;
  WristScreenData: WristScreenDaum[];
  Multitools: Multitool[];
  ActiveMultioolIndex: number;
  ArchivedMultitools: ArchivedMultitool[];
  Pets: Pet[];
  Eggs: Egg[];
  PetAccessoryCustomisation: PetAccessoryCustomisation[];
  UnlockedPetSlots: boolean[];
  GraveInventory: GraveInventory;
  SpawnGrave: boolean;
  SpaceGrave: boolean;
  GraveUniverseAddress: GraveUniverseAddress;
  GravePosition: number[];
  GraveMatrixLookAt: number[];
  GraveMatrixUp: number[];
  ShipLayout: ShipLayout;
  WeaponLayout: WeaponLayout;
  CurrentShip: CurrentShip;
  CurrentWeapon: CurrentWeapon;
  KnownTech: string[];
  KnownProducts: string[];
  KnownSpecials: string[];
  KnownRefinerRecipes: string[];
  KnownWords: any[];
  KnownWordGroups: KnownWordGroup[];
  MissionProgress: MissionProgress[];
  PostMissionIndex: number;
  CurrentMissionID: string;
  CurrentMissionSeed: string;
  PreviousMissionID: string;
  PreviousMissionSeed: number;
  MissionVersion: number;
  MissionRecurrences: MissionRecurrence[];
  HoloExplorerInteraction: HoloExplorerInteraction;
  HoloScepticInteraction: HoloScepticInteraction;
  HoloNooneInteraction: HoloNooneInteraction;
  Health: number;
  ShipHealth: number;
  Shield: number;
  ShipShield: number;
  Energy: number;
  Units: number;
  Nanites: number;
  Specials: number;
  TimeAlive: number;
  MarkerStack: MarkerStack[];
  NewMPMarkerStack: any[];
  SurveyedEventPositions: number[][];
  NextSurveyedEventPositionIndex: number;
  LastCheckedForStatResetsTime: number;
  Stats: Stat[];
  TelemetryStats: TelemetryStat[];
  StoredInteractions: StoredInteraction[];
  MaintenanceInteractions: MaintenanceInteraction[];
  PersonalMaintenanceInteractions: PersonalMaintenanceInteraction[];
  VisitedSystems: number[];
  Hazard: number[];
  BoltAmmo: number;
  ScatterAmmo: number;
  PulseAmmo: number;
  LaserAmmo: number;
  FirstSpawnPosition: number[];
  SavedInteractionIndicies: SavedInteractionIndicy[];
  SavedInteractionDialogTable: SavedInteractionDialogTable[];
  InteractionProgressTable: any[];
  AtlasStationAdressData: AtlasStationAdressDaum[];
  NewAtlasStationAdressData: NewAtlasStationAdressDaum[];
  VisitedAtlasStationsData: VisitedAtlasStationsDaum[];
  FirstAtlasStationDiscovered: boolean;
  CompletedAtlasAddresses: CompletedAtlasAddress[];
  ProgressionLevel: number;
  ProcTechIndex: number;
  IsNew: boolean;
  UseSmallerBlackholeJumps: boolean;
  UsedEntitlements: any[];
  PlanetPositions: number[][];
  PlanetSeeds: [boolean, string][];
  PrimaryPlanet: number;
  TimeLastSpaceBattle: number;
  WarpsLastSpaceBattle: number;
  ActiveSpaceBattleUA: number;
  ActiveSpaceBattleLevel: number;
  TimeLastMiniStation: number;
  WarpsLastMiniStation: number;
  MiniStationUA: string;
  AnomalyPositionOverride: number[];
  GameStartAddress1: GameStartAddress1;
  GameStartAddress2: GameStartAddress2;
  GalacticMapRequests: boolean[];
  FirstShipPosition: number[];
  HazardTimeAlive: number;
  RevealBlackHoles: boolean;
  CurrentFreighterHomeSystemSeed: [boolean, string];
  CurrentFreighter: CurrentFreighter;
  FreighterLayout: FreighterLayout;
  FreighterCargoLayout: FreighterCargoLayout;
  FreighterInventory: FreighterInventory;
  FreighterInventory_TechOnly: FreighterInventoryTechOnly;
  FreighterInventory_Cargo: FreighterInventoryCargo;
  FreighterLastSpawnTime: number;
  FreighterUniverseAddress: FreighterUniverseAddress;
  FreighterDismissed: boolean;
  FreighterMatrixAt: number[];
  FreighterMatrixUp: number[];
  FreighterMatrixPos: number[];
  SquadronUnlockedPilotSlots: boolean[];
  SquadronPilots: SquadronPilot[];
  SeenBaseBuildingObjects: string[];
  BaseBuildingObjects: BaseBuildingObject[];
  TerrainEditData: TerrainEditData;
  NPCWorkers: Npcworker[];
  PersistentPlayerBases: PersistentPlayerBase[];
  TeleportEndpoints: TeleportEndpoint[];
  Chest1Layout: Chest1Layout;
  Chest1Inventory: Chest1Inventory;
  Chest2Layout: Chest2Layout;
  Chest2Inventory: Chest2Inventory;
  Chest3Layout: Chest3Layout;
  Chest3Inventory: Chest3Inventory;
  Chest4Layout: Chest4Layout;
  Chest4Inventory: Chest4Inventory;
  Chest5Layout: Chest5Layout;
  Chest5Inventory: Chest5Inventory;
  Chest6Layout: Chest6Layout;
  Chest6Inventory: Chest6Inventory;
  Chest7Layout: Chest7Layout;
  Chest7Inventory: Chest7Inventory;
  Chest8Layout: Chest8Layout;
  Chest8Inventory: Chest8Inventory;
  Chest9Layout: Chest9Layout;
  Chest9Inventory: Chest9Inventory;
  Chest10Layout: Chest10Layout;
  Chest10Inventory: Chest10Inventory;
  ChestMagicLayout: ChestMagicLayout;
  ChestMagicInventory: ChestMagicInventory;
  ChestMagic2Layout: ChestMagic2Layout;
  ChestMagic2Inventory: ChestMagic2Inventory;
  CookingIngredientsLayout: CookingIngredientsLayout;
  CookingIngredientsInventory: CookingIngredientsInventory;
  RocketLockerLayout: RocketLockerLayout;
  RocketLockerInventory: RocketLockerInventory;
  FishPlatformLayout: FishPlatformLayout;
  FishPlatformInventory: FishPlatformInventory;
  FishBaitBoxLayout: FishBaitBoxLayout;
  FishBaitBoxInventory: FishBaitBoxInventory;
  FoodUnitLayout: FoodUnitLayout;
  FoodUnitInventory: FoodUnitInventory;
  CurrentFreighterNPC: CurrentFreighterNpc;
  VehicleOwnership: VehicleOwnership[];
  PrimaryVehicle: number;
  SkiffData: SkiffData;
  ShipOwnership: ShipOwnership[];
  ArchivedShipOwnership: ArchivedShipOwnership[];
  PrimaryShip: number;
  MultiShipEnabled: boolean;
  VehicleAIControlEnabled: boolean;
  PlayerFreighterName: string;
  StartGameShipPosition: number[];
  ShipNeedsTerrainPositioning: boolean;
  TradingSupplyDataIndex: number;
  TradingSupplyData: TradingSupplyDaum[];
  LastPortal: any[];
  VisitedPortal: VisitedPortal;
  KnownPortalRunes: number;
  OnOtherSideOfPortal: boolean;
  OtherSideOfPortalReturnBase: OtherSideOfPortalReturnBase;
  PortalMarkerPosition_Local: number[];
  PortalMarkerPosition_Offset: number[];
  StartingPrimaryWeapon: StartingPrimaryWeapon;
  StartingSecondaryWeapon: StartingSecondaryWeapon;
  CharacterCustomisationData: CharacterCustomisationDaum[];
  ShipUsesLegacyColours: boolean[];
  Outfits: Outfit[];
  JetpackEffect: string;
  FreighterEngineEffect: string;
  FleetSeed: [boolean, string];
  FleetFrigates: FleetFrigate[];
  FleetExpeditions: FleetExpedition[];
  ExpeditionSeedsSelectedToday: string[];
  LastKnownDay: number;
  SunTimer: number;
  FoodUnitAccumulator: number;
  FoodUnitItem: string;
  MultiplayerLobbyID: number;
  MultiplayerUA: MultiplayerUa;
  MultiplayerSpawn: MultiplayerSpawn;
  RepairTechBuffer: any[];
  MultiplayerPrivileges: number;
  HotActions: HotAction[];
  LastUABeforePortalWarp: string;
  StoryPortalSeed: number;
  ShopNumber: number;
  ShopTier: number;
  HasAccessToNexus: boolean;
  NexusUniverseAddress: NexusUniverseAddress;
  NexusMatrixAt: number[];
  NexusMatrixUp: number[];
  NexusMatrixPos: number[];
  BannerIcon: number;
  BannerMainColour: number;
  BannerBackgroundColour: number;
  BannerTitleId: string;
  TelemetryUploadVersion: number;
  VRCameraOffset: number;
  RestartAllInactiveSeasonalMissions: boolean;
  RedeemedSeasonRewards: string[];
  RedeemedTwitchRewards: string[];
  RedeemedPlatformRewards: any[];
  SettlementStatesV2: SettlementStatesV2[];
  SettlementStateRingBufferIndexV2: number;
  Hdt: Hdt[];
  NextLoadSpawnsWithFreshStart: boolean;
  SeenStories: SeenStory[];
  BuildersKnown: boolean;
  StartingSeasonNumber: number;
  WonderPlanetRecords: WonderPlanetRecord[];
  WonderCreatureRecords: WonderCreatureRecord[];
  WonderFloraRecords: WonderFloraRecord[];
  WonderMineralRecords: WonderMineralRecord[];
  WonderTreasureRecords: WonderTreasureRecord[];
  WonderWeirdBasePartRecords: WonderWeirdBasePartRecord[];
  WonderCustomRecords: WonderCustomRecord[];
  WonderCustomRecordsExtraData: WonderCustomRecordsExtraDaum[];
  SyncBuffersData: SyncBuffersDaum[];
  RefinerBufferKeys: RefinerBufferKey[];
  RefinerBufferData: RefinerBufferDaum[];
  GalaxyWaypoints: any[];
  FishingRecord: FishingRecord;
  HasDiscoveredPurpleSystems: boolean;
  FirstPurpleSystemUA: number;
  HasGalacticMapRequestAllPurples: boolean;
  HasGalacticMapRequestFirstPurple: boolean;
  L3K: string;
  NEK: Nek[];
}

export interface UniverseAddress {
  RealityIndex: number;
  GalacticAddress: GalacticAddress;
}

export interface GalacticAddress {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface PreviousUniverseAddress {
  RealityIndex: number;
  GalacticAddress: GalacticAddress2;
}

export interface GalacticAddress2 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface DifficultyState {
  Preset: Preset;
  EasiestUsedPreset: EasiestUsedPreset;
  HardestUsedPreset: HardestUsedPreset;
  Settings: Settings;
}

export interface Preset {
  DifficultyPresetType: string;
}

export interface EasiestUsedPreset {
  DifficultyPresetType: string;
}

export interface HardestUsedPreset {
  DifficultyPresetType: string;
}

export interface Settings {
  SettingsLocked: boolean;
  InventoriesAlwaysInRange: boolean;
  AllSlotsUnlocked: boolean;
  WarpDriveRequirements: boolean;
  CraftingIsFree: boolean;
  TutorialEnabled: boolean;
  StartWithAllItemsKnown: boolean;
  BaseAutoPower: boolean;
  DeathConsequences: DeathConsequences2;
  DamageReceived: DamageReceived2;
  DamageGiven: DamageGiven2;
  ActiveSurvivalBars: ActiveSurvivalBars2;
  HazardDrain: HazardDrain2;
  EnergyDrain: EnergyDrain2;
  SubstanceCollection: SubstanceCollection2;
  InventoryStackLimits: InventoryStackLimits2;
  ChargingRequirements: ChargingRequirements2;
  FuelUse: FuelUse2;
  LaunchFuelCost: LaunchFuelCost2;
  CurrencyCost: CurrencyCost2;
  ItemShopAvailability: ItemShopAvailability2;
  ScannerRecharge: ScannerRecharge2;
  ReputationGain: ReputationGain2;
  CreatureHostility: CreatureHostility2;
  SpaceCombatTimers: SpaceCombatTimers2;
  GroundCombatTimers: GroundCombatTimers2;
  SprintingCost: SprintingCost2;
  BreakTechOnDamage: BreakTechOnDamage2;
  Fishing: Fishing2;
  NPCPopulation: Npcpopulation2;
}

export interface DeathConsequences2 {
  DeathConsequencesDifficulty: string;
}

export interface DamageReceived2 {
  DamageReceivedDifficulty: string;
}

export interface DamageGiven2 {
  DamageGivenDifficulty: string;
}

export interface ActiveSurvivalBars2 {
  ActiveSurvivalBarsDifficulty: string;
}

export interface HazardDrain2 {
  HazardDrainDifficulty: string;
}

export interface EnergyDrain2 {
  EnergyDrainDifficulty: string;
}

export interface SubstanceCollection2 {
  SubstanceCollectionDifficulty: string;
}

export interface InventoryStackLimits2 {
  InventoryStackLimitsDifficulty: string;
}

export interface ChargingRequirements2 {
  ChargingRequirementsDifficulty: string;
}

export interface FuelUse2 {
  FuelUseDifficulty: string;
}

export interface LaunchFuelCost2 {
  LaunchFuelCostDifficulty: string;
}

export interface CurrencyCost2 {
  CurrencyCostDifficulty: string;
}

export interface ItemShopAvailability2 {
  ItemShopAvailabilityDifficulty: string;
}

export interface ScannerRecharge2 {
  ScannerRechargeDifficulty: string;
}

export interface ReputationGain2 {
  ReputationGainDifficulty: string;
}

export interface CreatureHostility2 {
  CreatureHostilityDifficulty: string;
}

export interface SpaceCombatTimers2 {
  CombatTimerDifficultyOption: string;
}

export interface GroundCombatTimers2 {
  CombatTimerDifficultyOption: string;
}

export interface SprintingCost2 {
  SprintingCostDifficulty: string;
}

export interface BreakTechOnDamage2 {
  BreakTechOnDamageProbability: string;
}

export interface Fishing2 {
  FishingDifficulty: string;
}

export interface Npcpopulation2 {
  NPCPopulationDifficulty: string;
}

export interface Inventory3 {
  Slots: Slot[];
  ValidSlotIndices: ValidSlotIndice[];
  Class: Class8;
  StackSizeGroup: StackSizeGroup8;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot {
  Type: Type;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index;
}

export interface Type {
  InventoryType: string;
}

export interface Index {
  X: number;
  Y: number;
}

export interface ValidSlotIndice {
  X: number;
  Y: number;
}

export interface Class8 {
  InventoryClass: string;
}

export interface StackSizeGroup8 {
  InventoryStackSizeGroup: string;
}

export interface InventoryTechOnly2 {
  Slots: Slot2[];
  ValidSlotIndices: ValidSlotIndice2[];
  Class: Class9;
  StackSizeGroup: StackSizeGroup9;
  BaseStatValues: any[];
  SpecialSlots: SpecialSlot[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot2 {
  Type: Type2;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index2;
}

export interface Type2 {
  InventoryType: string;
}

export interface Index2 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice2 {
  X: number;
  Y: number;
}

export interface Class9 {
  InventoryClass: string;
}

export interface StackSizeGroup9 {
  InventoryStackSizeGroup: string;
}

export interface SpecialSlot {
  Type: Type3;
  Index: Index3;
}

export interface Type3 {
  InventorySpecialSlotType: string;
}

export interface Index3 {
  X: number;
  Y: number;
}

export interface InventoryCargo2 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class10;
  StackSizeGroup: StackSizeGroup10;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class10 {
  InventoryClass: string;
}

export interface StackSizeGroup10 {
  InventoryStackSizeGroup: string;
}

export interface ShipInventory2 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class11;
  StackSizeGroup: StackSizeGroup11;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class11 {
  InventoryClass: string;
}

export interface StackSizeGroup11 {
  InventoryStackSizeGroup: string;
}

export interface WeaponInventory2 {
  Slots: Slot3[];
  ValidSlotIndices: ValidSlotIndice3[];
  Class: Class12;
  StackSizeGroup: StackSizeGroup12;
  BaseStatValues: BaseStatValue[];
  SpecialSlots: SpecialSlot2[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot3 {
  Type: Type4;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index4;
}

export interface Type4 {
  InventoryType: string;
}

export interface Index4 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice3 {
  X: number;
  Y: number;
}

export interface Class12 {
  InventoryClass: string;
}

export interface StackSizeGroup12 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue {
  BaseStatID: string;
  Value: number;
}

export interface SpecialSlot2 {
  Type: Type5;
  Index: Index5;
}

export interface Type5 {
  InventorySpecialSlotType: string;
}

export interface Index5 {
  X: number;
  Y: number;
}

export interface WristScreenDaum {
  ScreenScale: number;
  ScreenOffset: number[];
  ScreenRotation: number[];
}

export interface Multitool {
  Layout: Layout3;
  Store: Store;
  ScreenData: ScreenData;
  Seed: [boolean, string];
  CustomisationData: CustomisationData;
  Name: string;
  IsLarge: boolean;
  PrimaryMode: number;
  SecondaryMode: number;
  UseLegacyColours: boolean;
  Resource: Resource;
}

export interface Layout3 {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Store {
  Slots: Slot4[];
  ValidSlotIndices: ValidSlotIndice4[];
  Class: Class13;
  StackSizeGroup: StackSizeGroup13;
  BaseStatValues: BaseStatValue2[];
  SpecialSlots: SpecialSlot3[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot4 {
  Type: Type6;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index6;
}

export interface Type6 {
  InventoryType: string;
}

export interface Index6 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice4 {
  X: number;
  Y: number;
}

export interface Class13 {
  InventoryClass: string;
}

export interface StackSizeGroup13 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue2 {
  BaseStatID: string;
  Value: number;
}

export interface SpecialSlot3 {
  Type: Type7;
  Index: Index7;
}

export interface Type7 {
  InventorySpecialSlotType: string;
}

export interface Index7 {
  X: number;
  Y: number;
}

export interface ScreenData {
  ScreenScale: number;
  ScreenOffset: number[];
  ScreenRotation: number[];
}

export interface CustomisationData {
  DescriptorGroups: string[];
  PaletteID: string;
  Colours: Colour[];
  TextureOptions: any[];
  BoneScales: any[];
  Scale: number;
}

export interface Colour {
  Palette: Palette;
  Colour: number[];
}

export interface Palette {
  Palette: string;
  ColourAlt: string;
  Index: number;
}

export interface Resource {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture;
  AltId: string;
}

export interface ProceduralTexture {
  Samplers: any[];
}

export interface ArchivedMultitool {
  MultitoolData: MultitoolData;
  ArchivedName: string;
  ArchivedInventoryClass: ArchivedInventoryClass;
  WeaponClass: WeaponClass;
}

export interface MultitoolData {
  Layout: Layout4;
  Store: Store2;
  ScreenData: ScreenData2;
  Seed: [boolean, string];
  CustomisationData: CustomisationData2;
  Name: string;
  IsLarge: boolean;
  PrimaryMode: number;
  SecondaryMode: number;
  UseLegacyColours: boolean;
  Resource: Resource2;
}

export interface Layout4 {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Store2 {
  Slots: Slot5[];
  ValidSlotIndices: ValidSlotIndice5[];
  Class: Class14;
  StackSizeGroup: StackSizeGroup14;
  BaseStatValues: BaseStatValue3[];
  SpecialSlots: SpecialSlot4[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot5 {
  Type: Type8;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index8;
}

export interface Type8 {
  InventoryType: string;
}

export interface Index8 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice5 {
  X: number;
  Y: number;
}

export interface Class14 {
  InventoryClass: string;
}

export interface StackSizeGroup14 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue3 {
  BaseStatID: string;
  Value: number;
}

export interface SpecialSlot4 {
  Type: Type9;
  Index: Index9;
}

export interface Type9 {
  InventorySpecialSlotType: string;
}

export interface Index9 {
  X: number;
  Y: number;
}

export interface ScreenData2 {
  ScreenScale: number;
  ScreenOffset: number[];
  ScreenRotation: number[];
}

export interface CustomisationData2 {
  DescriptorGroups: string[];
  PaletteID: string;
  Colours: Colour2[];
  TextureOptions: any[];
  BoneScales: any[];
  Scale: number;
}

export interface Colour2 {
  Palette: Palette2;
  Colour: number[];
}

export interface Palette2 {
  Palette: string;
  ColourAlt: string;
  Index: number;
}

export interface Resource2 {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture2;
  AltId: string;
}

export interface ProceduralTexture2 {
  Samplers: any[];
}

export interface ArchivedInventoryClass {
  InventoryClass: string;
}

export interface WeaponClass {
  WeaponStatClass: string;
}

export interface Pet {
  Scale: number;
  CreatureID: string;
  Descriptors: string[];
  CreatureSeed: [boolean, string];
  CreatureSecondarySeed: [boolean, string];
  SpeciesSeed: any;
  GenusSeed: any;
  CustomSpeciesName: string;
  Predator: boolean;
  UA: any;
  AllowUnmodifiedReroll: boolean;
  ColourBaseSeed: [boolean, string];
  BoneScaleSeed: [boolean, string];
  HasFur: boolean;
  Biome: Biome2;
  CreatureType: CreatureType2;
  BirthTime: number;
  LastEggTime: number;
  LastTrustIncreaseTime: number;
  LastTrustDecreaseTime: number;
  EggModified: boolean;
  HasBeenSummoned: boolean;
  CustomName: string;
  Trust: number;
  SenderData: SenderData2;
  Traits: number[];
  Moods: number[];
}

export interface Biome2 {
  Biome: string;
}

export interface CreatureType2 {
  CreatureType: string;
}

export interface SenderData2 {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface Egg {
  Scale: number;
  CreatureID: string;
  Descriptors: any[];
  CreatureSeed: [boolean, string];
  CreatureSecondarySeed: [boolean, string];
  SpeciesSeed: number;
  GenusSeed: number;
  CustomSpeciesName: string;
  Predator: boolean;
  UA: number;
  AllowUnmodifiedReroll: boolean;
  ColourBaseSeed: [boolean, string];
  BoneScaleSeed: [boolean, string];
  HasFur: boolean;
  Biome: Biome3;
  CreatureType: CreatureType3;
  BirthTime: number;
  LastEggTime: number;
  LastTrustIncreaseTime: number;
  LastTrustDecreaseTime: number;
  EggModified: boolean;
  HasBeenSummoned: boolean;
  CustomName: string;
  Trust: number;
  SenderData: SenderData3;
  Traits: number[];
  Moods: number[];
}

export interface Biome3 {
  Biome: string;
}

export interface CreatureType3 {
  CreatureType: string;
}

export interface SenderData3 {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface PetAccessoryCustomisation {
  Data: Daum[];
}

export interface Daum {
  SelectedPreset: string;
  CustomData: CustomData;
}

export interface CustomData {
  DescriptorGroups: string[];
  PaletteID: string;
  Colours: Colour3[];
  TextureOptions: any[];
  BoneScales: BoneScale[];
  Scale: number;
}

export interface Colour3 {
  Palette: Palette3;
  Colour: number[];
}

export interface Palette3 {
  Palette: string;
  ColourAlt: string;
  Index: number;
}

export interface BoneScale {
  BoneName: string;
  Scale: number;
}

export interface GraveInventory {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class15;
  StackSizeGroup: StackSizeGroup15;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class15 {
  InventoryClass: string;
}

export interface StackSizeGroup15 {
  InventoryStackSizeGroup: string;
}

export interface GraveUniverseAddress {
  RealityIndex: number;
  GalacticAddress: GalacticAddress3;
}

export interface GalacticAddress3 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface ShipLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface WeaponLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface CurrentShip {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture3;
  AltId: string;
}

export interface ProceduralTexture3 {
  Samplers: any[];
}

export interface CurrentWeapon {
  Filename: string;
  GenerationSeed: [boolean, string];
}

export interface KnownWordGroup {
  Group: string;
  Races: boolean[];
}

export interface MissionProgress {
  Mission: string;
  Progress: number;
  Seed: any;
  Data: number;
  Stat: number;
  Participants: Participant[];
}

export interface Participant {
  UA: any;
  BuildingSeed: [boolean, string];
  BuildingLocation: number[];
  ParticipantType: ParticipantType;
}

export interface ParticipantType {
  ParticipantType: string;
}

export interface MissionRecurrence {
  MissionID: string;
  RecurrenceDeadline: number;
}

export interface HoloExplorerInteraction {
  GalacticAddress: number;
  Value: number;
  Position: number[];
}

export interface HoloScepticInteraction {
  GalacticAddress: number;
  Value: number;
  Position: number[];
}

export interface HoloNooneInteraction {
  GalacticAddress: number;
  Value: number;
  Position: number[];
}

export interface MarkerStack {
  Table: number;
  Event: string;
  GalacticAddress: any;
  BuildingSeed: [boolean, string];
  BuildingLocation: number[];
  BuildingClass: BuildingClass;
  Time: number;
  MissionID: string;
  MissionSeed: any;
  ParticipantType: ParticipantType2;
}

export interface BuildingClass {
  BuildingClass: string;
}

export interface ParticipantType2 {
  ParticipantType: string;
}

export interface Stat {
  GroupId: string;
  Address: any;
  Stats: Stat2[];
}

export interface Stat2 {
  Id: string;
  Value: Value;
}

export interface Value {
  IntValue?: number;
  FloatValue?: number;
}

export interface TelemetryStat {
  Id: string;
  Type: string;
  Value: number;
}

export interface StoredInteraction {
  Interactions: Interaction[];
  CurrentPos: number;
}

export interface Interaction {
  GalacticAddress: any;
  Value: number;
  Position: number[];
}

export interface MaintenanceInteraction {
  InventoryContainer: InventoryContainer;
  LastUpdateTimestamp: number;
  LastCompletedTimestamp: number;
  LastBrokenTimestamp: number;
  DamageTimers: number[];
  AmountAccumulators: number[];
  Flags: number;
}

export interface InventoryContainer {
  Slots: Slot6[];
  ValidSlotIndices: any[];
  Class: Class16;
  StackSizeGroup: StackSizeGroup16;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot6 {
  Type: Type10;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index10;
}

export interface Type10 {
  InventoryType: string;
}

export interface Index10 {
  X: number;
  Y: number;
}

export interface Class16 {
  InventoryClass: string;
}

export interface StackSizeGroup16 {
  InventoryStackSizeGroup: string;
}

export interface PersonalMaintenanceInteraction {
  InventoryContainer: InventoryContainer2;
  LastUpdateTimestamp: number;
  LastCompletedTimestamp: number;
  LastBrokenTimestamp: number;
  DamageTimers: number[];
  AmountAccumulators: number[];
  Flags: number;
}

export interface InventoryContainer2 {
  Slots: Slot7[];
  ValidSlotIndices: any[];
  Class: Class17;
  StackSizeGroup: StackSizeGroup17;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot7 {
  Type: Type11;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index11;
}

export interface Type11 {
  InventoryType: string;
}

export interface Index11 {
  X: number;
  Y: number;
}

export interface Class17 {
  InventoryClass: string;
}

export interface StackSizeGroup17 {
  InventoryStackSizeGroup: string;
}

export interface SavedInteractionIndicy {
  SavedRaceIndicies: number[];
  HasLoopedIndicies: boolean[];
}

export interface SavedInteractionDialogTable {
  Hash: any;
  Dialog: string;
}

export interface AtlasStationAdressDaum {
  RealityIndex: number;
  GalacticAddress: GalacticAddress4;
}

export interface GalacticAddress4 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface NewAtlasStationAdressDaum {
  RealityIndex: number;
  GalacticAddress: GalacticAddress5;
}

export interface GalacticAddress5 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface VisitedAtlasStationsDaum {
  RealityIndex: number;
  GalacticAddress: GalacticAddress6;
}

export interface GalacticAddress6 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface CompletedAtlasAddress {
  RealityIndex: number;
  GalacticAddress: GalacticAddress7;
}

export interface GalacticAddress7 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface GameStartAddress1 {
  RealityIndex: number;
  GalacticAddress: GalacticAddress8;
}

export interface GalacticAddress8 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface GameStartAddress2 {
  RealityIndex: number;
  GalacticAddress: GalacticAddress9;
}

export interface GalacticAddress9 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface CurrentFreighter {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture4;
  AltId: string;
}

export interface ProceduralTexture4 {
  Samplers: any[];
}

export interface FreighterLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface FreighterCargoLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface FreighterInventory {
  Slots: Slot8[];
  ValidSlotIndices: ValidSlotIndice6[];
  Class: Class18;
  StackSizeGroup: StackSizeGroup18;
  BaseStatValues: BaseStatValue4[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot8 {
  Type: Type12;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index12;
}

export interface Type12 {
  InventoryType: string;
}

export interface Index12 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice6 {
  X: number;
  Y: number;
}

export interface Class18 {
  InventoryClass: string;
}

export interface StackSizeGroup18 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue4 {
  BaseStatID: string;
  Value: number;
}

export interface FreighterInventoryTechOnly {
  Slots: Slot9[];
  ValidSlotIndices: ValidSlotIndice7[];
  Class: Class19;
  StackSizeGroup: StackSizeGroup19;
  BaseStatValues: BaseStatValue5[];
  SpecialSlots: SpecialSlot5[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot9 {
  Type: Type13;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index13;
}

export interface Type13 {
  InventoryType: string;
}

export interface Index13 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice7 {
  X: number;
  Y: number;
}

export interface Class19 {
  InventoryClass: string;
}

export interface StackSizeGroup19 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue5 {
  BaseStatID: string;
  Value: number;
}

export interface SpecialSlot5 {
  Type: Type14;
  Index: Index14;
}

export interface Type14 {
  InventorySpecialSlotType: string;
}

export interface Index14 {
  X: number;
  Y: number;
}

export interface FreighterInventoryCargo {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class20;
  StackSizeGroup: StackSizeGroup20;
  BaseStatValues: BaseStatValue6[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class20 {
  InventoryClass: string;
}

export interface StackSizeGroup20 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue6 {
  BaseStatID: string;
  Value: number;
}

export interface FreighterUniverseAddress {
  RealityIndex: number;
  GalacticAddress: GalacticAddress10;
}

export interface GalacticAddress10 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface SquadronPilot {
  NPCResource: Npcresource;
  ShipResource: ShipResource;
  TraitsSeed: string;
  PilotRank: number;
}

export interface Npcresource {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture5;
  AltId: string;
}

export interface ProceduralTexture5 {
  Samplers: any[];
}

export interface ShipResource {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture6;
  AltId: string;
}

export interface ProceduralTexture6 {
  Samplers: any[];
}

export interface BaseBuildingObject {
  Timestamp: number;
  ObjectID: string;
  GalacticAddress: any;
  RegionSeed: string;
  UserData: number;
  Position: number[];
  Up: number[];
  At: number[];
}

export interface TerrainEditData {
  GalacticAddresses: any[];
  BufferSizes: number[];
  BufferAges: number[];
  BufferAnchors: number[][];
  BufferProtected: boolean[];
  Edits: Edit[];
}

export interface Edit {
  Data: number;
  Position: number;
}

export interface Npcworker {
  ResourceElement: ResourceElement;
  InteractionSeed: [boolean, string];
  HiredWorker: boolean;
  FreighterBase: boolean;
  BaseUA: number;
  BaseOffset: number[];
}

export interface ResourceElement {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture7;
  AltId: string;
}

export interface ProceduralTexture7 {
  Samplers: any[];
}

export interface PersistentPlayerBase {
  BaseVersion: number;
  OriginalBaseVersion: number;
  GalacticAddress: any;
  Position: number[];
  Forward: number[];
  UserData: number;
  LastUpdateTimestamp: number;
  Objects: Object[];
  RID: string;
  Owner: Owner;
  Name: string;
  BaseType: BaseType;
  LastEditedById: string;
  LastEditedByUsername: string;
  ScreenshotAt: number[];
  ScreenshotPos: number[];
  GameMode: GameMode2;
  Difficulty: Difficulty;
  PlatformToken: string;
  IsReported: boolean;
  IsFeatured: boolean;
  AutoPowerSetting: AutoPowerSetting;
}

export interface Object {
  Timestamp: number;
  ObjectID: string;
  UserData: number;
  Position: number[];
  Up: number[];
  At: number[];
  Message?: string;
}

export interface Owner {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface BaseType {
  PersistentBaseTypes: string;
}

export interface GameMode2 {
  PresetGameMode: string;
}

export interface Difficulty {
  DifficultyPreset: DifficultyPreset;
  PersistentBaseDifficultyFlags: number;
}

export interface DifficultyPreset {
  DifficultyPresetType: string;
}

export interface AutoPowerSetting {
  BaseAutoPowerSetting: string;
}

export interface TeleportEndpoint {
  UniverseAddress: UniverseAddress2;
  Position: number[];
  Facing: number[];
  TeleporterType: string;
  Name: string;
  CalcWarpOffset: boolean;
  IsFeatured: boolean;
  IsFavourite: boolean;
}

export interface UniverseAddress2 {
  RealityIndex: number;
  GalacticAddress: GalacticAddress11;
}

export interface GalacticAddress11 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface Chest1Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest1Inventory {
  Slots: Slot10[];
  ValidSlotIndices: ValidSlotIndice8[];
  Class: Class21;
  StackSizeGroup: StackSizeGroup21;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot10 {
  Type: Type15;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index15;
}

export interface Type15 {
  InventoryType: string;
}

export interface Index15 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice8 {
  X: number;
  Y: number;
}

export interface Class21 {
  InventoryClass: string;
}

export interface StackSizeGroup21 {
  InventoryStackSizeGroup: string;
}

export interface Chest2Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest2Inventory {
  Slots: Slot11[];
  ValidSlotIndices: ValidSlotIndice9[];
  Class: Class22;
  StackSizeGroup: StackSizeGroup22;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot11 {
  Type: Type16;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index16;
}

export interface Type16 {
  InventoryType: string;
}

export interface Index16 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice9 {
  X: number;
  Y: number;
}

export interface Class22 {
  InventoryClass: string;
}

export interface StackSizeGroup22 {
  InventoryStackSizeGroup: string;
}

export interface Chest3Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest3Inventory {
  Slots: Slot12[];
  ValidSlotIndices: ValidSlotIndice10[];
  Class: Class23;
  StackSizeGroup: StackSizeGroup23;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot12 {
  Type: Type17;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index17;
}

export interface Type17 {
  InventoryType: string;
}

export interface Index17 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice10 {
  X: number;
  Y: number;
}

export interface Class23 {
  InventoryClass: string;
}

export interface StackSizeGroup23 {
  InventoryStackSizeGroup: string;
}

export interface Chest4Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest4Inventory {
  Slots: Slot13[];
  ValidSlotIndices: ValidSlotIndice11[];
  Class: Class24;
  StackSizeGroup: StackSizeGroup24;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot13 {
  Type: Type18;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index18;
}

export interface Type18 {
  InventoryType: string;
}

export interface Index18 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice11 {
  X: number;
  Y: number;
}

export interface Class24 {
  InventoryClass: string;
}

export interface StackSizeGroup24 {
  InventoryStackSizeGroup: string;
}

export interface Chest5Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest5Inventory {
  Slots: Slot14[];
  ValidSlotIndices: ValidSlotIndice12[];
  Class: Class25;
  StackSizeGroup: StackSizeGroup25;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot14 {
  Type: Type19;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index19;
}

export interface Type19 {
  InventoryType: string;
}

export interface Index19 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice12 {
  X: number;
  Y: number;
}

export interface Class25 {
  InventoryClass: string;
}

export interface StackSizeGroup25 {
  InventoryStackSizeGroup: string;
}

export interface Chest6Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest6Inventory {
  Slots: Slot15[];
  ValidSlotIndices: ValidSlotIndice13[];
  Class: Class26;
  StackSizeGroup: StackSizeGroup26;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot15 {
  Type: Type20;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index20;
}

export interface Type20 {
  InventoryType: string;
}

export interface Index20 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice13 {
  X: number;
  Y: number;
}

export interface Class26 {
  InventoryClass: string;
}

export interface StackSizeGroup26 {
  InventoryStackSizeGroup: string;
}

export interface Chest7Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest7Inventory {
  Slots: Slot16[];
  ValidSlotIndices: ValidSlotIndice14[];
  Class: Class27;
  StackSizeGroup: StackSizeGroup27;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot16 {
  Type: Type21;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index21;
}

export interface Type21 {
  InventoryType: string;
}

export interface Index21 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice14 {
  X: number;
  Y: number;
}

export interface Class27 {
  InventoryClass: string;
}

export interface StackSizeGroup27 {
  InventoryStackSizeGroup: string;
}

export interface Chest8Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest8Inventory {
  Slots: Slot17[];
  ValidSlotIndices: ValidSlotIndice15[];
  Class: Class28;
  StackSizeGroup: StackSizeGroup28;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot17 {
  Type: Type22;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index22;
}

export interface Type22 {
  InventoryType: string;
}

export interface Index22 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice15 {
  X: number;
  Y: number;
}

export interface Class28 {
  InventoryClass: string;
}

export interface StackSizeGroup28 {
  InventoryStackSizeGroup: string;
}

export interface Chest9Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest9Inventory {
  Slots: Slot18[];
  ValidSlotIndices: ValidSlotIndice16[];
  Class: Class29;
  StackSizeGroup: StackSizeGroup29;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot18 {
  Type: Type23;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index23;
}

export interface Type23 {
  InventoryType: string;
}

export interface Index23 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice16 {
  X: number;
  Y: number;
}

export interface Class29 {
  InventoryClass: string;
}

export interface StackSizeGroup29 {
  InventoryStackSizeGroup: string;
}

export interface Chest10Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Chest10Inventory {
  Slots: Slot19[];
  ValidSlotIndices: ValidSlotIndice17[];
  Class: Class30;
  StackSizeGroup: StackSizeGroup30;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot19 {
  Type: Type24;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index24;
}

export interface Type24 {
  InventoryType: string;
}

export interface Index24 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice17 {
  X: number;
  Y: number;
}

export interface Class30 {
  InventoryClass: string;
}

export interface StackSizeGroup30 {
  InventoryStackSizeGroup: string;
}

export interface ChestMagicLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface ChestMagicInventory {
  Slots: Slot20[];
  ValidSlotIndices: ValidSlotIndice18[];
  Class: Class31;
  StackSizeGroup: StackSizeGroup31;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot20 {
  Type: Type25;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index25;
}

export interface Type25 {
  InventoryType: string;
}

export interface Index25 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice18 {
  X: number;
  Y: number;
}

export interface Class31 {
  InventoryClass: string;
}

export interface StackSizeGroup31 {
  InventoryStackSizeGroup: string;
}

export interface ChestMagic2Layout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface ChestMagic2Inventory {
  Slots: any[];
  ValidSlotIndices: ValidSlotIndice19[];
  Class: Class32;
  StackSizeGroup: StackSizeGroup32;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface ValidSlotIndice19 {
  X: number;
  Y: number;
}

export interface Class32 {
  InventoryClass: string;
}

export interface StackSizeGroup32 {
  InventoryStackSizeGroup: string;
}

export interface CookingIngredientsLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface CookingIngredientsInventory {
  Slots: Slot21[];
  ValidSlotIndices: ValidSlotIndice20[];
  Class: Class33;
  StackSizeGroup: StackSizeGroup33;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot21 {
  Type: Type26;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index26;
}

export interface Type26 {
  InventoryType: string;
}

export interface Index26 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice20 {
  X: number;
  Y: number;
}

export interface Class33 {
  InventoryClass: string;
}

export interface StackSizeGroup33 {
  InventoryStackSizeGroup: string;
}

export interface RocketLockerLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface RocketLockerInventory {
  Slots: any[];
  ValidSlotIndices: ValidSlotIndice21[];
  Class: Class34;
  StackSizeGroup: StackSizeGroup34;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface ValidSlotIndice21 {
  X: number;
  Y: number;
}

export interface Class34 {
  InventoryClass: string;
}

export interface StackSizeGroup34 {
  InventoryStackSizeGroup: string;
}

export interface FishPlatformLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface FishPlatformInventory {
  Slots: any[];
  ValidSlotIndices: ValidSlotIndice22[];
  Class: Class35;
  StackSizeGroup: StackSizeGroup35;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface ValidSlotIndice22 {
  X: number;
  Y: number;
}

export interface Class35 {
  InventoryClass: string;
}

export interface StackSizeGroup35 {
  InventoryStackSizeGroup: string;
}

export interface FishBaitBoxLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface FishBaitBoxInventory {
  Slots: Slot22[];
  ValidSlotIndices: ValidSlotIndice23[];
  Class: Class36;
  StackSizeGroup: StackSizeGroup36;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot22 {
  Type: Type27;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index27;
}

export interface Type27 {
  InventoryType: string;
}

export interface Index27 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice23 {
  X: number;
  Y: number;
}

export interface Class36 {
  InventoryClass: string;
}

export interface StackSizeGroup36 {
  InventoryStackSizeGroup: string;
}

export interface FoodUnitLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface FoodUnitInventory {
  Slots: any[];
  ValidSlotIndices: ValidSlotIndice24[];
  Class: Class37;
  StackSizeGroup: StackSizeGroup37;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface ValidSlotIndice24 {
  X: number;
  Y: number;
}

export interface Class37 {
  InventoryClass: string;
}

export interface StackSizeGroup37 {
  InventoryStackSizeGroup: string;
}

export interface CurrentFreighterNpc {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture8;
  AltId: string;
}

export interface ProceduralTexture8 {
  Samplers: any[];
}

export interface VehicleOwnership {
  Name: string;
  Resource: Resource3;
  Inventory: Inventory4;
  Inventory_Cargo: InventoryCargo3;
  Inventory_TechOnly: InventoryTechOnly3;
  InventoryLayout: InventoryLayout;
  Location: any;
  Position: number[];
  Direction: number[];
}

export interface Resource3 {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture9;
  AltId: string;
}

export interface ProceduralTexture9 {
  Samplers: any[];
}

export interface Inventory4 {
  Slots: Slot23[];
  ValidSlotIndices: ValidSlotIndice25[];
  Class: Class38;
  StackSizeGroup: StackSizeGroup38;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot23 {
  Type: Type28;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index28;
}

export interface Type28 {
  InventoryType: string;
}

export interface Index28 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice25 {
  X: number;
  Y: number;
}

export interface Class38 {
  InventoryClass: string;
}

export interface StackSizeGroup38 {
  InventoryStackSizeGroup: string;
}

export interface InventoryCargo3 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class39;
  StackSizeGroup: StackSizeGroup39;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class39 {
  InventoryClass: string;
}

export interface StackSizeGroup39 {
  InventoryStackSizeGroup: string;
}

export interface InventoryTechOnly3 {
  Slots: Slot24[];
  ValidSlotIndices: ValidSlotIndice26[];
  Class: Class40;
  StackSizeGroup: StackSizeGroup40;
  BaseStatValues: any[];
  SpecialSlots: SpecialSlot6[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot24 {
  Type: Type29;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index29;
}

export interface Type29 {
  InventoryType: string;
}

export interface Index29 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice26 {
  X: number;
  Y: number;
}

export interface Class40 {
  InventoryClass: string;
}

export interface StackSizeGroup40 {
  InventoryStackSizeGroup: string;
}

export interface SpecialSlot6 {
  Type: Type30;
  Index: Index30;
}

export interface Type30 {
  InventorySpecialSlotType: string;
}

export interface Index30 {
  X: number;
  Y: number;
}

export interface InventoryLayout {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface SkiffData {
  Location: number;
  Position: number[];
  Direction: number[];
}

export interface ShipOwnership {
  Name: string;
  Resource: Resource4;
  Inventory: Inventory5;
  Inventory_Cargo: InventoryCargo4;
  Inventory_TechOnly: InventoryTechOnly4;
  InventoryLayout: InventoryLayout2;
  Location: number;
  Position: number[];
  Direction: number[];
}

export interface Resource4 {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture10;
  AltId: string;
}

export interface ProceduralTexture10 {
  Samplers: any[];
}

export interface Inventory5 {
  Slots: Slot25[];
  ValidSlotIndices: ValidSlotIndice27[];
  Class: Class41;
  StackSizeGroup: StackSizeGroup41;
  BaseStatValues: BaseStatValue7[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot25 {
  Type: Type31;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index31;
}

export interface Type31 {
  InventoryType: string;
}

export interface Index31 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice27 {
  X: number;
  Y: number;
}

export interface Class41 {
  InventoryClass: string;
}

export interface StackSizeGroup41 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue7 {
  BaseStatID: string;
  Value: number;
}

export interface InventoryCargo4 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class42;
  StackSizeGroup: StackSizeGroup42;
  BaseStatValues: BaseStatValue8[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class42 {
  InventoryClass: string;
}

export interface StackSizeGroup42 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue8 {
  BaseStatID: string;
  Value: number;
}

export interface InventoryTechOnly4 {
  Slots: Slot26[];
  ValidSlotIndices: ValidSlotIndice28[];
  Class: Class43;
  StackSizeGroup: StackSizeGroup43;
  BaseStatValues: BaseStatValue9[];
  SpecialSlots: SpecialSlot7[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot26 {
  Type: Type32;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index32;
}

export interface Type32 {
  InventoryType: string;
}

export interface Index32 {
  X: number;
  Y: number;
}

export interface ValidSlotIndice28 {
  X: number;
  Y: number;
}

export interface Class43 {
  InventoryClass: string;
}

export interface StackSizeGroup43 {
  InventoryStackSizeGroup: string;
}

export interface BaseStatValue9 {
  BaseStatID: string;
  Value: number;
}

export interface SpecialSlot7 {
  Type: Type33;
  Index: Index33;
}

export interface Type33 {
  InventorySpecialSlotType: string;
}

export interface Index33 {
  X: number;
  Y: number;
}

export interface InventoryLayout2 {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface ArchivedShipOwnership {
  Ownership: Ownership;
  Customisation: Customisation;
  UsesLegacyColours: boolean;
  ArchivedName: string;
  ArchivedClass: ArchivedClass;
  ArchivedInventoryClass: ArchivedInventoryClass2;
}

export interface Ownership {
  Name: string;
  Resource: Resource5;
  Inventory: Inventory6;
  Inventory_Cargo: InventoryCargo5;
  Inventory_TechOnly: InventoryTechOnly5;
  InventoryLayout: InventoryLayout3;
  Location: number;
  Position: number[];
  Direction: number[];
}

export interface Resource5 {
  Filename: string;
  Seed: [boolean, string];
  ProceduralTexture: ProceduralTexture11;
  AltId: string;
}

export interface ProceduralTexture11 {
  Samplers: any[];
}

export interface Inventory6 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class44;
  StackSizeGroup: StackSizeGroup44;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class44 {
  InventoryClass: string;
}

export interface StackSizeGroup44 {
  InventoryStackSizeGroup: string;
}

export interface InventoryCargo5 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class45;
  StackSizeGroup: StackSizeGroup45;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class45 {
  InventoryClass: string;
}

export interface StackSizeGroup45 {
  InventoryStackSizeGroup: string;
}

export interface InventoryTechOnly5 {
  Slots: any[];
  ValidSlotIndices: any[];
  Class: Class46;
  StackSizeGroup: StackSizeGroup46;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Class46 {
  InventoryClass: string;
}

export interface StackSizeGroup46 {
  InventoryStackSizeGroup: string;
}

export interface InventoryLayout3 {
  Slots: number;
  Seed: [boolean, string];
  Level: number;
}

export interface Customisation {
  SelectedPreset: string;
  CustomData: CustomData2;
}

export interface CustomData2 {
  DescriptorGroups: any[];
  PaletteID: string;
  Colours: any[];
  TextureOptions: any[];
  BoneScales: any[];
  Scale: number;
}

export interface ArchivedClass {
  ShipClass: string;
}

export interface ArchivedInventoryClass2 {
  InventoryClass: string;
}

export interface TradingSupplyDaum {
  GalacticAddress: any;
  Supply: number;
  Demand: number;
  Product: string;
  Timestamp: number;
  InteractionType: InteractionType;
}

export interface InteractionType {
  InteractionType: string;
}

export interface VisitedPortal {
  PortalSeed: [boolean, string];
  LastPortalUA: string;
  IsStoryPortal: boolean;
}

export interface OtherSideOfPortalReturnBase {
  UniverseAddress: UniverseAddress3;
  Position: number[];
  Facing: number[];
  TeleporterType: string;
  Name: string;
  CalcWarpOffset: boolean;
  IsFeatured: boolean;
  IsFavourite: boolean;
}

export interface UniverseAddress3 {
  RealityIndex: number;
  GalacticAddress: GalacticAddress12;
}

export interface GalacticAddress12 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface StartingPrimaryWeapon {
  WeaponMode: string;
}

export interface StartingSecondaryWeapon {
  WeaponMode: string;
}

export interface CharacterCustomisationDaum {
  SelectedPreset: string;
  CustomData: CustomData3;
}

export interface CustomData3 {
  DescriptorGroups: string[];
  PaletteID: string;
  Colours: Colour4[];
  TextureOptions: TextureOption[];
  BoneScales: BoneScale2[];
  Scale: number;
}

export interface Colour4 {
  Palette: Palette4;
  Colour: number[];
}

export interface Palette4 {
  Palette: string;
  ColourAlt: string;
  Index: number;
}

export interface TextureOption {
  TextureOptionGroupName: string;
  TextureOptionName: string;
}

export interface BoneScale2 {
  BoneName: string;
  Scale: number;
}

export interface Outfit {
  DescriptorGroups: string[];
  PaletteID: string;
  Colours: Colour5[];
  TextureOptions: TextureOption2[];
  BoneScales: BoneScale3[];
  Scale: number;
}

export interface Colour5 {
  Palette: Palette5;
  Colour: number[];
}

export interface Palette5 {
  Palette: string;
  ColourAlt: string;
  Index: number;
}

export interface TextureOption2 {
  TextureOptionGroupName: string;
  TextureOptionName: string;
}

export interface BoneScale3 {
  BoneName: string;
  Scale: number;
}

export interface FleetFrigate {
  ResourceSeed: [boolean, string];
  HomeSystemSeed: [boolean, string];
  ForcedTraitsSeed: [boolean, string];
  TimeOfLastIncomeCollection: number;
  CustomName: string;
  FrigateClass: FrigateClass;
  Race: Race;
  InventoryClass: InventoryClass;
  TotalNumberOfExpeditions: number;
  TotalNumberOfSuccessfulEvents: number;
  TotalNumberOfFailedEvents: number;
  NumberOfTimesDamaged: number;
  TraitIDs: string[];
  Stats: number[];
  RepairsMade: number;
  DamageTaken: number;
}

export interface FrigateClass {
  FrigateClass: string;
}

export interface Race {
  AlienRace: string;
}

export interface InventoryClass {
  InventoryClass: string;
}

export interface FleetExpedition {
  Seed: [boolean, string];
  UA: number;
  SpawnPosition: number[];
  TerminalPosition: number[];
  SpeedMultiplier: number;
  Powerups: string[];
  CustomName: string;
  InterventionEventMissionID: string;
  StartTime: number;
  PauseTime: number;
  TimeOfLastUAChange: number;
  NextEventToTrigger: number;
  ExpeditionCategory: ExpeditionCategory;
  ExpeditionDuration: ExpeditionDuration;
  ActiveFrigateIndices: number[];
  DamagedFrigateIndices: any[];
  DestroyedFrigateIndices: any[];
  AllFrigateIndices: number[];
  NumberOfSuccessfulEventsThisExpedition: number;
  NumberOfFailedEventsThisExpedition: number;
  Events: Event[];
  InterventionPhoneCallActivated: boolean;
}

export interface ExpeditionCategory {
  ExpeditionCategory: string;
}

export interface ExpeditionDuration {
  ExpeditionDuration: string;
}

export interface Event {
  Seed: [boolean, string];
  UA: number;
  AffectedFrigateIndices: any[];
  RepairingFrigateIndices: any[];
  AffectedFrigateResponses: any[];
  EventID: string;
  InterventionEventID: string;
  OverriddenDescription: string;
  WhaleEvent: boolean;
  OverriddenReward: string;
  OverriddenRewardDescription: string;
  Success: boolean;
  IsInterventionEvent: boolean;
  AvoidedIntervention: boolean;
}

export interface MultiplayerUa {
  RealityIndex: number;
  GalacticAddress: GalacticAddress13;
}

export interface GalacticAddress13 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface MultiplayerSpawn {
  PlayerPositionInSystem: number[];
  PlayerTransformAt: number[];
  PlayerDeathRespawnPositionInSystem: number[];
  PlayerDeathRespawnTransformAt: number[];
  ShipPositionInSystem: number[];
  ShipTransformAt: number[];
  LastKnownPlayerState: string;
  FreighterPositionInSystem: number[];
  FreighterTransformAt: number[];
  FreighterTransformUp: number[];
  AbandonedFreighterPositionInSystem: number[];
  AbandonedFreighterTransformAt: number[];
  AbandonedFreighterTransformUp: number[];
}

export interface HotAction {
  KeyActions: KeyAction[];
}

export interface KeyAction {
  Action: Action;
  Id: string;
  Number: number;
  InventoryIndex: InventoryIndex;
}

export interface Action {
  QuickMenuActions: string;
}

export interface InventoryIndex {
  X: number;
  Y: number;
}

export interface NexusUniverseAddress {
  RealityIndex: number;
  GalacticAddress: GalacticAddress14;
}

export interface GalacticAddress14 {
  VoxelX: number;
  VoxelY: number;
  VoxelZ: number;
  SolarSystemIndex: number;
  PlanetIndex: number;
}

export interface SettlementStatesV2 {
  UniqueId: string;
  UniverseAddress: any;
  Position: number[];
  SeedValue: any;
  BuildingStates: number[];
  LastBuildingUpgradesTimestamps: number[];
  Name: string;
  Owner: Owner2;
  PendingJudgementType: PendingJudgementType;
  PendingCustomJudgementID: string;
  Stats: number[];
  Perks: string[];
  LastJudgementTime: number;
  LastUpkeepDebtCheckTime: number;
  LastDebtChangeTime: number;
  LastAlertChangeTime: number;
  Air: number;
  DbResourceId: string;
  DbTimestamp: number;
  DbVersion: number;
  ProductionState: ProductionState[];
  IsReported: boolean;
  NextBuildingUpgradeIndex: number;
  NextBuildingUpgradeClass: NextBuildingUpgradeClass;
  NextBuildingUpgradeSeedValue: number;
  Race: Race2;
  '@rg': number;
  Ak8: number;
  rr0: string;
  'x3<': number;
  WGY: number;
  PZh: Pzh[];
}

export interface Owner2 {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface PendingJudgementType {
  SettlementJudgementType: string;
}

export interface ProductionState {
  ElementId: string;
  LastChangeTimestamp: number;
  Amount: number;
  'T=R': number;
  'U2>': number;
  N6t: N6t;
  '5a3': number;
  ':aM': number;
}

export interface N6t {
  BuildingClass: string;
}

export interface NextBuildingUpgradeClass {
  BuildingClass: string;
}

export interface Race2 {
  AlienRace: string;
}

export interface Pzh {
  InteractionSeed: string;
  FrH: number;
}

export interface Hdt {
  SeedValue: any;
  '<:S': number;
  WCt: number;
  ';Ip': number;
  '2H:': number;
  '4X;': number;
  NR7: number;
  'qr=': number;
  'A<w': number;
  oCR: number;
  sng: number;
  uuW: number;
  FfZ: number;
  '7Cg': number;
  b5K: number;
  'm<F': number;
  '9=d': number;
}

export interface SeenStory {
  PagesData: PagesDaum[];
}

export interface PagesDaum {
  PageIdx: number;
  LastSeenEntryIdx: number;
}

export interface WonderPlanetRecord {
  GenerationID: [any, string];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderCreatureRecord {
  GenerationID: [any, string];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderFloraRecord {
  GenerationID: [any, string];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderMineralRecord {
  GenerationID: [any, string];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderTreasureRecord {
  GenerationID: any[];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderWeirdBasePartRecord {
  GenerationID: [string, any];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderCustomRecord {
  GenerationID: any[];
  WonderStatValue: number;
  SeenInFrontend: boolean;
}

export interface WonderCustomRecordsExtraDaum {
  CustomName: string;
  ActualType: ActualType;
}

export interface ActualType {
  WonderType: string;
}

export interface SyncBuffersDaum {
  Data: Daum2[];
}

export interface Daum2 {
  SpaceAddress: any;
  OwnerOnlineId: string;
  OwnerPlatformId: string;
  BufferVersion: number;
  ItemsCount: number;
}

export interface RefinerBufferKey {
  Position: number[];
  Location: number;
}

export interface RefinerBufferDaum {
  InventoryContainer: InventoryContainer3;
  LastUpdateTimestamp: number;
  LastCompletedTimestamp: number;
  LastBrokenTimestamp: number;
  DamageTimers: number[];
  AmountAccumulators: number[];
  Flags: number;
}

export interface InventoryContainer3 {
  Slots: Slot27[];
  ValidSlotIndices: any[];
  Class: Class47;
  StackSizeGroup: StackSizeGroup47;
  BaseStatValues: any[];
  SpecialSlots: any[];
  Width: number;
  Height: number;
  IsCool: boolean;
  Name: string;
  Version: number;
}

export interface Slot27 {
  Type: Type34;
  Id: string;
  Amount: number;
  MaxAmount: number;
  DamageFactor: number;
  FullyInstalled: boolean;
  Index: Index34;
}

export interface Type34 {
  InventoryType: string;
}

export interface Index34 {
  X: number;
  Y: number;
}

export interface Class47 {
  InventoryClass: string;
}

export interface StackSizeGroup47 {
  InventoryStackSizeGroup: string;
}

export interface FishingRecord {
  ProductList: string[];
  ProductCountList: number[];
  LargestCatchList: number[];
}

export interface Nek {
  Seed: string;
  Cyx: number[];
  Mp7: any[];
  leA: LeA;
  '9B5': boolean;
  sus: boolean;
  't<Q': TQ[];
}

export interface LeA {
  Playlist: string[];
  Shuffle: boolean;
  ':R0': boolean;
}

export interface TQ {
  XQ1: number;
  'h8@': number[];
}

export interface SpawnStateData {
  PlayerPositionInSystem: number[];
  PlayerTransformAt: number[];
  PlayerDeathRespawnPositionInSystem: number[];
  PlayerDeathRespawnTransformAt: number[];
  ShipPositionInSystem: number[];
  ShipTransformAt: number[];
  LastKnownPlayerState: string;
  FreighterPositionInSystem: number[];
  FreighterTransformAt: number[];
  FreighterTransformUp: number[];
  AbandonedFreighterPositionInSystem: number[];
  AbandonedFreighterTransformAt: number[];
  AbandonedFreighterTransformUp: number[];
}

export interface DiscoveryManagerData {
  'DiscoveryData-v1': DiscoveryDataV1;
}

export interface DiscoveryDataV1 {
  ReserveStore: number;
  ReserveManaged: number;
  Store: Store3;
  Available: Available[];
  Enqueued: any[];
}

export interface Store3 {
  Record: Record[];
}

export interface Record {
  DD: Dd;
  DM: Dm;
  OWS: Ows;
  FL?: Fl;
  RID?: string;
}

export interface Dd {
  UA: any;
  DT: string;
  VP: any[];
}

export interface Dm {
  CN?: string;
}

export interface Ows {
  LID: string;
  UID: string;
  USN: string;
  PTK: string;
  TS: number;
}

export interface Fl {
  C?: number;
  U?: number;
}

export interface Available {
  TSrec: number;
  DD: Dd2;
}

export interface Dd2 {
  UA: any;
  DT: string;
  VP: any[];
}
