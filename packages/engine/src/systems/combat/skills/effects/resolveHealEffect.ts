import type { HealEffect } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { getCombatant, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { calculateHealing } from "../../healing/calculateHealing";
import { applyHealing } from "../../healing/applyHealing";

type ResolveHealEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: HealEffect;
	skillName: string;
	logContext?: "skill" | "rider";
	rngState: RngState;
};

export function resolveHealEffect(input: ResolveHealEffectInput): RngResult<CombatState> {
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

	const message =
		input.logContext === "rider"
			? `${input.skillName} restores an additional ${actualHealing} health to ${target.name}.`
			: `${actor.name} uses ${input.skillName} and restores ${actualHealing} health.`;

	return {
		value: appendCombatLog(updatedCombat, {
			turnNumber: input.combat.turnNumber,
			actor: actor.side,
			message,
			eventType: input.logContext === "rider" ? "effect_applied" : "healing_done",
		}),
		rngState: healing.rngState,
	};
}
