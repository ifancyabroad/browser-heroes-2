import { EngineResult, RunState } from "../../schemas";

export function returnToTown(state: RunState): EngineResult {
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

	const nextState: RunState = {
		...state,
		phase: "town",
		combat: null,
		battleNumber: state.battleNumber + 1,
		goldMultiplier: 1,

		hero: {
			...state.hero,
			// Sync hero HP from combat state.
			// Later this may be handled by a dedicated mapper.
			currentHp: state.combat.player.currentHp,
			maxHp: state.combat.player.maxHp,
		},
	};

	return {
		ok: true,
		state: nextState,
		events: [{ type: "RETURNED_TO_TOWN" }],
	};
}
