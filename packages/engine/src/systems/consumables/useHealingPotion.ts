import type { CombatantState, EngineResult, RunState } from "../../schemas";

import { failureResult } from "../../core/result";
import { getActiveEffectIds } from "../combat/effects/advanceActiveEffects";
import { applyHealing } from "../combat/healing/applyHealing";
import { replaceCombatant } from "../combat/combatants/combatantSelectors";
import { appendCombatLog } from "../combat/logs/appendCombatLog";

import { HEALING_POTION_HEAL_PERCENT } from "./healingPotionConstants";
import { getEffectiveCombatStatValue } from "../combat/effects/getEffectiveCombatStatValue";
import { finishPlayerActionRound } from "../combat/rounds/finishPlayerActionRound";
import { hasActiveStatus } from "../combat/effects/hasActiveStatus";
import { validatePlayerAction } from "../combat/rounds/validatePlayerAction";

export function useHealingPotion(state: RunState): EngineResult {
	if (!state.combat) {
		throw new Error("useHealingPotion requires active combat");
	}

	const validation = validatePlayerAction(state.combat);

	if (!validation.ok) {
		return failureResult(state, validation.error);
	}

	if (hasActiveStatus(state.combat.player, "stunned")) {
		return failureResult(state, "PLAYER_CANNOT_ACT");
	}

	if (state.hero.healingPotions <= 0) {
		return failureResult(state, "NO_HEALING_POTIONS_AVAILABLE");
	}

	const playerEffectIds = getActiveEffectIds(state.combat.player);

	const healingAmount = calculateHealingPotionAmount(state.combat.player);

	const healing = applyHealing(state.combat.player, healingAmount);

	const remainingPotions = state.hero.healingPotions - 1;

	const combatAfterPotion = appendCombatLog(replaceCombatant(state.combat, healing.combatant), {
		turnNumber: state.combat.turnNumber,
		actor: "player",
		message:
			healing.actualHealing === 0
				? `${state.combat.player.name} drinks a healing potion but is already at full health.`
				: `${state.combat.player.name} drinks a healing potion, restoring ${healing.actualHealing} health.`,
		eventType: "healing_potion_used",
	});

	return finishPlayerActionRound({
		state: {
			...state,
			hero: {
				...state.hero,
				healingPotions: remainingPotions,
			},
		},
		combatAfterPlayerAction: combatAfterPotion,
		rngState: state.rngState,
		playerEffectIds,
		events: [
			{
				type: "HEALING_POTION_USED",
				amount: healing.actualHealing,
				remainingPotions,
			},
		],
	});
}

function calculateHealingPotionAmount(player: CombatantState): number {
	const baseHealing = Math.round(player.maxHp * HEALING_POTION_HEAL_PERCENT);

	const healingMultiplier = getEffectiveCombatStatValue(player, "healingMultiplier");

	return Math.max(0, Math.floor(baseHealing * healingMultiplier));
}
