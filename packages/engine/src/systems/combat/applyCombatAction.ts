import type { EngineAction, EngineResult, RunState } from "../../schemas";

import { failureResult } from "../../core/result";
import { resolveBasicAttackRound } from "./rounds/resolveBasicAttackRound";
import { resolveSkillRound } from "./rounds/resolveSkillRound";
import { resolveSkippedPlayerRound } from "./rounds/resolveSkippedPlayerRound";
import { hasActiveStatus } from "./effects/hasActiveStatus";

export function applyCombatAction(state: RunState, action: EngineAction): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	if (state.combat.status !== "active") {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	const playerCannotAct =
		hasActiveStatus(state.combat.player, "stunned") && action.type !== "PLAYER_SKIP_TURN";

	if (playerCannotAct) {
		return failureResult(state, "PLAYER_CANNOT_ACT");
	}

	switch (action.type) {
		case "PLAYER_BASIC_ATTACK":
			return resolveBasicAttackRound(state);

		case "PLAYER_USE_SKILL":
			return resolveSkillRound(state, action);

		case "PLAYER_SKIP_TURN":
			return resolveSkippedPlayerRound(state, action);

		default:
			return failureResult(state, "INVALID_ACTION");
	}
}
