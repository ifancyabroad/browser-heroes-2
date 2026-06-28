import type { DamageEffect } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { applyDamage } from "../../damage/applyDamage";
import { calculateDamage } from "../../damage/calculateDamage";

type ResolveDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: DamageEffect;
	skillName: string;
	rngState: RngState;
};

export function resolveDamageEffect(input: ResolveDamageEffectInput): RngResult<CombatState> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	const damage = calculateDamage({
		rngState: input.rngState,
		attacker: actor,
		defender: target,
		dice: input.effect.dice,
		damageType: input.effect.damageType,
		attribute: input.effect.attribute,
	});

	const updatedTarget = applyDamage(target, damage.value);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return {
		value: appendCombatLog(updatedCombat, {
			turnNumber: input.combat.turnNumber,
			actor: actor.side,
			message:
				`${actor.name} uses ${input.skillName} on ${target.name} ` +
				`for ${damage.value.amount} damage.`,
			eventType: "damage_dealt",
		}),
		rngState: damage.rngState,
	};
}
