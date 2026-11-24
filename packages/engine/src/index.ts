export { applyAction, validateAction } from "./actions";

export { createInitialRunState } from "./state";

export type { CreateInitialRunStateInput } from "./state";

export {
	engineActionSchema,
	engineExternalInputSchema,
	engineResultSchema,
	runStateSchema,
	deserializeRunStateResultSchema,
} from "./schemas";

export type {
	EngineAction,
	EngineExternalInput,
	GhostEncounter,
	EngineResult,
	EngineEvent,
	EngineErrorCode,
	RunState,
	RunPhase,
	HeroState,
	ConsumableInventory,
	CombatState,
	CombatantState,
	CombatantSkillState,
	CombatLogEntry,
	CombatLogOutcome,
	ActiveCombatEffect,
	DeserializeRunStateResult,
	PendingLevelUp,
	LevelUpOption,
	LevelUpSelection,
	RerollLevelUpAction,
	EquippedItemState,
	RuntimeItem,
} from "./schemas";

export { serializeRunState, deserializeRunState, deserializeRunStateJson } from "./serialization";

export {
	hasReachedArmourClassThreshold,
	hasReachedMaximumAttribute,
	hasReachedMaxHpThreshold,
} from "./systems/hero/hasReachedHeroStatThreshold";

export {
	createSystemGhostEncounter,
	getEncounterTypeForBattle,
	ZONE_ORDER,
	ZONE_GROUPS,
} from "./systems/encounters";

export {
	selectAvailableActions,
	selectCombatView,
	selectEncounterContext,
	selectHeroProgression,
	selectHeroView,
	selectItemDefinition,
	selectRewardChoiceView,
	selectRunSummaryView,
	selectTownView,
	selectConsumableInventory,
} from "./selectors";

export type {
	CombatViewState,
	CombatTurnOrderEntry,
	EncounterContext,
	HeroProgressionView,
	HeroView,
	EquipmentDestinationView,
	EquipmentPlacementView,
	RewardChoiceOptionView,
	RewardChoiceView,
	RunSummaryFinalEnemyView,
	RunSummaryHeroView,
	RunSummaryView,
	TownShopSlotView,
	TownView,
	TownConsumableView,
	ConsumableView,
	ConsumableInventoryView,
} from "./selectors";
