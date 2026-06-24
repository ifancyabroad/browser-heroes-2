import type { EngineAction, EngineResult, RunState } from "../../schemas";

import { failureResult } from "../../core/result";
import { resolveBasicAttackRound } from "./rounds/resolveBasicAttackRound";

export function applyCombatAction(state: RunState, action: EngineAction): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	if (state.combat.status !== "active") {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	switch (action.type) {
		case "PLAYER_BASIC_ATTACK":
			return resolveBasicAttackRound(state);

		default:
			return failureResult(state, "INVALID_ACTION");
	}
}
