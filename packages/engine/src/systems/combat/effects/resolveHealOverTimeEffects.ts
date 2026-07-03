import { SKILLS_BY_ID } from "@app/content";

import type { ActiveHealOverTimeEffect, CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { getCombatant, replaceCombatant } from "../combatants/combatantSelectors";
import { calculateHealing } from "../healing/calculateHealing";
import { applyHealing } from "../healing/applyHealing";
import { appendCombatLog } from "../logs/appendCombatLog";

type ResolveHealOverTimeEffectsInput = {
	combat: CombatState;
	combatantSide: CombatantSide;
	effectIds: ReadonlySet<string>;
	rngState: RngState;
};

export function resolveHealOverTimeEffects(
	input: ResolveHealOverTimeEffectsInput,
): RngResult<CombatState> {
	let combat = input.combat;
	let rngState = input.rngState;

	const effects = getCombatant(combat, input.combatantSide).activeEffects.filter(
		(effect): effect is ActiveHealOverTimeEffect =>
			effect.type === "healOverTime" && input.effectIds.has(effect.id),
	);

	for (const effect of effects) {
		const target = getCombatant(combat, input.combatantSide);

		const healing = calculateHealing({
			rngState,
			healer: target,
			dice: effect.dice,
		});

		rngState = healing.rngState;

		const appliedHealing = applyHealing(target, healing.value.amount);

		combat = replaceCombatant(combat, appliedHealing.combatant);

		const skill = SKILLS_BY_ID[effect.sourceSkillId];

		combat = appendCombatLog(combat, {
			turnNumber: combat.turnNumber,
			actor: target.side,
			message:
				`${skill.name} restores ` +
				`${appliedHealing.actualHealing} health ` +
				`to ${target.name}.`,
			eventType: "effect_triggered",
		});
	}

	return {
		value: combat,
		rngState,
	};
}
