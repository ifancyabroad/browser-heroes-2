import { failureResult, successResult } from "../../../core/result";
import type { EngineResult, RunState } from "../../../schemas";
import { rerollLevelUpOptions } from "./selectLevelUpOptions";

export function rerollLevelUp(state: RunState): EngineResult {
	const pendingLevelUp = state.hero.pendingLevelUp;

	if (!pendingLevelUp || pendingLevelUp.options.length === 0) {
		return failureResult(state, "LEVEL_UP_NOT_AVAILABLE");
	}

	if (state.levelUpRerolls === 0) {
		return failureResult(state, "NO_LEVEL_UP_REROLLS_REMAINING");
	}

	const rerolled = rerollLevelUpOptions(state.hero, pendingLevelUp.options, state.rngState);

	if (!rerolled) {
		return failureResult(state, "NO_ALTERNATIVE_LEVEL_UP_OPTIONS");
	}

	const levelUpRerolls = state.levelUpRerolls - 1;

	return successResult(
		{
			...state,
			rngState: rerolled.rngState,
			levelUpRerolls,
			hero: {
				...state.hero,
				pendingLevelUp: {
					...pendingLevelUp,
					options: rerolled.value,
				},
			},
		},
		[{ type: "LEVEL_UP_REROLLED", remainingRerolls: levelUpRerolls }],
	);
}
