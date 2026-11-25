import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import { selectWeightedItem, type RngResult, type RngState } from "../../../../core/rng";

import type { EnemyAction } from "../enemyActions";
import {
	getEnemyActionWeight,
	normalizeEnemyTactic,
	type StandardEnemyTactic,
} from "../enemyTactics";
import { getEnemyActionOptions } from "../getEnemyActionOptions";

type SelectStandardEnemyActionInput = {
	enemy: CombatantState;
	player: CombatantState;
	tactic: StandardEnemyTactic;
	rngState: RngState;
	excludedSkillIds?: readonly SkillId[];
};

export function selectStandardEnemyAction(
	input: SelectStandardEnemyActionInput,
): RngResult<EnemyAction> {
	const options = getEnemyActionOptions(input.enemy, input.player, input.excludedSkillIds);
	if (options.type === "fallback") {
		return { value: options.action, rngState: input.rngState };
	}

	const behaviour = normalizeEnemyTactic(input.tactic);
	const weightedActions = options.candidates.map((candidate) => ({
		value: candidate.action,
		weight: getEnemyActionWeight(behaviour, candidate),
	}));

	const selected = selectWeightedItem(weightedActions, input.rngState);
	if (!selected) {
		throw new Error("Enemy action candidates must have a positive weight");
	}
	return selected;
}
