export {
	engineActionSchema,
	enterCombatActionSchema,
	playerBasicAttackActionSchema,
	continueToNextCombatActionSchema,
	returnToTownActionSchema,
	completeLevelUpActionSchema,
} from "./action.schema";

export type {
	EngineAction,
	EnterCombatAction,
	PlayerBasicAttackAction,
	ContinueToNextCombatAction,
	ReturnToTownAction,
	CompleteLevelUpAction,
	PlayerUseSkillAction,
	PlayerUseConsumableAction,
	BuyItemAction,
	RestAtTownAction,
	RerollShopAction,
	PlayerSkipTurnAction,
	SelectRewardAction,
	BuyConsumableAction,
	GhostEncounter,
} from "./action.schema";

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
	ActiveStatusEffect,
	ActiveDamageOverTimeEffect,
	ActiveHealOverTimeEffect,
	ActiveShieldEffect,
	ActiveEffectSource,
} from "./combatState.schema";

export { combatLogEntrySchema, runLogEntrySchema, logActorSchema } from "./log.schema";

export type { CombatLogEntry, RunLogEntry, LogActor } from "./log.schema";

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
