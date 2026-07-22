import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { calculateRestCost } from "./townPricing";
import { restoreHeroSkillCharges } from "../hero/restoreHeroSkillCharges";
import { deriveHeroStats } from "../hero/deriveHeroStats";

export function restAtTown(state: RunState): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const effectiveCharisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;

	const cost = calculateRestCost(effectiveCharisma, state.day);

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const hpRestored = Math.max(0, state.hero.maxHp - state.hero.currentHp);
	const day = state.day + 1;

	return successResult(
		{
			...state,
			day,
			gold: state.gold - cost,
			hero: {
				...state.hero,
				currentHp: state.hero.maxHp,
				skills: restoreHeroSkillCharges(state.hero.skills),
			},
		},
		[
			{
				type: "RESTED_AT_TOWN",
				cost,
				hpRestored,
			},
		],
	);
}
