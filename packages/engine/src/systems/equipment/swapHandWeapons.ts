import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { canSwapHandWeapons } from "./canSwapHandWeapons";

export function swapHandWeapons(state: RunState): EngineResult {
	if (!canSwapHandWeapons(state)) {
		return failureResult(state, "INVALID_EQUIPMENT_SLOT");
	}

	return successResult({
		...state,
		hero: {
			...state.hero,
			equipment: {
				...state.hero.equipment,
				mainHand: state.hero.equipment.offHand,
				offHand: state.hero.equipment.mainHand,
			},
		},
	});
}
