import type { BuyConsumableAction, EngineResult, RunState } from "../../schemas";

import { failureResult } from "../../core/result";
import { buyHealingPotion } from "./buyHealingPotion";

export function buyConsumable(state: RunState, action: BuyConsumableAction): EngineResult {
	switch (action.consumableType) {
		case "healingPotion":
			return buyHealingPotion(state);

		default:
			return failureResult(state, "CONSUMABLE_NOT_AVAILABLE");
	}
}
