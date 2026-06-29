import {
	SKILLS_BY_ID,
	type AttackDamageEffect,
	type AttackRider,
	type DamageEffect,
	type Effect,
	type HealEffect,
	type ModifyDamageAffinityEffect,
	type ModifyDamageEffect,
	type ModifyStatEffect,
	type RiderEffect,
	type Skill,
} from "@app/content";

import type {
	CombatantSkillState,
	CombatState,
	EngineErrorCode,
	PlayerUseSkillAction,
} from "../../../schemas";

export type SupportedRiderEffect = Extract<RiderEffect, { type: "damage" | "heal" }>;

export type SupportedAttackRider = Omit<AttackRider, "effects"> & {
	effects: SupportedRiderEffect[];
};

export type SupportedAttackDamageEffect = Omit<AttackDamageEffect, "attackRiders"> & {
	attackRiders: SupportedAttackRider[];
};

export type SupportedSkillEffect =
	| DamageEffect
	| HealEffect
	| SupportedAttackDamageEffect
	| ModifyStatEffect
	| ModifyDamageEffect
	| ModifyDamageAffinityEffect;

export type ValidatedPlayerSkillUse = {
	skill: Skill;
	skillState: CombatantSkillState;
	effects: SupportedSkillEffect[];
};

type ValidatePlayerSkillUseResult =
	| {
			ok: true;
			value: ValidatedPlayerSkillUse;
	  }
	| {
			ok: false;
			error: EngineErrorCode;
	  };

export function validatePlayerSkillUse(
	combat: CombatState,
	action: PlayerUseSkillAction,
): ValidatePlayerSkillUseResult {
	const skillState = combat.player.skills.find((skill) => skill.skillId === action.skillId);

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

	const skill = SKILLS_BY_ID[action.skillId];
	const rank = skill.ranks[skillState.rank - 1];

	const effects = getSupportedSkillEffects(rank.effects);

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
			case "modifyStat":
			case "modifyDamage":
			case "modifyDamageAffinity":
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

function getSupportedAttackRiders(riders: AttackRider[]): SupportedAttackRider[] | null {
	const supportedRiders: SupportedAttackRider[] = [];

	for (const rider of riders) {
		if (rider.save) {
			return null;
		}

		if (!rider.effects.every(isSupportedRiderEffect)) {
			return null;
		}

		supportedRiders.push({
			...rider,
			effects: rider.effects,
		});
	}

	return supportedRiders;
}

function isSupportedRiderEffect(effect: RiderEffect): effect is SupportedRiderEffect {
	return effect.type === "damage" || effect.type === "heal";
}
