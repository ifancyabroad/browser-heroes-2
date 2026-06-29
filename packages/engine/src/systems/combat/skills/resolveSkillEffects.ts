import type { SkillId } from "@app/content";

import type { CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import type { SupportedSkillEffect } from "./validatePlayerSkillUse";

import { resolveDamageEffect } from "./effects/resolveDamageEffect";
import { resolveAttackDamageEffect } from "./effects/resolveAttackDamageEffect";
import { resolveHealEffect } from "./effects/resolveHealEffect";
import { applyTemporaryModifierEffect } from "./effects/applyTemporaryModifierEffect";

type ResolveSkillEffectsInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effects: SupportedSkillEffect[];
	skillId: SkillId;
	skillName: string;
	rngState: RngState;
};

export function resolveSkillEffects(input: ResolveSkillEffectsInput): RngResult<CombatState> {
	let combat = input.combat;
	let rngState = input.rngState;

	for (let effectIndex = 0; effectIndex < input.effects.length; effectIndex += 1) {
		const effect = input.effects[effectIndex];

		const result = resolveSkillEffect({
			combat,
			actorSide: input.actorSide,
			effect,
			effectIndex,
			skillId: input.skillId,
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
		effectIndex: number;
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

		case "modifyStat":
		case "modifyDamage":
		case "modifyDamageAffinity":
			return {
				value: applyTemporaryModifierEffect({
					combat: input.combat,
					actorSide: input.actorSide,
					effect: input.effect,
					effectIndex: input.effectIndex,
					skillId: input.skillId,
					skillName: input.skillName,
				}),
				rngState: input.rngState,
			};
	}
}
