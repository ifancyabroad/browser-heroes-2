export {
	engineActionSchema,
	enterCombatActionSchema,
	playerBasicAttackActionSchema,
	continueToNextCombatActionSchema,
	returnToTownActionSchema,
	completeLevelUpActionSchema,
	rerollLevelUpActionSchema,
	setShopLockActionSchema,
} from "./action.schema";

export type {
	EngineAction,
	EnterCombatAction,
	PlayerBasicAttackAction,
	ContinueToNextCombatAction,
	ReturnToTownAction,
	CompleteLevelUpAction,
	RerollLevelUpAction,
	PlayerUseSkillAction,
	PlayerUseConsumableAction,
	BuyItemAction,
	RestAtTownAction,
	RerollShopAction,
	SetShopLockAction,
	PlayerSkipTurnAction,
	SelectRewardAction,
	BuyConsumableAction,
} from "./action.schema";

export { engineExternalInputSchema, ghostEncounterSchema } from "./externalInput.schema";

export type { EngineExternalInput, GhostEncounter } from "./externalInput.schema";

export { engineEventSchema } from "./event.schema";

export type { EngineEvent } from "./event.schema";

export {
	engineResultSchema,
	engineSuccessResultSchema,
	engineFailureResultSchema,
	engineErrorCodeSchema,
} from "./result.schema";

export type {
	EngineResult,
	EngineSuccessResult,
	EngineFailureResult,
	EngineErrorCode,
} from "./result.schema";

export {
	runStateSchema,
	runPhaseSchema,
	townStateSchema,
	townShopSlotSchema,
} from "./runState.schema";

export type { RunState, RunPhase, TownState, TownShopSlot } from "./runState.schema";

export {
	heroStateSchema,
	heroSkillStateSchema,
	heroEquipmentStateSchema,
} from "./heroState.schema";

export type {
	HeroState,
	HeroSkillState,
	HeroEquipmentState,
	EquippedItemState,
} from "./heroState.schema";
export {
	combatStateSchema,
	combatStatusSchema,
	combatantStateSchema,
	combatantSideSchema,
	combatantIdSchema,
	activeCombatEffectSchema,
	combatantSkillStateSchema,
	combatantCombatStatsSchema,
	combatantBasicAttackSchema,
	activeEffectSourceSchema,
	activeTurnDurationSchema,
	activeBattleDurationSchema,
	activeEffectDurationSchema,
} from "./combatState.schema";

export type {
	CombatState,
	CombatStatus,
	CombatantState,
	CombatantSide,
	CombatantId,
	ActiveCombatEffect,
	CombatantSkillState,
	CombatantCombatStats,
	CombatantBasicAttack,
	ActiveDamageAffinityModifier,
	ActiveDamageModifier,
	ActiveDamageTakenModifier,
	ActiveStatModifier,
	ActiveHealingModifier,
	ActiveRollModifier,
	ActiveStatusEffect,
	ActiveDamageOverTimeEffect,
	ActiveHealOverTimeEffect,
	ActiveShieldEffect,
	ActiveEffectSource,
	ActiveTurnDuration,
	ActiveBattleDuration,
	ActiveEffectDuration,
} from "./combatState.schema";

export { combatLogEntrySchema, runLogEntrySchema, logActorSchema } from "./log.schema";

export type { CombatLogEntry, CombatLogOutcome, RunLogEntry, LogActor } from "./log.schema";

export {
	deserializeRunStateResultSchema,
	deserializeRunStateSuccessSchema,
	deserializeRunStateFailureSchema,
} from "./serialization.schema";

export type { DeserializeRunStateResult } from "./serialization.schema";

export {
	featLevelUpOptionSchema,
	levelUpOptionSchema,
	pendingLevelUpSchema,
	skillLevelUpOptionSchema,
	levelUpSelectionSchema,
} from "./levelUp.schema";

export type {
	FeatLevelUpOption,
	LevelUpOption,
	PendingLevelUp,
	SkillLevelUpOption,
	LevelUpSelection,
} from "./levelUp.schema";

export {
	rewardOptionSchema,
	pendingRewardChoiceSchema,
	rewardSelectionSchema,
} from "./reward.schema";

export type { RewardOption, PendingRewardChoice, RewardSelection } from "./reward.schema";

export {
	itemInstanceSchema,
	generatedItemDefinitionSchema,
	staticItemInstanceSchema,
} from "./itemInstance.schema";

export type {
	ItemInstance,
	GeneratedItemDefinition,
	GeneratedItemInstance,
	StaticItemInstance,
} from "./itemInstance.schema";

export type { RuntimeItem } from "./runtimeItem.schema";
