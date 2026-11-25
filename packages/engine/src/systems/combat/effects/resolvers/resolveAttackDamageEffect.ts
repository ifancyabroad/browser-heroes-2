import type { AttackDamageEffect, SkillId } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";

import type { RngResult, RngState } from "../../../../core/rng";

import { resolveWeaponAttack } from "../../attacks/resolveWeaponAttack";
import type { ActionResolution } from "../../logs/actionOutcome";

type ResolveAttackDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: AttackDamageEffect;
	effectIndex: number;
	skillId: SkillId;
	skillName: string;
	rngState: RngState;
};

export function resolveAttackDamageEffect(
	input: ResolveAttackDamageEffectInput,
): RngResult<ActionResolution> {
	return resolveWeaponAttack({
		combat: input.combat,
		actorSide: input.actorSide,
		rngState: input.rngState,
		skill: {
			effect: input.effect,
			effectIndex: input.effectIndex,
			skillId: input.skillId,
			skillName: input.skillName,
		},
	});
}
