import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import {
	selectWeightedItem,
	type RngResult,
	type RngState,
	type WeightedItem,
} from "../../../../core/rng";

import { getEnemyActionWeight, type EnemyAction, type StandardEnemyTactic } from "../enemyTactics";
import { getUsefulEnemySkillIds } from "../getUsefulEnemySkillIds";
import { isEnemyBasicAttackUseful } from "../usefulness/isEnemyBasicAttackUseful";

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
	const usefulSkillIds = getUsefulEnemySkillIds(input.enemy, input.player).filter(
		(skillId) => !input.excludedSkillIds?.includes(skillId),
	);

	if (usefulSkillIds.length === 0) {
		return basicAttackResult(input.rngState);
	}

	const candidateActions: EnemyAction[] = usefulSkillIds.map(
		(skillId): EnemyAction => ({ type: "skill", skillId }),
	);

	if (isEnemyBasicAttackUseful(input.enemy, input.player)) {
		candidateActions.unshift({ type: "basicAttack" });
	}

	const actions: WeightedItem<EnemyAction>[] = candidateActions.map((action) => ({
		value: action,
		weight: getEnemyActionWeight(input.tactic, input.enemy, action),
	}));

	return selectWeightedItem(actions, input.rngState) ?? basicAttackResult(input.rngState);
}

function basicAttackResult(rngState: RngState): RngResult<EnemyAction> {
	return { value: { type: "basicAttack" }, rngState };
}
