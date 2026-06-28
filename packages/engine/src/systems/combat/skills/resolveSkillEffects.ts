import type { CombatantSide, CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import type { SupportedSkillEffect } from "./validatePlayerSkillUse";
import { resolveDamageEffect } from "./effects/resolveDamageEffect";
import { resolveAttackDamageEffect } from "./effects/resolveAttackDamageEffect";
import { resolveHealEffect } from "./effects/resolveHealEffect";

type ResolveSkillEffectsInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effects: SupportedSkillEffect[];
	skillName: string;
	rngState: RngState;
};

export function resolveSkillEffects(input: ResolveSkillEffectsInput): RngResult<CombatState> {
	let combat = input.combat;
	let rngState = input.rngState;

	for (const effect of input.effects) {
		const result = resolveSkillEffect({
			combat,
			actorSide: input.actorSide,
			effect,
			skillName: input.skillName,
			rngState,
		});

		combat = result.value;
		rngState = result.rngState;
	}

	return {
		value: combat,
		rngState,
	};
}

function resolveSkillEffect(
	input: Omit<ResolveSkillEffectsInput, "effects"> & {
		effect: SupportedSkillEffect;
	},
): RngResult<CombatState> {
	switch (input.effect.type) {
		case "damage":
			return resolveDamageEffect({
				...input,
				effect: input.effect,
			});

		case "attackDamage":
			return resolveAttackDamageEffect({
				...input,
				effect: input.effect,
			});

		case "heal":
			return resolveHealEffect({
				...input,
				effect: input.effect,
			});
	}
}
