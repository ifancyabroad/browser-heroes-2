import { SKILLS_BY_ID, type Effect, type Skill } from "@app/content";

import type {
	CombatantSkillState,
	CombatState,
	EngineErrorCode,
	PlayerUseSkillAction,
} from "../../../schemas";

export type SupportedSkillEffect = Extract<Effect, { type: "damage" | "attackDamage" | "heal" }>;

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

	if (!rank.effects.every(isSupportedSkillEffect)) {
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
			effects: rank.effects,
		},
	};
}

function isSupportedSkillEffect(effect: Effect): effect is SupportedSkillEffect {
	switch (effect.type) {
		case "damage":
			return !effect.requiresAttackRoll && !effect.save;

		case "attackDamage":
			return effect.extraDice === undefined && effect.attackRiders.length === 0;

		case "heal":
			return true;

		default:
			return false;
	}
}
