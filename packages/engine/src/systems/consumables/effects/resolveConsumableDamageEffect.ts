import type { ConsumableDamageEffect } from "@app/content";
import type { CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import { replaceCombatant } from "../../combat/combatants/combatantSelectors";
import { calculateDamage } from "../../combat/damage/calculateDamage";
import { applyDamage } from "../../combat/damage/applyDamage";
import type { ActionResolution } from "../../combat/logs/actionOutcome";

export function resolveConsumableDamageEffect(
	combat: CombatState,
	effect: ConsumableDamageEffect,
	rngState: RngState,
): RngResult<ActionResolution> {
	const damage = calculateDamage({
		rngState,
		attacker: combat.player,
		defender: combat.enemy,
		dice: effect.dice,
		damageType: effect.damageType,
		damageClass: effect.damageClass,
	});
	const applied = applyDamage(combat.enemy, damage.value);

	return {
		value: {
			combat: replaceCombatant(combat, applied.combatant),
			outcomes: [
				{
					type: "damage",
					targetId: combat.enemy.id,
					targetName: combat.enemy.name,
					damageType: effect.damageType,
					hpDamage: applied.hpDamage,
					absorbedDamage: applied.absorbedDamage,
					affinity: damage.value.affinity,
					critical: false,
					halfDamageSave: false,
				},
			],
		},
		rngState: damage.rngState,
	};
}
