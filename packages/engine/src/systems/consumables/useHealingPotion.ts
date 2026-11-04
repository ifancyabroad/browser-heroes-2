import type { CombatantState, CombatState, EngineEvent } from "../../schemas";
import { applyHealing } from "../combat/healing/applyHealing";
import { replaceCombatant } from "../combat/combatants/combatantSelectors";
import { appendCombatLog } from "../combat/logs/appendCombatLog";
import { HEALING_POTION_HEAL_PERCENT } from "./healingPotionConstants";
import { getEffectiveHealingMultiplier } from "../combat/effects/getEffectiveHealingMultiplier";

export function useHealingPotion(
	combat: CombatState,
	healingPotions: number,
): { combat: CombatState; remainingPotions: number; event: EngineEvent } {
	const healingAmount = calculateHealingPotionAmount(combat.player);

	const healing = applyHealing(combat.player, healingAmount);

	const remainingPotions = healingPotions - 1;

	const combatAfterPotion = appendCombatLog(replaceCombatant(combat, healing.combatant), {
		turnNumber: combat.turnNumber,
		actor: "player",
		message:
			healing.actualHealing === 0
				? `${combat.player.name} drinks a healing potion but is already at full health.`
				: `${combat.player.name} drinks a healing potion, restoring ${healing.actualHealing} health.`,
		eventType: "healing_potion_used",
		outcome: {
			type: "healing",
			targetId: combat.player.id,
			amount: healing.actualHealing,
		},
	});

	return {
		combat: combatAfterPotion,
		remainingPotions,
		event: { type: "HEALING_POTION_USED", amount: healing.actualHealing, remainingPotions },
	};
}

function calculateHealingPotionAmount(player: CombatantState): number {
	const baseHealing = Math.round(player.maxHp * HEALING_POTION_HEAL_PERCENT);

	const healingMultiplier = getEffectiveHealingMultiplier(player);

	return Math.max(0, Math.floor(baseHealing * healingMultiplier));
}
