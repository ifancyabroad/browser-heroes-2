import type { Consumable } from "@app/content";
import type { CombatState } from "../../schemas";
import { applyHealing } from "../combat/healing/applyHealing";
import { replaceCombatant } from "../combat/combatants/combatantSelectors";
import { appendCombatLog } from "../combat/logs/appendCombatLog";
import { getEffectiveHealingMultiplier } from "../combat/effects/getEffectiveHealingMultiplier";

export function resolveConsumableEffect(
	combat: CombatState,
	consumable: Consumable,
): { combat: CombatState; amount: number } {
	switch (consumable.effect.type) {
		case "healPercent": {
			const baseHealing = Math.round(combat.player.maxHp * consumable.effect.percent);
			const multiplier = getEffectiveHealingMultiplier(combat.player);
			const healing = applyHealing(
				combat.player,
				Math.max(0, Math.floor(baseHealing * multiplier)),
			);
			const combatAfterPotion = appendCombatLog(replaceCombatant(combat, healing.combatant), {
				turnNumber: combat.turnNumber,
				actor: "player",
				message:
					healing.actualHealing === 0
						? `${combat.player.name} drinks a ${consumable.name.toLowerCase()} but is already at full health.`
						: `${combat.player.name} drinks a ${consumable.name.toLowerCase()}, restoring ${healing.actualHealing} health.`,
				eventType: "healing_potion_used",
				outcome: {
					type: "healing",
					targetId: combat.player.id,
					amount: healing.actualHealing,
				},
			});

			return { combat: combatAfterPotion, amount: healing.actualHealing };
		}
	}
}
