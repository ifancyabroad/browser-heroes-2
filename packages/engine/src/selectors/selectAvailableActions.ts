import type { CompleteLevelUpAction, EngineAction, PendingLevelUp, RunState } from "../schemas";

export function selectAvailableActions(state: RunState): EngineAction[] {
	if (state.hero.pendingLevelUp) {
		return getLevelUpActions(state.hero.pendingLevelUp);
	}

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

	if (state.phase === "combat" && state.combat?.status === "player_won") {
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

function getLevelUpActions(pendingLevelUp: PendingLevelUp): CompleteLevelUpAction[] {
	if (pendingLevelUp.options.length === 0) {
		return [
			{
				type: "COMPLETE_LEVEL_UP",
				selection: null,
			},
		];
	}

	return pendingLevelUp.options.map((option) => {
		if (option.type === "skill") {
			return {
				type: "COMPLETE_LEVEL_UP",
				selection: {
					type: "skill",
					skillId: option.skillId,
				},
			};
		}

		return {
			type: "COMPLETE_LEVEL_UP",
			selection: {
				type: "feat",
				featId: option.featId,
			},
		};
	});
}
