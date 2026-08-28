import { failureResult, successResult } from "../../../core/result";
import { createContextRngState } from "../../../core/rng";
import type { EngineResult, RunState } from "../../../schemas";
import { rerollLevelUpOptions } from "./selectLevelUpOptions";
import { createSkillOfferEvents } from "./createSkillOfferEvents";

export function rerollLevelUp(state: RunState): EngineResult {
	const pendingLevelUp = state.hero.pendingLevelUp;
	const firstOption = pendingLevelUp?.options[0];

	if (!pendingLevelUp || !firstOption) {
		return failureResult(state, "LEVEL_UP_NOT_AVAILABLE");
	}

	if (state.levelUpRerolls === 0) {
		return failureResult(state, "NO_LEVEL_UP_REROLLS_REMAINING");
	}

	const rerollIndex = pendingLevelUp.rerollIndex + 1;
	const rerolled = rerollLevelUpOptions(
		state.hero,
		pendingLevelUp.options,
		createContextRngState(
			state.seed,
			"level-up",
			pendingLevelUp.level,
			firstOption.type,
			rerollIndex,
		),
	);

	if (!rerolled) {
		return failureResult(state, "NO_ALTERNATIVE_LEVEL_UP_OPTIONS");
	}

	const levelUpRerolls = state.levelUpRerolls - 1;
	const nextPendingLevelUp = {
		...pendingLevelUp,
		rerollIndex,
		options: rerolled,
	};

	return successResult(
		{
			...state,
			levelUpRerolls,
			hero: {
				...state.hero,
				pendingLevelUp: nextPendingLevelUp,
			},
		},
		[
			{
				type: "LEVEL_UP_REROLLED",
				remainingRerolls: levelUpRerolls,
			},
			...createSkillOfferEvents(nextPendingLevelUp),
		],
	);
}
