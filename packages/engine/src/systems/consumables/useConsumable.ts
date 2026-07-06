import type { EngineResult, PlayerUseConsumableAction, RunState } from "../../schemas";

import { failureResult } from "../../core/result";
import { useHealingPotion } from "./useHealingPotion";

export function useConsumable(state: RunState, action: PlayerUseConsumableAction): EngineResult {
	switch (action.consumableType) {
		case "healingPotion":
			return useHealingPotion(state);

		default:
			return failureResult(state, "CONSUMABLE_NOT_USABLE");
	}
}
