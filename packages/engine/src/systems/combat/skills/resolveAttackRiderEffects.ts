import type { CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import type { SupportedRiderEffect } from "./validatePlayerSkillUse";

import { resolveDamageEffect } from "./effects/resolveDamageEffect";
import { resolveHealEffect } from "./effects/resolveHealEffect";
import type { SavingThrow, SkillId } from "@app/content";
import { getCombatant, getOpponent } from "../combatants/combatantSelectors";
import { resolveSavingThrow } from "../checks/resolveSavingThrow";
import { appendCombatLog } from "../logs/appendCombatLog";
import { applyRecurringEffect } from "./effects/applyRecurringEffect";
import { applyStatusEffect } from "./effects/applyStatusEffect";
import { applyTemporaryModifierEffect } from "./effects/applyTemporaryModifierEffect";

type ResolveAttackRiderEffectsInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effects: SupportedRiderEffect[];
	save?: SavingThrow;
	skillId: SkillId;
	skillName: string;
	parentEffectIndex: number;
	riderIndex: number;
	rngState: RngState;
};

export function resolveAttackRiderEffects(
	input: ResolveAttackRiderEffectsInput,
): RngResult<CombatState> {
	let combat = input.combat;
	let rngState = input.rngState;

	if (input.save) {
		const actor = getCombatant(combat, input.actorSide);

		const target = getOpponent(combat, input.actorSide);

		const savingThrow = resolveSavingThrow({
			rngState,
			attacker: actor,
			defender: target,
			save: input.save,
		});

		rngState = savingThrow.rngState;

		if (savingThrow.value.success) {
			return {
				value: appendCombatLog(combat, {
					turnNumber: combat.turnNumber,
					actor: target.side,
					message:
						`${target.name} resists the additional effects ` + `of ${input.skillName}.`,
					eventType: "skill_used",
				}),
				rngState,
			};
		}
	}

	for (let effectIndex = 0; effectIndex < input.effects.length; effectIndex += 1) {
		const effect = input.effects[effectIndex];

		const sourceEffectKey =
			`effect:${input.parentEffectIndex}` +
			`:rider:${input.riderIndex}` +
			`:effect:${effectIndex}`;

		switch (effect.type) {
			case "damage": {
				const result = resolveDamageEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					skillName: input.skillName,
					logContext: "rider",
					rngState,
				});

				combat = result.value;
				rngState = result.rngState;
				break;
			}

			case "heal": {
				const result = resolveHealEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					skillName: input.skillName,
					logContext: "rider",
					rngState,
				});

				combat = result.value;
				rngState = result.rngState;
				break;
			}

			case "applyStatus": {
				const result = applyStatusEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					sourceEffectKey,
					skillId: input.skillId,
					skillName: input.skillName,
					rngState,
				});

				combat = result.value;
				rngState = result.rngState;
				break;
			}

			case "modifyStat":
			case "modifyDamage":
			case "modifyDamageTaken": {
				const result = applyTemporaryModifierEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					sourceEffectKey,
					skillId: input.skillId,
					skillName: input.skillName,
				});

				combat = result;
				break;
			}

			case "damageOverTime":
			case "healOverTime":
			case "shield": {
				const result = applyRecurringEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					sourceEffectKey,
					skillId: input.skillId,
					skillName: input.skillName,
					rngState,
				});

				combat = result.value;
				rngState = result.rngState;
				break;
			}
		}
	}

	return {
		value: combat,
		rngState,
	};
}
