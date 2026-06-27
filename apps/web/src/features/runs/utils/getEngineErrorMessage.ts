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
};

export function getEngineErrorMessage(error: EngineErrorCode): string {
	return engineErrorMessages[error];
}
