import type { EngineAction, RunState } from "../schemas";

export function selectAvailableActions(state: RunState): EngineAction[] {
	if (state.phase === "town") {
		return [
			{
				type: "ENTER_COMBAT",
			},
		];
	}

	if (state.phase === "combat" && state.combat?.status === "active") {
		return [
			{
				type: "PLAYER_BASIC_ATTACK",
			},
		];
	}

	if (state.phase === "combat" && state.combat?.status === "enemy_dead") {
		return [
			{
				type: "CONTINUE_TO_NEXT_COMBAT",
			},
			{
				type: "RETURN_TO_TOWN",
			},
		];
	}

	return [];
}
