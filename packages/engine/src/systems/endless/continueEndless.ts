import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";

export function continueEndless(state: RunState): EngineResult {
	if (state.phase !== "complete" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "player_won") {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.hero.pendingLevelUp) {
		return failureResult(state, "LEVEL_UP_REQUIRED");
	}

	if (state.pendingRewardChoice) {
		return failureResult(state, "REWARD_SELECTION_REQUIRED");
	}

	return successResult(
		{
			...state,
			phase: "combat",
			endlessCycle: state.endlessCycle + 1,
		},
		[
			{
				type: "ENDLESS_CONTINUED",
			},
		],
	);
}
