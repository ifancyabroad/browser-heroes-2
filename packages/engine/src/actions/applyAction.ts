import type { EngineAction, EngineResult, RunState } from "../schemas";
import { enterCombat } from "../systems/combat/enterCombat";
import { applyCombatAction } from "../systems/combat/applyCombatAction";
import { continueToNextCombat } from "../systems/progression/continueToNextCombat";
import { returnToTown } from "../systems/town/returnToTown";

export function applyAction(state: RunState, action: EngineAction): EngineResult {
	switch (action.type) {
		case "ENTER_COMBAT":
			return enterCombat(state);

		case "PLAYER_BASIC_ATTACK":
			return applyCombatAction(state, action);

		case "CONTINUE_TO_NEXT_COMBAT":
			return continueToNextCombat(state);

		case "RETURN_TO_TOWN":
			return returnToTown(state);

		default: {
			const exhaustiveCheck: never = action;

			return {
				ok: false,
				state,
				events: [],
				error: "INVALID_ACTION",
			};
		}
	}
}
