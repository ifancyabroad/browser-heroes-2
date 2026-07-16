import type { HealEffect } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { getCombatant, replaceCombatant } from "../../combatants/combatantSelectors";
import { calculateHealing } from "../../healing/calculateHealing";
import { applyHealing } from "../../healing/applyHealing";
import type { ActionResolution } from "../../logs/actionOutcome";

type ResolveHealEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: HealEffect;
	rngState: RngState;
};

export function resolveHealEffect(input: ResolveHealEffectInput): RngResult<ActionResolution> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target = actor;

	const healing = calculateHealing({
		rngState: input.rngState,
		healer: actor,
		dice: input.effect.dice,
		attribute: input.effect.attribute,
	});

	const appliedHealing = applyHealing(target, healing.value.amount);

	const updatedTarget = appliedHealing.combatant;
	const actualHealing = appliedHealing.actualHealing;

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return {
		value: {
			combat: updatedCombat,
			outcomes: [{ type: "healing", targetName: target.name, amount: actualHealing }],
		},
		rngState: healing.rngState,
	};
}
