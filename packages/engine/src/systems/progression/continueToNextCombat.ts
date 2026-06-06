import { EngineResult, RunState } from "../../schemas";
import { enterCombat } from "../combat";

export function continueToNextCombat(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return {
			ok: false,
			state,
			events: [],
			error: "INVALID_PHASE",
		};
	}

	if (state.combat.status !== "enemy_dead") {
		return {
			ok: false,
			state,
			events: [],
			error: "INVALID_PHASE",
		};
	}

	const readyState: RunState = {
		...state,
		phase: "town",
		combat: null,
		battleNumber: state.battleNumber + 1,
		goldMultiplier: state.goldMultiplier + 1,
	};

	const result = enterCombat(readyState);

	if (!result.ok) {
		return result;
	}

	return {
		...result,
		events: [{ type: "NEXT_COMBAT_READY" }, ...result.events],
	};
}
