import type { ConsumableHealPercentEffect } from "@app/content";
import type { CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import { applyHealing } from "../../combat/healing/applyHealing";
import { replaceCombatant } from "../../combat/combatants/combatantSelectors";
import type { ActionResolution } from "../../combat/logs/actionOutcome";
import { getEffectiveHealingMultiplier } from "../../combat/effects/getEffectiveHealingMultiplier";

export function resolveConsumableHealPercentEffect(
	combat: CombatState,
	effect: ConsumableHealPercentEffect,
	rngState: RngState,
): RngResult<ActionResolution> {
	const baseHealing = Math.round(combat.player.maxHp * effect.percent);
	const multiplier = getEffectiveHealingMultiplier(combat.player);
	const healing = applyHealing(combat.player, Math.max(0, Math.floor(baseHealing * multiplier)));
	return {
		value: {
			combat: replaceCombatant(combat, healing.combatant),
			outcomes: [
				{
					type: "healing",
					targetId: combat.player.id,
					targetName: combat.player.name,
					amount: healing.actualHealing,
				},
			],
		},
		rngState,
	};
}
