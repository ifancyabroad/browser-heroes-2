import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import { selectWeightedItem, type RngResult, type RngState } from "../../../../core/rng";

import type { EnemyAction } from "../enemyActions";
import {
	getEnemyActionWeight,
	normalizeEnemyTactic,
	type StandardEnemyTactic,
} from "../enemyTactics";
import { getEnemyActionCandidates } from "../getEnemyActionCandidates";

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
	const candidates = getEnemyActionCandidates(input.enemy, input.player, input.excludedSkillIds);
	const behaviour = normalizeEnemyTactic(input.tactic);
	const weightedActions = candidates.map((candidate) => ({
		value: candidate.action,
		weight: getEnemyActionWeight(behaviour, candidate),
	}));

	return (
		selectWeightedItem(weightedActions, input.rngState) ?? {
			value: { type: "basicAttack" },
			rngState: input.rngState,
		}
	);
}
