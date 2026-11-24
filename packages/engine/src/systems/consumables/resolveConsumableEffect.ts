import type { Consumable } from "@app/content";
import type { CombatState } from "../../schemas";
import { applyHealing } from "../combat/healing/applyHealing";
import { replaceCombatant } from "../combat/combatants/combatantSelectors";
import type { ActionResolution } from "../combat/logs/actionOutcome";
import { getEffectiveHealingMultiplier } from "../combat/effects/getEffectiveHealingMultiplier";

export function resolveConsumableEffect(
	combat: CombatState,
	consumable: Consumable,
): ActionResolution {
	switch (consumable.effect.type) {
		case "healPercent": {
			const baseHealing = Math.round(combat.player.maxHp * consumable.effect.percent);
			const multiplier = getEffectiveHealingMultiplier(combat.player);
			const healing = applyHealing(
				combat.player,
				Math.max(0, Math.floor(baseHealing * multiplier)),
			);
			return {
				combat: replaceCombatant(combat, healing.combatant),
				outcomes: [
					{
						type: "healing",
						targetId: combat.player.id,
						targetName: combat.player.name,
						amount: healing.actualHealing,
					},
				],
			};
		}
	}
}
