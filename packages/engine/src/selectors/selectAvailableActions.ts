import type {
	CompleteLevelUpAction,
	EngineAction,
	PendingLevelUp,
	PlayerUseSkillAction,
	RunState,
} from "../schemas";
import { hasActiveStatus } from "../systems/combat/effects/hasActiveStatus";

export function selectAvailableActions(state: RunState): EngineAction[] {
	if (state.hero.pendingLevelUp) {
		return getLevelUpActions(state.hero.pendingLevelUp);
	}

	if (state.pendingRewardChoice) {
		return getRewardActions(state);
	}

	if (state.phase === "town") {
		return [
			{
				type: "ENTER_COMBAT",
			},
		];
	}

	if (state.phase === "combat" && state.combat?.status === "active") {
		const player = state.combat.player;

		if (hasActiveStatus(player, "stunned")) {
			return [
				{
					type: "PLAYER_SKIP_TURN",
				},
			];
		}

		const actions: EngineAction[] = [
			{
				type: "PLAYER_BASIC_ATTACK",
			},
		];

		if (!hasActiveStatus(player, "silenced")) {
			actions.push(...getSkillActions(state));
		}

		actions.push({
			type: "PLAYER_SKIP_TURN",
		});

		return actions;
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

function getRewardActions(state: RunState): EngineAction[] {
	const pendingRewardChoice = state.pendingRewardChoice;

	if (!pendingRewardChoice) {
		return [];
	}

	return pendingRewardChoice.options.flatMap((option, optionIndex): EngineAction[] => {
		if (option.type === "gold") {
			return [
				{
					type: "SELECT_REWARD",
					selection: {
						optionIndex,
					},
				},
			];
		}

		return [
			{
				type: "SELECT_REWARD",
				selection: {
					optionIndex,
				},
			},
		];
	});
}

function getSkillActions(state: RunState): PlayerUseSkillAction[] {
	if (!state.combat) {
		return [];
	}

	return state.combat.player.skills
		.filter((skill) => skill.chargesRemaining === undefined || skill.chargesRemaining > 0)
		.map((skill) => ({
			type: "PLAYER_USE_SKILL",
			skillId: skill.skillId,
		}));
}
