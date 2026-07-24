import type { SkillId } from "@app/content";

import type { CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import type { SupportedSkillEffect } from "./validateCombatantSkillUse";

import { resolveDamageEffect } from "./effects/resolveDamageEffect";
import { resolveAttackDamageEffect } from "./effects/resolveAttackDamageEffect";
import { resolveHealEffect } from "./effects/resolveHealEffect";
import { applyTemporaryModifierEffect } from "./effects/applyTemporaryModifierEffect";
import { applyRecurringEffect } from "./effects/applyRecurringEffect";
import { applyStatusEffect } from "./effects/applyStatusEffect";
import type { ActionResolution } from "../logs/actionOutcome";
import { formatSkillHeading } from "../logs/formatActionLog";
import { getCombatant } from "../combatants/combatantSelectors";
import { appendActionLog } from "../logs/appendActionLog";

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
	const outcomes: ActionResolution["outcomes"] = [];

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

		combat = result.value.combat;
		outcomes.push(...result.value.outcomes);
		rngState = result.rngState;
	}

	const actor = getCombatant(combat, input.actorSide);
	return {
		value: appendActionLog({
			combat,
			actor: actor.side,
			heading: formatSkillHeading(actor.name, input.skillName, outcomes),
			eventType: "skill_used",
			outcomes,
		}),
		rngState,
	};
}

function resolveSkillEffect(
	input: Omit<ResolveSkillEffectsInput, "effects"> & {
		effect: SupportedSkillEffect;
		effectIndex: number;
	},
): RngResult<ActionResolution> {
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

		case "applyStatus":
			return applyStatusEffect({
				combat: input.combat,
				actorSide: input.actorSide,
				effect: input.effect,
				source: {
					type: "skill",
					skillId: input.skillId,
					sourceName: input.skillName,
					sourceEffectKey: `effect:${input.effectIndex}`,
				},
				rngState: input.rngState,
			});

		case "modifyStat":
		case "modifyHealing":
		case "modifyDamage":
		case "modifyDamageTaken":
		case "modifyDamageAffinity":
		case "modifyRoll":
			return {
				value: applyTemporaryModifierEffect({
					combat: input.combat,
					actorSide: input.actorSide,
					effect: input.effect,
					source: {
						type: "skill",
						skillId: input.skillId,
						sourceName: input.skillName,
						sourceEffectKey: `effect:${input.effectIndex}`,
					},
				}),
				rngState: input.rngState,
			};

		case "damageOverTime":
		case "healOverTime":
		case "shield":
			return applyRecurringEffect({
				combat: input.combat,
				actorSide: input.actorSide,
				effect: input.effect,
				source: {
					type: "skill",
					skillId: input.skillId,
					sourceName: input.skillName,
					sourceEffectKey: `effect:${input.effectIndex}`,
				},
				rngState: input.rngState,
			});
	}
}
