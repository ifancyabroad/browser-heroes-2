import {
	type ApplyStatusEffect,
	type DamageOverTimeEffect,
	type HealOverTimeEffect,
	type ShieldEffect,
	SKILLS_BY_ID,
	type AttackDamageEffect,
	type DamageEffect,
	type Effect,
	type HealEffect,
	type ModifyDamageAffinityEffect,
	type ModifyDamageEffect,
	type ModifyStatEffect,
	type Skill,
	ModifyDamageTakenEffect,
	SkillId,
} from "@app/content";

import type { CombatantSkillState, CombatantState, EngineErrorCode } from "../../../schemas";
import {
	getSupportedAttackRiders,
	type SupportedAttackRider,
} from "../attacks/getSupportedAttackRiders";

export type SupportedAttackDamageEffect = Omit<AttackDamageEffect, "attackRiders"> & {
	attackRiders: SupportedAttackRider[];
};

export type SupportedSkillEffect =
	| DamageEffect
	| HealEffect
	| SupportedAttackDamageEffect
	| ApplyStatusEffect
	| ModifyStatEffect
	| ModifyDamageEffect
	| ModifyDamageTakenEffect
	| ModifyDamageAffinityEffect
	| DamageOverTimeEffect
	| HealOverTimeEffect
	| ShieldEffect;

export type ValidatedCombatantSkillUse = {
	skill: Skill;
	skillState: CombatantSkillState;
	effects: SupportedSkillEffect[];
};

type ValidateCombatantSkillUseResult =
	| {
			ok: true;
			value: ValidatedCombatantSkillUse;
	  }
	| {
			ok: false;
			error: EngineErrorCode;
	  };

export function validateCombatantSkillUse(
	combatant: CombatantState,
	skillId: SkillId,
): ValidateCombatantSkillUseResult {
	const skillState = combatant.skills.find((skill) => skill.skillId === skillId);

	if (!skillState) {
		return {
			ok: false,
			error: "SKILL_NOT_KNOWN",
		};
	}

	if (skillState.chargesRemaining !== undefined && skillState.chargesRemaining <= 0) {
		return {
			ok: false,
			error: "SKILL_HAS_NO_USES_REMAINING",
		};
	}

	const skill = SKILLS_BY_ID[skillId];

	const effects = getSupportedSkillEffects(skill.effects);

	if (!effects) {
		return {
			ok: false,
			error: "SKILL_EFFECT_NOT_SUPPORTED",
		};
	}

	return {
		ok: true,
		value: {
			skill,
			skillState,
			effects,
		},
	};
}

function getSupportedSkillEffects(effects: Effect[]): SupportedSkillEffect[] | null {
	const supportedEffects: SupportedSkillEffect[] = [];

	for (const effect of effects) {
		switch (effect.type) {
			case "damage":
			case "heal":
			case "applyStatus":
			case "modifyStat":
			case "modifyDamage":
			case "modifyDamageTaken":
			case "modifyDamageAffinity":
			case "damageOverTime":
			case "healOverTime":
			case "shield":
				supportedEffects.push(effect);
				break;

			case "attackDamage": {
				const attackRiders = getSupportedAttackRiders(effect.attackRiders);

				if (!attackRiders) {
					return null;
				}

				supportedEffects.push({
					...effect,
					attackRiders,
				});

				break;
			}

			default:
				return null;
		}
	}

	return supportedEffects;
}
