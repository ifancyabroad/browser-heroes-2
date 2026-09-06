import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { validateCombatantSkillUse } from "../../skills/validateCombatantSkillUse";
import type { EnemyAction } from "../enemyTactics";
import { selectStandardEnemyAction } from "./selectStandardEnemyAction";

const CONCEDE_SKILL_ID: SkillId = "thou_hast_bested_me";

type SelectConcederActionInput = {
	enemy: CombatantState;
	player: CombatantState;
	rngState: RngState;
};

export function selectConcederAction(input: SelectConcederActionInput): RngResult<EnemyAction> {
	if (
		input.enemy.currentHp <= input.enemy.maxHp / 2 &&
		validateCombatantSkillUse(input.enemy, CONCEDE_SKILL_ID).ok
	) {
		return {
			value: { type: "skill", skillId: CONCEDE_SKILL_ID },
			rngState: input.rngState,
		};
	}

	return selectStandardEnemyAction({ ...input, tactic: "default" });
}
