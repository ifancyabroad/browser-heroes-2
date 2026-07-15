import type { ActiveDamageOverTimeEffect, CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { getCombatant, getCombatantById, replaceCombatant } from "../combatants/combatantSelectors";
import { applyDamage } from "../damage/applyDamage";
import { calculateDamage } from "../damage/calculateDamage";
import { appendCombatLog } from "../logs/appendCombatLog";
import { getDamageMessage } from "../damage/getDamageMessage";

type ResolveDamageOverTimeEffectsInput = {
	combat: CombatState;
	combatantSide: CombatantSide;
	effectIds: ReadonlySet<string>;
	rngState: RngState;
};

export function resolveDamageOverTimeEffects(
	input: ResolveDamageOverTimeEffectsInput,
): RngResult<CombatState> {
	let combat = input.combat;
	let rngState = input.rngState;

	const effects = getCombatant(combat, input.combatantSide).activeEffects.filter(
		(effect): effect is ActiveDamageOverTimeEffect =>
			effect.type === "damageOverTime" && input.effectIds.has(effect.id),
	);

	for (const effect of effects) {
		const target = getCombatant(combat, input.combatantSide);

		const source = getCombatantById(combat, effect.sourceCombatantId);

		const damage = calculateDamage({
			rngState,
			attacker: source,
			defender: target,
			dice: effect.dice,
			damageType: effect.damageType,
		});

		rngState = damage.rngState;

		const appliedDamage = applyDamage(target, damage.value);

		const updatedTarget = appliedDamage.combatant;

		combat = replaceCombatant(combat, updatedTarget);

		combat = appendCombatLog(combat, {
			turnNumber: combat.turnNumber,
			actor: target.side,
			message: getDamageMessage({
				prefix: `${effect.source.sourceName} affects ${target.name}`,
				hpDamage: appliedDamage.hpDamage,
				absorbedDamage: appliedDamage.absorbedDamage,
			}),
			eventType: "effect_triggered",
		});
	}

	return {
		value: combat,
		rngState,
	};
}
