import {
	type ApplyStatusEffect,
	type DamageOverTimeEffect,
	type HealOverTimeEffect,
	type ShieldEffect,
	SKILLS_BY_ID,
	type DamageEffect,
	type Effect,
	type HealEffect,
	type ModifyDamageAffinityEffect,
	type ModifyDamageEffect,
	type ModifyStatEffect,
	type Skill,
	type ModifyDamageTakenEffect,
	type ModifyHealingEffect,
	type ModifyRollEffect,
	type SkillId,
	type AttackDamageEffect,
} from "@app/content";

import type { CombatantSkillState, CombatantState, EngineErrorCode } from "../../../schemas";

export type SupportedSkillEffect =
	| DamageEffect
	| HealEffect
	| AttackDamageEffect
	| ApplyStatusEffect
	| ModifyStatEffect
	| ModifyHealingEffect
	| ModifyDamageEffect
	| ModifyDamageTakenEffect
	| ModifyDamageAffinityEffect
	| ModifyRollEffect
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
			case "modifyHealing":
			case "modifyDamage":
			case "modifyDamageTaken":
			case "modifyDamageAffinity":
			case "modifyRoll":
			case "damageOverTime":
			case "healOverTime":
			case "shield":
			case "attackDamage":
				supportedEffects.push(effect);
				break;

			default:
				return null;
		}
	}

	return supportedEffects;
}
