import type { EngineErrorCode } from "@app/engine";

const engineErrorMessages: Record<EngineErrorCode, string> = {
	INVALID_PHASE: "That action is not available right now.",
	INVALID_ACTION: "That action is not valid.",
	COMBAT_NOT_ACTIVE: "There is no active combat.",
	RUN_ENDED: "This run has already ended.",
	VALIDATION_FAILED: "The action could not be validated.",
	NO_ELIGIBLE_ENEMY: "No enemy is available for this battle.",
	ENEMY_DEFINITION_NOT_FOUND: "Enemy details could not be loaded for this battle.",
	LEVEL_UP_NOT_AVAILABLE: "There is no level-up available right now.",
	INVALID_LEVEL_UP_SELECTION: "That level-up choice is not available.",
	SKILL_NOT_KNOWN: "That skill is not available to this hero.",
	SKILL_HAS_NO_USES_REMAINING: "That skill has no uses remaining.",
	SKILL_EFFECT_NOT_SUPPORTED: "That skill is not supported yet.",
	PLAYER_CANNOT_ACT: "The player cannot act right now.",
	PLAYER_IS_SILENCED: "The player cannot use skills while silenced.",
	LEVEL_UP_REQUIRED: "Choose a level-up reward before continuing.",
	REWARD_SELECTION_REQUIRED: "Choose a reward before continuing.",
	REWARD_NOT_AVAILABLE: "There is no reward available right now.",
	INVALID_REWARD_SELECTION: "That reward choice is not available.",
	INVALID_EQUIPMENT_SLOT: "That item cannot be equipped there.",
};

export function getEngineErrorMessage(error: EngineErrorCode): string {
	return engineErrorMessages[error];
}
