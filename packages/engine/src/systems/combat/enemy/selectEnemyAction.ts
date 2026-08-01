import { type Tactic } from "@app/content";

import type { CombatantState } from "../../../schemas";
import {
	selectWeightedItem,
	type RngResult,
	type RngState,
	type WeightedItem,
} from "../../../core/rng";

import { getEnemyActionWeight, getForcedTacticAction, type EnemyAction } from "./enemyTactics";
import { getUsefulEnemySkillIds } from "./getUsefulEnemySkillIds";

export type { EnemyAction } from "./enemyTactics";

type SelectEnemyActionInput = {
	enemy: CombatantState;
	player: CombatantState;
	tactic: Tactic;
	rngState: RngState;
};

export function selectEnemyAction(input: SelectEnemyActionInput): RngResult<EnemyAction> {
	const forcedAction = getForcedTacticAction(input.tactic, input.enemy);

	if (forcedAction) {
		return { value: forcedAction, rngState: input.rngState };
	}

	const usefulSkillIds = getUsefulEnemySkillIds(input.enemy, input.player);

	if (usefulSkillIds.length === 0) {
		return basicAttackResult(input.rngState);
	}

	const candidateActions: EnemyAction[] = [
		{ type: "basicAttack" },
		...usefulSkillIds.map((skillId): EnemyAction => ({ type: "skill", skillId })),
	];
	const actions: WeightedItem<EnemyAction>[] = candidateActions.map((action) => ({
		value: action,
		weight: getEnemyActionWeight(input.tactic, input.enemy, action),
	}));

	const selected = selectWeightedItem(actions, input.rngState);

	return selected ?? basicAttackResult(input.rngState);
}

function basicAttackResult(rngState: RngState): RngResult<EnemyAction> {
	return { value: { type: "basicAttack" }, rngState };
}
