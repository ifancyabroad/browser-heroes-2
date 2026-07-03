import { SKILLS_BY_ID, type SkillId, type Tactic } from "@app/content";

import type { CombatantState } from "../../../schemas";
import { randomFloat, type RngResult, type RngState } from "../../../core/rng";

import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";

export type EnemyAction =
	| {
			type: "basicAttack";
	  }
	| {
			type: "skill";
			skillId: SkillId;
	  };

type SelectEnemyActionInput = {
	enemy: CombatantState;
	player: CombatantState;
	tactic: Tactic;
	rngState: RngState;
};

export function selectEnemyAction(input: SelectEnemyActionInput): RngResult<EnemyAction> {
	const usableSkillIds = getUsableSkillIds(input.enemy, input.player);

	if (usableSkillIds.length === 0) {
		return basicAttackResult(input.rngState);
	}

	switch (input.tactic) {
		case "caster":
			return selectRandomSkill(usableSkillIds, input.rngState);

		case "aggressive": {
			const preferredSkillIds = usableSkillIds.filter((skillId) => {
				const category = SKILLS_BY_ID[skillId].category;

				return category === "attack" || category === "debuff";
			});

			if (preferredSkillIds.length > 0) {
				return selectRandomSkill(preferredSkillIds, input.rngState);
			}

			return selectDefaultAction(usableSkillIds, input.rngState);
		}

		case "defensive": {
			const isLowHealth = input.enemy.currentHp <= input.enemy.maxHp / 2;

			if (isLowHealth) {
				const preferredSkillIds = usableSkillIds.filter((skillId) => {
					const category = SKILLS_BY_ID[skillId].category;

					return category === "heal" || category === "defensive" || category === "buff";
				});

				if (preferredSkillIds.length > 0) {
					return selectRandomSkill(preferredSkillIds, input.rngState);
				}
			}

			return selectDefaultAction(usableSkillIds, input.rngState);
		}

		case "default":
		case "random":
			return selectDefaultAction(usableSkillIds, input.rngState);
	}
}

function getUsableSkillIds(enemy: CombatantState, player: CombatantState): SkillId[] {
	return enemy.skills
		.filter((skillState) => {
			const validation = validateCombatantSkillUse(enemy, skillState.skillId);

			if (!validation.ok) {
				return false;
			}

			const category = validation.value.skill.category;

			if (
				(category === "buff" || category === "debuff") &&
				hasActiveEffectFromSkill(enemy, player, skillState.skillId)
			) {
				return false;
			}

			return true;
		})
		.map((skillState) => skillState.skillId);
}

function hasActiveEffectFromSkill(
	enemy: CombatantState,
	player: CombatantState,
	skillId: SkillId,
): boolean {
	return [...enemy.activeEffects, ...player.activeEffects].some(
		(effect) => effect.sourceCombatantId === enemy.id && effect.sourceSkillId === skillId,
	);
}

function selectDefaultAction(skillIds: SkillId[], rngState: RngState): RngResult<EnemyAction> {
	const actions: EnemyAction[] = [
		{
			type: "basicAttack",
		},
		...skillIds.map(
			(skillId): EnemyAction => ({
				type: "skill",
				skillId,
			}),
		),
	];

	return selectRandomAction(actions, rngState);
}

function selectRandomSkill(skillIds: SkillId[], rngState: RngState): RngResult<EnemyAction> {
	return selectRandomAction(
		skillIds.map(
			(skillId): EnemyAction => ({
				type: "skill",
				skillId,
			}),
		),
		rngState,
	);
}

function selectRandomAction(actions: EnemyAction[], rngState: RngState): RngResult<EnemyAction> {
	const roll = randomFloat(rngState);
	const index = Math.floor(roll.value * actions.length);

	return {
		value: actions[index],
		rngState: roll.rngState,
	};
}

function basicAttackResult(rngState: RngState): RngResult<EnemyAction> {
	return {
		value: {
			type: "basicAttack",
		},
		rngState,
	};
}
