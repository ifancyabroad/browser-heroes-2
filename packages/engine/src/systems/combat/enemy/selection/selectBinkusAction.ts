import { SKILLS_BY_ID, type SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { validateCombatantSkillUse } from "../../skills/validateCombatantSkillUse";
import type { EnemyAction } from "../enemyTactics";
import { selectStandardEnemyAction } from "./selectStandardEnemyAction";

const SETUP_SKILL_IDS: readonly SkillId[] = [
	"globe_of_invulnerability",
	"piercing_magic",
	"embrace_elements",
];

type SelectBinkusActionInput = {
	enemy: CombatantState;
	player: CombatantState;
	rngState: RngState;
};

export function selectBinkusAction(input: SelectBinkusActionInput): RngResult<EnemyAction> {
	for (const skillId of SETUP_SKILL_IDS) {
		const skillState = input.enemy.skills.find((skill) => skill.skillId === skillId);
		const maxUses = SKILLS_BY_ID[skillId].maxUses;

		if (
			maxUses !== undefined &&
			skillState?.chargesRemaining === maxUses &&
			validateCombatantSkillUse(input.enemy, skillId).ok
		) {
			return { value: { type: "skill", skillId }, rngState: input.rngState };
		}
	}

	return selectStandardEnemyAction({
		...input,
		tactic: "caster",
		excludedSkillIds: SETUP_SKILL_IDS,
	});
}
