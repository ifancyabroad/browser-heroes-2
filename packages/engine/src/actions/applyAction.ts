import type { EngineAction, EngineResult, RunState } from "../schemas";
import { enterCombat } from "../systems/combat/enterCombat";
import { applyCombatAction } from "../systems/combat/applyCombatAction";
import { continueToNextCombat } from "../systems/progression/continueToNextCombat";
import { returnToTown } from "../systems/town/returnToTown";
import { failureResult } from "../core/result";
import { completeLevelUp } from "../systems/progression/levelUp/completeLevelUp";
import { completeRewardChoice } from "../systems/progression/rewards/completeRewardChoice";
import { rerollShop } from "../systems/town/rerollShop";
import { restAtTown } from "../systems/town/restAtTown";
import { buyItem } from "../systems/town/buyItem";
import { useConsumable } from "../systems/consumables/useConsumable";
import { buyConsumable } from "../systems/town/buyConsumable";
import { retireRun } from "../systems/endless/retireRun";
import { swapHandWeapons } from "../systems/equipment/swapHandWeapons";
import { setShopLock } from "../systems/town/setShopLock";

export function applyAction(state: RunState, action: EngineAction): EngineResult {
	switch (action.type) {
		case "ENTER_COMBAT":
			return enterCombat(state, action);

		case "PLAYER_BASIC_ATTACK":
		case "PLAYER_USE_SKILL":
		case "PLAYER_SKIP_TURN":
			return applyCombatAction(state, action);

		case "CONTINUE_TO_NEXT_COMBAT":
			return continueToNextCombat(state, action);

		case "RETURN_TO_TOWN":
			return returnToTown(state);

		case "COMPLETE_LEVEL_UP":
			return completeLevelUp(state, action);

		case "SELECT_REWARD":
			return completeRewardChoice(state, action);

		case "REROLL_SHOP":
			return rerollShop(state);

		case "SET_SHOP_LOCK":
			return setShopLock(state, action);

		case "REST_AT_TOWN":
			return restAtTown(state);

		case "BUY_ITEM":
			return buyItem(state, action);

		case "PLAYER_USE_CONSUMABLE":
			return useConsumable(state, action);

		case "BUY_CONSUMABLE":
			return buyConsumable(state, action);

		case "RETIRE_RUN":
			return retireRun(state);

		case "SWAP_HAND_WEAPONS":
			return swapHandWeapons(state);

		default:
			return failureResult(state, "INVALID_ACTION");
	}
}
