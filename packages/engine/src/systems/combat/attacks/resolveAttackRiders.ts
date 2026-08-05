import type { ActiveEffectSource, CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { resolveDamageEffect } from "../skills/effects/resolveDamageEffect";
import { resolveHealEffect } from "../skills/effects/resolveHealEffect";
import type { FeatId, RiderEffect, SavingThrow, SkillId } from "@app/content";
import { getCombatant, getOpponent } from "../combatants/combatantSelectors";
import { resolveCombatSavingThrow } from "../checks/resolveCombatSavingThrow";
import { applyRecurringEffect } from "../skills/effects/applyRecurringEffect";
import { applyStatusEffect } from "../skills/effects/applyStatusEffect";
import { applyTemporaryModifierEffect } from "../skills/effects/applyTemporaryModifierEffect";
import type { ActionResolution } from "../logs/actionOutcome";

type AttackRiderSourceContext =
	| {
			source: {
				type: "skill";
				skillId: SkillId;
				sourceName: string;
			};
			sourceEffectKeyPrefix: string;
	  }
	| {
			source: {
				type: "basicAttack";
				sourceDefinitionId: string;
				sourceName: string;
			};
			sourceEffectKeyPrefix: string;
	  }
	| {
			source: {
				type: "feat";
				featId: FeatId;
				sourceName: string;
			};
			sourceEffectKeyPrefix: string;
	  };

type ResolveAttackRidersInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effects: RiderEffect[];
	save?: SavingThrow;
	sourceContext: AttackRiderSourceContext;
	rngState: RngState;
};

export function resolveAttackRiders(input: ResolveAttackRidersInput): RngResult<ActionResolution> {
	let combat = input.combat;
	let rngState = input.rngState;
	const outcomes: ActionResolution["outcomes"] = [];

	if (input.save) {
		const actor = getCombatant(combat, input.actorSide);

		const target = getOpponent(combat, input.actorSide);

		const savingThrow = resolveCombatSavingThrow({
			combat,
			rngState,
			attackerSide: actor.side,
			defenderSide: target.side,
			save: input.save,
		});

		rngState = savingThrow.rngState;
		combat = savingThrow.value.combat;

		if (savingThrow.value.success) {
			return {
				value: {
					combat,
					outcomes: [
						{
							type: "resisted",
							targetName: target.name,
							subject: `the additional effects of ${input.sourceContext.source.sourceName}`,
						},
					],
				},
				rngState,
			};
		}
	}

	for (let effectIndex = 0; effectIndex < input.effects.length; effectIndex += 1) {
		const effect = input.effects[effectIndex];

		const sourceEffectKey = `${input.sourceContext.sourceEffectKeyPrefix}:effect:${effectIndex}`;

		const source: ActiveEffectSource = {
			...input.sourceContext.source,
			sourceEffectKey,
		};

		switch (effect.type) {
			case "damage": {
				const result = resolveDamageEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					rngState,
				});

				combat = result.value.combat;
				outcomes.push(...result.value.outcomes);
				rngState = result.rngState;
				break;
			}

			case "heal": {
				const result = resolveHealEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					rngState,
				});

				combat = result.value.combat;
				outcomes.push(...result.value.outcomes);
				rngState = result.rngState;
				break;
			}

			case "applyStatus": {
				const result = applyStatusEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					source,
					rngState,
				});

				combat = result.value.combat;
				outcomes.push(...result.value.outcomes);
				rngState = result.rngState;
				break;
			}

			case "modifyStat":
			case "modifyHealing":
			case "modifyDamage":
			case "modifyDamageTaken":
			case "modifyDamageAffinity":
			case "modifyRoll": {
				const result = applyTemporaryModifierEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					source,
					rngState,
				});

				combat = result.value.combat;
				outcomes.push(...result.value.outcomes);
				rngState = result.rngState;
				break;
			}

			case "damageOverTime":
			case "healOverTime":
			case "shield": {
				const result = applyRecurringEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					source,
					rngState,
				});

				combat = result.value.combat;
				outcomes.push(...result.value.outcomes);
				rngState = result.rngState;
				break;
			}
		}
	}

	return {
		value: { combat, outcomes },
		rngState,
	};
}
